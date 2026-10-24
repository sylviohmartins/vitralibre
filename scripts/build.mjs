import {mkdir,rm,cp,readFile,writeFile,readdir} from 'node:fs/promises';
import {getExample} from '../src/examples.js';
import {exportCatalogHtml} from '../src/export.js';
import {serializeCatalog} from '../src/core.js';
await mkdir('dist',{recursive:true});for(const entry of await readdir('dist'))await rm(`dist/${entry}`,{recursive:true,force:true});
await cp('index.html','dist/index.html');await cp('LICENSE','dist/LICENSE.txt');await cp('src','dist/src',{recursive:true});await cp('public','dist',{recursive:true});
await mkdir('dist/vendor',{recursive:true});
await cp('node_modules/qrcode-generator/dist/qrcode.js','dist/vendor/qr.js');
await cp('public/vendor/QR-LICENSE.txt','dist/vendor/QR-LICENSE.txt');
const assets={};for(const f of await readdir('public/assets')){const svg=await readFile(`public/assets/${f}`,'utf8'); const value=svg;assets[`/assets/${f}`]=value;assets[`assets/${f}`]=value;assets[`./assets/${f}`]=value;}
for(const segment of ['restaurant','retail']){const catalog=getExample(segment);await writeFile(`dist/${segment}.html`,exportCatalogHtml(catalog,assets));await writeFile(`dist/${segment}.json`,serializeCatalog(catalog));}
await writeFile('dist/_headers',`/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-src 'self' blob:; form-action 'self'\n`);
console.log('Build concluído: editor + 2 catálogos HTML independentes + exemplos JSON + QR local.');
