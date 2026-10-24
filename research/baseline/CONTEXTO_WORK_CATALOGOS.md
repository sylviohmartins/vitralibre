# Dossiê de entrada para o ChatGPT Work — catálogos digitais

**Data-base:** 23/10/2026. Este documento é material de CONTEXTO, não substitui o prompt mestre e não autoriza alegações de funcionalidades testadas.

## Artefatos anexados

- `PROMPT_MESTRE_WORK_CATALOGOS_OPEN_SOURCE.md`: instrução única consolidada, autossuficiente, com metodologia e gates.
- `auditoria_catalogos_digitais_2026-10-23.xlsx`: planilha legada da pesquisa anterior (8 abas): LEIA PRIMEIRO, Inventario, Funcionalidades, Precos, Demos, Ranking orientativo, Metodologia e Fontes. Fornecedores e funções com evidências de níveis diferentes.
- `relatorio_catalogos_digitais_2026-10-23.md`: dossiê documental existente com links, preços da data-base, demos e limitações.

## Como interpretar o material anterior

- A matriz de 42 funcionalidades não é comprovante de testes com login. `D`: documentação/anúncio; `H`: estrutura HTML observada; `NV`: não verificado; `NA`: não aplicável.
- Os rankings são orientativos, sem notas matemáticas homologadas ou testes de desempenho comparáveis.
- URLs, preços, disponibilidade e planos podem ter mudado; verificar ao visitar.
- A referência Outback + Tagme é histórica/documental, não equivale a confirmação da tecnologia de cada interface atual.
- A meta não é clonar literalmente qualquer produto, mas especificar e implementar capacidades equivalentes de maneira original e documentada.

## Pontos de partida oficiais verificados em 23/10/2026

| Fonte | URL | Aplicação |
|---|---|---|
| REA oficial | https://github.com/morluto/rea | Engenharia reversa; MCP/CLI |
| REA observação CDP | https://github.com/morluto/rea/blob/main/docs/browser-observation.md | Observação de páginas por browser próprio |
| REA cenários de browser | https://github.com/morluto/rea/blob/main/docs/browser-scenario-contract.md | Ações controladas e captura de evidências |
| Superpowers | https://github.com/obra/superpowers | Brainstorming, TDD, revisão, planejamento |
| OpenSpec | https://github.com/Fission-AI/OpenSpec | Fluxo orientado por especificações |
| GitHub Spec Kit | https://github.com/github/spec-kit | Processo alternativo de SDD |
| Playwright MCP | https://github.com/microsoft/playwright-mcp | Navegação/teste browser |
| Chrome DevTools MCP | https://github.com/ChromeDevTools/chrome-devtools-mcp | Observabilidade da interface |
| UI/UX Pro Max | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | Auxílio a design |
| Skills.sh | https://skills.sh/ | Descoberta de skills; sem garantia automática de compatibilidade |
| GitHub Pages limites | https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits | Limitação EXPRESSA de hospedagem comercial/SaaS |
| Cloudflare Pages/Workers | https://developers.cloudflare.com/pages/ | Alternativa; Workers preferido para novos apps dinâmicos |
| Cloudflare Pages limites | https://developers.cloudflare.com/pages/platform/limits/ | Revisar quotas atuais |
| Cloudflare Pages Functions pricing | https://developers.cloudflare.com/pages/functions/pricing/ | Custos/limites de backend |
| Tagme menu | https://tagme.com.br/produtos/menu-digital | Referência cardápio |
| Outback produtos | https://www.outback.com.br/nossosprodutos | Catálogo institucional, interface distinta a confirmar |
| Outback LiveMenu (URL identificada) | https://beta.livemenu.app/pt/menu/622b5ad12c906b0011c149ec | Link de cliente potencialmente mutável |
| Kicatálogo exemplo | https://demo2.kicatalogo.com/ | Demonstração pública localizada |

## Decisões técnicas críticas a documentar no Work

1. REA é obrigatório para investigações onde é compatível e o alvo é acessível legitimamente; o sucesso deve ser provado por saída/snapshot sanitizado. Não declarar uso onde só Playwright funcionou.
2. Usar e-mail temporário em testes quando o fornecedor permite; não falsificar identidade ou contornar bloqueios. Confirmar e-mail/login e entrar em painel antes de marcar cadastro concluído.
3. A experiência essencial do novo produto deve ser possível sem backend: editor local + exportação de catálogo estruturado + storefront estática.
4. GitHub Pages não deve ser usado como hospedagem gratuita de aplicação comercial, e-commerce ou SaaS. Pode servir à documentação e demonstração permitida. Comparar Cloudflare/Workers e self-host.
5. Manter governança open-source, licenças verificadas, código original, proteção de segredos e realismo de custos.

## O que não foi feito na pesquisa anterior

Não foram confirmadas criação de contas, login real, atualização cronometrada, transações, permissões, isolamento multi-tenant, testes de acessibilidade em aparelho real, performance comparativa, auditoria de APIs, exportação de catálogos no painel ou garantia de conformidade LGPD. O Work deve investigar e marcar separadamente cada caso.
