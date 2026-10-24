# PRD — VitraLibre

**Sua vitrine. Sua marca. Sua liberdade.**

Data: 2026-10-23. Plataforma open-source para criação, personalização, gerenciamento e publicação de catálogos digitais interativos, destinada a restaurantes, comércios e outros segmentos. Este PRD define o produto; resultados executados e impedimentos estão em [STATUS](../STATUS.md).

## Problema e proposta

Um pequeno negócio precisa atualizar o que oferece, comunicar preços e disponibilidade e compartilhar uma apresentação legível no celular. Exigir conta, mensalidade ou operação de servidor antes de montar o primeiro catálogo torna essa tarefa mais difícil. Portabilidade reduz a dependência de um fornecedor.

O P0 entrega edição local no navegador, persistência com aviso claro, backup JSON e catálogo HTML independente. Dois exemplos fictícios reduzem o esforço de começar. Temas originais e imagens próprias demonstram personalização sem reproduzir identidade de concorrentes.

A origem é o prompt mestre, o baseline documental em `research/baseline/` e a pesquisa em `research/competitors/`. Funcionalidade anunciada por concorrente não comprova seu uso; os dossiês registram essa distinção. Personas e jornadas abaixo são hipóteses de produto, não entrevistas realizadas.

## Escopo e prioridades

| Prioridade | Resultado |
| --- | --- |
| P0 obrigatório | Catálogo com identidade e tema; CRUD de categorias/subcategorias/produtos; variantes simples; preço em centavos; disponibilidade manual; imagem por arquivo/URL; busca e filtro; JSON validado; HTML independente; QR e compartilhamento por URL pública; exemplos restaurante/loja |
| P1 próximo | Melhorias baseadas em fricções medidas: edição em massa, ordenação explícita, importação CSV, diagnóstico de imagens e acessibilidade |
| P2 opcional | Backend, contas, papéis, múltiplas lojas, mídia gerenciada, pedidos, estoque e integrações; novo ADR e contratos versionados |
| P3 exploratório | Traduções, extensões e analytics com privacidade; dependem de demanda e capacidade operacional demonstradas |

P0 não oferece checkout, pedido real, contato automático por WhatsApp, sincronização entre dispositivos nem publicação automática. HTML exportado não depende do editor para ser consultado. Upload de mídia para servidor e domínio próprio são serviços externos à exportação.

## Regras de experiência

- Não exigir login para editar localmente; informar onde os dados ficam e orientar backup.
- Validar antes de salvar/importar; erros devem explicar a correção em português e preservar o trabalho válido.
- Confirmar substituição de catálogo por exemplo/importação e exclusões destrutivas na interface.
- Não gerar QR enganoso com URL local: exigir endereço http(s) público informado pelo usuário; a ferramenta não verifica propriedade do domínio.
- Tratar indisponibilidade como informação manual do catálogo, sem sugerir estoque em tempo real.
- Preservar dados ao trocar tema; permitir preços e nomes de variações explícitos.

## Aceitação e medidas

A rastreabilidade de requisito, evidência, risco, aceite e teste está em [requirements.csv](requirements.csv). [acceptance-tests.md](acceptance-tests.md) define cenários reproduzíveis. Testes automáticos verificam contrato, roundtrip e segurança da geração; navegação real verifica edição, exportação, mobile e teclado. O gate de lançamento inclui build reproduzível, demos navegáveis, ausência de credenciais e limitações públicas.

Não há metas numéricas apresentadas como resultado. Em avaliação futura, medir tempo até exportar primeiro catálogo, erros por tarefa, recuperação após falha e compreensão do aviso de publicação. Registrar dispositivo, rede, versão, participantes e tempos reais antes de calcular taxas. WCAG 2.2 AA é uma meta de verificação, não certificação.

## Riscos e decisões

Persistência local pode ser apagada, imagens grandes atingem quota e URLs remotas podem falhar ou registrar visitas. O usuário precisa entender a diferença entre salvar, exportar e publicar. Servidores de hospedagem têm políticas e custos próprios. O núcleo estático reduz infraestrutura, mas exige cuidado contínuo com DOM, foco, escape e regressão. A [ADR-001](../docs/adr/001-static-core.md) registra as alternativas.
