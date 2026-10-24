import {validateCatalog, escapeHtml, MAX_JSON_BYTES} from './core.js';

const PROJECT_LICENSE = `MIT License

Copyright (c) 2026 VitraLibre contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

const PUBLIC_CSS = `
:root{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#173d32;background:#f6f5ef;--accent:#24654b;--panel:#fff;--muted:#576960;--line:#d9e1da}*{box-sizing:border-box}body{margin:0}body[data-theme=terracotta]{--accent:#a64b32;background:#fff6ef;color:#502c24;--muted:#74554b;--line:#e8d4c9}body[data-theme=midnight]{--accent:#a6d7c0;--panel:#20332e;--muted:#bfcec7;--line:#40554b;background:#14251f;color:#edf5ef}button,input,select{font:inherit}button,a,input,select{outline-offset:4px}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid var(--accent)}button{cursor:pointer}header,main,footer{max-width:1140px;margin:auto;padding:28px 24px}header{padding-top:48px}.topline{display:flex;justify-content:space-between;gap:20px;align-items:center}.eyebrow{font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--muted)}h1{font-size:clamp(2rem,6vw,3.8rem);line-height:1.1;margin:18px 0}h2{font-size:1.2rem;margin:0}.description{max-width:650px;color:var(--muted);line-height:1.65;white-space:pre-wrap}.logo{width:72px;height:72px;object-fit:contain;border-radius:16px}.button{border:1px solid var(--line);border-radius:100px;padding:12px 18px;background:var(--panel);color:inherit;text-decoration:none}.filters{display:grid;grid-template-columns:1.6fr 1fr auto;align-items:end;gap:16px;margin-bottom:18px}label{font-size:.9rem;font-weight:600}label input:not([type=checkbox]),label select{display:block;width:100%;margin-top:8px;padding:13px;border:1px solid var(--line);border-radius:12px;background:var(--panel);color:inherit}.check{display:flex;align-items:center;gap:8px;min-height:48px}.count{color:var(--muted);font-size:.9rem;margin:18px 0}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}.product{text-align:left;border:1px solid var(--line);background:var(--panel);color:inherit;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;padding:0}.product:hover{box-shadow:0 10px 30px #00000012;transform:translateY(-2px)}.product img,.placeholder{width:100%;aspect-ratio:4/3;object-fit:cover;background:#e7ede4}.placeholder{display:grid;place-items:center;color:#536759;font-size:3rem}.card-body{padding:20px;width:100%;display:flex;flex-direction:column;gap:10px;flex:1}.category{color:var(--muted);font-size:.75rem;text-transform:uppercase;letter-spacing:.08em}.summary{color:var(--muted);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.price{font-size:1.1rem;color:var(--accent);font-weight:750;margin-top:auto}.badge{font-size:.75rem;background:#ede7d8;color:#594a2e;align-self:flex-start;padding:5px 9px;border-radius:20px}.empty{padding:48px 0;text-align:center;color:var(--muted)}dialog{border:1px solid var(--line);border-radius:24px;padding:28px;background:var(--panel);color:inherit;width:min(560px,calc(100% - 28px));max-height:90vh;overflow:auto}dialog::backdrop{background:#071b13a8}dialog .close{float:right;margin:0 0 18px 16px}dialog img{width:100%;max-height:280px;object-fit:cover;border-radius:14px;margin:12px 0}dialog h2{font-size:1.7rem;clear:both}dialog p{white-space:pre-wrap;line-height:1.6}dialog ul{padding-left:20px}dialog li{padding:7px 0}footer{font-size:.85rem;color:var(--muted);border-top:1px solid var(--line);margin-top:40px}#share-status,.share-feedback{font-size:.9rem;overflow-wrap:anywhere;min-height:1.4em}#share-status a,.share-feedback a{color:inherit} [hidden]{display:none!important}@media(max-width:800px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.filters{grid-template-columns:1fr 1fr}.check{grid-column:1/-1}}@media(max-width:500px){header,main,footer{padding:22px 18px}.grid{grid-template-columns:1fr}.filters{grid-template-columns:1fr}.check{grid-column:auto}.topline{align-items:flex-start}.button{padding:11px 14px}.card-body{padding:18px}}
`;

/** Código independente: não acessa o editor, módulos ou serviços externos. */
function publicRuntime() {
  const catalog = JSON.parse(document.getElementById('catalog-data').textContent);
  const get = (id) => document.getElementById(id);
  const make = (tag, className='', text='') => { const element=document.createElement(tag);if(className)element.className=className;if(text)element.textContent=text;return element; };
  const format = (cents) => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100);
  const fold = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
  const categories = new Map(catalog.categories.map(category=>[category.id,category]));
  const productsById = new Map(catalog.products.map(product=>[product.id,product]));
  document.body.dataset.theme=catalog.theme;
  document.title=catalog.name;
  get('catalog-name').textContent=catalog.name;
  get('catalog-description').textContent=catalog.description;
  get('catalog-segment').textContent=catalog.segment==='restaurant'?'Nosso cardápio':'Nossa coleção';
  if(catalog.logo) { const logo=make('img','logo');logo.src=catalog.logo;logo.alt=`Marca ${catalog.name}`;get('brand').append(logo); }
  for(const category of catalog.categories) {
    let label=category.name; let parent=category.parentId;
    while(parent) {const ancestor=categories.get(parent);label=ancestor.name+' / '+label;parent=ancestor.parentId;}
    const option=make('option','',label);option.value=category.id;get('category').append(option);
  }
  const dialog=/** @type {HTMLDialogElement} */ (get('detail'));
  const search=/** @type {HTMLInputElement} */ (get('search'));
  const categorySelect=/** @type {HTMLSelectElement} */ (get('category'));
  const availableInput=/** @type {HTMLInputElement} */ (get('available'));
  const pageToken=`${Date.now()}-${Math.random()}`;
  let activeProduct='';
  let initialized=false;

  function contextUrl(base) {
    const url=new URL(base);
    const context={q:search.value.trim(),category:categorySelect.value,available:availableInput.checked?'1':'',product:activeProduct};
    for(const [name,value] of Object.entries(context)) {if(value)url.searchParams.set(name,value);else url.searchParams.delete(name);}
    return url;
  }
  function writeLocation(mode, detailFromList=false) {
    try {
      const url=contextUrl(window.location.href);
      if(url.href===window.location.href)return false;
      const state={...(typeof window.history.state==='object'&&window.history.state!==null?window.history.state:{})};
      state.vitraLibreDetail=detailFromList?pageToken:null;
      if(mode==='push')window.history.pushState(state,'',url.href);else window.history.replaceState(state,'',url.href);
      return true;
    } catch {return false;}
  }
  function closeDetail() {
    activeProduct='';
    if(dialog.open)dialog.close();
    try {
      if(window.history.state?.vitraLibreDetail===pageToken) {window.history.back();return;}
    } catch {/* A local preview may disallow History API access. */}
    writeLocation('replace');
  }
  get('close-detail').addEventListener('click',closeDetail);
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeDetail();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDetail();}});
  function detail(product, navigate=true) {
    if(activeProduct===product.id&&dialog.open)return;
    activeProduct=product.id;
    get('detail-title').textContent=product.name;
    const content=get('detail-content');content.replaceChildren();
    if(product.image){const image=make('img');image.src=product.image;image.alt=product.name;content.append(image);}
    content.append(make('p','',product.description),make('p','price',format(product.priceCents)));
    if(!product.available)content.append(make('p','badge','Indisponível no momento'));
    if(product.variants.length) {content.append(make('h3','','Opções e tamanhos'));const list=make('ul');for(const variant of product.variants)list.append(make('li','',`${variant.name} — ${format(variant.priceCents)}`));content.append(list);}
    const shareButton=make('button','button','Compartilhar produto');shareButton.type='button';
    const shareStatus=make('p','share-feedback');shareStatus.setAttribute('role','status');shareStatus.setAttribute('aria-live','polite');
    shareButton.addEventListener('click',()=>shareContext(shareStatus));content.append(shareButton,shareStatus);
    if(!dialog.open)dialog.showModal();
    if(navigate)writeLocation('push',true);
  }
  function render() {
    const query=fold(search.value.trim());const category=categorySelect.value;const available=availableInput.checked;
    const selected=new Set(category?[category]:catalog.categories.map(item=>item.id));
    let changed=true;while(changed){changed=false;for(const item of catalog.categories)if(item.parentId&&selected.has(item.parentId)&&!selected.has(item.id)){selected.add(item.id);changed=true;}}
    const products=catalog.products.filter(item=>(!available||item.available)&&selected.has(item.categoryId)&&(!query||fold(item.name+' '+item.description).includes(query)));
    const grid=get('products');grid.replaceChildren();
    for(const product of products){
      const button=make('button','product');button.type='button';button.setAttribute('aria-label',`${product.name}, ${format(product.priceCents)}. Ver detalhes`);
      if(product.image){const image=make('img');image.src=product.image;image.alt='';image.loading='lazy';image.decoding='async';image.addEventListener('error',()=>image.replaceWith(make('span','placeholder','◇')),{once:true});button.append(image);}else button.append(make('span','placeholder','◇'));
      const body=make('span','card-body');body.append(make('span','category',categories.get(product.categoryId).name),make('h2','',product.name),make('span','summary',product.description));
      if(!product.available)body.append(make('span','badge','Indisponível'));body.append(make('span','price',format(product.priceCents)));button.append(body);button.addEventListener('click',()=>detail(product));grid.append(button);
    }
    get('count').textContent=`${products.length} ${products.length===1?'produto encontrado':'produtos encontrados'}`;
    get('empty').hidden=products.length>0;
  }
  function restoreLocation() {
    let params;
    try {params=new URL(window.location.href).searchParams;}catch {params=new URLSearchParams();}
    const query=params.get('q')||'';
    const category=categories.has(params.get('category'))?params.get('category'):'';
    const available=params.get('available')==='1';
    const changed=!initialized||search.value!==query||categorySelect.value!==category||availableInput.checked!==available;
    search.value=query;categorySelect.value=category;availableInput.checked=available;
    if(changed)render();
    initialized=true;
    const product=productsById.get(params.get('product'));
    if(product)detail(product,false);else {activeProduct='';if(dialog.open)dialog.close();}
  }
  search.addEventListener('input',()=>{render();writeLocation('replace');});
  categorySelect.addEventListener('change',()=>{render();writeLocation('push');});
  availableInput.addEventListener('change',()=>{render();writeLocation('push');});
  window.addEventListener('popstate',restoreLocation);
  async function shareContext(status) {
    status.replaceChildren();
    let shareUrl='';
    try {const base=catalog.publicUrl||window.location.href;if(['http:','https:'].includes(new URL(base).protocol))shareUrl=contextUrl(base).href;}catch {/* Keep local previews local. */}
    if(!shareUrl){status.textContent='Este catálogo ainda não tem uma URL pública configurada. Compartilhe o arquivo HTML recebido.';return;}
    try{if(navigator.share){await navigator.share({title:catalog.name,url:shareUrl});status.textContent='Compartilhamento aberto.';}else if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(shareUrl);status.textContent='Link público copiado.';}else{status.append(make('span','','Link público: '));const link=make('a','',shareUrl);link.href=shareUrl;link.rel='noopener noreferrer';status.append(link);}}
    catch(error){status.textContent=error.name==='AbortError'?'Compartilhamento cancelado.':`Link público: ${shareUrl}`;}
  }
  get('share').addEventListener('click',()=>shareContext(get('share-status')));
  restoreLocation();
}

/** @param {string} svg */
function svgData(svg) {
  if (typeof svg!=='string' || svg.length>1024*1024 || !/<svg[\s>]/i.test(svg)) throw new Error('Ilustração própria inválida.');
  const withoutLocalReferences=svg.replace(/url\(\s*(?:"#[a-zA-Z_][\w:.-]*"|'#[a-zA-Z_][\w:.-]*'|#[a-zA-Z_][\w:.-]*)\s*\)/g,'');
  if (/<(?:script|foreignObject)\b|\bon\w+\s*=|(?:href|src)\s*=\s*["'](?!#)|url\s*\(|@import/i.test(withoutLocalReferences)) throw new Error('Ilustração própria inválida.');
  const bytes=new TextEncoder().encode(svg);
  let binary='';for(const byte of bytes)binary+=String.fromCharCode(byte);
  return 'data:image/svg+xml;base64,'+btoa(binary);
}
/** Cria um documento público autônomo, sem edição. Somente o mapa de ilustrações próprias pode conter SVG. @param {import('./core.js').Catalog} input @param {Record<string,string>} [assets] @returns {string} */
export function exportCatalogHtml(input, assets={}) {
  const catalog=validateCatalog(input);
  const embed=(image)=>{
    if(!/^(?:\.\/|\/)?assets\//.test(image))return image;
    const name=image.split('/').pop();
    const svg=assets[image]??assets[`assets/${name}`]??assets[`/assets/${name}`]??assets[`./assets/${name}`]??assets[name];
    if(!svg)throw new Error(`A ilustração ${name} não foi encontrada. Tente exportar novamente.`);
    return svgData(svg);
  };
  catalog.logo=embed(catalog.logo);for(const product of catalog.products)product.image=embed(product.image);
  const data=JSON.stringify(catalog).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
  if(new TextEncoder().encode(data).byteLength>MAX_JSON_BYTES)throw new Error('O catálogo exportado ultrapassa o limite de 10 MB. Reduza as imagens.');
  return `<!doctype html>
<!--
${PROJECT_LICENSE}
-->
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: https: http:; style-src 'unsafe-inline'; script-src 'nonce-dmEtcHVibGljLXYx'; connect-src 'none'; base-uri 'none'; form-action 'none'; object-src 'none'"><meta name="description" content="${escapeHtml(catalog.description)}"><title>${escapeHtml(catalog.name)}</title><style>${PUBLIC_CSS}</style></head>
<body data-theme="${catalog.theme}"><header><div class="topline"><div id="brand"></div><button type="button" class="button" id="share">Compartilhar catálogo</button></div><p class="eyebrow" id="catalog-segment">Catálogo</p><h1 id="catalog-name">${escapeHtml(catalog.name)}</h1><p class="description" id="catalog-description">${escapeHtml(catalog.description)}</p><p id="share-status" role="status" aria-live="polite"></p></header>
<main><div class="filters"><label for="search">O que você procura?<input id="search" type="search" placeholder="Busque por nome ou descrição"></label><label for="category">Categoria<select id="category"><option value="">Todas as categorias</option></select></label><label class="check"><input id="available" type="checkbox"> Somente disponíveis</label></div><p class="count" id="count" role="status" aria-live="polite"></p><div class="grid" id="products"></div><p class="empty" id="empty" hidden>Nenhum produto encontrado. Tente outra busca ou categoria.</p><noscript>Ative o JavaScript para explorar os produtos deste catálogo.</noscript></main>
<dialog id="detail" aria-labelledby="detail-title"><button class="button close" id="close-detail" type="button" aria-label="Fechar detalhes">Fechar ×</button><h2 id="detail-title"></h2><div id="detail-content"></div></dialog><footer>Criado com VitraLibre · Catálogo independente</footer><script id="catalog-data" type="application/json">${data}</script><script nonce="dmEtcHVibGljLXYx">(${publicRuntime.toString()})();</script></body></html>`;
}
