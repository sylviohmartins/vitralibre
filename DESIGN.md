---
version: alpha
name: VitraLibre
description: Sistema original de catálogo e editor com floresta, creme e acento cítrico.
colors:
  primary: "#1c4437"
  navigation: "#173b30"
  background: "#faf9f5"
  surface: "#fffefb"
  text: "#242e29"
  selection: "#d5e5a8"
  border: "#e5e6de"
  soft: "#edf2e6"
  publicAccent: "#24654b"
  terracottaAccent: "#a64b32"
  midnightBackground: "#14251f"
  midnightText: "#edf5ef"
rounded:
  control: 6px
  card: 9px
  dialog: 13px
spacing:
  small: 8px
  medium: 16px
  large: 24px
components:
  primary-button:
    background: "{colors.primary}"
    radius: "{rounded.control}"
  product-card:
    background: "{colors.surface}"
    radius: "{rounded.card}"
---

# Sistema visual de VitraLibre

## Overview

Registro manual do sistema existente a partir de `src/styles.css`, `src/app.js` e `src/export.js`, com disciplina [Impeccable document](https://impeccable.style/docs/document/) e [extract](https://impeccable.style/docs/extract/). Não é execução comprovada de slash command nem gera `.impeccable/design.json` de Live Mode. Valores acima são referências extraídas; ainda há literais no CSS e a consolidação não deve ser declarada completa.

Preservar caráter editorial acolhedor: creme, floresta, ilustração original e informação bem agrupada. O editor deve ajudar a executar tarefas. O produto não ganha valor por reduzir texto útil a legenda minúscula. Não reproduzir interface de Tagme/Gopage; os dossiês informam problemas, não layouts a copiar.

## Colors

Floresta marca ação principal; cítrico marca seleção. Bordas separam regiões sem transformar toda frase em cartão. Cor de disponibilidade acompanha rótulo textual. Texto secundário precisa contraste suficiente sobre o fundo efetivo, inclusive hover, erro e foco. A revisão inicial encontrou texto claro demais; não registrar esses valores acidentais como regra de marca.

Há três temas de catálogo: floresta claro, terracota claro e meia-noite escuro. O editor possui alternância própria de tema claro/escuro, separada do tema do catálogo. Sua implementação foi verificada em DOM; a inspeção visual final dos dois temas permanece pendente por limite de uso do navegador. Qualquer novo modo escuro deve atualizar superfícies, campos, ícones, foco, erros e imagens com verificação própria; trocar só fundo não atende esse contrato.

## Typography

Pilha de interface existente: `ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`; sem download externo. Georgia aparece em detalhes de marca/prévia. Preservar a pilha durante a correção de legibilidade, sem acrescentar dependência de fonte por estética.

A revisão coordenada estabelece texto funcional mobile legível, em geral 14 px ou maior, e corpo com linha confortável. Isso é uma decisão deste produto, não uma exigência de tamanho mínimo atribuída à WCAG. Títulos distinguem tarefa, seção e produto; informação de preço e disponibilidade deve ser escaneável. Conferir zoom, nomes longos e acentos. A escala anterior com legendas de 5,5–9 px é um achado a corrigir, não um token a perpetuar. Estado das correções: `docs/design/ux-audit.md`.

## Layout

Desktop usa sidebar e conteúdo central com até três colunas; larguras intermediárias refluem para duas. No celular, a orientação de revisão é uma coluna até 650 px, ações alcançáveis e navegação compacta com nomes acessíveis. Preservar criar/editar/importar/exportar/preview/QR ao adaptar, sem depender de hover.

Os valores de espaçamento declarados acima representam usos recorrentes, não uma migração integral para escala única. Manter grupos de formulário, respiro entre seções e títulos próximos de seu conteúdo. Evitar largura fixa que corte preço, legenda ou mensagem de erro. Verificar 360/390/768/1280/1440 px e teclado na tela antes de afirmar aprovação mobile.

## Elevation & Depth

Sombra suave indica cartão em hover e diálogo sobre o trabalho. Contorno e foco continuam visíveis sem sombra. O diálogo modal tem backdrop; não acrescentar várias camadas decorativas que compitam com preço e ação. A preferência de movimento reduzido desativa transições.

## Shapes

Controles, cartões e diálogos têm raios distintos, registrados no frontmatter. Os 44 px de alvo de toque são orientação de produto para área clicável, não tamanho obrigatório do ícone. Um ícone visual pode permanecer menor dentro de botão com área suficiente. Conferir espaçamento entre ações destrutivas e rotineiras.

## Components

Usar padrões existentes `.button`, `.icon-button`, `.product-card`, `.panel`, campos com `label`, `dialogShell` e mensagens de estado. Os contratos completos ficam em `docs/design/components.md`. Extração deve consolidar repetição real sem alterar o comportamento de exportação ou criar abstrações para funcionalidades futuras.

Seções do editor usam navegação de botões comuns enquanto não existir implementação completa do padrão tabs. Não adicionar `role=tab` apenas para aparência. Preview público usa isolamento próprio; o catálogo exportado mantém CSS/JS incorporados e não pode passar a depender do stylesheet do editor.

## Do's and Don'ts

- Preservar identidade, dados portáveis, estado local e ações existentes durante refinamento visual.
- Usar rótulos claros e ação primária por contexto; distinguir backup de página pública e de deploy.
- Revisar contraste, foco, erro, vazio, nomes longos e temas; associar correção à evidência.
- Não manter texto essencial minúsculo para caber em duas colunas mobile.
- Não afirmar WCAG, Lighthouse, teste com usuários ou comando Impeccable sem execução correspondente.
- Não gerar metadata de Live Mode fictícia ou tratar detector estático como auditoria completa de navegador.

## Tokens refinados nesta execução
Texto secundário claro `#59634f`; superfícies `#fffefb` e `#f0f3e8`; tema escuro `#16231e`/`#22372b` com texto `#eaf0e5`/`#c8d3bd`. Espaços 4/8/12/16/24/32 px; movimento 140/200 ms; controles com alvo mínimo 44 px; formulários 16 px; descrição mobile 15 px; produto mobile em uma coluna até 650 px. Teste automatizado calcula contraste nos cinco seletores essenciais; não representa cobertura completa WCAG.
