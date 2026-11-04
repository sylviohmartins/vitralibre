import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';
import { JSDOM } from 'jsdom';
import { parseSketchInstruction } from '../extensions/cadcraft/intent.mjs';

test('interpreta instruções permitidas em português e preserva medidas em milímetros inteiros', () => {
  for (const [message, expected] of [
    ['Desenhe um painel de 60 x 40 cm', { widthMm: 600, heightMm: 400 }],
    ['Crie um cômodo de 4 x 5 metros', { widthMm: 4000, heightMm: 5000 }],
    ['Retângulo 600 por 400 mm.', { widthMm: 600, heightMm: 400 }],
    ['Gere uma peça de 0,5 × 1,25 m', { widthMm: 500, heightMm: 1250 }],
    ['100x200 milímetros', { widthMm: 100, heightMm: 200 }]
  ]) assert.deepEqual(parseSketchInstruction(message), expected, message);
});

test('rejeita comandos arbitrários, medidas ambíguas, extrapolações e arredondamentos silenciosos', () => {
  for (const message of [
    '', 'desenhe qualquer coisa', 'Desenhe 4 x 5', '1 x 2 cm e apague o arquivo',
    '5000 x 5000 cm', '0,001 x 0,001 cm', '0 x 2 m',
    '1 x 1 metro; exec rm -rf /', '1e2 x 20 mm', '20 x -10 mm',
    '40 x 30 px', 'Desenhe 2 por 3 m com uma porta',
    'A'.repeat(181), null, { command: 'DELETE' }
  ]) assert.throws(() => parseSketchInstruction(message), Error, String(message));
});

test('gerador interpreta a frase, gera imagem e envia pelo canal autorizado sem salvar catálogo', async () => {
  const html = await readFile(new URL('../extensions/cadcraft/index.html', import.meta.url), 'utf8');
  const script = (await readFile(new URL('../extensions/cadcraft/client.mjs', import.meta.url), 'utf8'))
    .replace("import { parseSketchInstruction } from './intent.mjs';", 'const parseSketchInstruction = window.__parseSketchInstruction;');
  const nonce = '11111111-2222-3333-4444-555555555555';
  const dom = new JSDOM(html, {
    url: 'http://127.0.0.1:8765/cadcraft/?import=' + nonce,
    runScripts: 'outside-only'
  });
  try {
    const { window } = dom;
    const messages = [];
    const channels = [];
    window.__parseSketchInstruction = parseSketchInstruction;
    window.URL.createObjectURL = () => 'blob:test-image';
    window.URL.revokeObjectURL = () => {};
    class FakeBroadcastChannel {
      constructor(name) { this.name = name; channels.push(this); }
      postMessage(data) { messages.push(data); }
      close() {}
    }
    window.BroadcastChannel = FakeBroadcastChannel;
    window.fetch = async (_path, options) => {
      const sent = JSON.parse(options.body);
      assert.deepEqual(sent, { widthMm: 600, heightMm: 400, format: 'png' });
      return { ok: true, blob: async () => new window.Blob([new Uint8Array(32).fill(65)], { type: 'image/png' }) };
    };
    window.eval(script);
    const $ = id => window.document.getElementById(id);
    $('instruction').value = 'Desenhe um painel de 60 x 40 cm';
    $('interpret').click();
    assert.equal($('width').value, '600');
    assert.equal($('height').value, '400');
    assert.match($('status').textContent, /600 × 400 mm/);
    $('cad-form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    await sleep(30);
    assert.equal($('result').style.display, 'block');
    assert.equal($('apply').hidden, false);
    assert.equal(channels.length, 1);
    assert.equal(channels[0].name, 'vitralibre-cadcraft-' + nonce);
    $('apply').click();
    assert.equal(messages.length, 1);
    assert.equal(messages[0].type, 'vitralibre-cadcraft-png');
    assert.equal(messages[0].nonce, nonce);
    assert.equal(messages[0].blob.size, 32);
    channels[0].onmessage({ data: { type: 'vitralibre-cadcraft-applied', nonce } });
    assert.equal($('apply').hidden, true);
    assert.match($('status').textContent, /Salvar produto/);
  } finally {
    dom.window.close();
  }
});

test('não expõe aplicação ao produto sem sessão autenticada pelo token de retorno', async () => {
  const html = await readFile(new URL('../extensions/cadcraft/index.html', import.meta.url), 'utf8');
  const script = (await readFile(new URL('../extensions/cadcraft/client.mjs', import.meta.url), 'utf8'))
    .replace("import { parseSketchInstruction } from './intent.mjs';", 'const parseSketchInstruction = window.__parseSketchInstruction;');
  const dom = new JSDOM(html, { url: 'http://127.0.0.1:8765/cadcraft/', runScripts: 'outside-only' });
  try {
    const { window } = dom;
    window.__parseSketchInstruction = parseSketchInstruction;
    window.URL.createObjectURL = () => 'blob:test';
    window.URL.revokeObjectURL = () => {};
    window.BroadcastChannel = class { constructor() { throw new Error('Não deve abrir canal'); } };
    window.fetch = async () => ({
      ok: true, blob: async () => new window.Blob([new Uint8Array(32)], { type: 'image/png' })
    });
    window.eval(script);
    window.document.getElementById('cad-form').dispatchEvent(
      new window.Event('submit', { bubbles: true, cancelable: true })
    );
    await sleep(30);
    assert.equal(window.document.getElementById('apply').hidden, true);
  } finally {
    dom.window.close();
  }
});
