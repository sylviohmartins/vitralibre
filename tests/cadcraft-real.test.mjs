import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { generateTechnicalDrawing } from '../extensions/cadcraft/server.mjs';

test('E2E: CADCraft real gera PNG e DXF via MCP', {
  skip: process.env.CADCRAFT_REAL_E2E !== '1' && 'Exige binário CADCraft e opt-in explícito.',
  timeout: 120000
}, async () => {
  const sketch = { widthMm: 600, heightMm: 400 };
  const png = await generateTechnicalDrawing({ ...sketch, format: 'png' });
  assert.equal(png.contentType, 'image/png');
  assert.ok(png.bytes.length > 32);
  assert.ok(png.bytes.length <= 1024 * 1024, 'PNG precisa respeitar limite de imagem do VitraLibre de 1 MiB');
  assert.equal(png.bytes.toString('ascii', 12, 16), 'IHDR');
  assert.ok(png.bytes.readUInt32BE(16) > 0);
  assert.ok(png.bytes.readUInt32BE(20) > 0);
  const dxf = await generateTechnicalDrawing({ ...sketch, format: 'dxf' });
  assert.equal(dxf.contentType, 'application/dxf');
  assert.match(dxf.bytes.toString('utf8'), /SECTION/);
  assert.match(dxf.bytes.toString('utf8'), /ENTITIES/);
  const entitiesText = dxf.bytes.toString('utf8');
  const dimensions = entitiesText.match(/\r?\nDIMENSION\r?\n/g) ?? [];
  assert.ok(dimensions.length >= 2, 'Largura e altura devem ter cotas no DXF exportado');
  if (process.env.CADCRAFT_ARTIFACTS_DIR) {
    const directory = resolve(process.env.CADCRAFT_ARTIFACTS_DIR);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'painel-600x400.png'), png.bytes);
    await writeFile(join(directory, 'painel-600x400.dxf'), dxf.bytes);
  }
});

test('E2E: grade 600 × 400 mm com 2 divisórias verticais e 1 horizontal no CADCraft real', {
  skip: process.env.CADCRAFT_REAL_E2E !== '1' && 'Exige binário CADCraft e opt-in explícito.',
  timeout: 120000
}, async () => {
  const sketch = { widthMm: 600, heightMm: 400, format: 'dxf', verticalDividers: 2, horizontalDividers: 1 };
  const dxf = await generateTechnicalDrawing(sketch);
  assert.equal(dxf.contentType, 'application/dxf');
  const source = dxf.bytes.toString('utf8');
  const rawLines = source.match(/\r?\nLINE\r?\n/g) ?? [];
  assert.equal(rawLines.length, 3, 'Duas divisórias verticais e uma horizontal devem produzir exatamente três LINEs.');
  assert.ok((source.match(/\r?\nDIMENSION\r?\n/g) ?? []).length >= 2);
  const png = await generateTechnicalDrawing({ ...sketch, format: 'png' });
  assert.equal(png.contentType, 'image/png');
  assert.ok(png.bytes.length >= 32 && png.bytes.length < 1024 * 1024);
  if (process.env.CADCRAFT_ARTIFACTS_DIR) {
    const directory = resolve(process.env.CADCRAFT_ARTIFACTS_DIR);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'organizador-2x1.png'), png.bytes);
    await writeFile(join(directory, 'organizador-2x1.dxf'), dxf.bytes);
  }
});
