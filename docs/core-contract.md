# Contrato do núcleo VitraLibre

Módulos ESM nativos, sem dependências de execução. `src/core.js` contém os tipos JSDoc `Catalog`, `Category`, `Product` e `Variant`; `src/export.js` gera o catálogo público. O editor não é incluído no HTML exportado.

## Dados e validação

`validateCatalog(input)` lança `Error` com mensagem em português quando há dados inválidos e devolve uma cópia normalizada, sem campos desconhecidos. Objetos/arrays não são compartilhados com a entrada. Textos são aparados nas extremidades.

| Campo/regra | Limite |
| --- | --- |
| Versão | Número literal `1` |
| Segmento | `restaurant`, `retail` |
| Tema | `forest`, `terracotta`, `midnight` |
| IDs | 1–80 caracteres; letras ASCII, números, `_`, `-` |
| Nome do catálogo/produto | 1–160 caracteres |
| Nome da categoria/variação | 1–100 caracteres |
| Descrição | 0–2.000 caracteres |
| Categorias / produtos / variações por produto | 200 / 1.000 / 30 |
| Preço | Número inteiro seguro, de 0 a 100.000.000 centavos |
| Disponibilidade | Booleano, sem coerção de strings |
| URL pública | Vazia ou HTTP/HTTPS sem credenciais, até 2.048 caracteres antes e depois da normalização |
| Catálogo aceito / JSON importado e exportado | Até 10 MiB, medidos como UTF-8 na representação JSON compacta normalizada |

Todos os campos do contrato v1 de `specs/design.md` são obrigatórios, exceto `Category.parentId`. Uma categoria raiz pode omitir `parentId` ou enviar string vazia. IDs de categorias são únicos na lista de categorias; IDs de produtos, na lista de produtos. As referências de categorias devem existir e não podem formar ciclos. Produto deve pertencer a uma categoria existente. Não há coerção de preço ou disponibilidade. A validação também mede o tamanho agregado do catálogo normalizado antes de aceitar uma alteração, incluindo todas as imagens. Um catálogo que excede 10 MiB é recusado mesmo quando cada imagem individual está dentro do teto.

A URL pública é normalizada por `new URL(value).href`: hostname internacional vira punycode e caracteres Unicode do caminho, consulta e fragmento são percentualmente codificados. Isso mantém o endereço ASCII usado por compartilhamento e QR e preserva o destino de URLs como `/ação/東京/😀`. A normalização é idempotente; o limite de comprimento também é aplicado ao endereço resultante.

`safeImage(url)` aceita string vazia, HTTP/HTTPS sem credenciais e raster base64 `image/png`, `jpeg`, `webp` ou `gif`. Recusa SVG importado, caminhos arbitrários, URLs de protocolo relativo e esquemas ativos. O teto de cada string de imagem é 7 MiB; o teto agregado de JSON continua valendo. Imagens próprias são permitidas em `assets/`, `./assets/` ou `/assets/`, exclusivamente com os nomes `meal.svg`, `salad.svg`, `dessert.svg`, `drink.svg`, `bag.svg`, `vase.svg`, `lamp.svg`, `chair.svg`, `logo.svg`.

## Funções

| API | Resultado |
| --- | --- |
| `parsePrice(string)` | Centavos inteiros; aceita `12`, `12,50`, `12.50`, `R$ 1.234,56`; `1.234` significa 1.234 reais. Rejeita negativos, exponenciais e mais de duas casas decimais. |
| `formatPrice(cents)` | Moeda brasileira via `Intl.NumberFormat('pt-BR')`; valida centavos. |
| `filterProducts(catalog, {query='', categoryId='', availableOnly=false}={})` | Produtos por nome/descrição sem distinguir acentos ou caixa, categoria incluindo descendentes e disponibilidade. Não modifica o catálogo. |
| `deleteCategory(catalog, id)` | Nova cópia do catálogo; lança erro se a categoria não existe, tem filhas ou contém produtos. |
| `escapeHtml(string)` | Escapa `&`, `<`, `>`, aspas simples e duplas. |
| `serializeCatalog(catalog)` | JSON validado/normalizado com teto de tamanho. Usa indentação quando cabe e formato compacto perto do limite, garantindo que um catálogo aceito continue exportável em JSON. |
| `importCatalog(text)` | Valida tamanho antes de analisar o JSON; devolve catálogo normalizado. |
| `saveCatalog(storage, catalog)` | `{ok:true}` ou `{ok:false,error:string}`. Não lança em falha de armazenamento. |
| `loadCatalog(storage)` | `{catalog:Catalog\|null,error?:string,recovered?:boolean}`. Não lança em falha de leitura. |
| `exportCatalogHtml(catalog, assets={})` | String HTML pública e independente. Pode lançar erro de validação, ativo ausente/inválido ou tamanho. |

`storage` é qualquer objeto com `getItem(key):string|null` e `setItem(key,value)`, incluindo `localStorage`. As chaves atuais são `vitralibre-v1` e `vitralibre-v1-backup`. Um salvamento conserva a versão anterior íntegra no backup; o primeiro salvamento também cria backup. Falhas de quota ou bloqueio retornam aviso e não anunciam sucesso. Ao ler, tenta dados principais, backup e, depois, as chaves legadas `vitrine-aberta-v1` e `vitrine-aberta-v1-backup`. A leitura não apaga dados inválidos/legados nem grava silenciosamente; o próximo salvamento usa as chaves atuais. Recuperação tem aviso em `error` e `recovered:true`.

## Exportação pública

O segundo argumento recebe um mapa **confiável** das ilustrações originais do projeto, em texto SVG. São aceitas chaves de caminho nas três formas acima ou apenas o nome do arquivo. Não se deve usar essa API para aceitar SVG de terceiros. O núcleo permite `url(#fragmento)` em gradientes/filtros locais e recusa conteúdo ativo, referências remotas e importações CSS. A imagem é convertida em URI SVG base64. Uma imagem própria ausente lança erro; não produz um catálogo com referência local quebrada.

A fonte do arquivo gerado preserva a licença MIT integral e o copyright do projeto em comentário após o doctype, permitindo redistribuição independente com o aviso original.

O arquivo gerado inclui estilos, dados e lógica de busca, categorias/descendentes, disponibilidade, detalhes/variações e compartilhamento da URL pública configurada. Nomes/descrições entram no DOM por `textContent`; a serialização JSON escapa delimitadores HTML e separadores Unicode. Título e metadados são escapados. A política CSP bloqueia conexão, objetos, formulários e scripts fora do runtime com nonce. O nonce fixo é uma camada adicional; a proteção primária continua sendo a ausência de inserção de HTML dos dados. Não há `innerHTML` para conteúdo de catálogo.

O HTML não depende de módulos, editor, CDN ou servidor. Imagens HTTP/HTTPS fornecidas pelo comerciante continuam remotas e dependem da rede; imagens próprias e raster base64 ficam embutidos. Catálogo público requer JavaScript para listar e filtrar produtos. Compartilhamento nativo e clipboard dependem do navegador/contexto seguro; há alternativa de link textual. Detalhes usam `HTMLDialogElement` de navegadores atuais. Não há pedidos, pagamentos, contas ou analytics.

## Evidência de verificação

`node --test tests/core.test.mjs`: 22 testes, incluindo tipos/limites/referências, preços, filtros sem acento, exclusão protegida, URLs/imagens, escape, JSON, quota/backup, migração legada, XSS no fechamento de script, SVG real com filtros locais e execução do HTML público no JSDOM. O teste DOM verifica busca, filtros, variações e mensagem de compartilhamento sem URL; fornece uma implementação mínima de `showModal`/`close`, pois JSDOM não comprova foco nativo do diálogo ou compartilhamento do sistema.

Logs RED→GREEN iniciais: `evidence/core-red.txt` e `evidence/core-green.txt`; regressões de migração e SVG: `evidence/core-migration-{red,green}.txt`, `evidence/core-svg-{red,green}.txt`; execução DOM: `evidence/core-dom-green.txt`. Revisão final de tamanho agregado/indentação, URL Unicode e licença integral: `evidence/core-final-review-red.txt` (quatro regressões reproduzidas) e `evidence/core-final-review-green.txt` (22 aprovados). A verificação de navegador do projeto cobre layout, teclado, foco e APIs nativas separadamente.
