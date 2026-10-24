# ADR-002 — trilha principal de especificações
Status: adotada manualmente, 23/10/2026.

Entre OpenSpec e GitHub Spec Kit, escolhe-se OpenSpec como referência única de especificação por capacidades e cenários Given/When/Then. Spec Kit não é instalado nem executado, para evitar sobreposição de processos. O CLI OpenSpec não foi instalado: o uso nesta entrega é documental/manual, sem alegar integração MCP nem geração de código por ele.

A especificação de produto consolidada fica em specs/design.md e os cenários em specs/acceptance-tests.md; requisitos rastreáveis em specs/requirements.csv. A escrita/validação das implementações usa Node test e browser, não um processo alternativo Spec Kit. A trilha é compatível conceitualmente com OpenSpec; não se afirma conformidade automática/CLI. Auditoria de candidatos em research/rea/tools-audit.md.
