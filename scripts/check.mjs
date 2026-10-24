import {readdir,readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const roots=['src','scripts','tests']; let count=0;
for(const root of roots) for(const name of await readdir(root)){if(!/\.(m?js)$/.test(name))continue; const path=`${root}/${name}`; const r=spawnSync(process.execPath,['--check',path],{encoding:'utf8'});if(r.status!==0)throw Error(r.stderr);const source=await readFile(path,'utf8');if(/(?:sk-proj-|ghp_|art_v2_)[A-Za-z0-9_]{12}/.test(source))throw Error(`Credencial em ${path}`);count++;}
console.log(`Lint estrutural: ${count} módulos com sintaxe válida; sem padrões de credenciais.`);
