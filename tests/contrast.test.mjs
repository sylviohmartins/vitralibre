import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
const luminance=color=>{const c=color.match(/[\d.]+/g).slice(0,3).map(Number).map(x=>{x/=255;return x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4;});return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
test('texto essencial do editor tem contraste AA sobre seu fundo claro',()=>{
 const dom=new JSDOM(`<style>${readFileSync('src/styles.css','utf8')}</style><div class="page-heading"><div><p>Descrição</p></div></div><div class="local-note">Dados locais</div><article class="product-card"><div class="product-body"><span class="product-category">Categoria</span><p>Descrição</p><span class="variant-caption">Variações</span></div></article>`);
 const w=dom.window;for(const selector of ['.product-body>p','.product-category','.variant-caption','.page-heading>div>p','.local-note']){const el=w.document.querySelector(selector);let fg=w.getComputedStyle(el).color;if(fg.startsWith('var('))fg=w.getComputedStyle(w.document.documentElement).getPropertyValue(fg.slice(4,-1)).trim();if(fg.startsWith('#')){const h=fg.slice(1);fg=`rgb(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)})`;}const bg=selector==='.local-note'?'rgb(240,243,232)':selector.includes('page-heading')?'rgb(250,249,245)':'rgb(255,254,251)';const a=luminance(fg),b=luminance(bg);const ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);assert.ok(ratio>=4.5,`${selector}: ${ratio.toFixed(2)}:1, mínimo 4.5:1`);}dom.window.close();
});

function resolvedColor(w,element,property){let value=w.getComputedStyle(element)[property];for(let depth=0;value.startsWith('var(')&&depth<5;depth++)value=w.getComputedStyle(w.document.documentElement).getPropertyValue(value.slice(4,-1)).trim();if(value.startsWith('#')){const hex=value.slice(1);return `rgb(${parseInt(hex.slice(0,2),16)},${parseInt(hex.slice(2,4),16)},${parseInt(hex.slice(4,6),16)})`;}return value;}
for(const [name,markup,selector] of [
 ['filtro de categorias','<label class="select-wrap"><select><option>Todas as categorias</option></select></label>','.select-wrap select'],
 ['status de disponibilidade','<div class="product-image"><span class="product-status"><span></span>Disponível</span></div>','.product-status']
])test(`${name} mantém contraste AA nos temas claro e escuro`,()=>{
 const dom=new JSDOM(`<style>${readFileSync('src/styles.css','utf8')}</style>${markup}`);const w=dom.window;for(const theme of ['light','dark']){w.document.documentElement.dataset.editorScheme=theme;const el=w.document.querySelector(selector);const fg=resolvedColor(w,el,'color'),bg=resolvedColor(w,el,'backgroundColor');const a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);assert.ok(ratio>=4.5,`${selector}/${theme}: ${fg} sobre ${bg}, ${ratio.toFixed(2)}:1`);}dom.window.close();
});
