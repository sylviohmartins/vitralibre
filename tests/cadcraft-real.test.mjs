import test from 'node:test';
import assert from 'node:assert/strict';
import { generateTechnicalDrawing } from '../extensions/cadcraft/server.mjs';

test('E2E: CADCraft real gera PNG e DXF via MCP', {
  skip: process.env.CADCRAFT_REAL_E2E !== '1' && 'Exige binário CADCraft e opt-in explícito.',
  timeout: 120000
}, async () => {
  const sketch = { widthMm: 600, heightMm: 400 };
  const png = await generateTechnicalDrawing({ ...sketch, format: 'png' });
  assert.equal(png.contentType, 'image/png');
  assert.ok(png.bytes.length > 32);
  assert.equal(png.bytes.toString('ascii', 12, 16), 'IHDR');
  assert.ok(png.bytes.readUInt32BE(16) > 0);
  assert.ok(png.bytes.readUInt32BE(20) > 0);
  const dxf = await generateTechnicalDrawing({ ...sketch, format: 'dxf' });
  assert.equal(dxf.contentType, 'application/dxf');
  assert.match(dxf.bytes.toString('utf8'), /SECTION/);
  assert.match(dxf.bytes.toString('utf8'), /ENTITIES/);
});
