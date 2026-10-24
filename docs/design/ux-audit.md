# Auditoria e refinamento UX/UI — VitraLibre
Data da execução: 23/10/2026, horário de São Paulo.

Impeccable 4.7.0 foi obtido da origem oficial e instalado com escopo projeto, provedor Codex e sem hooks automáticos. Contexto real executado; PRODUCT.md e DESIGN.md lidos pelo engine. Comandos audit/critique/typeset/adapt/harden/document são fluxos de skill, não subcomandos CLI executáveis: seus critérios foram aplicados à revisão e à implementação. Nenhuma alegação de slash command reconhecido nativamente pelo Work.

## Evidências e prioridades
| Problema | Evidência inicial | Correção | Validação / limite |
|---|---|---|---|
| P1 texto de produto com baixo contraste | 2,90:1 nos estilos iniciais, teste vermelho | Texto semântico #59634f sobre superfícies claras | Teste de contraste dos cinco seletores essenciais verde; contraste completo/renderizado pendente |
| P1 tipografia e toque mobile | CSS com legendas 5,5–9 px e controles pequenos | Uma coluna <=650 px, descrições 15 px, campos16px, controles44px | CSS e regressão DOM; viewports reais ainda pendentes |
| P1 perda de edição entre abas | Teste reproduziu sobrescrita de nome externo | Detecção de snapshot divergente, aviso persistente, backup e recarga explícita | Teste vermelho→verde; sem promessa de transação entre escritas exatamente simultâneas |
| P1 tamanho total sem backup viável | Oito imagens geravam JSON >10 MiB | Schema rejeita alteração agregada antes de substituir estado; serialização compacta perto do limite | Regressões núcleo verdes |
| P1 QR com URL Unicode | Decodificador retornou destino vazio | URL canônica no schema | Teste normalização + QR da UI decodificado por jsQR |
| P1 QR com nome inacessível | axe aria-prohibited-attr | Papel img no contêiner rotulado | axe DOM verde, contraste separado |
| P2 navegação com tabs incompletas | ARIA tabs sem padrão completo | Navegação por botões comuns | axe DOM e controles sem padrão ARIA artificial |
| P2 hierarquia de categorias importada | Pai profundo não aparecia no select | Preserva todos os pais válidos e exclui descendentes para impedir ciclo | Schema e inspeção; teste UI adicional recomendado |
| P2 fonte Inter declarada sem entrega | Detector Impeccable inicial: overused-font | Pilha de sistema explícita; preserva fonte efetivamente renderizada | Detector final em research/impeccable/logs/detect-after.json |
| P2 confusão de publicação | Salvar URL não atualiza HTML já publicado | Guia exige reexportar e substituir versão hospedada | Documentação alinhada; deploy automático não anunciado |

## Superfícies
Editor e catálogo público possuem fontes de código distintas para preservar exportação independente. O catálogo tem busca, filtros, preço, disponibilidade textual e detalhes/variantes; editor inclui formularios rotulados, dados locais explícitos e modelos fictícios. O tema do editor é independente do tema da vitrine. Não há landing promocional separada, editor visual por componentes/drag-and-drop, desfazer/refazer, pedidos, pagamentos ou WhatsApp comercial nesta versão.

## Comparação responsável
A busca pública da Gopage e detalhes/variantes do Kicatálogo foram observados; anúncios dos demais continuam documentais. A portabilidade JSON/HTML do VitraLibre e a explicação de dados locais respondem ao problema de dependência operacional, sem atribuir ausência de exportação aos concorrentes não testados. Não há nota competitiva ou alegação de experiência superior por medição.

## Pessoas e dispositivos
Personas em specs/personas.md são simulações de cenários, não participantes humanos. Não foram medidos tempos, satisfação, sucesso ou desempenho em smartphone econômico. Nenhum Lighthouse ou Core Web Vitals foi executado. Após o refinamento, o navegador foi bloqueado por revisão automática por limite de uso: sem nova captura, sem matriz 320/375/390/768/1024/1440 executada e sem certificação WCAG AA. Capturas anteriores foram exibidas na sessão, sem arquivo antes/depois salvo. Não fabricar essas evidências.
