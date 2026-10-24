# Retomada prática — VitraLibre

Data efetiva: 24/10/2026 UTC (continuação do ciclo iniciado em 23/10). Browser CUA Chrome, aba 3 exclusiva da pesquisa. Nenhum painel autenticado, conta, pagamento ou envio de pedido. [O] observado; [B] impedimento da sessão; [I] requisito sugerido, ainda não implementado. Capturas visualizadas na conversa, sem exportação de arquivo. Não são capturas REA.

## LIV-01 — LiveMenu / referência Outback

Entrada fornecida na baseline: https://beta.livemenu.app/pt/menu/622b5ad12c906b0011c149ec . O título identificou unidade Outback Shopping Praça da Moça. [O] AX apresentou somente imagem e Notifications; screenshot exibiu loader sobre fundo branco, sem categorias. Uma recarga manteve o estado. [B] Jornadas indisponíveis nesta sessão; causa não determinada. Não classificar como bot, autenticação ou indisponibilidade geral. Query de sessão acrescentada pelo site foi omitida do registro. Não atribuir a aplicação institucional Outback ao LiveMenu.

## GOO-01 — Exemplos oficiais Goomer desatualizados/inacessíveis

Fonte oficial revalidada: https://ajuda.goomer.com.br/goomergo/extras/modelos-de-cardapio . A página liga os exemplos https://goomer.app/bb-bugburger e https://goomer.app/dd-doces . [O] As duas navegações levaram respectivamente a https://bb-bugburger.goomer.app/404 e https://dd-doces.goomer.app/404, com “Não encontramos a página”. O site oferece várias causas possíveis; nenhuma foi tomada como diagnóstico. Não houve tentativas de adivinhar outra rota. [B] Categorias/produtos destas demos não exploráveis. [I] Demo mantida pelo próprio projeto e teste de integridade de links evitam tutorial sem exemplo utilizável.

## STO-01 — Categoria e filtros de variantes executados

Origem: https://www.stoqui.com.br/ , seção de lojas, aponta https://lilo-kids.stoqui.shop/ . É loja real publicamente citada pelo fornecedor, não sandbox controlado pelo pesquisador. Dados pessoais e contatos do rodapé não foram transcritos neste artefato.

[O] Home → categoria Pijamas → https://lilo-kids.stoqui.shop/categoria/135199-pijamas . Página exibiu três produtos: Pedro, Miguel e Melinda. Filtros de estampa e tamanho apresentaram contagens. Clicar checkbox **6 anos (2)** marcou o controle, exibiu Limpar filtros e restringiu a dois produtos (Pedro/Miguel), removendo Melinda da lista. URL final: https://lilo-kids.stoqui.shop/categoria/135199-pijamas?attr_14384=61132 .

[O] Clique Playwright no link de imagem de Pedro excedeu o prazo; após observar a página, foi aberta a URL pública exibida no próprio link, https://lilo-kids.stoqui.shop/produto/972984-pijama-pedro . Não houve troca de browser ou rota privada.

## STO-02 — Seleção combinada, foto e carrinho reversível

[O] Detalhe Pedro: preço promocional R$ 25,99, anterior R$ 30,00, 15 fotos, tamanho e estampa ainda não selecionados; quantidade e Adicionar ao carrinho desabilitados. Selecionar **6 anos** atualizou legenda/URL. Screenshot mostrou estampas incompatíveis riscadas. Selecionar **Rocket** atualizou legenda, URL com variante pública e galeria de 1/15 para 8/15; botão Adicionar ao carrinho tornou-se habilitado. Não se auditou o estoque de todas as combinações.

[O] Adicionar uma unidade → toast de confirmação → Ver carrinho abriu painel com a combinação **6 anos – Rocket**, quantidade 1 e subtotal **R$ 25,99**. Carrinho informou pedido mínimo **R$ 349,99**, faltando **R$ 324,00**, e impediu finalizar. Nenhum CEP, cupom, cadastro ou dado de checkout foi informado; não houve envio ao WhatsApp nem pedido. Remoção pelo controle visual x devolveu estado **Nenhum item no carrinho**, comprovando limpeza do teste.

[O] Botões de estampa tinham nomes; controles de incremento/remoção do carrinho não vieram com nome acessível no AX. [I] Isso fundamenta investigação semântica, não uma conclusão WCAG ou teste por leitor de tela.

[I] Requisitos independentes úteis: preservar categoria/filtro em URL; mostrar contagem e limpar filtros; exigir variantes obrigatórias antes de ação; manter foto e preço coerentes com combinação; transmitir estado esgotado em texto/semântica. Carrinho, pedido mínimo e estoque sincronizado são referências para futuro módulo dinâmico, sem prometer essas capacidades no núcleo estático.

## KIC-01 — Seleção obrigatória e carrinho

Transcrição das observações CUA da mesma sessão, preservadas no histórico. Origem: https://demo2.kicatalogo.com/produto/74 . Busca retornou três itens. A ordenação Menor Preço mudou a sequência de R$39,90/R$39,99, mas o rótulo passou a Ofertas; divergência observada, sem diagnóstico de causa. Adicionar sem variante obrigatória exibiu alerta. Com tamanho M e quantidade2, houve confirmação e carrinho persistiu M/2/totalR$79,98. Um erro transitório de contagem apareceu no badge; detalhes internos foram omitidos. Isso não foi classificado como falha da inclusão, pois a linha do carrinho confirmou o resultado. O item foi removido e estado vazio conferido. Nenhum pedido enviado.

## Rastreabilidade técnica

Quatro URLs exatas de scripts, observadas no DOM de Kicatálogo/Gopage/Stoqui em 24/10 UTC, foram submetidas a REA estático no Actions. Resultado real e limites em `../../rea/resume-2026-10-23/public-bundles.summary.json`. Essa análise não executou scripts nem substitui as observações de interface acima.
