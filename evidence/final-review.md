# Revisão independente do código — VitraLibre

Data: 2026-10-23. Escopo: primeira entrega completa, sem commit anterior disponível. `git rev-parse --is-inside-work-tree` retornou `fatal: not a git repository`; portanto não há SHA auditado. Esta revisão descreve o estado lido antes das correções coordenadas pelo agente principal. Nenhum arquivo de implementação ou teste foi alterado por este revisor.

Foram lidos o prompt mestre, `specs/design.md`, `specs/requirements.csv`, README, implementação `src/{core,export,app,examples}.js`, CSS, testes, build, workflows e documentos de implantação/segurança. A revisão não reclassifica impedimentos documentados de REA, GitHub ou cadastros de concorrentes como execução concluída. Não executou navegador nem instalou ferramentas.

## Resultado executado

`npm run verify` terminou com código 0: lint estrutural de oito módulos, checkJs de core/export, 19 testes passando, dois catálogos HTML e build do editor. A suíte DOM é útil, mas usa JSDOM, simula `<dialog>` e desativa a regra de contraste; não comprova layout, foco nativo, CSP ou acessibilidade completa em navegador. CI remoto não foi executado por este revisor.

Não foi encontrada vulnerabilidade crítica de execução de código nas entradas revisadas. Texto do editor recebe escape antes de `innerHTML`; o runtime público usa `textContent`; JSON público neutraliza fechamento de script; URLs rejeitam esquemas ativos/credenciais; IDs são limitados e relações/ciclos verificados. `__proto__`, `constructor` e `toString` são IDs aceitos, porém o código relevante usa `Map`/comparações e não reproduziu poluição de protótipo. Preços brasileiros, referências e build passaram. Isso não equivale a uma auditoria exaustiva.

## Importantes — corrigir antes de declarar P0 completo

### I1. Uma segunda aba sobrescreve silenciosamente alterações e depois a cópia recuperável

Local: `src/app.js:8–13`, eventos no final do arquivo; `src/core.js:141–149`. Não há listener de `storage`, revisão ou comparação da versão lida com a persistida. Cada aba mantém um snapshot inteiro e o grava por cima do snapshot remoto.

Reprodução Node com o armazenamento compartilhado: salvar exemplo; carregar A e B; A altera nome para `Tab A new name` e salva; B altera o preço para 9900 e salva. O resultado é `Casa Flora`, preço 9900; o nome de A desaparece do principal. O backup ainda contém A por um instante. Uma segunda gravação de B deixa principal **e backup** com `Casa Flora`, eliminando a recuperação local de A.

Remediação: detectar alteração externa/versão divergente antes de gravar e exigir recarga ou oferecer download do trabalho local; não usar apenas um listener que substitua silenciosamente o estado. Adicionar teste de duas sessões e preservação dos dois trabalhos. Relevância: P0-11 e persistência sem perda.

### I2. Estado editável acima de 10 MB impede salvar e impede o backup recomendado

Local: `src/core.js:45–50,79–89,127–150`; `src/app.js` `uploadImage`, submit de produto e `persist`; `src/export.js:87–88`.

Upload permite até 1 MB por arquivo e o schema não limita tamanho agregado. O submit instala `catalog=validateCatalog(next)` antes de `persist`; falha de persistência mantém o novo estado em memória. O aviso pede exportar JSON, porém JSON e HTML têm limite agregado de 10 MB.

Reprodução: oito produtos com imagem `data:image/png;base64,...`, cada arquivo de 1.048.576 bytes, produzem JSON compacto de 11.187.175 bytes. `validateCatalog` aceita; `saveCatalog` retorna `ok:false`; `serializeCatalog` lança `O arquivo ultrapassa o limite de 10 MB.`; `exportCatalogHtml` lança `O catálogo exportado ultrapassa o limite de 10 MB. Reduza as imagens.` A reprodução também usou assinatura PNG real de um PNG 1×1 seguida por preenchimento até o limite, portanto não depende de ultrapassar a validação individual de tamanho.

Remediação: validar capacidade agregada antes de instalar a alteração, preservar o estado anterior e exibir instrução específica; manter uma rota de exportação de emergência que realmente consiga guardar o estado já presente. Testar a passagem do limiar e a recuperação após quota. Relevância: P0-08, P0-11 e P0-12.

### I3. URL Unicode importada gera QR sem o destino correto

Local: `src/core.js:36–42,87–89` retorna a URL original, enquanto `src/app.js:22` usa o conversor padrão de bytes de `qrcode-generator`. O formulário de URL normaliza por `new URL(...).href`, mas importar JSON não faz essa normalização.

Reprodução com a mesma biblioteca e `jsqr`: controle ASCII `https://example.org/catalogo.html` decodifica exatamente; `validateCatalog` aceita `https://loja.exemplo/ação` e `https://example.org/東京/😀` sem normalizar; os dois QR resultantes retornam `data: ''` no decodificador. A URL canônica do primeiro seria `https://loja.exemplo/a%C3%A7%C3%A3o`.

Remediação: normalizar a URL pública no contrato para `new URL(value).href`, ou configurar codificação QR UTF-8 correta e cobri-la com decodificação. Preservar roundtrip semântico e testar caminho/domínio Unicode importado. Relevância: P0-14 exige QR com URL exata e utilizável.

### I4. Texto essencial não atinge contraste AA

Local: `src/styles.css:1` e ajustes de tamanho nos media queries; teste de axe em `tests/editor.test.mjs` desativa `color-contrast`.

Razões calculadas diretamente pelas fórmulas sRGB/WCAG para as cores declaradas, sem alegar medição de navegador:

| Texto | Frente / fundo | Razão | Tamanho normal declarado |
| --- | --- | --- | --- |
| Descrição de produto | `#94998b` / `#fffefb` | 2,90:1 | 8–11 px |
| Categoria | `#8f987e` / `#fffefb` | 2,99:1 | 5,5–8 px |
| Descrição do cabeçalho | `#83877b` / `#faf9f5` | 3,49:1 | 10–11 px |
| Aviso de armazenamento | `#7a836c` / `#f0f3e8` | 3,53:1 | 8–9 px |
| Legenda de variantes | `#9ba18f` / `#fffefb` | 2,64:1 | 6–7 px |

Todos ficam abaixo de 4,5:1 para texto normal. Os tamanhos muito pequenos no celular também merecem revisão visual, sem presumir automaticamente uma infração adicional só pelo tamanho.

Remediação: escurecer cores efetivamente usadas, conferir todos os temas/estados e repetir inspeção real nas larguras planejadas. Não declarar WCAG AA a partir da execução atual de axe. Relevância: P0-16.

### I5. Distribuição build/HTML não acompanha a licença MIT do próprio runtime

Local: `scripts/build.mjs`, `src/export.js:89–93`, `LICENSE`. O build inclui corretamente `vendor/QR-LICENSE.txt`, mas não copia o `LICENSE` do projeto. O HTML independente inclui todo o runtime público e CSS, porém não inclui o aviso de copyright/licença MIT. `rg 'MIT|Copyright' dist/restaurant.html dist/index.html dist/src/export.js` não encontra aviso; o inventário de `dist` não contém licença do projeto.

Remediação: distribuir o `LICENSE` em `dist/` e incorporar aviso/licença do código próprio no HTML independente, por exemplo em comentário preservado. Isso permite que quem receba apenas o produto estático preserve as condições do código distribuído. Relevância: requisito absoluto de preservar licença/autoria; não há evidência de uso de ativos proprietários nesta implementação.

## Menores e limites concretos

- `src/app.js:26–27` apresenta somente categorias raiz como opções de pai, mas o schema aceita profundidade arbitrária e o próprio editor permite transformar uma raiz com filhas em subcategoria de outra raiz. Reabrir uma neta seleciona `Nenhuma` porque seu pai não está no `<select>`; salvar só o nome remove `parentId`. Alinhar contrato/UI ou preservar/representar a hierarquia existente.
- `src/app.js:16` usa `tablist`/`tab`, mas não implementa setas, `tabindex` gerenciado, associação de `tabpanel` ou foco após reconstruir o DOM. Preferir botões de navegação comuns ou completar o padrão de tabs e verificar teclado real. A ausência de achados no scanner não cobre esse comportamento.
- `docs/deployment.md` orienta exportar/publicar antes de configurar a URL. O HTML já enviado permanece com `publicUrl:''`; o seu botão público de compartilhar só funcionará depois de nova exportação/deploy. Incluir essa etapa após salvar o endereço.
- No início de `src/app.js`, `saved=true` também vale quando a leitura encontrou dados inválidos e carregou apenas o exemplo em memória. Embora um toast informe o problema, o status pode dizer `Salvo neste dispositivo`. Derivar esse estado do resultado real de carga/persistência.
- `README.md` já aponta para `STATUS.md`, mas esse arquivo ainda não existia no momento desta revisão. O agente principal está finalizando documentação; verificar presença e links antes de empacotar.

## Portabilidade e próximos gates

Os caminhos normais do build (`./src`, `./vendor`, exemplos e assets `./assets`) são relativos e adequados a subdiretório GitHub Pages por inspeção. Imagens próprias importadas com `/assets/...` são aceitas e incorporadas corretamente pelo exportador, mas o editor as resolve na raiz do domínio: não assumam que renderizam numa publicação em subdiretório. Não foi executado deploy GitHub nem navegação real desse cenário.

Prévia usa `iframe sandbox="allow-scripts"` sem `allow-same-origin`, uma boa fronteira entre consumidor e editor. As ilustrações próprias são embutidas em data URI; URLs de imagens externas continuam externas, como o README documenta. Build usa Node, lockfile e dependência QR local; workflows executam instalação com scripts desabilitados e verificação, porém existência do YAML não comprova CI executada.

Recomendação: corrigir I1–I5, executar regressões específicas e manter separado o resultado de browser/contraste/teclado/publicação real. Esta revisão não autoriza afirmar que esses gates já passaram.
