import { readFileSync } from 'node:fs';
const lock = JSON.parse(readFileSync(new URL('./tooling/package-lock.json', import.meta.url), 'utf8'));
const tool = lock.packages['node_modules/rea-agents'];
const integrity = 'sha512-yhIx2ioJYYT1C/tONfYeitC6LhnKmCh+ZwRUOgYuhSc733lGhkkt73zhug9WmLgxoMdKuqIYGCoBfD4fXkOhFw==';
if (tool.version !== '6.7.0' || tool.integrity !== integrity
  || tool.resolved !== 'https://registry.npmjs.org/rea-agents/-/rea-agents-6.7.0.tgz') {
  throw new Error('REA lock não corresponde ao pacote oficial auditado 6.7.0/integrity.');
}
console.log('REA 6.7.0: URL e integridade do lock conferem com o pacote auditado.');
