# Gopage — acesso de equipe e permissões

Evidências da exploração autorizada da loja de avaliação VitraLibre,25/10/2026(America/Sao_Paulo). Não é uma auditoria completa de segurança. Nenhuma credencial é registrada. Conta de equipe encontrada já criada após intervenção do usuário; não duplicada pelo agente.

| Verificação | Resultado real | Limite da evidência |
|---|---|---|
| Login pelo link específico da equipe | Sucesso,perfil Funcionário identificado | Uma conta da própria loja,sem teste entre lojas |
| Menu de equipe e assinatura | Ausentes no Funcionário | Ocultação de menu isoladamente não prova autorização |
| URL de gestão de equipe | Redirecionou ao dashboard | Navegação GET pela UI,sem teste de endpoints de escrita |
| URL de assinatura | Redirecionou ao dashboard | Nenhum pagamento,plano ou transação acionado |
| Consulta de produtos | Lista dos10produtos acessível | Não equivale a todas as operações permitidas |
| Edição de produto | Descrição temporária salva e confirmada ao reabrir | Texto original salvo novamente;nenhuma exclusão |
| Consulta de pedidos | Pedido fictício cancelado visível | Nenhuma transição ou novo pedido como Funcionário |
| Consulta de clientes | Dois registros de avaliação visíveis | Exportação pelo Funcionário não acionada |
| Encerramento da sessão Funcionário | Logout voltou à tela da equipe | Não foram testados tokens simultâneos |
| Login do dono após teste | Sucesso,menu Equipe novamente presente | Senha existente usada;nenhuma credencial alterada |

O perfil Funcionário observado tem acesso operacional amplo. Não apareceu seletor de papel na criação; não inferir papéis adicionais. Faturamento,exclusão da loja e equipe são declarados exclusivos do dono,mas somente equipe e assinatura foram verificados por navegação direta. Exclusão da loja não foi acionada.

Ao final da primeira rodada,a conta fictícia permanecia cadastrada e a sessão era do dono. A conta foi posteriormente removida na revisão de revogação descrita abaixo. Vendedores é módulo distinto:formulário exige documento,pendência mantida. Login de cliente,revogação/reativação de funcionário e isolamento entre estabelecimentos continuam não homologados.

## Aplicação futura ao VitraLibre

Converter a observação em requisitos originais:papéis explícitos,permissões de produtos/pedidos/clientes documentadas,autorização no servidor e testes negativos de rotas/operações. Para validar:contas de teste de papéis distintos,sem dados reais,comprovar negação em leitura e escrita e registrar auditoria de edição. Esses são requisitos propostos,não funcionalidades já implementadas ou resultados de teste do VitraLibre.


## Revisão de revogação — 26/10/2026

Somente Remover e Redefinir senha aparecem para o Funcionário. Não foi observada desativação reversível. Remoção não executada;negação de login após revogação continua pendente. Pedido de confirmação no ato preparado para remover exclusivamente a conta fictícia de equipe;credenciais,loja e dados operacionais não alterados nesta revisão.


## Revogação executada — 26/10/2026

Após confirmação específica do usuário,removida exclusivamente a conta fictícia de equipe. Lista recarregada ficou somente com o dono. Tentativa única de login com credenciais antes válidas foi recusada com E-mail e/ou senha inválidos. Conta não recriada;sessão do dono permaneceu autenticada. Resultado supera a pendência de negação de novo login descrita acima. Revogação de sessão simultânea já aberta permanece NÃO testada. A promessa da interface de revogação imediata não é evidência de teste dessa condição.
