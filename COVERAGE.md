# Cobertura real das referências — requisito ainda não atendido integralmente

**Nenhum fornecedor tem paridade funcional integral homologada nesta entrega.** A aplicação é experimental. A existência de pesquisa, cadastro acessível ou código local não comprova exploração operacional do painel de referência.

| Etapa | Comprovação desta execução |
|---|---|
| Inventário documental |44 soluções/8 abas/42 critérios legados|
| Concorrentes prioritários |8 dossiês com pesquisa atual e observações públicas parciais|
| Formulário enviado |0|
| Conta ativada |0|
| Login confirmado |0|
| Fluxos administrativos autenticados concluídos |0|
| REA instalado/MCP |6.7.0/207 ferramentas reais|
| Análise concluída por REA |0; bloqueio process-ownership/ps documentado|
| Núcleo VitraLibre |Editor estático, JSON/HTML, pesquisa/categorias/preços/variantes e compartilhamento; limites por capacidade na matriz|
| Paridade operacional integral |Não verificada para nenhum fornecedor|

## Rastreabilidade

- [Matriz referência → funcionalidade → implementação → teste](research/reference-to-implementation.csv):1848 relações (44×42), sem transformar NV em ausência do recurso.
- [Cobertura de acesso por fornecedor](research/reference-access-coverage.csv):44 linhas.
- [Log dos oito concorrentes prioritários](research/competitors/account-attempts.csv):estado de formulário/ativação/login e impedimento.
- [Benchmark atual](research/benchmark.csv):200 registros,8 observados/67 documentais/125 NV. Documentação não é teste prático.
- [REA](research/rea/README.md) e [ferramentas](tools-capability-matrix.md):tentativa/resultado separados.

Os repositórios REA, Superpowers, OpenSpec/Spec Kit, Playwright MCP, DevTools MCP, UI/UX Pro Max e Impeccable tiveram diligências distintas, descritas em research/rea/tools-audit.md e research/impeccable/README.md. Somente REA e Impeccable foram instalados/testados nos termos ali registrados; nem todos foram executados, nem tiveram código integral revisado. Consultar um README não equivale a explorar um produto.

## Critério de aceitação para fechar a lacuna

Para cada fornecedor e recurso relevante:registrar URL/plano/termos; concluir cadastro legítimo quando permitido; confirmar ativação e login; executar a jornada real com dados fictícios e capturar resultado; especificar comportamento independente; implementar no VitraLibre se estiver no escopo aprovado; executar regressão e teste real de interface; registrar cobertura parcial/ausente quando houver diferença. Recursos fora do núcleo estático precisam de módulos backend efetivamente implementados e verificados, não apenas de roadmap.

Os44 fornecedores incluem SaaS de cardápio, catálogos, e-commerce, CMS/headless, editorial e PIM. Equivalência integral entre essas categorias não é presumida. A solicitação de cobertura completa permanece como pendência explícita; não será substituída por uma afirmação de garantia.

Navegador teve bloqueio automático por limite de uso e cadastros exigem intervenção no fluxo autorizado. Esses impedimentos não foram contornados. Exploração completa autenticada, matriz visual final e paridade continuam pendentes.
