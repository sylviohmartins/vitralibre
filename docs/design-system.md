# Design system — VitraLibre

**Sua vitrine. Sua marca. Sua liberdade.** Identidade original com verde floresta, fundo creme e detalhe cítrico. Sidebar organiza o trabalho; o catálogo ocupa o centro, e formulários aparecem em painéis ou diálogos. Ilustrações SVG próprias representam comida e objetos; não há assets visuais de concorrentes.

A fonte da interface é a pilha `Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`. Inter é usada apenas se disponível localmente; não é baixada de serviço externo. Georgia aparece em detalhes de marca/prévia. Não distribuir uma fonte externa sem avaliar sua licença.

## Tokens implementados

Valores do editor em `src/styles.css`; o catálogo independente possui CSS próprio em `src/export.js` para funcionar sem arquivos do editor.

| Token do editor | Valor | Aplicação |
| --- | --- | --- |
| `--forest` | `#1c4437` | Ações primárias |
| `--forest-dark` | `#173b30` | Navegação lateral |
| `--cream` | `#faf9f5` | Fundo de trabalho |
| `--ink` | `#242e29` | Texto principal |
| `--muted` | `#7b8179` | Texto secundário; contraste depende do fundo |
| `--line` | `#e5e6de` | Divisórias |
| `--lime` | `#d5e5a8` | Seleção e detalhes |
| `--accent` | `#244e3c` | Acento |
| `--soft` | `#edf2e6` | Superfícies suaves |

Catálogo público: fundo floresta claro `#f6f5ef`, texto `#173d32`, acento `#24654b`. Terracota usa acento `#a64b32`; meia-noite usa fundo `#14251f`, painel `#20332e` e texto `#edf5ef`. Os temas mudam apresentação, sem alterar categorias, produtos ou preços.

O CSS atual usa valores explícitos de espaçamento, em geral entre 8 e 28 px em componentes, com margens maiores de página. Ainda não há escala única de espaçamento exportada como tokens. Cartões têm bordas discretas, cantos arredondados e elevação leve em hover; botões exibem ícone e texto onde há espaço. Movimento é curto e desativado por `prefers-reduced-motion`.

## Componentes e comportamento

| Componente | Contrato de uso |
| --- | --- |
| Navegação | Catálogo, Aparência, Publicar; item ativo reconhecível; navegação compacta no celular |
| Aviso local | Explica que dados pertencem ao navegador e oferece backup |
| Cartão de produto | Imagem, categoria, título, descrição, preço e disponibilidade; editar é ação explícita |
| Busca/filtro | Rótulo acessível; resultado e estado vazio; categorias incluem descendentes |
| Formulário | Rótulo associado, entrada de preço decimal, mensagem de erro em português; não depender só de placeholder |
| Diálogo | Elemento `dialog` nativo via `showModal`; título acessível; fechar/Cancelar e Escape; verificar retorno de foco em browser |
| Mensagem de estado | Salvamento, recuperação e erro comunicados; não afirmar salvo em falha de quota |
| Publicação | Diferenciar backup JSON, HTML público e URL já publicada; QR só após endereço configurado |

## Responsividade e acesso

O editor tem breakpoints em 1150, 900 e 650 px: grade de três para duas colunas e navegação superior compacta no celular. O catálogo público usa três/duas/uma colunas em seus próprios breakpoints de 800 e 500 px. As larguras-alvo de QA são 360, 390, 768, 1280 e 1440 px; defini-las não significa que todas foram testadas.

Há `focus-visible`, nomes acessíveis, mensagens de erro/estado e preferência de movimento reduzido. A meta é WCAG 2.2 AA. Tipografia pequena em legendas, contraste de texto secundário, tamanho dos alvos, ordem de foco, navegação de tabs e uso com leitor de tela exigem revisão manual e evidência. Não declarar conformidade a partir da presença desses estilos ou de ausência de achados automáticos. Resultados e limitações ficam em [STATUS](../STATUS.md).

Em novas alterações, preservar legibilidade e foco antes de reduzir densidade visual. Testar nomes longos, acentos, emoji, imagens indisponíveis, catálogo vazio e filtros sem resultado. Mensagens do produto devem explicar a ação do usuário, sem expor detalhes internos de build, pesquisa ou infraestrutura.
