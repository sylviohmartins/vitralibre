# Fechamento operacional Gopage — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans for inline execution. Preserve the evidence and approval boundaries below; no subagents are required.

**Goal:** Encerrar um conjunto finito e rastreável de verificações de Gopage, distinguindo resultado observado, falha, inconclusão e impedimento;sem alegar exploração universal ou paridade integral.
**Architecture:** Manter58tarefas principais e21filhos diretos de Gopage. Formalizar os casos de terceiro nível no quadro existente,com uma fonte de evidência e um critério por caso;ter um único responsável para cada pendência. Status operacionais não mudam só porque o plano foi criado.
**Tech Stack:** JSON e Markdown no repositório;Python para validar contagem e referências;PDF/Poppler para artefatos locais;Browser/CUA somente quando a condição necessária estiver atendida.
**Spec:** `research/competitors/gopage/fechamento-da-rodada.md`, `remaining-validation.md`, inventário48capacidades e pedido do usuário para fechar1.* com numeração correta.

## Global Constraints

- Preservar58tarefas principais e21filhos diretos;sem reiniciar produto/pesquisa ou renomear IDs existentes.
- Não repetir login ou Aplicar cupom sem nova evidência que altere a condição. Criação do cliente já autorizada;nenhuma nova confirmação da mesma criação.
- Não enviar mensagens,pedidos a destinatários reais,cobranças,alterar credenciais existentes ou aceitar termos/novos acessos sem cumprir a confirmação aplicável.
- Não concluir inexistência de funcionalidade a partir de teste não executado. Não corrigir código do fornecedor nem copiar ativos proprietários.
- Não declarar WCAG,performance,escala,segurança,atualização2h ou paridade integrais por amostra.
- Pesquisa permanece na tarefa1;nenhuma ampliação do VitraLibre e nenhum avanço para Tagme sem tratar o gate de descoberta do usuário.

## Review Focus

- Evidência antiga ≠ sessão atualmente autenticada:todo caso dependente do painel exige sinal positivo atual.
- Prévia ≠ salvamento:criação/edição exige reabertura;arquivo exige parser e inspeção visual quando aplicável.
- Uma falha observada conclui a execução daquele cenário,mas não aprova o comportamento nem explica o backend.
- Inconclusão fica registrada e não vira repetição sem hipótese nova;impedimento fica aberto,com condição de retomada.
- Formalizar casos não é executar testes novos nem promover subtarefas parciais a concluídas por contagem.

## Situação inicial verificável

-58tarefas principais;21filhos diretos;**71 casos de terceiro nível** formalizados a partir dos testes e pendências existentes.
- Estados dos casos: verificado=24, bloqueado=37, divergencia_observada=4, pronto=3, concluido_documental=1, inconclusivo_documentado=2.
- Casos com próxima ação ainda não executada:40;prontos sem login:1.5.3, 1.11.4, 1.21.2. Os demais aguardam as dependências declaradas.
- Esses números descrevem o protocolo;48capacidades do inventário são outra contagem e não devem ser somadas.
- O quadro inicial era19parciais,1documental concluída e1bloqueada. A revisão documental posterior encerrou no recorte1.2,1.6,1.7,1.8,1.9 e1.13;isso não representa novos testes nem paridade integral.

## Arquivos e responsabilidade

| Arquivo | Papel |
|---|---|
| `research/discovery/task-hierarchy.json` | Fonte canônica da árvore,IDs,contagens,casos e estado operacional |
| `research/competitors/gopage/closure-cases.json` | Espelho dos casos para consulta;validar igualdade com a árvore |
| `research/competitors/gopage/operational-2026-10-25.md` | Diário histórico;acrescentar somente evidência efetivamente produzida |
| `STATUS.md` | Resumo atual;separar posição,casos e conclusão |

## Ordem de execução

- [x] Formalizar critérios e registrar dependências sem repetir testes antigos.
- [x] Executar **1.11.4**:renderizar/inspecionar PDF local do orçamento;não depende de login.
- [x] Executar **1.5.3**:comparar fotos Azul/Verde no detalhe público,quando o navegador permitido estiver disponível.
- [x] Executar **1.21.2**:jornada pública contínua de teclado,sem pedido final.
- [x] Rever e encerrar documentalmente os recortes cujos casos já têm evidência suficiente;manter ressalvas sem transformá-las em paridade integral.
- [ ] Retomar casos administrativos somente após sinal positivo atual de login;começar por1.16.2,cuja criação está autorizada.
- [ ] Para cada bloqueio externo,registrar condição ausente e continuar os casos independentes. Não contar bloqueio como concluído.
- [ ] Apresentar fechamento principal:conclusão integral exige todos os casos necessários executados ou decisão explícita do usuário sobre cada limitação não superável. Não declarar tarefa1concluída automaticamente.

## Critérios finitos por subtarefa

Cada caso tem resultado binário de execução:foi observado com evidência,ou não foi. A qualidade do comportamento observado é um campo separado. Critério e dependência exatos constam abaixo.

### 1.1 — Acesso (2 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.1.1 — Cadastro, ativação e login do proprietário | verificado | Encontrar no diário a submissão autorizada, confirmação de email e sinal positivo de sessão do dono. Não exige repetir o login atual para comprovar o teste histórico. | Sem dependência adicional para a evidência registrada. |
| 1.1.2 — Recuperação da conta do proprietário | bloqueado | Identificar fluxo oferecido e validar recuperação somente com caixa de email acessível; mudança de senha deve ser feita pelo usuário. Não enviar solicitação repetidamente. | Caixa de email de teste acessível e intervenção do usuário para qualquer troca de credencial. |

### 1.2 — Categorias (2 casos)

Estado após revisão: **encerrada_no_recorte_com_ressalvas**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.2.1 — Categoria, subcategoria e ordem por ponteiro | verificado | Comprovar criação/reabertura, relação pai-filha e mudança de ordem persistida no painel e no público, com restauração. | Sem dependência adicional para a evidência registrada. |
| 1.2.2 — Arraste por teclado | divergencia_observada | Registrar Space+4setas sem mudança e Escape cancelando; manter ordem original. Encerrar o caso observado sem alegar sucesso do movimento. | Sem dependência adicional para a evidência registrada. |

### 1.3 — Produto e imagem (2 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.3.1 — Produto simples com imagem | verificado | Comprovar produto salvo, reaberto e publicado com imagem própria; distinguir criação de upload apenas em prévia. | Sem dependência adicional para a evidência registrada. |
| 1.3.2 — Exclusão de produto isolado | bloqueado | Preparar um único produto claramente descartável; obter confirmação no ato antes de excluir; conferir ausência no painel e público, preservando os demais produtos. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. Confirmação específica de exclusão irreversível, após apresentar o produto exato. |

### 1.4 — Edição e publicação (3 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.4.1 — Edição e publicação com restauração | verificado | Comprovar edição persistida, efeito público e restauração do valor original no produto de avaliação. | Sem dependência adicional para a evidência registrada. |
| 1.4.2 — Preset de cores e restauração | verificado | Conferir Verde Pinheiro aplicado e Black Piano restaurado por evidência pública, sem assumir contraste integral. | Sem dependência adicional para a evidência registrada. |
| 1.4.3 — Personalização: moeda e ordenação | bloqueado | Ler valores iniciais; alterar uma opção de moeda e uma de ordem oferecidas; salvar, conferir efeito público e restaurar. Não interpretar troca de símbolo como conversão cambial. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. |

### 1.5 — Variantes e estoque (3 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.5.1 — Combinações, preços, estoque e indisponibilidade | verificado | Comprovar quatro combinações de dois atributos; P12,50/estoque3 e M15/estoque0; alternância pública e indisponibilidade da opção zerada. | Sem dependência adicional para a evidência registrada. |
| 1.5.2 — Remover e recriar opção com persistência | bloqueado | Em produto isolado, remover/recriar uma opção, salvar/reabrir e comparar os valores das opções restantes e da recriada. Não apagar variação do produto original. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. Confirmação no ato se houver perda permanente de dados/opção. |
| 1.5.3 — Comparação visual da foto por cor | verificado | Abrir matriz pública; selecionar Azul e Verde com a mesma opção de tamanho; comparar foto principal e fallback. Registrar quais imagens aparecem, sem copiar ativos do fornecedor. | Sem dependência adicional para a evidência registrada. |

### 1.6 — CSV válido e inválido (1 casos)

Estado após revisão: **encerrada_no_recorte**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.6.1 — CSV válido e rejeição por linha | verificado | Comprovar registro importado/reaberto e rejeição de preço negativo com relatório por linha; limites avançados pertencem a1.18. | Sem dependência adicional para a evidência registrada. |

### 1.7 — CSV misto e duplicação (1 casos)

Estado após revisão: **encerrada_no_recorte**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.7.1 — Lote misto e duplicação | verificado | Comprovar um sucesso/um erro no lote misto e criação adicional para SKU repetido e arquivo idêntico; registrar ausência de upsert demonstrado. | Sem dependência adicional para a evidência registrada. |

### 1.8 — PDF por categoria (1 casos)

Estado após revisão: **encerrada_no_recorte**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.8.1 — PDF por categoria | verificado | Comprovar arquivo de uma página renderizado e presença de categoria, produto, preço e imagem. | Sem dependência adicional para a evidência registrada. |

### 1.9 — Clientes (2 casos)

Estado após revisão: **encerrada_no_recorte**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.9.1 — Cadastro e reabertura do cliente | verificado | Comprovar registro salvo/reaberto, vínculo com orçamento e persistência dos dados fictícios; credencial de cliente pertence a1.16. | Sem dependência adicional para a evidência registrada. |
| 1.9.2 — Busca, filtros e exportação de clientes | verificado | Conferir busca positiva/negativa, Ativos, Pendentes vazio e exportação CSV2registros/5colunas; não publicar contatos. | Sem dependência adicional para a evidência registrada. |

### 1.10 — Orçamento em rascunho (2 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.10.1 — Orçamento rascunho de serviço | verificado | Comprovar serviço2×10, total20 e rascunho persistido sem envio de comunicação. | Sem dependência adicional para a evidência registrada. |
| 1.10.2 — Orçamento misto e aritmética decimal persistidos | bloqueado | Preparar novo rascunho:produto CSV7,25×1 mais serviço10×2; confirmar total27,25 antes/depois de salvar e no histórico. Não enviar proposta. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. |

### 1.11 — Reabertura e histórico (4 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.11.1 — Reabertura, histórico e extração de orçamento | verificado | Comprovar ORC-2026-00001, total20, vínculo no histórico do cliente e texto extraído do PDF. Inspeção visual é caso separado. | Sem dependência adicional para a evidência registrada. |
| 1.11.2 — Filtros com orçamento existente | bloqueado | Usar o rascunho existente; testar status correspondente e status sem registro, além de período que inclui/exclui sua data. Conferir o mesmo código; não mudar status para fabricar resultado. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. |
| 1.11.3 — Padrões de numeração e validade | bloqueado | Registrar configuração inicial; salvar uma mudança reversível de validade, conferir a prévia de novo rascunho e restaurar. Não reiniciar a sequência nem enviar alertas. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. |
| 1.11.4 — Inspeção visual do PDF do orçamento | verificado | Renderizar todas as páginas de gopage-quote.pdf; conferir código, tabela2×10/total20, legibilidade e cortes. Não presumir que extração textual comprova layout. | Sem dependência adicional para a evidência registrada. |

### 1.12 — Conteúdo e recomendações (4 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.12.1 — Página institucional e recomendação inicial | verificado | Comprovar Sobre Nós salvo/publicado e recomendação por categoria exercitada no carrinho, seguida de desativação. | Sem dependência adicional para a evidência registrada. |
| 1.12.2 — Guia de medidas e demais editores institucionais | bloqueado | Inspecionar guia/privacidade/termos e prévias com texto de avaliação; verificar salvamento apenas de conteúdo não jurídico de teste, com restauração. Não inventar política legal real. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. |
| 1.12.3 — Calendário sazonal: filtros e detalhe | verificado | Conferir registro dos filtros por segmento/impacto/categoria e abertura de detalhe. Exatidão editorial das datas não foi homologada e permanece ressalva. | Sem dependência adicional para a evidência registrada. |
| 1.12.4 — Conteúdo educacional e Venda Mais | bloqueado | Abrir uma aula e o recurso Venda Mais; verificar reprodução/progresso ou registrar restrição de acesso. Não assistir todo o acervo nem comprar plano. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. |

### 1.13 — Revisão de lacunas (1 casos)

Estado após revisão: **concluida_revisao_documental**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.13.1 — Inventário e lacunas rastreáveis | concluido_documental | Conferir 48 IDs únicos, fonte de evidência para cada linha, limites explícitos e distinção entre documentação, observação e teste. | Sem dependência adicional para a evidência registrada. |

### 1.14 — Cupons, promoções e mínimos (8 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.14.1 — Mínimos e promoção de produto | verificado | Comprovar mínimo150 bloqueando107,25, mínimo3 bloqueando2, promoção100→80 e restauração das configurações. ValidaçõesCPF/pagamento observadas no checkout e exigênciaCPF restaurada também constam do diário. | Sem dependência adicional para a evidência registrada. |
| 1.14.2 — Promoção de categoria e data passada | divergencia_observada | Registrar regra10% criada com data passada que ainda aplicou100→90; documentar que a data não pôde ser relida. Conferir remoção autorizada e restauração100/107,25. | Sem dependência adicional para a evidência registrada. |
| 1.14.3 — Cupom percentual: controle positivo e negativo | inconclusivo_documentado | Preservar resultados já observados:ambos sem feedback/desconto. Não declarar resgate válido, inválido ou consumo do limite. Nova tentativa só com evidência nova de condição relevante. | Sem dependência adicional para a evidência registrada. |
| 1.14.4 — Limite de uso e valor fixo do cupom | bloqueado | Após resgate observável do cupom, verificar um desconto fixo e a fronteira do limite1 em pedidos fictícios autorizados. Sem envio a destinatário real. Não presumir consumo por clicar Aplicar. | Resgate positivo observável, sessão administrativa e fluxo de pedido de teste sem comunicação externa não autorizada. |
| 1.14.5 — Orçamento e ocultação de preços | verificado | Conferir modos salvos/públicos e restauração:carrinho ligado, orçamento desligado, preços visíveis; não enviar solicitação WhatsApp. | Sem dependência adicional para a evidência registrada. |
| 1.14.6 — Desconto PIX e parcelamento exibidos | bloqueado | Ler configuração inicial; testar uma condição PIX e uma de parcelas oferecidas, conferir apresentação pública e restaurar. Não conectar gateway ou efetuar pagamento. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. |
| 1.14.7 — Preço protegido por senha | bloqueado | Preparar configuração sem substituir credencial existente; após confirmação específica, testar senha incorreta/correta e restaurar visibilidade anterior. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. Confirmação no ato para novo acesso ou transferência ao usuário se for troca de senha existente. |
| 1.14.8 — Igualdade dos mínimos | bloqueado | No carrinho local107,25/2unidades, testar mínimo107,25 e mínimo2, conferir liberação na igualdade e restaurar os valores iniciais. Parar antes do pedido final. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. Carrinho de avaliação com esses valores confirmado na sessão usada. |

### 1.15 — Pedidos, status e estoque (4 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.15.1 — Ciclo administrativo e estoque | verificado | Comprovar Aguardando/Preparando/Pago/Concluído/Cancelado no recorte, ciclo3→2→2→3, indicadores1/R$12,50→0/R$0 e estado final Cancelado. | Sem dependência adicional para a evidência registrada. |
| 1.15.2 — Repetição de status pela UI | bloqueado | No pedido fictício, repetir seleção do mesmo status e recarregar; comparar estoque antes/depois, depois restaurar Cancelado/estoque3. Descrever apenas comportamento da UI; não alegar idempotência de API. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. |
| 1.15.3 — Notificações e envio de pedido | bloqueado | Validar envio apenas com destino de teste legítimo expressamente autorizado e verificar recebimento. Não usar contato do proprietário ou terceiros por conveniência. | Destinatário/canal de teste autorizado; atualmente nenhum envio real foi autorizado. |
| 1.15.4 — Concorrência e reserva de estoque | bloqueado | Em sandbox autorizado,duas sessões tentam a última unidade;registrar quantidades aceitas e estoque final. Não testar carga ou corrida em serviço terceiro sem ambiente apropriado. | Sandbox/autorização do fornecedor e duas sessões legítimas. Não há ambiente fornecido. |

### 1.16 — Vendedores, equipe e permissões (6 casos)

Estado após revisão: **bloqueada_por_autenticacao**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.16.1 — Funcionário: acesso, restrições e remoção | verificado | Comprovar consulta/edição/restauração, restrições por navegação a Equipe/Assinatura, remoção autorizada e recusa de novo login. Não abrange sessão simultânea nem outro tenant. | Sem dependência adicional para a evidência registrada. |
| 1.16.2 — Cliente: criar acesso, login e saída | bloqueado | Verificar duplicidade;criar apenas o cliente fictício já autorizado;confirmar persistência, login, dados próprios e saída. Não mudar senha de cliente existente. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. Criação já autorizada; autenticação na sessão de trabalho ainda não confirmada. |
| 1.16.3 — Cliente pendente, aprovação e recuperação | bloqueado | Obter um registro pendente por fluxo legítimo;validar a aprovação e recuperação usando caixa de teste acessível,sem enviar a pessoas reais. Não declarar aprovado um filtro vazio. | Sessão administrativa,fluxo de cadastro permitido e email de teste acessível;eventuais termos/novos acessos exigem confirmação no ato. |
| 1.16.4 — Vendedor e comissão | bloqueado | Com documento de teste legítimo e fornecido,criar vendedor,verificar comissão em um pedido fictício e papel observado. Registrar base e valor;sem cobrança. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. Documento legítimo de teste. Não gerar CPF válido para contornar validação. |
| 1.16.5 — Revogação de sessão de funcionário já aberta | bloqueado | Com nova conta de teste autorizada,manter sessão aberta,remover acesso com confirmação no ato e tentar operação protegida na sessão antiga. Separar isso do novo login já recusado. | Sessão administrativa;confirmação específica de criação/remoção;duas sessões documentadas. Não recriar conta removida sem preparar a ação. |
| 1.16.6 — Isolamento entre lojas | bloqueado | Com duas lojas legítimas autorizadas,comparar acesso aos registros próprios e controles observáveis de troca de loja. Sem adivinhar IDs ou sondar APIs privadas. | Duas lojas/contas de teste acessíveis e autorizadas;nenhuma segunda loja foi fornecida. |

### 1.17 — QR, arte, banners e exportações (3 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.17.1 — QR, PDF com capa, arte e banner | verificado | Comprovar QR decodificado, PDF com capa3páginas/10produtos renderizado, arte e banner inspecionados, upload/exibição390px e ocultação restaurada. | Sem dependência adicional para a evidência registrada. |
| 1.17.2 — PDF de todos os21produtos atuais | bloqueado | Gerar uma exportação Todas com os21registros atuais;conferir presença,preços e todas as páginas renderizadas. Não chamar21itens de teste de grande escala. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. Download do arquivo no ambiente acessível. |
| 1.17.3 — Uma alternativa de modelo de arte e banner | bloqueado | Escolher um modelo visível diferente do já testado para cada gerador;exportar uma vez,conferir dimensões,preço e cortes. Registrar nome do modelo. Não homologar todos os modelos por amostra. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. |

### 1.18 — CSV avançado e variantes (5 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.18.1 — CSV avançado e fronteiras conhecidas | verificado | Comprovar simples/variável/externo, zero/negativo, nome250aceito/252rejeitado, descrição3000aceita/3001rejeitada e lote10 UTF8BOM com vírgula/acentos/multilinha. | Sem dependência adicional para a evidência registrada. |
| 1.18.2 — Encoding alternativo e recuperação | bloqueado | Usar uma única linha original ISO8859-1 com acentos e SKU isolado;observar importação/erro,então corrigir paraUTF8 sem reenvio cego. Registrar efeitos para evitar duplicação. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. |
| 1.18.3 — Imagem acima do limite anunciado | inconclusivo_documentado | Preservar o teste5,89MB que gerou prévia sem salvar. Tamanho efetivamente enviado não observável;não inferir ausência de limite nem repetir o mesmo upload. | Sem dependência adicional para a evidência registrada. |
| 1.18.4 — Modelo CSV e eventual ID externo | bloqueado | Ler o modelo atual;testar ID externo apenas se houver coluna/controle documentado. Se não exposto,registrar não demonstrado no recorte,sem inventar campo nem concluir inexistência universal. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. |
| 1.18.5 — Escala e limite máximo | bloqueado | Executar limite/carga apenas em sandbox e com teto acordado com fornecedor. Conjunto21itens e lote10 não homologam escala nem volume ilimitado. | Ambiente de capacidade/sandbox e limite de teste permitido pelo fornecedor. Não gerar volume massivo no trial. |

### 1.19 — Regras de recomendação e carrinho (3 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.19.1 — Regras de recomendação e preços no carrinho | verificado | Comprovar teto de preço, fallback ligado/desligado, opção sem estoque, fórmula/ordem de margem e recálculo de preço100→90→100 no carrinho. Conferir também calculadora custo120/margem20%→preço150,conforme evidência anterior. | Sem dependência adicional para a evidência registrada. |
| 1.19.2 — Ranking por vendas e desempate | bloqueado | Com dois produtos fictícios,registrar quantidades distintas em pedidos administrativos de teste e observar ordem do fallback;cancelar e restaurar depois. Reportar o caso observado,não todo o algoritmo. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. Sem comunicação automática real;quantidades/valores controlados e restauração verificável. |
| 1.19.3 — Nome antigo no carrinho | divergencia_observada | Preservar nome antigo e preço reconciliado100→90→100 observados no mesmo carrinho. Não confundir nova sessão com a sessão que contém esse carrinho. | Sem dependência adicional para a evidência registrada. |

### 1.20 — Envio, integrações, domínio e métricas (9 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.20.1 — Feed, metadados e superfícies de integração | verificado | Comprovar XML10→21itens e preços; separar telas/limites de plano inspecionados de contas externas não conectadas. Efeito SEO é caso separado. | Sem dependência adicional para a evidência registrada. |
| 1.20.2 — Envio: regra manual e uma cotação | bloqueado | Configurar uma regra manual e uma cotação entre endereços de teste legítimos;conferir efeito no checkout e restaurar. Não conectar serviços ou endereços pessoais sem autorização. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. Endereço de origem/destino de teste válido e integração elegível. |
| 1.20.3 — Pagamento integrado em sandbox | bloqueado | Conectar somente conta sandbox expressamente fornecida e validar retorno de teste documentado. Não efetuar pagamento real ou assinar plano. | Plano elegível e credenciais sandbox do gateway;não disponíveis. |
| 1.20.4 — Analytics e Tag Manager | bloqueado | Com propriedade de teste autorizada,configurar IDs e verificar um evento de página e um evento de produto no destino. Remover configuração de teste ao concluir. | Propriedade/IDs de teste autorizados e acesso de leitura ao destino;não fornecidos. |
| 1.20.5 — Domínio próprio | bloqueado | Com domínio de teste autorizado,verificar validação,publicação e acessoHTTPS;registrar rollback. Não alterarDNS de domínio do usuário sem autorização específica. | Domínio e acessoDNS expressamente autorizados;não fornecidos. |
| 1.20.6 — Integração ERP | bloqueado | Escolher somente um conector realmente exposto e conta sandbox fornecida;sincronizar um produto fictício e verificar resultado. Sem explorar endpoints privados. | Conector elegível,conta sandbox e autorização;não fornecidos. |
| 1.20.7 — Intervalo anunciado de atualização do feed | bloqueado | Registrar instante de uma alteração isolada e da atualização do XML em observações delimitadas;comparar com anúncio de2h. Atualização10→21 não mede o intervalo. | Sessão administrativa e observação temporal instrumentada;nenhum timestamp pareado existe para o teste anterior. |
| 1.20.8 — Metadados SEO públicos | divergencia_observada | Registrar texto persistido no editor e não refletido no público,og:title duplicado e limpeza dos textos. Não declarar causa interna. | Sem dependência adicional para a evidência registrada. |
| 1.20.9 — Estatísticas de lucro | bloqueado | Com um produto de custo conhecido e um pedido fictício,conferir receita,custo e lucro exibidos;cancelar e restaurar. Não extrapolar margem do editor ao painel estatístico. | Sessão administrativa Gopage confirmada. A última verificação retornou login; não repetir sem mudança verificável. |

### 1.21 — Responsividade, acessibilidade e revisão final (5 casos)

Estado após revisão: **parcial_com_bloqueios**.

| Caso | Estado | Critério de encerramento | Condição para executar |
|---|---|---|---|
| 1.21.1 — Amostras de UX e filtros públicos | verificado | Comprovar medições registradas, overflow admin/PDF, descrição3000sem overflow390px, foco/Escape do filtro, contraste amostral21:1 e filtros de atributo/preço. Não equivale a aprovação WCAG. | Sem dependência adicional para a evidência registrada. |
| 1.21.2 — Jornada pública contínua por teclado | divergencia_observada | Partir da raiz:buscar produto,filtrar,abrir detalhe,selecionar variante,adicionar ao carrinho e retornar,registrando foco/nomes/avisos. Não enviar pedido. Remoção de item apenas com recuperação confiável ou confirmação no ato. | Sem dependência adicional para a evidência registrada. |
| 1.21.3 — axe-core e Lighthouse | bloqueado | Com ferramenta permitida e documentada,auditar raiz e detalhe público;salvar versão,configuração e resultados reais. Zero métricas se não executar. | Superfície de auditoria compatível disponível. Não injetar scripts ou usar outro controlador como desvio da política do navegador. |
| 1.21.4 — Leitor de tela | bloqueado | Em leitor de tela disponível,percorrer busca,categorias,produto,variante e carrinho;registrar anúncios e foco. Simulação por agente não é pesquisa humana. | Leitor de tela e superfície de interação compatíveis;não disponíveis no controle atual. |
| 1.21.5 — Rede lenta,preferências de movimento e tema | bloqueado | Com emulação documentada,testar uma conexão lenta e cada preferência;registrar o ambiente. Não confundir preset de cor com tema de sistema. | Capacidades ambientais documentadas de emulação;não expostas na superfície atual. |

## Verificação do protocolo

- Conferir58pais,21filhos,IDs únicos,prefixos corretos e `children_count` igual ao tamanho real de cada lista.
- Conferir que o espelho `closure-cases.json` é idêntico ao achatamento da árvore.
- Conferir que todo caso tem critério,evidência e,quando bloqueado,condição de retomada.
- Conferir que nenhum caso não executado contém data inventada de execução.
- Conferir que o inventário preserva48IDs únicos e6colunas;formalização não criou funcionalidades novas.

## Regra de término e controle de expansão

Nenhum novo caso entra silenciosamente. Descoberta material nova exige aviso com motivo e antes/depois das contagens. Uma nova combinação hipotética não reabre automaticamente um teste já concluído. Falhas do concorrente viram achados/requisitos para VitraLibre;inconclusões ficam explícitas. Casos de escala,API privada,transação real ou ambientes ausentes não são tratados como se executados.

## Resultado desta rodada

34casos com resultado registrado:26verificados,5divergências observadas,2inconclusivos documentados e1documental concluído. Restam37bloqueados;nenhum caso pronto ficou sem execução. Seis dos21filhos foram encerrados estritamente no recorte;os demais15mantêm dependências. Não usar34/71como percentual de funcionalidades homologadas.

-1.11.4:PDF1página/código/total20/tabela2×10/sem corte;tipografia irregular e ausência deRascunho registradas.
-1.5.3:Azul/xícara própria versusVerde/placeholder,tamanhoP.
-1.21.2:fluxo por teclado atéVerde/M,carrinho13 e limpeza;com recuperação explícita de foco,sem aprovação de continuidade integral ouWCAG.

Próxima ação bloqueada:1.16.2 (2/6casos de1.16),somente após autenticação confirmada. Nenhuma nova solicitação de autorização da criação já concedida.
