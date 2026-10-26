# Gopage — lacunas para finalização

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
