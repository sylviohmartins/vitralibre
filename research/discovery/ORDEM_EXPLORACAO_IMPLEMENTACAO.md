# VitraLibre — ordem de exploração e sequência de implementação

Data:24/10/2026, America/Sao_Paulo. Ordem de trabalho definida para execução; não representa etapas concluídas ou disponibilidade atual dos serviços. A lista de funcionalidades e a arquitetura final dependem da descoberta.

## Ordem dos44 fornecedores

| Onda | Ordem e fornecedores |
|---|---|
|1 — referências centrais|1. Gopage; 2. Tagme LiveMenu; 3. Goomer; 4. Meloja; 5. Cardápio Web; 6. Kyte; 7. Stoqui; 8. Kicatálogo|
|2 — catálogos e vendas|9. Meu Catálogo Digital; 10. Categorize; 11. LINK Vendas|
|3 — restaurantes e operação|12. MenuDino; 13. OlaClick; 14. Anota AI; 15. Saipos; 16. cardapily; 17. Menu Digital (menudigital.info); 18. Menu Digital (menudigital.art.br); 19. UpMenu; 20. Flipdish; 21. Menutech; 22. menumodo; 23. GloriaFood|
|4 — comércio eletrônico|24. Nuvemshop; 25. Loja Integrada; 26. Shopify; 27. Squarespace; 28. WooCommerce + modo catálogo; 29. Food Online for WooCommerce; 30. PrestaShop|
|5 — catálogos editoriais|31. Flipsnack; 32. iPaper; 33. Catalog Machine; 34. Publitas|
|6 — conteúdo e construção|35. Webflow CMS; 36. Strapi; 37. Payload CMS; 38. Ultimate Product Catalog|
|7 — motores de comércio|39. Medusa; 40. Vendure; 41. Saleor; 42. Solidus|
|8 — gestão de informação de produto|43. Akeneo PIM; 44. Pimcore PIM|

A prioridade considera aderência aos catálogos/restaurantes, diversidade de padrões e, depois, complexidade técnica. Gopage vem primeiro porque há formulário e jornada pública já identificados; Tagme continua como referência central de cardápio. Bloqueio não encerra fornecedor nem prende toda a fila:registrar, continuar o próximo e manter a pendência para retorno quando houver acesso legítimo. Não repetir tentativas idênticas ou burlar restrições. Revalidar produto/plano/versão antes de cada sessão, inclusive aviso anterior de descontinuação da GloriaFood, sem presumir que continua vigente.

## Sequência dentro de cada fornecedor

1. Confirmar produto, versão/plano, superfícies, papéis, termos, limites e licenças.
2. SaaS:cadastro permitido → email confirmado → login. Projeto auto-hospedado:instalação isolada reproduzível e acesso administrativo/API equivalentes, quando viáveis. Nem toda referência exige um cadastro comercial.
3. Mapear onboarding, menus, submenus, configurações, ajuda e capacidades condicionais.
4. Executar jornadas administrativas e públicas com dados fictícios; testar criação/edição/publicação/erros/recuperação/exportação e permissões aplicáveis.
5. Fazer engenharia reversa funcional e análise REA compatível/autorizada. Repositórios abertos também exigem exame de arquitetura, módulos, contratos, licença e testes relevantes; ler README não basta.
6. Registrar evidências, regras, diferenças entre planos, funcionalidades únicas e hipóteses de melhoria. Revisar omissões e atualizar a matriz normalizada.

Os42 critérios antigos não limitam a descoberta. Funcionalidades novas ampliam o inventário; nenhuma será descartada silenciosamente. Recurso anunciado, demo observada, painel autenticado, implementado e homologado são estados diferentes.

## Condição antes de ampliar o produto

Pesquisar as ondas, consolidar recursos e apresentar cobertura/lacunas ao proprietário. Todos os44 continuam sem exploração integral comprovada. Se a exigência for integral sem exceções e houver acesso pendente, o gate continua aberto. Qualquer recorte precisa ser explicitamente aceito pelo proprietário. Até essa revisão, ampliação funcional suspensa; versão publicada preservada e CSV isolado fora do main.

## Ordem proposta de implementação depois da descoberta

Não é um backlog funcional fechado. É uma sequência por dependências; cada capacidade abaixo só ganha especificação final a partir das evidências, regras e aceite. Itens especializados podem exigir módulos próprios, infraestrutura e serviços opcionais. O núcleo estático deve permanecer independente.

| Ordem | Capacidade / entrega | Dependência ou critério |
|---|---|---|
|0|Consolidado competitivo e revisão de escopo|Inventário de recursos, evidência, lacunas, melhorias e aceite; autorização do recorte quando necessária|
|1|Arquitetura revisada, schema/migrações, contratos, segurança, licenças e design system|Definir núcleo e módulos conforme necessidades reais; preservar dados/funcionalidades existentes|
|2|Base de criação/administração:onboarding, modelos e gestão de catálogos|Jornada de primeiro catálogo, edição e backup recuperável|
|3|Oferta:categorias/subcategorias, produtos, preços, variantes, adicionais/combos quando confirmados, mídia/galerias|Regras completas e limites; sem confundir disponibilidade manual com estoque sincronizado|
|4|Catálogo público:descoberta, busca/filtros, ordenação, detalhes, promoções/destaques, QR/compartilhamento|Jornadas consumidor mobile/teclado e equivalência com capacidades anteriores|
|5|Personalização/editor:marca, temas, layout, seções, prévia, histórico de edição quando especificado|Componentes acessíveis e reuso; sem cópia de identidade dos concorrentes|
|6|Publicação/portabilidade:HTML/JSON, domínio/URLs, atualização e deploy|Fluxo compreensível para leigos; compatibilidade estática e restrições de hospedagem|
|7|Administração em escala:CSV e demais formatos confirmados, importação validada, ordenação/edição em massa, diagnóstico de mídia|Prévia, confirmação, não perda de dados e migrações quando necessárias|
|8|Serviço opcional:contas, lojas/tenants, papéis, persistência compartilhada, mídia e sincronização|Autorização no backend, isolamento, migrações, backups e custos antes do uso multiusuário|
|9|Operação comercial:estoque sincronizado, carrinho, orçamento/pedidos, WhatsApp, retirada/entrega/frete e limites|Contratos confirmados; backend onde necessário e fluxos de simulação|
|10|Pagamentos e automações comerciais confirmadas|Pedidos/estoque consistentes, integrações sandbox, idempotência e segurança; sem transações reais não autorizadas|
|11|Integrações/APIs/webhooks, conectores e extensões confirmados|Contratos versionados, autenticação, limites, retries e tratamento de falha|
|12|Relatórios/analytics, idiomas e capacidades especializadas de editorial/PIM/CMS confirmadas|Definir módulos distintos por domínio; privacidade, qualidade de dados e dependências próprias|
|13|Homologação integrada, documentação/contribuição, distribuição e releases|Regressão completa, evidências renderizadas, operação reproduzível e matriz recurso→teste→versão|

Segurança, UX, acessibilidade, SEO pertinente, desempenho, documentação e Impeccable entram desde o início de cada etapa; não ficam aguardando a etapa13. Cada incremento segue requisito/evidência → critério de aceite → teste → implementação → revisão → execução renderizada → comparação → correção → revalidação → publicação. A etapa13 agrega e revisa o conjunto.

A descoberta pode mudar a prioridade relativa ou revelar dependências entre capacidades especializadas e etapas anteriores. A alteração será justificada e versionada. Não prometer antecipadamente a lista completa de funcionalidades desconhecidas nem superioridade universal. Melhorias terão baseline e critérios comparáveis por tarefa; simulação por agente não será chamada de teste com participantes.

## Estado e próxima ação

O núcleo experimental já publicado será auditado contra o consolidado, reaproveitando o que estiver correto. Não reiniciar nem refazer componentes sem causa. O próximo trabalho é resolver legitimamente o acesso operacional da Gopage e seguir a fila. O handoff de cadastro não foi confirmado como acessível pelo usuário; cadastro/ativação/login continuam zero. Isso é impedimento de acesso, não pesquisa concluída.

Fontes internas:PLANO_DESCOBERTA_COMPETITIVA.md, fornecedores.csv, ROADMAP.md, specs/requirements.csv e prompt mestre. Este documento organiza execução; não é uma nova pesquisa de disponibilidade, preços ou funcionalidades.
