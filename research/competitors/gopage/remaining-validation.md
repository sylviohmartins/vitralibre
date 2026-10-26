# Gopage — lacunas para finalização

## Estado atual — revisão de 26/10/2026

Principal **[1/58] — Gopage**, com **21 filhos diretos**. Revisão **[21/21]** em execução. A tabela resume pendências atuais; o histórico abaixo preserva o que foi observado antes e pode conter impedimentos já superados. Nenhuma nova tarefa adicionada.

| Filho | Já comprovado no recorte | Falta validar ou impedimento |
|---|---|---|
| 1.14 · 14/21 | Mínimos, promoção por produto, modo orçamento e ocultação de preços, com restauração | Cupom sem feedback apesar dos controles já tentados; validade, categoria e consumo por uso não homologados |
| 1.15 · 15/21 | Pedido fictício, reabertura, Preparando/Cancelado, baixa/reposição | Pago/Concluído, concorrência e repetição de transições não testados; nenhuma transação financeira real |
| 1.16 · 16/21 | Login Funcionário, edição e consulta, restrição de Equipe/Assinatura por navegação; bloqueio público por login exigido | Remoção e recusa de novo login confirmadas;revogação de sessão simultânea não testada. Vendedor exige documento. Login real de cliente e isolamento entre lojas pendentes |
| 1.17 · 17/21 | QR decodificado, PDF categoria/todas/capa renderizado, clientes/orçamento exportados; upload/exibição/mobile/desativação de banner | PNGs de arte e banner inspecionados;catálogo grande e demais modelos não homologados |
| 1.18 · 18/21 | CSV simples/variável/externo, negativo/zero/misto/repetido, limite de nome e recuperação; duas características, fotos por cor | Limites de imagem/lote, descrição e demais fronteiras não testados |
| 1.19 · 19/21 | Limite de preço, fallback ligado/desligado, variação sem estoque, fórmula após blur e ordem relativa por margem | Ranking por vendas reais e desempates não homologados; nome antigo no carrinho observado |
| 1.20 · 20/21 | XML gerado/lido com 10 produtos; SEO persistido no editor; telas de integrações/envio inspecionadas | SEO público não refletiu teste; refresh do XML, instrumentação, cotação real, domínio e serviços externos não conectados |
| 1.21 · 21/21 | Medições reais de público/admin, busca vazia, trecho de teclado, início/cancelamento de drag, falhas de texto longo | Reordenação persistida, leitor de tela, contraste/axe/Lighthouse, movimento reduzido, temas e condições de rede não homologados |

Estado restaurado conhecido: carrinho ligado, orçamento desligado, preços visíveis, login obrigatório desligado, venda sugestiva desligada, banner oculto, custos de teste vazios. Feed XML permanece ativo, registro SEO vazio e dados fictícios permanecem cadastrados. Não afirmar restauração estrutural de todos os registros nem paridade integral.

Atualização de **[1/58] · [16/21]**:Funcionário fictício removido após confirmação;novo login recusado. Próxima revisão **[21/21]**:demais lacunas independentes. Outras pendências continuam abertas;esta revisão não fecha o fornecedor.


Revisão [1.13/58],25/10/2026. Fechamento documental concluído; exploração integral não concluída. O inventário48 registros não é48 funcionalidades homologadas nem percentual de cobertura. Fonte: diário operacional e inventário atualizado.

Oito subtarefas de detalhamento acrescentadas à lista, dentro do escopo já solicitado. Total principal58 inalterado. Nenhum caso abaixo deve ser dado como aprovado por leitura de rótulo.

| Subtarefa | Verificações pendentes | Condição de execução/limite |
|---|---|---|
|1.14|Cupom no carrinho, validade, promoção por categoria, pedido mínimo e modos orçamento/carrinho|Sem enviar pedido; enforcement após pedido pode exigir simulação autorizada|
|1.15|Pedido administrativo, transições, baixa/reserva de estoque e métricas de venda|Avaliar efeitos antes de criar; sem comunicação/cobrança real; não presumir sandbox|
|1.16|Vendedores, comissão, equipe, login cliente e isolamento por papéis|Novos acessos exigem confirmação no ato; sem senhas publicadas|
|1.17|QR gerado/decodificado, arte/banner, PDF Todas/capa/volume e exportações cliente/orçamento|Usar ativos originais; não publicar contatos ou ativos de terceiros|
|1.18|Demais tipos CSV, zero, reenvio idêntico, fotos por opção, múltiplos atributos, limites e recuperação|Dados fictícios; exclusão irreversível só com confirmação no ato|
|1.19|Recomendação: margem, limite de preço, sem estoque, fallback; reconciliação de carrinho após editar produto|Isolar cenários; restaurar configurações ao concluir|
|1.20|Envio, integrações, domínio, feeds, metadados e instrumentação|Usar sandbox quando existir; planos/contas externas podem limitar; não simular conexão concluída|
|1.21|Responsividade/teclado/acessibilidade, textos longos, imagens ausentes, reordenação/categorias, onboarding e fechamento|Registrar larguras e evidências reais; revisão final da matriz e lacunas residuais|

Próxima tarefa:[1.16/58].1.15 validada no cenário Aguardando→Preparando→Cancelado com baixa/reposição; demais estados/concorrência pendentes em1.21.1.14 executada com mínimos/promoção de produto validados; cupom sem feedback e casos categoria/validade/limite continuam pendentes para revisão1.21. A ordem pode ser adaptada por dependência com justificativa. Permanecem fora de execução autônoma ações que exigem confirmação no ato, transações financeiras e envio não autorizado. Isso é limite de teste, não evidência de inexistência do recurso.

## Atualização hierárquica e casos reais

Principal[1/58] tem21 filhos diretos.17/21 e18/21 indicam posição, não conclusão. Exportação de clientes e download/extração do orçamento executados; capa,banner,volume e inspeção visual do orçamento pendentes.18/21:zero,reenvio idêntico e matriz4combinações executados;externo,fotos por opção,limites e recuperação pendentes.21/21:7larguras do detalhe público medidas;admin mobile não validado porque viewport efetivo permaneceu1680. Não há aprovação WCAG. Próxima:principal[1/58] · filho[18/21]. Nenhum filho adicionado.

Continuação18/21:CSV externo importado e href público confirmado;foto vinculada a azul,persistida,ordem DOM alternou com verde(fallback). Restam limites/recuperação e comparação visual das fotos.9produtos fictícios totais;nenhuma exclusão.

Atualização18/21:252caracteres rejeitados com linha/coluna/mensagem;correção para250 no mesmo arquivo importou1/1.19/21:semestoque na combinação azul/M confirmado nas sugestões;função restauradaInativa e ausência pública confirmada. Margem,limitepreço,fallback continuam pendentes. Próxima principal[1/58]·filho[19/21].


Atualização [19/21]: limite de preço confirmado por alternância com produto 200 e carrinho 107,25. Fallback confirmou sugestão ligado e ausência desligado com regra pausada; ranking de mais vendido e margem não homologados. Estados de recomendação e preço restaurados. [20/21]: SEO persistiu no editor, mas metadados públicos não refletiram os textos no recorte observado. Textos limpos; registro SEO vazio permanece. Próxima: principal [1/58] · subtarefa [20/21]. Total 21 filhos, sem acréscimos.


Atualização [20/21]: feed ativado e XML lido com10itens; permanece ativo. Serviços de instrumentação apenas inspecionados, sem IDs/eventos. [21/21]: painel medido em7larguras com overflow comprovado no cenário de nome250caracteres sem espaços; catálogo público sem overflow global em4larguras. Busca vazia confirmada. Próxima: principal[1/58] · filho[21/21], revisão e acessibilidade. Nenhuma nova tarefa.


Atualização [21/21]: busca/abertura de produto e select nativo acionados por teclado; drag iniciado/cancelado com status, sem reordenação persistida. Editar categoria exibiu título Adicionar. Permanecem: jornada integral de teclado, leitores de tela, contraste/axe, reordenação efetiva e pendências de1.14–1.20. Estados parciais adicionados ao task-hierarchy.json;1.13 concluída exclusivamente como revisão documental. Nenhuma homologação integral do fornecedor.

Revisão21/21 de17/21:capa própria1414×2000 carregada e PDF baixado(8544214bytes),headerPDF e3marcadores de página;imagem1414×2000 presente na estrutura. Renderização/inspeção visual e conteúdo completo pendentes. Primeiro envio sem retorno recuperado por reinspeção antes de nova tentativa. Próxima revisão21/21:inspeção PDF/banner17/21.

Revisão21/21 de17/21:PDF com capa validado por parser(3páginas),renderização e inspeção de todas as páginas.10produtos presentes;nome longo transborda bloco no PDF. Banner permanece pendente. Impedimento novo de ambiente:Browser não exposto nesta sessão;continuar testes autenticados requer restabelecer o conector. Não confundir com perda de dados ou falha de login. Contagem58/21 inalterada.

Revisão21/21 de17/21:banners envio/link/salvar/exibição pública/mobile390/desativação executados. Gerador por produto+modelo Simples amarelo baixou PNG848835bytes,dimensões reais1774×600 apesar do nome1920x650;inspeção visual desse arquivo pendente. Exibição restaurada desligada;cadastro preservado. Browser acessível novamente. Próxima revisão21/21:cupom14/21 e acessos16/21.

Revisão14/21:cupom sem feedback mesmo após dados fictícios e Retirada/Dinheiro;pedido não enviado. CPF obrigatório temporariamente desativado para teste e restaurado confirmado.16/21:vendedor exige documento nativamente;cadastro pendente. Conta equipe fictícia preparada apenas nome/email,sem senha/submissão;novo acesso depende de confirmação no ato. Próxima16/21 dentro da principal1/58,21filhos.

Atualização16/21:Funcionário já existente entrou pelo link próprio;leu10produtos,pedido cancelado e2clientes;edição temporária persistiu e texto foi restaurado. URLsEquipe/Assinatura redirecionaram ao dashboard. Logout e login do dono concluídos. team-permissions.md detalha limites. Pendentes vendedor/comissão,logincliente,revogação e isolamento entre lojas. Próxima revisão21/21,dentro da principal1/58,21filhos.

Atualização26/10:14/21 modo orçamento/lista/formulário final sem envio e ocultação de preços testados/restaurados.16/21 login obrigatório bloqueou início,registro público inspecionado sem submissão;exigência restaurada false e10produtos públicos confirmados. Login efetivo de cliente e aprovação/recuperação permanecem pendentes. Próxima revisão21/21.

Atualização19/21:após Tab,custo2/preço5 mostrou60%;custo8/preço8,50 mostrou6%. Ordem das sugestões externo→lote inverteu após margem externa reduzida a1%. Custos vazios e cálculo desligado verificados ao reabrir;venda sugestiva restauradaInativa e seção pública ausente. Leitura antiga0% inconclusiva superada. Próxima revisão21/21.

Atualização16/21:remoção autorizada executada,ausência persistiu após recarga e novo login recusado. Sessão Funcionário preexistente não estava aberta,não testar por inferência. Conta removida e dono autenticado. Próxima revisão21/21.

Atualização17/21:arte e banner anteriormente baixados inspecionados visualmente,sem publicação de ativos. Banner informa a partir de e trunca título;arte mostra preço base sem indicação de variações. Próxima revisão21/21:demais lacunas.
