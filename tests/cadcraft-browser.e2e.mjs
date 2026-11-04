import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';
import { createCadcraftServer } from '../extensions/cadcraft/server.mjs';
import { getExample } from '../src/examples.js';

test('Chromium real: gerar PNG via CADCraft e aplicar ao produto no VitraLibre', {
  timeout: 150000
}, async () => {
  const root = resolve(process.env.CADCRAFT_ARTIFACTS_DIR || 'cadcraft-browser-evidence');
  await mkdir(root, { recursive: true });
  const server = createCadcraftServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = 'http://127.0.0.1:' + server.address().port;
  let browser;
  try {
    browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
    const context = await browser.newContext({ acceptDownloads: true });
    const page = await context.newPage();
    const browserErrors = [];
    page.on('pageerror', err => browserErrors.push(err.message));
    await page.addInitScript(catalog => {
      localStorage.setItem('vitralibre-v1', JSON.stringify(catalog));
    }, getExample('retail'));
    const response = await page.goto(base + '/editor/', { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await page.locator('[data-action="edit-product"]').first().click();
    const editor = page.locator('#product-form');
    await editor.waitFor();
    const original = await page.evaluate(() => localStorage.getItem('vitralibre-v1'));
    const link = page.locator('a[href="/cadcraft/"]');
    await link.waitFor();
    const [generator] = await Promise.all([
      context.waitForEvent('page'),
      link.click()
    ]);
    await generator.waitForLoadState('networkidle');
    assert.match(generator.url(), /\/cadcraft\/\?import=/, 'Gerador precisa de canal de retorno válido');
    generator.on('pageerror', err => browserErrors.push(err.message));
    await generator.locator('#instruction').fill('Desenhe um painel de 60 x 40 cm');
    await generator.locator('#interpret').click();
    assert.equal(await generator.locator('#width').inputValue(), '600');
    assert.equal(await generator.locator('#height').inputValue(), '400');
    await generator.locator('#generate').click();
    await generator.locator('#result').waitFor({ state: 'visible', timeout: 30000 });
    const preview = generator.locator('#preview');
    await preview.waitFor({ state: 'visible' });
    const dimensions = await preview.evaluate(image => ({ width: image.naturalWidth, height: image.naturalHeight }));
    assert.ok(dimensions.width > 0 && dimensions.height > 0, 'PNG deve ser visível no navegador');
    await generator.screenshot({ path: join(root, 'desenho-gerado-browser.png'), fullPage: true });
    await generator.locator('#apply').click();
    await page.waitForFunction(() => {
      const input = document.querySelector('#product-form [name="image"]');
      return Boolean(input?.value?.startsWith('data:image/png;base64,'));
    }, null, { timeout: 30000 });
    assert.equal(await page.evaluate(previous => localStorage.getItem('vitralibre-v1') === previous, original), true,
      'Transferência deve alterar só a prévia do formulário');
    const formId = await editor.getAttribute('data-id');
    await editor.locator('button[type="submit"]').click();
    const savedImage = await page.evaluate(id => {
      const catalog = JSON.parse(localStorage.getItem('vitralibre-v1'));
      return catalog.products.find(p => p.id === id)?.image;
    }, formId);
    assert.match(savedImage, /^data:image\/png;base64,/);
    await page.screenshot({ path: join(root, 'produto-atualizado-browser.png'), fullPage: true });
    assert.deepEqual(browserErrors, []);
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
});
