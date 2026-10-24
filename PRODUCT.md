# VitraLibre

**Sua vitrine. Sua marca. Sua liberdade.**

Plataforma open-source para criação, personalização, gerenciamento e publicação de catálogos digitais interativos, destinada a restaurantes, comércios e outros segmentos.

Registro de contexto durável, preparado manualmente a partir da instrução do usuário, implementação e pesquisa existente em 2026-10-23. Segue a separação entre produto e aparência indicada em [Impeccable Context files](https://impeccable.style/docs/context/). Não é saída de um comando `init` executado pelo harness. Estado operacional e URLs: `STATUS.md`.

## Platform

`web`: editor no navegador e catálogos HTML públicos. Mobile web continua sendo web; não há aplicativo nativo.

## Público e tarefas

Pequeno comerciante e gestor de restaurante precisam criar e atualizar oferta sem operar infraestrutura. Consumidores precisam consultar pelo celular, sem conta, localizar itens e entender preços/opções/disponibilidade. Mantenedores precisam reproduzir e modificar o projeto com contrato de dados claro.

As personas de `specs/personas.md` são hipóteses de trabalho. Perspectivas simuladas podem apontar riscos, mas não substituem entrevistas ou testes com pessoas. Não foram medidos tempo de tarefa, taxa de sucesso ou satisfação de usuários reais.

## Resultado e limites

O núcleo P0 é local e independente de SaaS pago: editar, persistir no navegador, guardar JSON portátil e gerar HTML público independente. Categorias/subcategorias, produtos, preços em centavos BRL, variantes de preço final, disponibilidade manual, fotos, temas, busca e filtros compõem a oferta. Há exemplos fictícios de restaurante e loja com ilustrações próprias.

Não há pedidos reais, checkout, estoque sincronizado, RBAC, conta, colaboração, analytics centralizados ou envio automático a um provedor. Backend é uma evolução opcional, não uma capacidade implícita do modo estático. Publicação requer colocar o arquivo em hospedagem compatível; salvar localmente não atualiza o servidor.

## Contexto de uso

O comerciante pode trabalhar em celular, dispositivo compartilhado ou navegador com quota limitada. Dados locais pertencem à origem/dispositivo e podem ser apagados; backup JSON precisa ser uma ação visível. Catálogo público é consultado sem editor e deve continuar útil com rede limitada; fotos por URL ainda dependem de terceiros. Leitura, teclado e toque são tarefas essenciais.

Acesso gratuito para experimentar não significa operação comercial ilimitada gratuita. Não recomendar GitHub Pages para hospedar negócio/e-commerce; usar documentação e demo fictícia conforme políticas. Nenhuma credencial de hospedagem deve ir para o cliente ou catálogo.

## Terminologia e voz

Usar português do Brasil claro, acolhedor e direto. Ações: “Salvar produto”, “Baixar backup”, “Baixar catálogo HTML”, “Importar backup”, “Endereço publicado”. Explicar a consequência de exclusões/substituições. Mensagem de erro deve dizer o que falhou e a recuperação disponível, sem inventar uma causa.

“Backup JSON” preserva edição; “HTML público” é a página para consumidores; “URL publicada” é o endereço acessível a outras pessoas. Variação tem preço final próprio; disponibilidade não significa estoque em tempo real.

## Compromissos e evidências

Marca, nome e slogan foram definidos pelo usuário. Implementação e identidade são originais; não incorporar código, logotipos, imagens ou textos proprietários dos concorrentes. Pesquisa em `research/competitors/` diferencia observação, documentação, inferência e bloqueio; anúncios não viram funcionalidade testada. Os oito dossiês e baseline são insumos de requisitos, sem pontuação competitiva inventada.

Priorizar integridade/recuperação, legibilidade, compreensão de salvar/exportar/publicar e acessibilidade antes de ornamentação. `specs/requirements.csv` e `specs/acceptance-tests.md` contêm o contrato. Build e testes automáticos são evidência técnica específica; não certificam WCAG nem usabilidade real.

A direção visual reutilizável está em `DESIGN.md`; detalhes de componentes, auditoria e acesso em `docs/design/`. O editor atende ao modo de tarefa/Operate; a vitrine pública combina consulta e exploração. Isso descreve o propósito de cada superfície, sem afirmar geração de arquivos de Live Mode.
