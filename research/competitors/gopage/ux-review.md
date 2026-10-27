# Revisão de UX — Gopage

Atualizado26/10/2026. Evidência:[diário operacional](operational-2026-10-25.md). Testes por agente com dados de avaliação;nenhuma pesquisa com participantes humanos realizada.

| Observação real | Efeito observado / limite |
|---|---|
| Nome250caracteres sem espaços | Overflow no painel em7larguras e no bloco de PDF;catálogo público sem overflow global no recorte |
| Descrição3000caracteres | Quebra no detalhe390px,sem overflow global medido |
| Busca/ordenação/paginação teclado | Executadas;16+5itens;seleção/paginação devolveu foco ao BODY |
| Painel de filtros390px | Enter abre/fecha;Escape não fecha;botãoX sem nome;foco permanece no botão fora da tela após fechar |
| Campos de faixa de preço | De/Até como texto genérico,sem labels vinculadas nos inputs inspecionados |
| Cards | h1 para cada produto após título Produtos h2;revisão de hierarquia necessária |
| Reordenação | Ponteiro persistiu e ordem restaurada;Space+4setas não moveu no cenário;Escape cancela |
| Contraste | Uma amostra branco/preto21:1;nenhuma aprovação global WCAG |
| Cupom | Código positivo/negativo sem feedback observado;causa indeterminada |
| Promoção de categoria |100→90 e carrinho107,25→97,25;remoção restaurou100/107,25;data passada não impediu efeito no cenário |
| Pedido | Estoque/indicadores reconciliados ao cancelar;sem cobrança real |

axe/Lighthouse,leitor de tela,movimento reduzido,temas,rede lenta e jornada integral não executados. Não confundir alvo44px recomendado com requisito universal;alvos pequenos exigem análise de espaçamento/exceções. Nenhuma nota visual,Core Web Vitals ou benchmark humano atribuídos. Requisitos de melhoria já registrados no diário e proposed-improvements.md;implementação do VitraLibre continua sujeita à descoberta consolidada.


## Ampliação27/10 — filtros e contato públicos

Azul+P manteve matriz;10..10 inclusivo;0..0 retornou2cards;13..10 resultou vazio sem aviso específico observado. Limpar filtros(2) retirou atributos,mas manteve faixa de preço ativa. Melhorias de clareza derivadas:identificar quais filtros a ação limpa e explicar faixa inválida. Não afirmar causa interna do filtro por variantes;ver inferência e valores no diário. Formulário de contato tem4labels vinculadas;requiredfalse nativo não homologa aceitação de envio vazio no servidor. Nenhuma mensagem enviada. Sem nova aprovação deWCAG.
