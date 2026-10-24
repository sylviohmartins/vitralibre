/** @typedef {{id:string,name:string,parentId?:string}} Category */
/** @typedef {{name:string,priceCents:number}} Variant */
/** @typedef {{id:string,name:string,description:string,categoryId:string,priceCents:number,available:boolean,image:string,variants:Variant[]}} Product */
/** @typedef {{version:1,id:string,name:string,description:string,segment:'restaurant'|'retail',theme:'forest'|'terracotta'|'midnight',logo:string,publicUrl:string,categories:Category[],products:Product[]}} Catalog */
/** @typedef {{getItem:(key:string)=>string|null,setItem:(key:string,value:string)=>unknown}} CatalogStorage */

export const STORAGE_KEY = 'vitralibre-v1';
export const BACKUP_KEY = 'vitralibre-v1-backup';
export const MAX_JSON_BYTES = 10 * 1024 * 1024;
const MAX_PRICE = 100_000_000;
const OWN_ASSETS = new Set(['meal.svg','salad.svg','dessert.svg','drink.svg','bag.svg','vase.svg','lamp.svg','chair.svg','logo.svg']);
const fail = (message) => { throw new Error(message); };
const record = (value, label) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(`${label} deve ser um objeto.`);
  return value;
};
const text = (value, label, maximum, required = false) => {
  if (typeof value !== 'string') fail(`${label} deve ser texto.`);
  const clean = value.trim();
  if ((required && !clean) || clean.length > maximum) fail(`${label} deve ter ${required ? 'de 1 a' : 'até'} ${maximum} caracteres.`);
  return clean;
};
const id = (value, label) => {
  const clean = text(value, label, 80, true);
  if (!/^[a-zA-Z0-9_-]+$/.test(clean)) fail(`${label} deve usar letras, números, hífen ou sublinhado.`);
  return clean;
};
const price = (value) => {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0 || value > MAX_PRICE) fail('Preço inválido: use centavos inteiros entre zero e 100.000.000.');
  return value;
};
const list = (value, label, maximum) => {
  if (!Array.isArray(value) || value.length > maximum) fail(`${label} deve ser uma lista de até ${maximum} itens.`);
  return value;
};
const remoteUrl = (value, label) => {
  if (/[\u0000-\u0020\u007f]/.test(value)) fail(`${label} contém espaços ou caracteres inválidos.`);
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || !url.hostname || url.username || url.password) fail(`${label} deve usar endereço http ou https sem senha.`);
  } catch { fail(`${label} deve usar endereço http ou https válido.`); }
  return value;
};

/** Valida uma imagem sem permitir SVG importado, esquemas ativos ou caminhos arbitrários. @param {string} url @returns {string} */
export function safeImage(url) {
  const value = text(url, 'Imagem', 7 * 1024 * 1024);
  if (!value) return '';
  if (/^(?:\.\/|\/)?assets\/[a-z]+\.svg$/.test(value) && OWN_ASSETS.has(value.split('/').pop())) return value;
  if (/^data:image\/(?:png|jpeg|webp|gif);base64,(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value) && value.split(',')[1]) return value;
  return remoteUrl(value, 'Imagem');
}

/** Retorna uma cópia normalizada e remove campos desconhecidos. @param {unknown} input @returns {Catalog} */
export function validateCatalog(input) {
  const value = record(input, 'Catálogo');
  if (value.version !== 1) fail('Versão de catálogo não suportada. Use a versão 1.');
  if (!['restaurant','retail'].includes(value.segment)) fail('Segmento inválido.');
  if (!['forest','terracotta','midnight'].includes(value.theme)) fail('Tema inválido.');
  const categories = list(value.categories, 'Categorias', 200).map((entry) => {
    const item = record(entry, 'Categoria');
    const category = {id:id(item.id,'Identificador da categoria'),name:text(item.name,'Nome da categoria',100,true)};
    if (item.parentId !== undefined && item.parentId !== '') category.parentId = id(item.parentId,'Categoria superior');
    return category;
  });
  const categoryMap = new Map(categories.map(category => [category.id, category]));
  if (categoryMap.size !== categories.length) fail('Existem identificadores de categorias duplicados.');
  for (const category of categories) {
    const visited = new Set([category.id]);
    let parent = category.parentId;
    while (parent) {
      if (visited.has(parent)) fail('As categorias não podem formar ciclos.');
      visited.add(parent);
      const ancestor = categoryMap.get(parent);
      if (!ancestor) fail('Categoria superior não encontrada.');
      parent = ancestor.parentId;
    }
  }
  const products = list(value.products, 'Produtos', 1000).map((entry) => {
    const item = record(entry,'Produto');
    const categoryId = id(item.categoryId,'Categoria do produto');
    if (!categoryMap.has(categoryId)) fail('Categoria do produto não encontrada.');
    if (typeof item.available !== 'boolean') fail('Disponibilidade deve ser verdadeiro ou falso.');
    return {id:id(item.id,'Identificador do produto'),name:text(item.name,'Nome do produto',160,true),description:text(item.description,'Descrição do produto',2000),categoryId,priceCents:price(item.priceCents),available:item.available,image:safeImage(item.image),variants:list(item.variants,'Variações',30).map(entry=>{const variant=record(entry,'Variação');return {name:text(variant.name,'Nome da variação',100,true),priceCents:price(variant.priceCents)};})};
  });
  if (new Set(products.map(product=>product.id)).size !== products.length) fail('Existem identificadores de produtos duplicados.');
  const rawPublicUrl = text(value.publicUrl,'URL pública',2048);
  const publicUrl = rawPublicUrl ? text(new URL(remoteUrl(rawPublicUrl,'URL pública')).href,'URL pública',2048) : '';
  /** @type {Catalog} */
  const normalized = {version:1,id:id(value.id,'Identificador do catálogo'),name:text(value.name,'Nome do catálogo',160,true),description:text(value.description,'Descrição do catálogo',2000),segment:value.segment,theme:value.theme,logo:safeImage(value.logo),publicUrl,categories,products};
  checkSize(JSON.stringify(normalized));
  return normalized;
}

/** Converte preço digitado em centavos; vírgula decimal brasileira e ponto decimal simples são aceitos. @param {string} input */
export function parsePrice(input) {
  if (typeof input !== 'string') fail('Digite um preço válido.');
  const value = input.trim().replace(/^R\$\s*/, '');
  let normalized;
  if (/^\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?$/.test(value)) normalized = value.replaceAll('.','').replace(',','.');
  else if (/^\d+(?:[,\.]\d{1,2})?$/.test(value)) normalized = value.replace(',','.');
  else fail('Preço inválido. Use, por exemplo, 12,50 ou 1.234,56.');
  const [whole, fraction=''] = normalized.split('.');
  return price(Number(whole) * 100 + Number(fraction.padEnd(2,'0')));
}
/** @param {number} cents @returns {string} */
export function formatPrice(cents) { return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(price(cents)/100); }
const fold = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
/** @param {Catalog} catalog @param {{query?:string,categoryId?:string,availableOnly?:boolean}} [options] @returns {Product[]} */
export function filterProducts(catalog, {query='',categoryId='',availableOnly=false}={}) {
  const allowed = new Set(categoryId ? [categoryId] : catalog.categories.map(c=>c.id));
  if (categoryId) {
    let changed = true;
    while(changed) { changed=false; for(const category of catalog.categories) if(category.parentId && allowed.has(category.parentId) && !allowed.has(category.id)) {allowed.add(category.id);changed=true;} }
  }
  const needle = fold(query).trim();
  return catalog.products.filter(product=>(!availableOnly||product.available)&&allowed.has(product.categoryId)&&(!needle||fold(`${product.name} ${product.description}`).includes(needle)));
}
/** @param {Catalog} catalog @param {string} categoryId @returns {Catalog} */
export function deleteCategory(catalog, categoryId) {
  const next = validateCatalog(catalog);
  if (!next.categories.some(c=>c.id===categoryId)) fail('Categoria não encontrada.');
  if (next.categories.some(c=>c.parentId===categoryId)) fail('Mova ou exclua as subcategorias antes de excluir esta categoria.');
  if (next.products.some(p=>p.categoryId===categoryId)) fail('Mova os produtos antes de excluir esta categoria.');
  next.categories=next.categories.filter(c=>c.id!==categoryId);
  return next;
}
/** @param {string} value @returns {string} */
export function escapeHtml(value) { return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
const fitsSize = value => value.length <= MAX_JSON_BYTES && new TextEncoder().encode(value).byteLength <= MAX_JSON_BYTES;
const checkSize = value => {
  if (!fitsSize(value)) fail('O arquivo ultrapassa o limite de 10 MB.');
};
/** @param {Catalog} catalog @returns {string} */
export function serializeCatalog(catalog) {
  const normalized=validateCatalog(catalog);
  const pretty=JSON.stringify(normalized,null,2);
  // A schema-valid catalog must remain downloadable even near the byte limit.
  return fitsSize(pretty) ? pretty : JSON.stringify(normalized);
}
/** @param {string} input @returns {Catalog} */
export function importCatalog(input) {
  if (typeof input!=='string') fail('Selecione um arquivo JSON válido.');
  checkSize(input);
  let value;
  try { value=JSON.parse(input); } catch { fail('Não foi possível ler o JSON. Confira o arquivo e tente novamente.'); }
  return validateCatalog(value);
}
/** @param {CatalogStorage} storage @param {Catalog} catalog @returns {{ok:boolean,error?:string}} */
export function saveCatalog(storage, catalog) {
  try {
    const serialized=serializeCatalog(catalog);
    const previous=storage.getItem(STORAGE_KEY);
    let backup=serialized;
    if(previous) { try {backup=serializeCatalog(importCatalog(previous));}catch {/* Never replace a good backup with broken data. */ backup=storage.getItem(BACKUP_KEY)||serialized;try {importCatalog(backup);}catch {backup=serialized;} } }
    storage.setItem(BACKUP_KEY,backup);
    storage.setItem(STORAGE_KEY,serialized);
    return {ok:true};
  } catch { return {ok:false,error:'Não foi possível salvar neste navegador. O espaço pode estar cheio ou o armazenamento bloqueado. Exporte o JSON para guardar seu trabalho.'}; }
}
/** @param {CatalogStorage} storage @returns {{catalog:Catalog|null,error?:string,recovered?:boolean}} */
export function loadCatalog(storage) {
  try {
    const primary=storage.getItem(STORAGE_KEY);
    if(primary) {try {return {catalog:importCatalog(primary)};}catch {/* Try backup. */}}
    const backup=storage.getItem(BACKUP_KEY);
    if(backup) {try {return {catalog:importCatalog(backup),recovered:true,error:'Os dados principais estavam indisponíveis. Recuperamos a última cópia de segurança válida.'};}catch {/* Report corrupt data without overwriting it. */}}
    let legacyFound=false;
    for (const legacyKey of ['vitrine-aberta-v1','vitrine-aberta-v1-backup']) {
      const legacy=storage.getItem(legacyKey);
      if(legacy) { legacyFound=true;try {return {catalog:importCatalog(legacy),recovered:true,error:'Recuperamos um catálogo da versão anterior. As próximas alterações serão salvas como VitraLibre.'};} catch {/* Try the other legacy copy. */} }
    }
    if(primary||backup||legacyFound) return {catalog:null,error:'Os dados salvos estão inválidos. Importe uma cópia JSON para recuperar seu catálogo.'};
    return {catalog:null};
  } catch {return {catalog:null,error:'O navegador bloqueou a leitura dos dados locais. Você pode continuar e exportar seu catálogo em JSON.'};}
}
