import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { normalizeSketch, createCadcraftServer } from '../extensions/cadcraft/server.mjs';

const square = { widthMm: 600, heightMm: 400, format: 'dxf' };

test('normaliza uma grade parametrizada sem alterar o contrato legado de retângulo', () => {
  assert.deepEqual(normalizeSketch(square), square);
  assert.deepEqual(normalizeSketch({ ...square, verticalDividers: 0, horizontalDividers: 0 }), square);
  assert.deepEqual(normalizeSketch({ widthMm: 1, heightMm: 1, format: 'png' }),
    { widthMm: 1, heightMm: 1, format: 'png' });
  assert.deepEqual(normalizeSketch({ ...square, verticalDividers: 2, horizontalDividers: 1 }),
    { ...square, verticalDividers: 2, horizontalDividers: 1 });
  assert.deepEqual(normalizeSketch({ ...square, verticalDividers: 8, horizontalDividers: 8 }),
    { ...square, verticalDividers: 8, horizontalDividers: 8 });
});

test('rejeita divisórias fracionárias, numerosas, negativas ou com compartimentos estreitos', () => {
  for (const sketch of [
    { ...square, verticalDividers: -1 },
    { ...square, horizontalDividers: 9 },
    { ...square, verticalDividers: '2' },
    { ...square, horizontalDividers: 1.5 },
    { ...square, verticalDividers: true },
    { ...square, verticalDividers: 1, widthMm: 49 },
    { ...square, horizontalDividers: 1, heightMm: 49 },
    { ...square, verticalDividers: 8, widthMm: 224 },
    { ...square, horizontalDividers: 8, heightMm: 224 },
    { ...square, verticalDividers: NaN },
    { ...square, verticalDividers: Infinity }
  ]) assert.throws(() => normalizeSketch(sketch), Error, JSON.stringify(sketch));
});

test('API só envia grade validada ao executor, sem caminhos de arquivo arbitrários', async () => {
  const calls = [];
  const server = createCadcraftServer({
    generate: async sketch => {
      calls.push(sketch);
      return { bytes: Buffer.from('SECTION\nENTITIES'), contentType: 'application/dxf' };
    }
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const root = 'http://127.0.0.1:' + server.address().port;
  async function post(sketch) {
    return fetch(root + '/api/cadcraft/preview', {
      method: 'POST',
      headers: { 'Origin': root, 'Content-Type': 'application/json', 'X-VitraLibre-CAD': '1' },
      body: JSON.stringify(sketch)
    });
  }
  try {
    const good = await post({ ...square, verticalDividers: 2, horizontalDividers: 1 });
    assert.equal(good.status, 200);
    const bad = await post({ ...square, verticalDividers: 9, path: '/etc/passwd' });
    assert.equal(bad.status, 400);
    assert.deepEqual(calls, [{ ...square, verticalDividers: 2, horizontalDividers: 1 }]);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
