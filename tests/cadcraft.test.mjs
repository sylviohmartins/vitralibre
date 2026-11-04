import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { EventEmitter } from 'node:events';
import { Writable, PassThrough } from 'node:stream';
import { normalizeSketch, StdioMcpClient, createCadcraftServer } from '../extensions/cadcraft/server.mjs';

const draft = { widthMm: 600, heightMm: 400, format: 'png' };
const body = input => JSON.stringify(input);

async function withServer(generate, run) {
  const server = createCadcraftServer({ generate });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = 'http://127.0.0.1:' + server.address().port;
  try { await run(address); } finally { await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())); }
}

const post = (address, sketch = draft, headers = {}) => fetch(address + '/api/cadcraft/preview', {
  method: 'POST',
  headers: { Origin: address, 'Content-Type': 'application/json', 'X-VitraLibre-CAD': '1', ...headers },
  body: body(sketch)
});

test('normaliza somente geometrias retangulares limitadas e formatos conhecidos', () => {
  assert.deepEqual(normalizeSketch(draft), draft);
  for (const input of [
    null, {}, { ...draft, widthMm: 0 }, { ...draft, heightMm: -1 },
    { ...draft, widthMm: 1.5 }, { ...draft, widthMm: 10001 },
    { ...draft, heightMm: Infinity }, { ...draft, format: 'dwg' }
  ]) assert.throws(() => normalizeSketch(input));
});

test('servidor serve ferramenta isolada e health não afirma que binário foi validado', async () => {
  await withServer(async () => ({ bytes: Buffer.from('PNG'), contentType: 'image/png' }), async address => {
    const health = await fetch(address + '/api/cadcraft/health');
    assert.equal(health.status, 200);
    assert.equal((await health.json()).cadcraftBinaryVerified, false);
    const page = await fetch(address + '/cadcraft/');
    assert.equal(page.status, 200);
    assert.match(page.headers.get('content-security-policy'), /frame-ancestors 'none'/);
    assert.match(await page.text(), /Desenho técnico de produtos/);
    const script = await fetch(address + '/cadcraft/client.mjs');
    assert.equal(script.status, 200);
    assert.match(await script.text(), /api\/cadcraft\/preview/);
  });
});

test('rejeita origens cruzadas, ausência de cabeçalho, host e entradas inválidas', async () => {
  let calls = 0;
  await withServer(async () => { calls++; return { bytes: Buffer.from('ok'), contentType: 'image/png' }; }, async address => {
    assert.equal((await post(address, draft, { Origin: 'https://malicioso.invalid' })).status, 403);
    assert.equal((await post(address, draft, { 'X-VitraLibre-CAD': '0' })).status, 403);
    assert.equal((await post(address, { ...draft, widthMm: -99 })).status, 400);
    assert.equal((await post(address, { ...draft, format: 'html' })).status, 400);
    const huge = await fetch(address + '/api/cadcraft/preview', {
      method: 'POST',
      headers: { Origin: address, 'Content-Type': 'application/json', 'X-VitraLibre-CAD': '1' },
      body: JSON.stringify({ ...draft, unknown: 'A'.repeat(4096) })
    });
    assert.equal(huge.status, 413);
    assert.equal(calls, 0);
  });
});

test('MVP retorna um arquivo PNG gerado, sem persistência e sem alterar JSON de catálogo', async () => {
  let seen;
  await withServer(async sketch => {
    seen = sketch;
    return { bytes: Buffer.from([137,80,78,71,13,10,26,10]), contentType: 'image/png' };
  }, async address => {
    const response = await post(address);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'image/png');
    assert.match(response.headers.get('content-disposition'), /desenho-tecnico\.png/);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), Buffer.from([137,80,78,71,13,10,26,10]));
  });
  assert.deepEqual(seen, draft);
});

test('servidor limita concorrência e indica falha de processador sem expor detalhes', async () => {
  let begin;
  let finish;
  const entered = new Promise(resolve => { begin = resolve; });
  const pending = new Promise(resolve => { finish = resolve; });
  await withServer(async () => {
    begin();
    await pending;
    return { bytes: Buffer.from('ok'), contentType: 'image/png' };
  }, async address => {
    const first = post(address);
    await entered;
    const second = await post(address);
    assert.equal(second.status, 429);
    finish();
    assert.equal((await first).status, 200);
  });
  await withServer(async () => { throw new Error('Segredo privado de stack'); }, async address => {
    const response = await post(address);
    assert.equal(response.status, 503);
    assert.doesNotMatch(JSON.stringify(await response.json()), /Segredo privado/);
  });
});

test('cliente MCP faz handshake e permite apenas ferramentas descobertas', async () => {
  let buffer = '';
  const calls = [];
  const fakeSpawn = () => {
    const child = new EventEmitter();
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.kill = () => true;
    child.stdin = new Writable({
      write(chunk, _, callback) {
        buffer += chunk.toString();
        for (;;) {
          const lineEnd = buffer.indexOf('\n');
          if (lineEnd < 0) break;
          const request = JSON.parse(buffer.slice(0, lineEnd));
          buffer = buffer.slice(lineEnd + 1);
          calls.push(request.method);
          if (request.id) {
            let result = {};
            if (request.method === 'initialize') result = { protocolVersion: '2025-06-18' };
            if (request.method === 'tools/list') result = { tools: [
              { name: 'new_drawing' }, { name: 'command_line' }, { name: 'inspect_drawing' }, { name: 'save' }
            ] };
            if (request.method === 'tools/call') result = { content: [{ type: 'text', text: '{"ok":true}' }] };
            child.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: request.id, result }) + '\n');
          }
        }
        callback();
      }
    });
    return child;
  };
  const client = new StdioMcpClient({ cwd: '/tmp', spawnImpl: fakeSpawn });
  try {
    await client.initialize();
    await client.tool('command_line', { text: 'rectang 0,0 600,400' });
    await assert.rejects(() => client.tool('script', { text: 'erase all' }), /não autorizada/);
    assert.deepEqual(calls, ['initialize', 'notifications/initialized', 'tools/list', 'tools/call']);
  } finally { client.close(); }
});
