# Interface VitraLibre

Identidade: **VitraLibre**. Slogan: **Sua vitrine. Sua marca. Sua liberdade.** A interface usa ESM nativo e CSS próprio, sem framework, CDN, fontes remotas ou recursos gráficos de terceiros. Caminhos relativos permitem implantação em subdiretórios.

## Direção visual

Painel editorial marfim (#faf9f5), navegação verde floresta (#173b30), tinta (#242e29) e detalhes cítricos (#d5e5a8). Tipografia de sistema, títulos de peso leve, ampla separação, cartões com proporção controlada e chips de disponibilidade. Três colunas em desktop, duas em tablets/celulares; navegação compacta horizontal abaixo de 650 px. As oito ilustrações SVG de produtos são originais e incluem gradientes e sombras locais. Nenhuma imagem externa é necessária nos exemplos.

## Fluxos implementados

- Produtos: criação, edição, exclusão confirmada, preço brasileiro em centavos, imagem por URL ou upload PNG/JPEG/WebP/GIF de até 1 MB, disponibilidade e variações com preço final.
- Categorias/subcategorias: criação, edição, associação e exclusão protegida pelo núcleo. Produtos podem ser realocados pelo editor; categorias-filhas, pelo editor de categorias.
- Busca sem acento e filtros por categoria/descendentes e disponibilidade; atalho `/` para busca.
- Identidade: nome, descrição, logo e três temas com amostra; os temas são aplicados ao catálogo público.
- Prévia do HTML público em iframe isolado com sandbox allow-scripts, sem allow-same-origin. Exportação HTML inclui as oito ilustrações originais como ativos embutidos.
- Backup JSON, importação validada, armazenamento local e aviso persistente do escopo por navegador. Falhas de quota/bloqueio recebem mensagem sem anunciar salvamento.
- Dois exemplos fictícios (Casa Flora e Forma Studio) e catálogo vazio; substituição de trabalho existente exige confirmação.
- Publicação é um download real mais instruções de hospedagem. Não há botão de publicação simulada. URL HTTP/HTTPS pública configurada habilita compartilhamento, link e QR real via biblioteca vendorizada; QR disponível também para download em SVG.

## Acessibilidade e limites

Dialog nativo fornece isolamento modal, foco inicial, Escape e retorno ao disparador quando presente. Campos têm labels, erros usam role alert e notificações role status; imagens têm texto alternativo; disponibilidade é textual; há foco visível e respeito a reduced-motion. CSS mantém alvos e formulários adaptados a telas estreitas. A certificação WCAG completa não é reivindicada. A verificação real de navegador é responsabilidade do fluxo QA do projeto.

Imagens HTTP/HTTPS continuam remotas quando exportadas. O upload é limitado por imagem; armazenamento disponível depende do navegador, por isso o backup é recomendado. Compartilhamento nativo/clipboard depende do ambiente, com link textual como alternativa. O catálogo público exige JavaScript para renderizar/listar e filtrar produtos.

## Evidência local

- `node --check src/app.js` e `node --check src/examples.js`: aprovados.
- `npm run lint`: sintaxe estrutural aprovada.
- `npm run build`: editor e dois catálogos públicos independentes gerados.
- Smoke JSDOM com eventos reais de input/submit/click: render dos oito produtos, pesquisa, criação de produto, criação de categoria, alteração de identidade, URL pública e persistência em vitralibre-v1 aprovados. Esse smoke usa uma implementação mínima de dialog; não substitui o QA de foco/modal no navegador.
