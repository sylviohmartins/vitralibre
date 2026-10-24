# VitraLibre — auditoria técnica de ferramentas

Consulta em 23/10/2026 UTC. Repositório pretendido pelo usuário: `vitralibre`; os caminhos internos de trabalho preservam o nome anterior `vitrine-aberta`. Esta é a parcela REA/candidatas da matriz geral, não uma declaração de que todos os conectores foram instalados ou testados.

| Nome / finalidade | Fonte oficial | Versão observada | Compatibilidade e instalação real | Sanidade / status | Privilégios e fallback |
|---|---|---|---|---|---|
| REA / engenharia reversa | https://github.com/morluto/rea e https://rea.tools/ | npm 6.7.0; main 0b1af48… inspecionado | CLI Node compatível com engines do tarball; instalado no scratch com scripts desabilitados e lockfile; sem registro global Work | [O] CLI e MCP inicializam, 207 ferramentas; [B] análise JS e HAR bloqueadas por processo/procfs; doctor unhealthy | Sem sudo/elevação, container já UID 0; sem navegador/porta CDP. Fallback: observação autorizada e pesquisa oficial |
| Superpowers / processo de engenharia | https://github.com/obra/superpowers | skill empacotada 7.0.1 | Skills do ambiente são acessíveis por `skills.read`; não presumir todos os comandos de Claude/Codex no Work | [O] using-superpowers e systematic-debugging lidas nesta auditoria. Outras ativações devem constar do trabalho principal | Instruções, sem instalar código remoto; precedência das autorizações do usuário |
| OpenSpec / trilha principal recomendada | https://github.com/Fission-AI/OpenSpec | npm @fission-ai/openspec 1.14.3, MIT | Node >=20.19; Node local compatível. [NV] Não instalado nesta auditoria; slash commands Work não verificados | [D] CLI init/validação e specs em arquivos disponíveis; recomendada uma única trilha OpenSpec para manutenção | Se adotar CLI, fixar 1.14.3, inspecionar tarball, desabilitar telemetria. Markdown em specs é fallback; não afirmar integração ativa |
| GitHub Spec Kit / alternativa de especificação | https://github.com/github/spec-kit | release não fixada; documentação consultada | [D] Python >=3.11 + uv + agente suportado; [NV] não instalado | Não adotado para evitar duplicar OpenSpec; não há falha técnica comprovada do produto | CLI de terceiros adicionaria outra cadeia; preservar requisitos/aceites em uma trilha |
| Playwright MCP / jornadas UI | https://github.com/microsoft/playwright-mcp | npm @playwright/mcp 0.0.83, Apache-2.0 | Node >=18 compatível; [NV] não instalado nem conectado ao Work | [D] MCP requer cliente/configuração próprios; Browser/CUA já é superfície permitida. Sem teste MCP Playwright nesta auditoria | Não usar shell Playwright como substituto da superfície Browser. Fallback Browser/CUA |
| Chrome DevTools MCP / rede e desempenho | https://github.com/ChromeDevTools/chrome-devtools-mcp | npm 1.12.0, Apache-2.0 | Node compatível; exige Chrome e integração MCP. [NV] não instalado/conectado | [D] Pode iniciar Chrome; documentação não prova permissão ou browser acessível no Work | Sem porta remota aberta; telemetria tem opt-out oficial. Fallback evidência da superfície permitida e build local |
| UI/UX Pro Max / apoio visual | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | npm CLI 2.15.0; MIT | [D] busca usa Python stdlib; integrações listadas incluem Codex CLI, não comprovam ChatGPT Work. [NV] sem instalação/teste | Candidata aprovada para avaliação manual/documental; não habilitada automaticamente. Design e contraste continuam exigindo verificação objetiva | Não instalar runtime extra. Fallback design tokens próprios e inspeção visual |

Versões npm e engines foram consultadas realmente; respostas estão em `candidate-package-metadata.json`. A existência no npm não constitui auditoria de segurança das dependências. Nenhuma instalação de candidatas além do REA foi feita por esta auditoria.

## Descoberta de alternativas

Foram abertos os diretórios públicos abaixo em 23/10/2026. Listagens são pistas de descoberta, sem garantia de compatibilidade/qualidade.

| Diretório / candidata | Evidência e decisão |
|---|---|
| https://github.com/trending | [O] Página acessível pela pesquisa web; extração devolveu navegação/filtros, sem lista útil de repositórios. Cobertura parcial; não se atribuiu ranking nem escolheu ferramenta por popularidade |
| https://github.com/topics/agent-skills | [O] Listagem exibiu REA, anthropics/skills, DietrichGebert/ponytail e addyosmani/agent-skills. [NV] Sem inspeção integral das candidatas; não instaladas. REA já tinha origem oficial confirmada independentemente do tópico |
| https://skills.sh/ | [O] Diretório exibiu `vercel-labs/skills` find-skills, `vercel-labs/agent-browser`, `anthropics/skills` frontend-design e `vercel-labs/agent-skills` web-design-guidelines. Não foram instaladas por ranking |
| vercel-labs/agent-browser | Reprovada para execução nesta sessão: outra superfície de controle de navegador entraria em conflito com a skill Browser ativa. Não é juízo sobre a qualidade do projeto |
| anthropics/skills frontend-design | Adiada: orientações visuais podem ser úteis, mas instalação/versão/licença específica e compatibilidade Work não foram verificadas. O design VitraLibre deve ser original |
| vercel-labs/agent-skills web-design-guidelines | Adiada: possível checklist documental; não há benefício demonstrado que justifique nova instalação durante o MVP |
| Outras skills de segurança descobertas por popularidade | Não aprovadas sem inspeção. Auditoria de dependências e validação de dados da aplicação devem usar ferramentas da stack efetivamente instalada e resultados reais |

## Limite do transporte MCP observado

`rea mcp` foi iniciado como processo local para um cliente de teste stdio; isso **não** adicionou o servidor ao catálogo do Work. O servidor real forneceu os schemas de 207 ferramentas. O catálogo do host não disponibiliza magicamente ferramentas novas porque um arquivo de configuração local foi escrito. O `setup --dry-run` falhou e não foi aplicado.

A skill Browser foi lida antes de avaliar a possibilidade CDP. Sua instrução aplicável é: “Use only the associated Browser app's `js` tool to control this browser” e proíbe “standalone Playwright, shell automation, or another browser-control tool”. Portanto a análise estática e o MCP sem navegador foram os testes compatíveis. Não se declara análise de DOM, rede CDP ou screenshot pelo REA.

## Fontes de requisitos consultadas

- <https://github.com/Fission-AI/OpenSpec> — Node, instalação, init e organização de especificações; inferência local: é a trilha mais simples para esta stack Node.
- <https://github.com/github/spec-kit> — requisitos Python/uv e processos de especificação; não instalado.
- <https://github.com/microsoft/playwright-mcp> — requisitos Node e registro MCP; não confundir CLI com ferramenta conectada ao Work.
- <https://github.com/ChromeDevTools/chrome-devtools-mcp> — requisitos Chrome/Node, telemetria e execução; não conectado.
- <https://github.com/nextlevelbuilder/ui-ux-pro-max-skill> — Python stdlib, agentes suportados e licença MIT; Work não foi comprovado.
- Skill Browser efetivamente lida: `skill://browser@openai-curated-remote/root/.codex/plugins/cache/openai-curated-remote/browser/0.1.6/skills/control-browser/SKILL.md`.
