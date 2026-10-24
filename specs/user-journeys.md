# Jornadas e protocolo de avaliação

As sequências descrevem o comportamento esperado do P0 e servem de roteiro de teste. Não são relato de sessões com clientes. Execuções reais, capturas e resultados ficam em `evidence/` e [STATUS](../STATUS.md). Duração e taxa de sucesso: não medidas neste documento.

## J1 — Montar e preservar a primeira vitrine

Persona: dona de comércio. Pré-condição: navegador com JavaScript e editor servido por HTTP(S).

1. Abrir a aplicação; identificar o aviso de salvamento local.
2. Carregar exemplo de loja; confirmar substituição se já houver trabalho.
3. Editar nome/descrição e cadastrar categoria, subcategoria e produto.
4. Informar preço `129,90`, foto e variação com preço próprio; salvar.
5. Fechar/reabrir a página na mesma origem; conferir os dados.
6. Exportar JSON, importar novamente e comparar conteúdo.

Aceite: catálogo válido permanece após recarga e roundtrip; nenhum tema modifica produtos. Fricções a observar: significado de categoria superior, valor de variação e diferença entre backup e publicação. Se armazenamento estiver bloqueado/cheio, exibir aviso e permitir exportação; não apresentar salvamento como garantido.

## J2 — Atualizar um cardápio e publicar

Persona: gestor de restaurante. Pré-condição: exemplo restaurante e acesso legítimo a uma hospedagem estática.

1. Alterar preço e marcar um prato como indisponível.
2. Usar a prévia; exportar HTML público.
3. Abrir o HTML sem o editor e conferir preço, variante, busca e disponibilidade.
4. Publicar o arquivo conforme `docs/deployment.md`; receber e verificar URL.
5. Configurar essa URL no editor; compartilhar/copiar link e gerar QR.
6. Ler o QR em outro dispositivo e conferir a versão publicada.

Aceite: URL abre o catálogo público correto. Salvar outra mudança no editor não deve sugerir atualização automática do servidor; exportar/substituir é necessário. Não executar pedidos nem enviar mensagens a terceiros durante o teste.

## J3 — Consultar como consumidor

Persona: pessoa em celular. Pré-condição: HTML público publicado com dados fictícios.

1. Abrir por link ou QR sem conta.
2. Pesquisar texto com/sem acento; selecionar categoria que contém subcategoria.
3. Conferir produto, preço, variantes e estado indisponível.
4. Limpar filtro; testar resultado vazio e voltar a encontrar itens.
5. Repetir com teclado e em larguras 360, 390, 768, 1280 e 1440 px.

Aceite: navegação sem perda de conteúdo ou rolagem horizontal involuntária; controles acessíveis por teclado e foco visível. Em rede desligada, o HTML já baixado funciona com imagens incorporadas; imagens por URL podem faltar. Não se promete cache offline do editor ou primeira visita sem rede.

## J4 — Recuperar e rejeitar dados inválidos

Persona: responsável pela manutenção. Pré-condição: backup JSON conhecido e cópia de teste do armazenamento.

1. Tentar importar JSON malformado, versão não suportada e referências inválidas.
2. Confirmar erro útil e preservação do catálogo anterior.
3. Simular corrupção da entrada principal e recarregar com backup válido.
4. Confirmar recuperação e aviso; exportar uma cópia antes de continuar.
5. Tentar excluir categoria em uso ou com filhas; conferir orientação de realocação.

Aceite: nenhum estado inválido substitui silenciosamente o trabalho válido. As simulações devem ocorrer apenas em ambiente de teste.

## Registro de cada execução

Registrar ID da jornada, data/hora, commit/build, navegador/dispositivo, largura, rede, pré-condições, passos realmente executados, tempo medido quando houver, sucesso/falha, fricção, evidência sanitizada e ação. Não converter testes do mantenedor em evidência de usabilidade de usuários finais.
