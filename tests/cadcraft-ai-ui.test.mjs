import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const setup = async aiEnabled => {
  const html = await readFile(new URL('../extensions/cadcraft/index.html', import.meta.url), 'utf8');
  const source = (await readFile(new URL('../extensions/cadcraft/client.mjs', import.meta.url), 'utf8'))
    .replace("import { parseSketchInstruction } from './intent.mjs';", 'const parseSketchInstruction = window.__parseSketchInstruction;');
  const { parseSketchInstruction } = await import('../extensions/cadcraft/intent.mjs');
  const dom = new JSDOM(html, {
    url:'http://127.0.0.1:8765/cadcraft/',
    runScripts:'outside-only',
    pretendToBeVisual:true
  });
  const { window } = dom;
  const calls=[];
  window.__parseSketchInstruction = parseSketchInstruction;
  window.BroadcastChannel = undefined;
  window.fetch = async (path, options) => {
    calls.push({path, options});
    if(path==='/api/cadcraft/health') return {
      ok:true, json:async()=>({mode:'local-only',aiPlannerEnabled:aiEnabled})
    };
    if(path==='/api/cadcraft/plan') return {
      ok:true, json:async()=>({shape:'rectangle',widthMm:600,heightMm:400,requiresConfirmation:true})
    };
    throw new Error('A execução CAD não deve ocorrer automaticamente');
  };
  window.eval(source);
  await new Promise(resolve=>setTimeout(resolve,20));
  return {dom,calls,doc:window.document};
};

test('botão generativo só aparece quando modelo e segredo estão configurados no servidor',async()=>{
  const off=await setup(false);
  try{
    assert.equal(off.doc.getElementById('plan-ai').hidden,true);
    assert.equal(off.calls.filter(x=>x.path==='/api/cadcraft/plan').length,0);
  }finally{off.dom.window.close();}
  const on=await setup(true);
  try{
    assert.equal(on.doc.getElementById('plan-ai').hidden,false);
    assert.equal(on.calls.filter(x=>x.path==='/api/cadcraft/plan').length,0);
  }finally{on.dom.window.close();}
});

test('planejador IA altera apenas campos e não executa CAD antes do clique em Gerar',async()=>{
  const env=await setup(true);
  try{
    const {doc,calls}=env;
    doc.getElementById('instruction').value='Desenhe um painel de 60 x 40 cm';
    doc.getElementById('width').value='30';
    doc.getElementById('height').value='20';
    doc.getElementById('plan-ai').click();
    await new Promise(resolve=>setTimeout(resolve,25));
    assert.equal(doc.getElementById('width').value,'600');
    assert.equal(doc.getElementById('height').value,'400');
    assert.match(doc.getElementById('status').textContent,/Nenhum desenho foi executado/);
    assert.equal(calls.filter(x=>x.path==='/api/cadcraft/plan').length,1);
    assert.equal(calls.filter(x=>x.path==='/api/cadcraft/preview').length,0);
  }finally{env.dom.window.close();}
});
