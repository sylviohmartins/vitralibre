import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';
import { JSDOM } from 'jsdom';
import * as core from '../src/core.js';
import * as exportModule from '../src/export.js';
import * as examples from '../src/examples.js';

const nonce = '11111111-2222-3333-4444-555555555555';
const pngBytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9x1S4AAAAASUVORK5CYII=', 'base64');

async function createEditor() {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const source = (await readFile(new URL('../src/app.js', import.meta.url), 'utf8'))
    .replace(/^import .+;\s*$/gm, '');
  const dom = new JSDOM(html, {
    url: 'http://127.0.0.1:8765/editor/',
    runScripts: 'outside-only',
    pretendToBeVisual: true
  });
  const { window } = dom;
  window.localStorage.setItem('vitralibre-v1', core.serializeCatalog(examples.getExample('retail')));
  window.__core = core;
  window.__export = exportModule;
  window.__examples = examples;
  const channels = [];
  window.BroadcastChannel = class {
    constructor(name) { this.name = name; this.closed = false; this.messages = []; channels.push(this); }
    postMessage(message) { this.messages.push(message); }
    close() { this.closed = true; }
  };
  Object.defineProperty(window.crypto, 'randomUUID', { value: () => nonce, configurable: true });
  window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
    this.dispatchEvent(new window.Event('close'));
  };
  window.fetch = async () => ({
    ok: true,
    json: async () => ({ status: 'online', mode: 'local-only' })
  });
  const prelude = `const {validateCatalog,parsePrice,formatPrice,filterProducts,saveCatalog,loadCatalog,deleteCategory,safeImage,serializeCatalog,importCatalog} = window.__core;
    const {exportCatalogHtml} = window.__export;
    const {getExample} = window.__examples;`;
  window.eval(prelude + '\n' + source);
  const edit = window.document.querySelector('[data-action="edit-product"]');
  assert.ok(edit, 'O catálogo de loja precisa de um produto editável');
  edit.click();
  await sleep(15);
  const form = window.document.querySelector('#product-form');
  const link = window.document.querySelector('a[href="/cadcraft/"]');
  assert.ok(form && link, 'O formulário deve descobrir o gerador local');
  link.addEventListener('click', event => event.preventDefault());
  link.click();
  assert.equal(channels.length, 1);
  assert.equal(channels[0].name, 'vitralibre-cadcraft-' + nonce);
  return { dom, form, channel: channels[0] };
}

function createImageMessage(window, data = pngBytes) {
  const bytes = new Uint8Array(data);
  const blob = new window.Blob([bytes], { type: 'image/png' });
  const slice = blob.slice.bind(blob);
  blob.slice = (start, end) => {
    const part = slice(start, end);
    part.arrayBuffer = async () => Uint8Array.from(bytes.subarray(start, end)).buffer;
    return part;
  };
  return { type: 'vitralibre-cadcraft-png', nonce, blob };
}

test('editor de produto recebe imagem CAD, atualiza só a prévia e só persiste após salvar', async () => {
  const { dom, form, channel } = await createEditor();
  try {
    const { window } = dom;
    const before = window.localStorage.getItem('vitralibre-v1');
    assert.equal(form.querySelector('[name="image"]').value.startsWith('data:image/png;base64,'), false);
    await channel.onmessage({ data: createImageMessage(window) });
    const imageValue = form.querySelector('[name="image"]').value;
    assert.match(imageValue, /^data:image\/png;base64,/);
    assert.match(form.querySelector('#image-preview img').src, /^data:image\/png;base64,/);
    assert.equal(window.localStorage.getItem('vitralibre-v1'), before, 'Importação não pode salvar sem confirmação');
    assert.equal(channel.messages[0].type, 'vitralibre-cadcraft-applied');
    assert.equal(channel.closed, true);
    form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    const after = core.importCatalog(window.localStorage.getItem('vitralibre-v1'));
    const product = after.products.find(item => item.id === form.dataset.id);
    assert.equal(product.image, imageValue);
  } finally {
    dom.window.close();
  }
});

test('arquivo inválido ou canal associado a formulário fechado não muda o produto', async () => {
  const first = await createEditor();
  try {
    const { window } = first.dom;
    const before = first.form.querySelector('[name="image"]').value;
    await first.channel.onmessage({ data: createImageMessage(window, Buffer.alloc(40)) });
    assert.equal(first.form.querySelector('[name="image"]').value, before);
    assert.equal(first.channel.messages.length, 0);
    first.form.closest('dialog').close();
    assert.equal(first.channel.closed, true);
    await first.channel.onmessage({ data: createImageMessage(window) });
    assert.equal(first.form.querySelector('[name="image"]').value, before);
  } finally {
    first.dom.window.close();
  }
});
