# VitraLibre — retomada REA em 24/10/2026

O nome da pasta preserva a data da tarefa original. Esta retomada começou em **2026-10-24T01:29:03Z**, sem refazer a instalação nem alterar código do produto.

## Resultado novo observado

[O] `ps -axo pid=,ppid=,pgid=,uid=,stat=,command=` retornou 0, sem stderr, na verificação atual. [O] A incompatibilidade entre a API de PID e `/proc/self/stat` continua: `os.getpid()` devolveu 5 e procfs devolveu 449. Registro integral minimizado: `ps-current-diagnosis.json`.

[I/B] Isso não demonstra recuperação do ambiente: o diagnóstico anterior já continha uma chamada `ps` bem-sucedida entre falhas, com a mesma divergência de PIDs. **Nenhum novo smoke REA local foi executado** porque não surgiu evidência suficiente de correção do pré-requisito. Nenhum guard foi alterado, nenhum shim de `ps` foi criado e nenhum navegador foi iniciado por shell.

## Alternativa legítima preparada: GitHub Actions

[D] A documentação oficial REA inclui análise estática em GitHub Actions, sem navegador, sem API key e sem descompilador nativo. A proposta é derivada desse caminho suportado, com isolamento de dependências e lockfile adicional:

- `rea-static-smoke.proposed.yml`: workflow somente manual, Ubuntu 24.04, Node **24.22.1**, permissões `contents: read`, sem credenciais persistidas pelo checkout e sem `pull_request_target`.
- `tooling/package.json` e `tooling/package-lock.json`: REA **6.7.0** e dependências transitivas fixadas pelo npm; não modificam as dependências do aplicativo.
- `verify-tool-pin.mjs`: confirma versão, URL npm e integridade SHA-512 do pacote oficial já auditado.
- `run-static-smoke.mjs`: analisa a fixture original em `research/rea/fixture` e o código próprio em `src`, sem executar os alvos. Preserva stdout, stderr, código de saída, timestamps, digest e limitações. Só aceita como smoke bem-sucedido uma evidência válida com JavaScript efetivamente parseado e zero falhas de parse; não transforma esse resultado em alegação de cobertura completa, segurança ou teste de navegador.
- Upload de artefatos roda inclusive após falha, retendo resultados originais por sete dias. Nenhuma falha é mascarada por `continue-on-error`, `|| true` ou filtro de saída.

[O] O lockfile foi gerado com `npm install --package-lock-only --ignore-scripts --no-audit --no-fund --prefix .../tooling`. Não houve nova instalação/execução do REA nesse passo. URL e integridade correspondem ao pacote auditado na fase anterior.

[O] Verificação local executada: `node --check` nos dois scripts, validação do pin e parse YAML com verificação de gatilho manual/permissões. Resultado: código 0. Evidência em `verification.txt`.

**Estado: proposta pronta; não instalada em `.github/workflows`, não enviada ao GitHub, não disparada e sem resultado de análise Actions.** O responsável pelo repositório pode copiar o YAML proposto para `.github/workflows/rea-static-smoke.yml`, versionar esta pasta e executá-lo manualmente. O checkout deve conter a fixture e o código próprio. Depois, o run/artifact real precisa ser lido para atualizar o status REA; a existência deste YAML não prova execução.

## Confiança e escopo

Confiança alta nos comandos registrados, nos hashes e na ausência de nova análise local. A explicação da falha por namespace/virtualização continua inferida, sem diagnóstico conclusivo do provedor. O suporte oficial de Actions é documental; a compatibilidade concreta deste repositório só será provada por execução real.

Fontes oficiais inspecionadas no checkout REA de commit `0b1af48a3718ae3d2cfd83aa21cd7ca88f3a6629` (licença MIT; autoria morluto):

- <https://github.com/morluto/rea/blob/0b1af48a3718ae3d2cfd83aa21cd7ca88f3a6629/docs/ci-analysis.md>
- <https://github.com/morluto/rea/blob/0b1af48a3718ae3d2cfd83aa21cd7ca88f3a6629/examples/github-actions/rea-analysis.yml>
- <https://github.com/morluto/rea/blob/0b1af48a3718ae3d2cfd83aa21cd7ca88f3a6629/docs/cli.md>
