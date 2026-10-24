# Smoke test e impedimento reproduzível

Data de execução: 2026-10-23 UTC. Ferramenta: REA 6.7.0. Alvo: `research/rea/fixture`, aplicação JavaScript original de demonstração com busca, categorias e formatação BRL. Não contém código de concorrentes, credenciais, chamadas externas ou dados pessoais.

## Tentativa estática

A sintaxe veio de `rea analyze-javascript-application --help` e da documentação oficial, não foi inventada.

```bash
rea analyze-javascript-application /workspace/sites/vitrine-aberta/research/rea/fixture --json
```

[O/B] Código de saída 1. `logs/static-smoke.stdout.json` contém `code:capability_unavailable`, `category:unsupported_provider`. Stderr contém progresso real de inventário/leitura. Falhou antes de produzir evidência de análise:

```text
Linux process ownership inspection requires a procps-compatible ps on REA's PATH before launching a child:
ps -axo pid=,ppid=,pgid=,uid=,stat=,command=
fatal library error, lookup self
```

## Diagnóstico e repetição

[O] `/usr/bin/ps` é procps-ng 4.0.4. A chamada idêntica falhou em uma execução e passou em outra; `ps -p <pid Python>` falhou. `os.getpid()` informou 5 enquanto `/proc/self/stat` informou 1647 no mesmo processo. Logs: `ps-diagnosis.json` e `process-namespace-observation.json`.

[I] A diferença entre PID da API e do procfs sugere virtualização/namespace do ambiente incompatível com a checagem de propriedade. Não se provou defeito no REA nem se corrigiu o ambiente. Não se alterou o executável, não se falsificou `ps` e não se desativou o guard de segurança.

[O/B] Uma nova execução do mesmo comando retornou código 1 e a mesma categoria/erro. Resultado em `static-smoke-retry.*`. Após esse diagnóstico não se insistiu em instalar descompiladores nem executar processos de navegador.

## Tentativa MCP com captura HTTP local

[O] `run-har-smoke.py` iniciou servidor HTTP em loopback com porta efêmera, fez GET real via urllib para `fixture/index.js`, recebeu HTTP 200 com 693 bytes, desligou o servidor e registrou HAR 1.2. O arquivo não foi fabricado como se fosse captura de navegador: sua origem é um cliente HTTP Python próprio.

A ferramenta `inspect_web_network_capture` foi descoberta em `tools/list`; seu contrato exige `capture_path` e `format`. A requisição real está em `logs/har-smoke.request.json`; a resposta integral em `logs/har-smoke.response.json`.

[O/B] MCP retornou `isError:true`, `capability_unavailable`, provider `process-ownership`, operação `prepare_owned_process`, com o mesmo erro de `ps`. Não houve análise HAR bem-sucedida. O fixture HAR preserva apenas uma resposta pública da aplicação própria.

Para reproduzir em um Linux com procfs e PIDs consistentes, após instalar a versão fixada:

```bash
python3 research/rea/run-har-smoke.py /caminho/para/node_modules/.bin/rea
```

## Navegador e contratos

[D/O] A versão instalada anuncia `list_browser_targets`, `inspect_web_page`, `analyze_web_bundle` e `capture_browser_scenario` no inventário MCP real. `capture-browser-scenario --help` foi executado. O contrato oficial usa JSON declarativo com `browser`, `start_url` e `actions`, pode capturar DOM/acessibilidade/telas e usa Playwright internamente. Essa existência não prova execução nem compatibilidade com a superfície de navegador do Work.

[B] Nenhuma observação CDP ou cenário foi executado. O navegador autorizado usa Browser/CUA; a skill Browser proíbe substituição por Playwright autônomo ou automação shell. REA via terminal não foi usado como meio de contornar essa restrição. Não houve endpoint CDP exposto/autorizado nesta auditoria. O fallback para concorrentes é navegação permitida e documentação pública, sempre com origem própria da evidência.

## Conclusão verificável

**Instalado e invocado; transporte e inventário MCP funcionam. Smoke de análise bloqueado.** O requisito de utilização analítica REA não foi concluído. Uma futura execução deve primeiro validar `ps`, repetir o smoke e só atribuir achados de concorrentes ao REA quando houver resultado de análise real. Confiança alta nos comandos/resultados registrados; causa ambiental é inferência, confiança média.
