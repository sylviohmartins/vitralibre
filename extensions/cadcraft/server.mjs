import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BODY = 2048;
const MAX_OUTPUT = 6 * 1024 * 1024;
const PORT = Number(process.env.CADCRAFT_PORT || 8765);
const SELF = fileURLToPath(import.meta.url);
const ROOT = new URL('./', import.meta.url);
const PNG_MAGIC = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

export function normalizeSketch(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Informe as medidas do produto.');
  const widthMm = input.widthMm;
  const heightMm = input.heightMm;
  if (![widthMm, heightMm].every(n => Number.isSafeInteger(n) && n >= 1 && n <= 10000)) {
    throw new Error('Largura e altura devem ser números inteiros entre 1 e 10.000 mm.');
  }
  const format = input.format ?? 'png';
  if (format !== 'png' && format !== 'dxf') throw new Error('Formato não suportado. Use PNG ou DXF.');
  return { widthMm, heightMm, format };
}

export class StdioMcpClient {
  constructor({ executable = 'cadcraft-cli', cwd, timeoutMs = 15000, spawnImpl = spawn } = {}) {
    this.child = spawnImpl(executable, ['mcp'], {
      cwd, shell: false, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, CADCRAFT_CONFIG_DIR: cwd }
    });
    this.pending = new Map();
    this.seq = 0;
    this.timeoutMs = timeoutMs;
    this.closed = false;
    this.error = null;
    const lines = createInterface({ input: this.child.stdout, crlfDelay: Infinity });
    lines.on('line', line => {
      if (line.length > MAX_OUTPUT * 2) return this.fail(new Error('Resposta MCP excedeu o limite.'));
      let message;
      try { message = JSON.parse(line); } catch { return this.fail(new Error('Resposta JSON inválida do servidor MCP.')); }
      const promise = this.pending.get(message.id);
      if (!promise) return;
      clearTimeout(promise.timer);
      this.pending.delete(message.id);
      if (message.error) promise.reject(new Error(String(message.error.message || 'Falha MCP')));
      else promise.resolve(message.result);
    });
    this.child.on('error', err => this.fail(err));
    this.child.on('exit', code => this.fail(new Error('Servidor MCP encerrou a execução (código ' + code + ').')));
    this.child.stderr?.on('data', () => {}); // Never forward process logs or environment to the browser.
  }

  fail(err) {
    if (this.closed) return;
    this.closed = true;
    this.error = err;
    for (const { reject, timer } of this.pending.values()) {
      clearTimeout(timer);
      reject(err);
    }
    this.pending.clear();
    this.child.kill?.();
  }

  request(method, params = {}) {
    if (this.closed || !this.child.stdin?.writable) return Promise.reject(this.error ?? new Error('Servidor MCP indisponível.'));
    const id = ++this.seq;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error('Tempo limite do servidor MCP esgotado.'));
        this.fail(new Error('Servidor MCP interrompido após timeout.'));
      }, this.timeoutMs);
      this.pending.set(id, { resolve, reject, timer });
      this.child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n', error => {
        if (error) this.fail(error);
      });
    });
  }

  notify(method) {
    if (this.closed) throw this.error ?? new Error('Servidor MCP indisponível.');
    this.child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method, params: {} }) + '\n');
  }

  async initialize() {
    const result = await this.request('initialize', {
      protocolVersion: '2025-06-18', capabilities: {},
      clientInfo: { name: 'vitralibre-cadcraft-local', version: '0.1.0' }
    });
    if (!result?.protocolVersion) throw new Error('Handshake MCP sem versão negociada.');
    this.notify('notifications/initialized');
    const catalog = await this.request('tools/list');
    this.tools = new Set((catalog?.tools ?? []).map(tool => tool.name));
    for (const required of ['new_drawing', 'command_line', 'inspect_drawing', 'save']) {
      if (!this.tools.has(required)) throw new Error('Ferramenta MCP ausente: ' + required);
    }
  }

  async tool(name, args) {
    if (!this.tools?.has(name)) throw new Error('Ferramenta MCP não autorizada.');
    const result = await this.request('tools/call', { name, arguments: args });
    if (result?.isError) throw new Error('CADCraft rejeitou a operação: ' + name);
    for (const block of result?.content ?? []) {
      if (block.type === 'text') {
        try {
          const parsed = JSON.parse(block.text);
          if (parsed?.error) throw new Error(String(parsed.error));
        } catch (err) {
          if (err instanceof SyntaxError) continue;
          throw err;
        }
      }
    }
    return result;
  }

  close() {
    this.fail(new Error('Sessão MCP encerrada.'));
  }
}

export async function generateTechnicalDrawing(input) {
  const sketch = normalizeSketch(input);
  const workspace = await mkdtemp(join(tmpdir(), 'vitralibre-cad-'));
  const client = new StdioMcpClient({
    executable: process.env.CADCRAFT_BIN || 'cadcraft-cli',
    cwd: workspace
  });
  const output = join(workspace, 'desenho.' + sketch.format);
  try {
    await client.initialize();
    await client.tool('new_drawing', { metric: true });
    await client.tool('command_line', { text: `rectang 0,0 ${sketch.widthMm},${sketch.heightMm}` });
    await client.tool('inspect_drawing', {});
    await client.tool('save', { path: output });
    const bytes = await readFile(output);
    if (!bytes.length || bytes.length > MAX_OUTPUT) throw new Error('Arquivo CAD produzido está vazio ou excede o limite.');
    if (sketch.format === 'png' && !bytes.subarray(0, 8).equals(PNG_MAGIC)) throw new Error('CADCraft não produziu um PNG válido.');
    if (sketch.format === 'dxf' && !bytes.includes(Buffer.from('SECTION'))) throw new Error('CADCraft não produziu um DXF reconhecível.');
    return { bytes, contentType: sketch.format === 'png' ? 'image/png' : 'application/dxf', format: sketch.format };
  } finally {
    client.close();
    await rm(workspace, { recursive: true, force: true });
  }
}

function respondJson(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  res.end(JSON.stringify(body));
}

export function createCadcraftServer({ generate = generateTechnicalDrawing } = {}) {
  let busy = false;
  return createServer(async (req, res) => {
    const host = req.headers.host ?? '';
    const address = req.socket.localAddress;
    const port = req.socket.localPort;
    if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(address) ||
        ![`127.0.0.1:${port}`, `localhost:${port}`].includes(host)) {
      return respondJson(res, 403, { error: 'A extensão CAD é exclusivamente local.' });
    }
    res.setHeader('referrer-policy', 'no-referrer');
    res.setHeader('x-frame-options', 'DENY');
    const route = new URL(req.url ?? '/', 'http://' + host).pathname;
    if (req.method === 'GET' && route === '/') {
      res.writeHead(302, { location: '/cadcraft/' }); return res.end();
    }
    if (req.method === 'GET' && route === '/cadcraft/') {
      res.setHeader('content-security-policy', "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'");
      res.setHeader('content-type', 'text/html; charset=utf-8');
      return res.end(await readFile(new URL('index.html', ROOT)));
    }
    if (req.method === 'GET' && route === '/cadcraft/client.mjs') {
      res.setHeader('content-type', 'text/javascript; charset=utf-8');
      return res.end(await readFile(new URL('client.mjs', ROOT)));
    }
    if (req.method === 'GET' && route === '/api/cadcraft/health') {
      return respondJson(res, 200, { status: 'online', cadcraftBinaryVerified: false, mode: 'local-only' });
    }
    if (req.method !== 'POST' || route !== '/api/cadcraft/preview') return respondJson(res, 404, { error: 'Rota inexistente.' });
    if (req.headers.origin !== 'http://' + host || req.headers['x-vitralibre-cad'] !== '1' ||
        req.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
      return respondJson(res, 403, { error: 'Origem ou tipo de requisição não autorizado.' });
    }
    if (busy) return respondJson(res, 429, { error: 'Outra geração está em andamento.' });
    let raw = '';
    try {
      for await (const chunk of req) {
        raw += chunk.toString('utf8');
        if (Buffer.byteLength(raw) > MAX_BODY) return respondJson(res, 413, { error: 'Requisição excedeu o limite.' });
      }
      const sketch = normalizeSketch(JSON.parse(raw));
      busy = true;
      try {
        const drawing = await generate(sketch);
        if (!Buffer.isBuffer(drawing.bytes) || drawing.bytes.length > MAX_OUTPUT) throw new Error('Resposta CAD inválida.');
        res.writeHead(200, {
          'content-type': drawing.contentType,
          'content-disposition': `attachment; filename="desenho-tecnico.${sketch.format}"`,
          'cache-control': 'no-store',
          'x-content-type-options': 'nosniff'
        });
        res.end(drawing.bytes);
      } finally { busy = false; }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido.';
      const badInput = error instanceof SyntaxError || /Informe|devem|Formato não suportado/.test(message);
      if (!res.headersSent) respondJson(res, badInput ? 400 : 503, { error: badInput ? message : 'CADCraft indisponível ou falha ao gerar desenho. Consulte os logs locais.' });
      if (!badInput) console.error('[cadcraft]', message);
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === SELF) {
  if (!Number.isInteger(PORT) || PORT < 1024 || PORT > 65535) throw new Error('CADCRAFT_PORT inválida.');
  createCadcraftServer().listen(PORT, '127.0.0.1', () => {
    console.log(`Extensão CADCraft local: http://127.0.0.1:${PORT}/cadcraft/`);
  });
}
