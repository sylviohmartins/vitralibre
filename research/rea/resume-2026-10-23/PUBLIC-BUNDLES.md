# Análise estática de scripts públicos

O run40071201126 concluiu quatro parses reais em 24/10/2026 UTC; URLs exatas foram obtidas previamente no DOM de sessões anônimas autorizadas. `public-bundles.summary.json` é o relatório publicado, extraído do log do job120804812682.

`run-public-bundles.mjs` exige o CLI oficial6.7.0, allowlist literal de quatro URLs, HTTP200/MIME de script, até2MiB por fonte/30s, sem redirecionamentos ou retry. Só analisa texto inerte:sem browser, autenticação, execução dos scripts, importação de chunks ou procura de sourcemaps.

Download e JSON bruto REA ficam em runnerTEMP separado do diretório de upload. Um finally elimina-os; o relatório registra essa limpeza. Somente URLs públicas já observadas, hashes, tamanhos, timestamps, IDs de evidência, estatísticas e categorias limitadas entram no artefato público. Contagens não são bugs, vulnerabilidades ou funcionalidades verificadas.

Após o primeiro run, o workflow foi restringido:pushes comuns analisam apenas código próprio; o passo de terceiros roda em workflow_dispatch ou commit com marcador `[rea-public]`. Isso evita repetir downloads ao atualizar relatórios. Uma nova execução exige necessidade real e fontes legítimas previamente observadas; não ampliar a allowlist para contornar bloqueios.

Escopo limitado:2 scripts Kicatálogo,1 Gopage e1 Stoqui; nenhum painel administrativo ou backend. Grafo Gopage contém referências a módulos/source-map, que não foram buscados. Parte do grafo Stoqui é incompleta. Sem paridade funcional declarada.
