# Preparação e procedência

Data: 2026-10-23, aproximadamente 22:28–22:32 UTC. Auditoria autorizada pelo prompt mestre, seções 2 e 3.

## Inspeção anterior à execução

[O] O repositório oficial foi aberto via pesquisa web e clonado com `git clone --depth 1 https://github.com/morluto/rea.git`. Commit inspecionado: `0b1af48a3718ae3d2cfd83aa21cd7ca88f3a6629`. Foram lidos `package.json`, licença, `scripts/rea.mjs`, `scripts/prepare.mjs`, `docs/cli.md`, `docs/browser-observation.md` e `docs/browser-scenario-contract.md`.

[O] A URL oficial encaminha ao pacote npm `rea-agents`. `npm view rea-agents version dist.tarball dist.integrity engines scripts --json` informou 6.7.0. Foi baixado com `npm pack rea-agents@6.7.0 --ignore-scripts --json` e descompactado para inspeção. O instalador remoto `install.sh` não foi executado.

[O] O `prepare.mjs` inspecionado verifica source/Husky para instalar hooks de desenvolvimento. Mesmo assim, todos os scripts de instalação foram desabilitados. Dependências de análise, parsers e `playwright-core` constam do pacote; ter a dependência não autoriza controle do navegador.

## Instalação efetiva

Diretório temporário usado: `/workspace/scratch/5807a3cd216e/rea-audit/`.

```bash
npm install --prefix ./installed --ignore-scripts --no-audit --no-fund --save-exact ./rea-agents-6.7.0.tgz
./installed/node_modules/.bin/rea --version
./installed/node_modules/.bin/rea --help
```

[O] npm terminou com código 0 e `added 174 packages in 15s`. A CLI informou `6.7.0`. O lockfile foi preservado como `tooling-package-lock.json`; dados de integridade e ambiente em `environment.json`. Warnings: configuração de proxy desconhecida pelo npm e depreciação de `prebuild-install`; não foram suprimidos nos logs.

[O] O processo já roda com UID 0 no container. Não se pediu elevação e não se usou sudo. A instalação ficou no diretório temporário; nenhuma configuração global de agente foi alterada.

**Divergência observada:** main e tarball declaram a mesma versão 6.7.0, mas `engines` no main é mais recente que no tarball (`^24.22.1` no main versus `^24.11.0` no pacote). A execução auditada usa o tarball exato, cuja integridade SHA-512 confere com npm e cujo requisito é satisfeito pelo Node v24.19.0. Não se declara equivalência entre checkout e pacote.

## Setup e MCP

[O/B] Sintaxe obtida por `rea setup --help`. `rea setup --client codex --dry-run --json` falhou antes de produzir plano, na checagem de `ps`. Por isso não se aplicou setup nem se declara REA registrado na UI do Work. CLI/MCP foram chamados diretamente no processo local autorizado.

[O] Foi iniciado `rea mcp` via stdio; cliente JSON-RPC próprio enviou `initialize`, `notifications/initialized`, `tools/list` e uma chamada `tools/call`. Esses são testes do transporte MCP, sem navegador. `logs/mcp-initialize.json`, `logs/mcp-tools-list.json.gz` e `logs/mcp-tools-summary.json` comprovam as respostas.

[O/B] `rea mcp doctor --json` retornou 207/207 ferramentas e 6/6 prompts, mas `healthy:false`, identidade incompleta e falha no teste `binary_session`. Não há conexão MCP persistente adicionada ao Work.

## Fontes oficiais

- <https://github.com/morluto/rea>
- <https://rea.tools/>
- <https://github.com/morluto/rea/blob/0b1af48a3718ae3d2cfd83aa21cd7ca88f3a6629/docs/cli.md>
- <https://github.com/morluto/rea/blob/0b1af48a3718ae3d2cfd83aa21cd7ca88f3a6629/docs/browser-observation.md>
- <https://github.com/morluto/rea/blob/0b1af48a3718ae3d2cfd83aa21cd7ca88f3a6629/docs/browser-scenario-contract.md>
