import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { generateTechnicalDrawing } from '../extensions/cadcraft/server.mjs';
function parseModelSpaceLines(source) {
  const rows = source.split(/\r?\n/);
  let section = null;
  let awaitingSection = false;
  let current = null;
  const entities = [];
  const add = () => { if (current) entities.push(current); current = null; };
  for (let i = 0; i + 1 < rows.length; i += 2) {
    const code = rows[i].trim();
    const value = rows[i + 1].trim();
    if (code === '0' && value === 'SECTION') { add(); awaitingSection = true; section = null; continue; }
    if (awaitingSection && code === '2') { section = value; awaitingSection = false; continue; }
    if (code === '0' && value === 'ENDSEC') { add(); section = null; continue; }
    if (section !== 'ENTITIES') continue; // Dimension block definitions are under BLOCKS, not model space.
    if (code === '0') { add(); current = { type: value, fields: {} }; continue; }
    if (current) current.fields[code] = value;
  }
  return entities.filter(item => item.type === 'LINE').map(item => [
    Number(item.fields['10']), Number(item.fields['20']),
    Number(item.fields['11']), Number(item.fields['21'])
  ]);
}


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
  const modelLines = parseModelSpaceLines(source);
  const sortedLines = modelLines.map(line => line.map(n => Math.round(n * 100) / 100).join(',')).sort();
  assert.deepEqual(sortedLines, ['0,200,600,200', '200,0,200,400', '400,0,400,400'].sort(),
    'Somente as divisórias em model space devem ser verificadas, não as linhas internas dos blocos de cotas.');
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
