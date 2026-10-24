# VitraLibre — descoberta competitiva antes da ampliação do produto

Data:24/10/2026, America/Sao_Paulo. Decisão solicitada pelo proprietário nesta conversa: aprofundar exploração operacional e consolidar requisitos antes de ampliar a implementação. Este plano não declara pesquisa concluída.

## Situação verificada e mudança de abordagem

O desenvolvimento anterior priorizou um núcleo estático executável com pesquisa parcial. Isso não atende à definição agora explicitada de explorar todos os concorrentes por cadastro, ativação, login, navegação e análise funcional completa. Inventário44 fornecedores;8 dossiês prioritários;zero cadastros enviados/ativações/logins;REA estático em4 scripts públicos de3 fornecedores e código próprio. A matriz44×42 preexistente é baseline e rastreabilidade inicial, não um inventário exaustivo descoberto em painéis reais.

O VitraLibre publicado é uma base experimental preservada, não a síntese final de todos os concorrentes. Novas funcionalidades ficam suspensas até a revisão de descoberta e escopo. Correções urgentes de integridade/segurança poderão ser tratadas separadamente com evidência. CSV iniciado nesta rodada está isolado em feat/csv-import, commit258bde2, sem merge/deploy:10 testes do conversor aprovados e4/5 de integração, com falha de comparação entre realms no teste restante; não homologado. Não retomar a feature antes do gate.

## Objetivo e limite da garantia

Descobrir, explicar e rastrear todas as funcionalidades identificáveis nos44 produtos da baseline, dentro das versões, planos, plataformas e perfis de acesso efetivamente disponíveis. Abranger os8 prioritários primeiro, depois os36 restantes em ondas por categoria; isso define ordem, não exclusão.

Não é possível garantir conhecimento de funcionalidades ocultas, exclusivas de contratos/planos não acessíveis, configurações privadas ou implementações internas de backend fechado. Nenhum bloqueio será contado como conclusão e nenhum recurso não encontrado será rotulado como inexistente. Registrar produto/plano/data/papel e superfície analisados. Reavaliar recursos e fontes quando mudarem.

A garantia auditável será de rastreabilidade:todo fornecedor tem status/evidência;todo recurso descoberto tem descrição/destino;todo recurso implementado tem critério/teste;nenhuma exclusão é silenciosa. A frase “todos os recursos de todos os concorrentes, melhorados” só poderá se referir ao inventário acordado e às validações efetivamente concluídas. Enquanto houver impedimentos, a cobertura integral continua não atendida.

## Abordagens avaliadas

1. Construir primeiro um MVP e pesquisar durante incrementos:gera software cedo, mas foi insuficiente para a expectativa de síntese abrangente do proprietário. Não seguir ampliando o escopo por este caminho agora.
2. Reproduzir a união literal de44 plataformas antes de qualquer entrega:pode incluir e-commerce, PIM, CMS, reservas, POS e integrações de naturezas diferentes; amplia custos, ameaça a simplicidade e depende de acesso externo. Não é uma garantia executável sem delimitar produto, plano e fronteiras.
3. Pesquisa operacional ampla, inventário normalizado e decisões explícitas, seguida de núcleo com módulos:recomendado. Preserva a ambição de cobertura, permite explicar dependências/custos e compara melhorias por tarefa. Recursos não vão desaparecer porque são difíceis; ficam no inventário e com estado visível. A arquitetura e o escopo final dependem da descoberta e revisão do proprietário, não de decisões unilaterais de exclusão.

## Fase A — Inventário e acesso legítimo

Usar fornecedores.csv como controle dos44, preservando URLs e evidências anteriores. Para cada produto:revalidar produto/domínio, planos e diferenças funcionais; listar web/mobile/admin/público/API e papéis; localizar demo/teste; registrar requisitos de email/telefone/cartão, expiração e termos. Criar conta gratuita e ativar quando permitido. Não aceitar obrigações contratuais, inserir identidade pessoal ou pagar sem a confirmação específica necessária. Não burlar bloqueio de email, CAPTCHA, região, autenticação ou bot. Usar handoff seguro quando houver suporte; nunca senha/token em chat, repositório ou relatório.

Conta criada, email confirmado, login e painel acessado são estados distintos. Se houver bloqueio, registrar tela/mensagem, tentativa permitida e ação mínima necessária. Teste gratuito não comprova funções do plano pago. Demo pública não comprova painel administrativo. Cadastro realizado não comprova exploração.

## Fase B — Exploração por fornecedor

Roteiro comum com dados fictícios, adaptado ao domínio. Inventariar menus, submenus, configurações, ajuda, flags e funções condicionais. Usar papéis/perfis permitidos; repetir nas superfícies relevantes. Para cada jornada, executar criação → edição → visualização pública → alteração → erro/recuperação → exportação/remoção reversível quando permitido. Inspecionar limites, defaults, campos obrigatórios, validação, estados vazios, permissões e publicação. Não enviar pedidos, mensagens ou cobranças reais.

Famílias iniciais, expansíveis conforme descoberta:
- Conta, onboarding, lojas/catálogos, equipe e papéis.
- Identidade, domínio, temas, editor, seções e publicação.
- Categorias, produtos, mídia/galerias, variantes, adicionais, combos, preços/promoções, disponibilidade/estoque e importação/exportação.
- Navegação, busca/filtros, ordenação, recomendações, QR e compartilhamento.
- WhatsApp/orçamento/pedido/carrinho, entrega/retirada, frete, checkout/pagamento, agenda/reservas quando presentes.
- Integrações, APIs/webhooks, analytics, SEO, idiomas, acessibilidade, privacidade, backup e gestão de dados.
- Capacidades específicas de CMS/PIM/editorial/comércio que não cabem na taxonomia inicial.

Não se encerra a pesquisa ao preencher42 critérios antigos. Novas capacidades geram novos registros. Uma revisão independente confrontará navegação/plano/documentação com o inventário para apontar omissões. A ausência de uma família só vira “não se aplica” com justificativa e evidência de escopo.

## Fase C — Engenharia reversa funcional e REA

Reconstruir contratos observáveis:entradas, validações, estados/transições, saída, persistência, permissões e efeitos; mapear jornada e comportamento, sem copiar código ou identidade. Usar DOM/AX/console/rede somente pelas ferramentas e permissões disponíveis. REA atua nos artefatos compatíveis e autorizados, com versão/comando/hash/resultado/limitações registrados. Análise estática não demonstra execução nem reconstrói por si só um backend fechado. Não atribuir a REA capturas produzidas por outra ferramenta. Código proprietário bruto permanece minimizado e privado; publicar sínteses originais e evidência lícita.

## Fase D — Consolidação normalizada

Fonte de verdade versionada no repositório, com relatório Markdown e tabelas CSV legíveis, não apenas prints soltos:

- Por fornecedor:cadastro/acesso/plano/papel/data, mapa de navegação, inventário de funções, roteiros executados, regras, limites, evidências e impedimentos.
- Por funcionalidade:ID estável;problema e persona;fornecedores/nomes equivalentes;variações;pré-condições;passos;regras de negócio;estados de erro;saída;dependências;limites;origem da evidência.
- Proposta VitraLibre:comportamento de referência, lacuna observada, melhoria proposta, motivo, custo/trade-off, módulo sugerido, critério de aceite e como comparar.
- Rastreabilidade:fornecedor → evidência → funcionalidade normalizada → requisito → implementação → teste → versão publicada.

Estados de evidência separados:documental, observado em demo, executado autenticado, corroborado tecnicamente, inferido, bloqueado, não verificado. Estados de implementação separados:descoberto, especificado, planejado, implementado, testado, homologado. Um estágio não promove automaticamente outro.

Deduplicar funções equivalentes sem perder particularidades. Não confundir “variações” de um catálogo com “combinações com preço/estoque/foto próprios” de outro; essas diferenças podem exigir requisitos separados. Nenhuma célula vazia contará como conclusão.

## Fase E — Revisão e gate antes de ampliar código

Entregar o consolidado e confrontar as lacunas com o proprietário antes de afirmar atendimento integral. Condições mínimas:
1. Todos os44 fornecedores possuem escopo e status atuais; cada área inventariada tem fluxo/evidência ou impedimento.
2. Os8 prioritários passaram pelas jornadas administrativas e públicas acessíveis; os demais seguem o mesmo protocolo em suas categorias. Qualquer bloqueio mantém o fornecedor parcial.
3. Todas as funcionalidades descobertas possuem registro e decisão:capacidade do núcleo, módulo opcional, dependência externa, ou exclusão justificada submetida ao proprietário. Nada é descartado por silêncio.
4. Especificações das funcionalidades a implementar incluem regras/erros/dados/segurança/acessibilidade e aceite testável; arquitetura revisada conforme necessidades reais, sem forçar comércio/multiusuário no núcleo estático.
5. Recursos restritos ou inacessíveis são apresentados como lacunas. Se a exigência continuar sendo cobertura integral sem exceções, o gate permanece aberto até resolvê-las. Somente o proprietário pode aceitar um recorte explícito; não presumir isso.

Após o gate, construir por capacidades completas, testar e publicar incrementalmente. O gate não implica entregar toda a união em um único release, nem chamar roadmap de funcionalidade disponível.

## Fase F — Comprovar melhorias

“Melhor” será definido por tarefa e baseline, sem score arbitrário. Comparar tarefas equivalentes, dados/quantidade equivalentes, plano/perfil, dispositivo/rede e datas registrados. Medir quando possível:conclusão correta, erros e recuperação, trabalho necessário, tempo, acessibilidade, portabilidade e desempenho em condições especificadas. Menos cliques isoladamente não prova experiência melhor. Não prometer superioridade universal por estética ou quantidade de funções.

Avaliações do agente são inspeções/simulações, não pesquisa com participantes. Testes com pessoas exigem participantes e execução reais; sessões comparativas devem distribuir os sites para evitar fadiga/efeitos de ordem. Impeccable orienta design/auditoria; testes funcionais e browser confirmam o comportamento; ferramentas automatizadas não substituem avaliação completa WCAG.

## Próximas ações e impedimento atual

1. Começar pela matriz de acesso dos8 prioritários e resolver acesso operacional legítimo, priorizando Gopage e Tagme/LiveMenu; conservar o que já foi observado.
2. Preparar o primeiro dossiê operacional completo com jornadas administrativas e públicas; revisar o protocolo com os achados antes de repetir nos demais.
3. Continuar pelas ondas, mantendo mapa global44 e acumulando requisitos únicos.
4. Consolidar e apresentar o gate antes de retomar novas funcionalidades.

O navegador anteriormente rejeitou a retomada da aba de erro por política de URL; não há demonstração de que isso esteja resolvido. Cadastros/termos/autenticação continuam dependendo de fluxo permitido e eventual intervenção específica. Este plano não afirma que acessos foram executados agora. A versão publicada não foi alterada nesta revisão.

## Referências metodológicas

Consultadas em24/10/2026:
- GOV.UK Service Manual, discovery: https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works — entender problema/necessidades/restrições e estabelecer objetivo antes de construir.
- Nielsen Norman Group, competitive usability testing: https://www.nngroup.com/articles/redesign-competitive-testing/ — comparar tarefas equivalentes, preservar aprendizagens do produto existente e testar padrões em vez de copiá-los.

O plano adapta esses princípios ao VitraLibre; não atribui às fontes a obrigação de testar44 sites nem promete métricas não medidas.
