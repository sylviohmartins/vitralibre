# ADR-001 — Núcleo estático e dados portáveis

Data: 2026-10-23. Estado: aceito para P0. Escopo: editor local e catálogo público. A decisão descreve uma escolha técnica; não certifica que todos os gates já passaram.

## Contexto

Pequenos negócios precisam montar um catálogo sem administrar contas e servidores. A primeira entrega precisa funcionar sem SaaS pago, guardar dados exportáveis e publicar HTML independente. Pedidos, pagamento e colaboração exigem infraestrutura e ficam fora desta iteração. A especificação prefere TypeScript quando útil, mas permite uma decisão justificada de menor manutenção.

## Alternativas consideradas

| Opção | Adequação | Custo/limite para este P0 |
| --- | --- | --- |
| React + Vite | Componentização e ecossistema de testes; boa opção para editor que cresça | Runtime e cadeia de build adicionais; exportar um documento independente exige uma segunda camada de geração |
| Astro | Forte em páginas estáticas e conteúdo | O editor interativo precisa de ilhas ou camada própria; não elimina a geração independente |
| ESM nativo + JSDoc/checkJs | Browser e Node compartilham validação; HTML exportado pode ser autônomo | Disciplina manual de componentes e DOM; `checkJs` tem cobertura delimitada, não equivale a tipar toda a interface |
| Next.js | Aplicação híbrida e rotas de servidor | Infraestrutura e superfície operacional sem benefício necessário para edição local |
| Payload | CMS, administração e permissões para módulo dinâmico | Introduz servidor, banco, autenticação e atualização de dependências |
| Strapi | CMS e API para dados administrados no servidor | Mesmas obrigações operacionais; não atende sozinho à portabilidade do catálogo estático |
| Medusa | Base de comércio para catálogo, pedidos e integrações | Domínio de comércio e backend maiores que o problema atual |
| Vendure | Comércio com contratos e extensibilidade de servidor | Complexidade de operação e modelagem desnecessária sem pedidos/estoque |
| Saleor | Comércio headless e API GraphQL | Requer serviços e operação que o P0 busca evitar |

Esta comparação é de encaixe arquitetural, não benchmark de preço, versões, desempenho ou avaliação prática dessas plataformas. A seleção de um backend requer pesquisa e prova de conceito próprias; nenhum deles foi instalado como dependência do núcleo.

## Decisão

Usar HTML/CSS originais, módulos JS nativos, JSDoc e verificação de tipos `checkJs` no núcleo/gerador. Node.js 24 é o ambiente recomendado de build e teste. Fixar dependências em lockfile e instalar com `npm ci --ignore-scripts`. Usar `qrcode-generator` 2.0.4 local, sem serviço de QR remoto. Gerar dois exemplos e exportação HTML sem backend.

## Consequências

O usuário mantém propriedade prática dos dados via JSON; não precisa de conta para editar. O deploy exige apenas servir arquivos. A interface precisa explicar que dados locais não são publicados automaticamente. Fotos externas continuam dependendo de terceiros e imagens grandes podem atingir a quota do navegador.

A aplicação assume manutenção de DOM, foco e validação de formulários sem biblioteca de componentes. O crescimento para múltiplos editores, RBAC ou pedidos deve motivar novo ADR, sem reescrever silenciosamente as garantias do modo local. Para futura colaboração, considerar separadamente camada de UI e serviço opcional; preservar importação/exportação v1 ou migração explícita.

Revisar esta decisão quando testes mostrarem limites reais de manutenção, acessibilidade ou desempenho, ou quando houver requisitos validados de colaboração. Popularidade de framework, isoladamente, não justifica a migração.
