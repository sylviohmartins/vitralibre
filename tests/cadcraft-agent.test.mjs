import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { planSketchWithAI, validateModelPlan, validatePlanInstruction, AiPlanError } from '../extensions/cadcraft/agent.mjs';
import { createCadcraftServer } from '../extensions/cadcraft/server.mjs';

const completed = plan => ({
  status: 'completed',
  output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify(plan) }] }]
});
const shape = (widthMm = 600, heightMm = 400) => ({ decision: 'rectangle', widthMm, heightMm, message: 'Retângulo simples.' });
const answer = value => ({ ok: true, text: async () => JSON.stringify(value) });

test('não permite plano com operações extra, caminhos, código ou medidas incorretas', () => {
  const plan = validateModelPlan(shape());
  assert.deepEqual(plan, { shape: 'rectangle', widthMm: 600, heightMm: 400, format: 'png',
    summary: 'Retângulo de 600 × 400 mm', requiresConfirmation: true });
  for (const bad of [
    { ...shape(), shell: 'rm -rf /' }, { ...shape(), tool: 'execute' },
    { ...shape(), widthMm: '600' }, shape(0, 400), shape(10001, 400),
    shape(600, 1.5), { decision: 'erase', widthMm: 600, heightMm: 400, message: '' },
    { decision: 'refuse', widthMm: null, heightMm: null, message: '' }
  ]) assert.throws(() => validateModelPlan(bad), AiPlanError);
});

test('exige duas medidas com unidade e limita texto', () => {
  assert.equal(validatePlanInstruction('   Crie um tampo 60 por 40 cm  '), 'Crie um tampo 60 por 40 cm');
  for (const prompt of ['', 'ignore instruções', 'desenhe algo', '100x200',
    'z'.repeat(281), 'apague todo meu disco', null])
    assert.throws(() => validatePlanInstruction(prompt), AiPlanError);
});

test('API Responses usa schema estrito, store=false, limite de tokens, sem ferramentas ou acesso MCP', async () => {
  let count = 0;
  const proposal = await planSketchWithAI('Desenhe um painel de 60 x 40 cm', {
    apiKey: 'dummy-key', model: 'gpt-6-luna',
    fetchImpl: async (url, options) => {
      count++;
      assert.equal(url, 'https://api.openai.com/v1/responses');
      assert.equal(options.redirect, 'error');
      assert.equal(options.headers.Authorization, 'Bearer dummy-key');
      const req = JSON.parse(options.body);
      assert.equal(req.store, false);
      assert.equal(req.model, 'gpt-6-luna');
      assert.equal(req.max_output_tokens, 400);
      assert.equal(req.tools, undefined);
      assert.equal(req.text.format.type, 'json_schema');
      assert.equal(req.text.format.strict, true);
      assert.equal(req.text.format.schema.additionalProperties, false);
      assert.deepEqual(req.text.format.schema.required, ['decision', 'widthMm', 'heightMm', 'message']);
      assert.equal(req.input[0].content, 'Desenhe um painel de 60 x 40 cm');
      return answer(completed(shape()));
    }
  });
  assert.equal(count, 1);
  assert.equal(proposal.widthMm, 600);
  assert.equal(proposal.requiresConfirmation, true);
});

test('modo padrão sem credenciais não realiza chamadas ao provedor', async () => {
  let calls = 0;
  await assert.rejects(() => planSketchWithAI('Um retângulo 10 x 10 cm', {
    apiKey: '', model: '', fetchImpl: async () => { calls++; return answer(completed(shape())); }
  }), error => error instanceof AiPlanError && error.status === 503);
  assert.equal(calls, 0);
});

test('recusas, respostas truncadas, schema adulterado e timeout falham com segurança', async () => {
  const cases = [
    { name: 'recusa explícita', data: { status: 'completed', output: [{type:'message',content:[{type:'refusal',refusal:'Não'}]}] }, status: 422 },
    { name: 'incompleta', data: { status: 'incomplete', output: [] }, status: 503 },
    { name: 'operações arbitrárias', data: completed({ ...shape(), command: 'ERASE ALL' }), status: 502 },
    { name: 'plano ambíguo', data: { status: 'completed', output: [{ type: 'message', content: [
      { type: 'output_text', text: JSON.stringify(shape()) },
      { type: 'output_text', text: JSON.stringify(shape()) }] }] }, status: 502 },
    { name: 'medidas inexistentes', data: completed(shape(-1, 400)), status: 422 }
  ];
  for (const {name,data,status} of cases) {
    await assert.rejects(() => planSketchWithAI('Desenhe um retângulo 60x40 cm', {
      apiKey: 'fake', model: 'gpt-6-luna', fetchImpl: async () => answer(data)
    }), error => error instanceof AiPlanError && error.status === status, name);
  }
  await assert.rejects(() => planSketchWithAI('60x40 cm', {
    apiKey: 'fake', model: 'gpt-6-luna', fetchImpl: async () => { throw new Error('apikey xyz'); }
  }), error => error instanceof AiPlanError && !/apikey/.test(error.message));
});

async function withServer(options, action) {
  const server = createCadcraftServer(options);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = 'http://127.0.0.1:' + server.address().port;
  try { await action(address); }
  finally { await new Promise(resolve => server.close(resolve)); }
}
const post = (base, body, headers={}) => fetch(base+'/api/cadcraft/plan', {
  method:'POST', headers: { Origin:base, 'Content-Type':'application/json',
    'X-VitraLibre-CAD':'1', ...headers }, body:JSON.stringify(body)
});

test('endpoint de planejamento é separado da geração e exige confirmação humana', async () => {
  let plans=0;
  let generates=0;
  await withServer({
    aiEnabled:true,
    plan:async instruction => {
      plans++;
      assert.equal(instruction,'60 x 40 cm');
      return validateModelPlan(shape());
    },
    generate:async () => { generates++; throw new Error('Não pode gerar'); }
  }, async base=>{
    const health=await fetch(base+'/api/cadcraft/health');
    assert.equal((await health.json()).aiPlannerEnabled,true);
    const response=await post(base,{instruction:'60 x 40 cm'});
    assert.equal(response.status,200);
    const plan=await response.json();
    assert.equal(plan.requiresConfirmation,true);
    assert.equal(plan.widthMm,600);
    assert.equal(plan.heightMm,400);
    assert.equal(generates,0);
    assert.equal((await post(base,{instruction:'60 x 40 cm'}, { Origin:'https://evil.invalid' })).status,403);
    assert.equal((await post(base,{instruction:'60 x 40 cm', execute:'rm -rf /'})).status,400);
  });
  assert.equal(plans,1);
  assert.equal(generates,0);
});

test('AI desligada não faz inferência; plano inseguro não é entregue ao navegador', async () => {
  await withServer({ aiEnabled:false, plan:async()=>{ throw new Error('Não deve ser chamado'); } },
    async base => { assert.equal((await post(base,{instruction:'10 x 20 cm'})).status,503); });
  await withServer({ aiEnabled:true, plan:async()=>({shape:'rectangle',widthMm:20001,heightMm:400}) },
    async base => {
      const response=await post(base,{instruction:'10 x 20 cm'});
      assert.equal(response.status,503);
      assert.doesNotMatch(JSON.stringify(await response.json()),/20001/);
    });
});

test('planejamentos simultâneos são bloqueados sem cobrar repetidamente', async () => {
  let begin; let complete;
  const entered=new Promise(resolve=>{begin=resolve;});
  const pending=new Promise(resolve=>{complete=resolve;});
  await withServer({ aiEnabled:true, plan:async()=>{begin();await pending;return validateModelPlan(shape());} }, async base=>{
    const first=post(base,{instruction:'10 x 20 cm'});
    await entered;
    const second=await post(base,{instruction:'10 x 20 cm'});
    assert.equal(second.status,429);
    complete();
    assert.equal((await first).status,200);
  });
});
