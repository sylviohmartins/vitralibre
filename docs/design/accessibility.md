# Acessibilidade: escopo e verificação

Meta de produto: WCAG 2.2 AA. Não há declaração de conformidade integral. A revisão combina código, regressões automatizadas e navegação real quando disponível. Pessoas simuladas na crítica de design são hipóteses; não são participantes com deficiência nem prova de usabilidade.

## Critérios e decisões

| Área | Contrato de verificação | Evidência/limite atual |
| --- | --- | --- |
| Contraste de texto | Texto normal ≥4,5:1; texto grande elegível ≥3:1, considerando exceções do critério | `evidence/contrast-red.txt` demonstra falha inicial; repetir após correções e revisar fundos reais |
| Legibilidade | Texto funcional mobile em geral ≥14 px, hierarquia e linhas confortáveis | Regra deste produto; WCAG não determina esse mínimo universal de fonte |
| Toque | Alvo de produto de 44×44 CSS px para ações usuais; ícone pode ser menor | Decisão de usabilidade; WCAG 2.2 AA 2.5.8 tem mínimo de 24×24 e exceções de espaço/equivalência |
| Teclado | Tab/Shift+Tab alcançam ações; Enter/Espaço ativam; foco visível; Escape fecha modal | `dialog` nativo e CSS ajudam, mas retorno de foco após render precisa browser real |
| Semântica | Botões comuns para seções; nomes nos ícones; labels e mensagens associadas | Remover role tab incompleto é correção; tabs futuras exigem painel, relações e setas |
| Reflow e ampliação | Sem perda de tarefa/conteúdo em largura equivalente a 320 CSS px; testar zoom | Larguras 360/390/768/1280/1440 são QA adicional, não substituem o teste de reflow/zoom |
| Tema | Contraste de texto/controle/foco em floresta, terracota e meia-noite | Tema escuro de catálogo não comprova tema escuro completo do editor |
| Estado e erro | Disponibilidade tem texto; erro explica correção; salvar falho não aparece como sucesso | Revisar a mensagem com teclado/leitor de tela, inclusive recuperação e quota |
| Movimento | Respeitar `prefers-reduced-motion`; não depender de hover | CSS existente desativa transições; conferir ações em toque |
| Imagem e conteúdo | Imagem relevante com alternativa adequada; marca sem duplicar nome; texto longo visível | Verificar resultado renderizado e conteúdo original, não só atributo presente |

## Execução e limitações

A suíte DOM usa JSDOM e adapta `dialog`; a regra axe de contraste está desativada nessa camada. Portanto uma suíte verde não verifica layout, foco nativo, cores renderizadas ou leitura assistiva. Há regressão específica de contraste de cores declaradas, útil para os pares cobertos; não é medição completa de cada pixel/tema/estado.

Antes de declarar uma tarefa acessível, navegar sem mouse pelo CRUD, erros, categorias, importação, preview e publicação. Abrir/fechar diálogos e conferir destino do foco. Ampliar texto, usar nome longo e validar que cabeçalho fixo não encobre campo focado. Repetir em tecnologia assistiva real e registrar navegador/leitor de tela, versão, ação e resultado. Nenhum desses resultados deve ser presumido por este roteiro.

Lighthouse, axe, detector Impeccable e inspeção manual medem aspectos diferentes. Não há nota Lighthouse registrada aqui nem avaliação integral de leitores de tela. Um aviso `overused-font` do Impeccable é preferência estética; não equivale a falha de WCAG.

## Referências oficiais

Consultadas em 2026-10-23:

- [W3C: contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- [W3C: tamanho mínimo de alvo](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- [W3C: reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).
- [WAI-ARIA APG: tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).
- [Impeccable audit](https://impeccable.style/docs/audit/) e [adapt](https://impeccable.style/docs/adapt/).

Achados priorizados e estado das correções: `ux-audit.md`. Estado global e evidências: `../../STATUS.md`.

Atualização desta execução: tema próprio claro/escuro do editor, botões de navegação comuns, QR com papel img, textos/contraste e alvos de toque foram refinados. A suíte DOM calcula contraste dos cinco seletores essenciais separadamente do axe. O navegador atingiu limite de uso antes da revalidação visual; não há matriz de viewports completa, leitor de tela real ou conformidade WCAG AA certificada. Consulte STATUS.md.
