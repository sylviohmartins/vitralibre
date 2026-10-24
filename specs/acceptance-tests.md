# Critérios e testes de aceitação

Este é o contrato de testes, não um relatório de aprovação. Consulte [STATUS](../STATUS.md), `tests/` e `evidence/` para execuções comprovadas, ambiente e limitações. `npm run verify` reúne lint, checkJs, testes Node e build. Teste DOM simulado não substitui navegador real; scanner automático não certifica WCAG.

| ID | Cenário e resultado exigido | Camada/evidência esperada |
| --- | --- | --- |
| AT-01 | Criar/editar/excluir produto; preço, descrição, variante e disponibilidade aparecem após recarga | Interface real + persistência; testes de contrato/preço |
| AT-02 | Criar categoria e subcategoria; filtro de categoria inclui descendentes; ciclos/referências inexistentes falham | Teste Node de schema/filtro + interface |
| AT-03 | Excluir categoria com produto/filha falha com orientação; categoria vazia pode sair | Teste Node de exclusão + interface |
| AT-04 | `12,50`, `1.234,56` e zero são convertidos a centavos; negativos, decimais ambíguos e infinitos falham | Teste Node de preço e entradas inválidas |
| AT-05 | JSON exportado/importado mantém valores normalizados; campos desconhecidos saem; tamanho >10 MiB é rejeitado antes do parse | Teste Node de roundtrip/limites + arquivo real |
| AT-06 | Importação malformada/versão diferente não substitui catálogo válido; confirmar substituição válida | Interface + teste de schema |
| AT-07 | Imagem raster enviada e ilustração própria aparecem no HTML exportado; URL ativa e SVG data são rejeitados | Node + interface; verificar ausência de referência `assets/` quebrada |
| AT-08 | Mudar entre temas preserva catálogo; busca ignora acentos; limpar filtro restaura resultados | Interface + filtro Node |
| AT-09 | Falha de quota/armazenamento apresenta aviso; principal corrompido recupera backup válido; anterior não é perdido | Testes Node com armazenamento controlado |
| AT-10 | Nome `</script><img src=x onerror=alert(1)>` é dado inerte no HTML; scripts gerados têm sintaxe válida | Teste Node de escape/exportação e inspeção no browser |
| AT-11 | HTML baixado abre isoladamente com conteúdo e busca; imagens locais estão incorporadas; URL externa continua externa | Teste de exportação + abrir arquivo público |
| AT-12 | QR só é gerado com URL http(s) configurada; decodificação aponta para o endereço exato; link compartilhado corresponde | Browser + leitura/decodificação real; biblioteca local |
| AT-13 | Abrir dois demos; nenhuma conta, pedido, pagamento ou chamada automática de publicação é necessária | Browser e inspeção de rede em escopo próprio |
| AT-14 | Larguras 360/390/768/1280/1440 sem conteúdo cortado; teclado alcança ações; modal retorna foco; erros têm nomes claros | Browser real, capturas e revisão manual; axe como complemento |
| AT-15 | Build limpo reproduz editor, dois HTMLs e dois JSONs; arquivos independentes sem credenciais | Instalação limpa, verify, inspeção de artefato e auditoria de dependências |
| AT-16 | Publicar demo e abrir URL em sessão anônima; alterar localmente não altera remoto até nova exportação/deploy | URL confirmada e evidência de publicação |

## Casos adicionais e limites

Testar catálogo sem produtos, busca sem resultado, acentos/emoji, nome longo, imagem sem rede, cancelamento de exclusão/substituição e voltar/avançar do navegador sem perda indevida do catálogo. Para offline, testar somente o HTML já obtido com imagens incorporadas; não registrar como PWA ou cache offline do editor.

Desempenho deve informar ferramenta, dispositivo/rede, versão, cache, tamanho medido e data. Não adotar estimativas como Core Web Vitals medidos. Revisão manual de leitor de tela e teste com participantes permanecem distintos de checagens automáticas.

Um aceite só recebe estado verificado depois de executar o cenário e vincular a evidência. Falhas e bloqueios permanecem registrados mesmo quando outros testes passam. CI remoto requer execução e URL reais; existência de YAML não é execução de pipeline.
