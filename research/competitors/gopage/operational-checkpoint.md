# Gopage — checkpoint operacional

Atualizado em26/10/2026. Principal **[1/58]**, revisão **[21/21]**, **21 filhos diretos**. Exploração parcial: não é certificação de paridade nem conclusão do fornecedor. Diário: operational-2026-10-25.md. Pendências atuais: remaining-validation.md. O inventário48 registros não equivale a48 recursos homologados.

| Área | Comprovado no recorte | Pendente relevante |
|---|---|---|
| Acesso/equipe | Dono autenticado; Funcionário entrou, editou produto, teve Equipe/Assinatura restritas por navegação; removido e novo login recusado | Sessão simultânea na revogação; isolamento entre lojas; login de cliente; vendedor/comissão exige documento |
| Categorias | Categoria/subcategoria; reordenação por ponteiro persistida e pública; ordem restaurada | Reordenação por teclado e fronteiras |
| Produtos/estoque | Simples, variável4combinações, externo, foto por cor; sem estoque em variação; baixa e reposição por cancelamento | Concorrência, reservas, reconciliação de carrinho; imagem acima4MB inconclusiva |
| Importação | Simples/variável/externo, parcial, duplicidade de SKU/reenvio, preço zero/negativo, nome250/252, descrição3000/3001, lote10 UTF8BOM com campo multilinha | Carga e limites máximos;21 produtos não representam catálogo grande |
| Promoção/carrinho | Produto100→80 e restauração; mínimos monetário/quantidade; orçamento e preços ocultos restaurados | Desconto por categoria10% e recálculo comprovados;regra com data passada surtiu efeito. Regra removida e100/107,25 restaurados;cupom com código/limite não homologados |
| Pedidos/orçamentos/clientes | Orçamento persistido/histórico; pedido fictício Aguardando/Preparando/Pago/Concluído/Cancelado;novo ciclo estoque3→2→2→3 e indicadores restaurados; exportação cliente/orçamento | Concorrência/reserva/requisições duplicadas;aprovação/login cliente; nenhum envio ou pagamento real |
| Exportação/marketing | QR decodificado; PDF categoria/todas/capa3páginas renderizado; arte/banner inspecionados; banner publicado/mobile e ocultado | Nome longo transborda PDF; demais modelos/escala |
| Recomendações | Regra por categoria, limite de preço, fallback, sem estoque, fórmula/ordem relativa de margem; função desligada ao final | Ranking por vendas reais e desempates |
| Integrações | XML ativo inicialmente10 e agora21itens,lote10 e preços conferidos; SEO salvo não refletiu público; telas envio/instrumentação lidas | Refresh do feed, eventos, domínio e cotação real não validados; sem contas externas conectadas |
| UX/acessibilidade | Público/admin medidos; overflow admin e PDF com nome longo; ordenação/paginação teclado16+5; painel390px | Escape/foco/nomes de controles apresentam problemas; arraste teclado4setas sem mudança no recorte;leitor de tela,axe/Lighthouse,rede,temas,movimento reduzido e jornada integral pendentes |

Restauração confirmada26/10:regra10% removida;produto100/carrinho107,25;cupom anterior preservado. Browser novamente acessível. Inventário48IDs reconciliado com o diário,sem equivaler a cobertura integral.

Estado conhecido:21 produtos fictícios;3 categorias raiz e1 filha; pedido cancelado; equipe fictícia removida. Carrinho ligado, orçamento desligado, preços visíveis, login obrigatório desligado, sugestões desligadas, banner oculto, custos de teste vazios. Feed ativo; registro SEO vazio e demais dados fictícios preservados. Nenhuma exclusão adicional.

A pesquisa de Gopage segue prioritária antes de Tagme e antes de ampliar o código do VitraLibre. Não tratar uma integração não conectada ou um caso bloqueado como recurso inexistente. Próxima: principal[1/58] · revisão[21/21], lacunas funcionais de14/21–20/21. Contagem58/21 inalterada.

Fechamento da rodada26/10:ver fechamento-da-rodada.md. Novo acesso de cliente preparado sem senha/submissão;depende de confirmação específica. Nenhum novo pedido criado ou transação financeira executada. Estado final pedidoCancelado/estoque3/indicadores0.
