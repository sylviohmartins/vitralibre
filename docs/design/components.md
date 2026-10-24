# Componentes e contratos de interação

Aplicação da disciplina [Impeccable extract](https://impeccable.style/docs/extract/): consolidar padrões usados com a mesma intenção, preservando estados e comportamento. O editor usa HTML/CSS/ESM, sem React nem biblioteca de componentes. Este inventário documenta os reusos existentes e a revisão em andamento; não afirma que um comando `extract` refatorou o código.

| Padrão existente | Uso e variantes | Contrato a preservar |
| --- | --- | --- |
| `.button` | Primário, secundário, texto; criar, salvar, backup, publicar | Rótulo descreve ação; foco visível; desabilitar durante geração sem perder feedback; área de toque alvo de 44 px |
| `.icon-button` | Editar, fechar, remover variante | Nome acessível específico; ícone menor que área clicável; não depender de tooltip/hover |
| Navegação de seções | Catálogo, Aparência, Publicar | Botões comuns com estado atual; teclado Tab/Enter/Espaço; não anunciar tabs sem padrão completo |
| `.product-card` | Imagem, categoria, nome, descrição, preço, disponibilidade | Estado textual além da cor; editar acessível por toque/teclado; preço não truncado; uma coluna mobile na revisão |
| Busca e filtro | Nome/descrição, categoria e disponibilidade | Rótulos, resultado vazio e limpar; acentos normalizados; categoria inclui descendentes |
| Formulários | Produto, categoria, identidade, URL | `label`, limites explícitos, formato de preço, erro e preservação do trabalho válido; variante informa preço final |
| `dialogShell` | Produto e categorias | `dialog` modal com título; fechar/Cancelar; Escape e retorno de foco precisam teste real após reconstruir DOM |
| Preview | Diálogo com iframe do catálogo público | Manter isolamento; conferir público sem conceder acesso ao estado do editor; fechamento sempre alcançável |
| Mensagens | Aviso local, status de salvamento, toast e erro | Distinguir salvo, falha e recuperado; não inferir sucesso pela ausência de erro visual |
| Exportação | JSON, HTML e QR | Explicar a diferença; nomes de arquivo úteis; sem token; URL pública obrigatória para QR/share |
| Tema de catálogo | Floresta, terracota, meia-noite | Mudar só aparência; preservar dados; testar cores de todos os estados no HTML final |

## Extração e tokens

Cores de marca estão em variáveis CSS; `DESIGN.md` registra valores e usos. `.button` reaparece nas várias seções com variantes; `dialogShell` compartilha a estrutura dos diálogos. `icon`, `variantRow` e a renderização de cartões centralizam partes repetidas da interface. Isso é reuso real, sem inventar um pacote UI completo.

Espaçamento, escala de texto e várias cores ainda aparecem como literais. Consolidar somente depois de identificar repetição com a mesma intenção e testar todos os usos, incluindo erro, vazio, disabled e teclado. A aparência parecida não justifica juntar ações semanticamente diferentes. A licença e o runtime do HTML exportado devem continuar presentes e independentes do editor.

## Estados e conteúdo extremo

Conforme [harden](https://impeccable.style/docs/harden/), testar nome de 160 caracteres, descrição longa, emoji, categoria profunda, catálogo vazio, nenhuma correspondência, preço zero, arquivo inválido, imagem indisponível, quota local, outra aba e cancelamento. Estado de falha deve manter uma recuperação que realmente funcione, como backup possível dentro do limite; não oferecer instrução impossível.

Conforme [clarify](https://impeccable.style/docs/clarify/), texto de publicação precisa explicar: salvar é local; baixar JSON é backup; baixar HTML gera página; enviar ao host publica; depois configurar URL e exportar/publicar novamente para que o próprio HTML incorpore o compartilhamento. Os botões devem dizer a ação concreta. Não usar “Publicado” para um arquivo apenas baixado.

## Verificação de mudança visual

Alterar CSS exige conferir os formulários, disponibilidade, preview, categorias, importação/exportação e QR. Não aprovar só a tela inicial. Revisão de estilo não deve trocar centavos por números de ponto flutuante, alterar schema ou remover funcionalidades. Evidências executadas e pendências estão em `ux-audit.md` e `../../STATUS.md`.
