# Evolução de VitraLibre

**Direção atual:** descoberta operacional antes da ampliação. A [ordem completa dos44 fornecedores e a sequência proposta de implementação](research/discovery/ORDEM_EXPLORACAO_IMPLEMENTACAO.md) detalham a fila e as dependências. As etapas abaixo são a priorização anterior e não autorizam retomar funcionalidades antes da revisão de descoberta.

Este roadmap define prioridade, não conclusão ou prazo contratado. Entregas verificadas e bloqueios estão em [STATUS](STATUS.md); requisitos rastreáveis em [specs/requirements.csv](specs/requirements.csv).

| Etapa | Resultado esperado | Condição para avançar |
| --- | --- | --- |
| P0 — núcleo local | Edição, categorias/subcategorias, variantes, disponibilidade, temas, imagens, busca, persistência e JSON/HTML; restaurante e loja | `npm run verify` aprovado e fluxos reais documentados; sem perda de dados no roundtrip |
| P0 — distribuição | Código licenciado, documentação iniciante, demonstração navegável, repositório público ou pacote com bloqueio explícito | URL e commit reais ou evidência do impedimento; publicação dentro da política do provedor |
| P1 — uso e acessibilidade | Reduzir fricções medidas, revisar leitor de tela e entrada móvel, medir desempenho em rede definida | Sessões consentidas e evidências; não substituir pesquisa por avaliação do mantenedor |
| P1 — administração local | Ordenação, duplicação/edição em massa, CSV e diagnóstico de mídia | Problema priorizado; formatos e limites definidos; migração e regressão de exportação testadas |
| P2 — serviço opcional | Contas, papéis, várias lojas, mídia, API e persistência compartilhada | Novo ADR; modelo de ameaça, custos, isolamento, backups e operação definidos |
| P2 — comércio opcional | Pedidos, estoque e integrações; checkout externo se necessário | Requisitos validados e ambiente de simulação; nenhum pagamento real sem autorização |
| P3 — expansão | Idiomas, extensões e métricas com privacidade | Demanda demonstrada, escopo sustentável e política de dados clara |

Nenhum incremento dinâmico deve tornar o catálogo estático dependente de SaaS pago. Preservar exportação e compatibilidade ou prover migração explícita. A pesquisa concorrencial é insumo; não há compromisso de copiar a lista de funcionalidades de um serviço.

Pendências externas, como conta GitHub autenticada ou autorização do provedor, devem ser registradas com ação mínima e evidência. Criar configuração ou cadastrar um Site não prova repositório público, deploy ou pipeline executado.
