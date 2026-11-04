# Extensão experimental: desenhos técnicos com CADCraft MCP

Esta extensão é um experimento **opcional, local e isolado** para catálogos de móveis,
decoração e produtos sob medida. Ela gera um retângulo técnico com medidas em
milímetros, exporta **PNG** (imagem que pode ser adicionada a um produto no editor)
ou **DXF** (desenho editável).

O VitraLibre continua sendo um editor estático de catálogos. O contrato JSON v1,
a publicação de HTML independente e a experiência dos restaurantes não mudam.
A extensão **não** está publicada no site principal e não cria um backend obrigatório.

## Pré-requisitos

- Node.js 24 (o projeto recomenda essa versão).
- O binário `cadcraft-cli` instalado e acessível no PATH; ou `CADCRAFT_BIN`
  apontando para o executável local.
- Um ambiente que possa executar processos nativos (o host estático, sozinho, não pode).

## Executar

Na raiz do repositório:

```sh
cadcraft-cli --help
npm ci --ignore-scripts
npm run build
node extensions/cadcraft/server.mjs
```

Abrir `http://127.0.0.1:8765/editor/` para usar o editor completo; em um catálogo do segmento **loja**, a edição de produtos oferece um link para `/cadcraft/` quando o serviço está ativo. Também é possível acessar diretamente `http://127.0.0.1:8765/cadcraft/`.
Opcionalmente definir `CADCRAFT_PORT` de 1024 a 65535, com a sintaxe do
sistema operacional. O servidor escuta **somente 127.0.0.1**.

O editor continua estático e funciona sem o serviço CAD. A versão pública não mostra a extensão quando `/api/cadcraft/health` está ausente.

Inserir largura e altura (1–10.000 mm), selecionar formato e gerar. A
extensão cria uma sessão MCP headless descartável, executa
`new_drawing`, `command_line` (RECTANG), `inspect_drawing` e `save`,
inspeciona a assinatura do arquivo exportado e destrói o diretório
temporário. Os comandos recebem apenas números validados e caminhos
gerados pelo próprio servidor.

### Desenhos de organizadores e divisórias

A extensão agora oferece **divisórias verticais e horizontais igualmente espaçadas**,
de 0 a 8 em cada direção. O contorno segue sendo um retângulo simples, com as
cotas externas em milímetros. Uma grade com 2 divisórias verticais e 1 horizontal
cria 6 compartimentos nominais.

Exemplo: uma placa de 600 × 400 mm, com 2 divisórias verticais e 1 horizontal,
produz intervalos nominais de 200 × 200 mm e três entidades LINE adicionais
no espaço de desenho DXF. As dimensões são **nominais** e **não consideram
espessura das paredes/divisórias, folgas de montagem, tolerâncias, encaixes,
uniões ou fabricação**. Não utilizar como plano de corte sem revisão técnica.

O backend valida o número de divisórias (0–8), exige inteiros e impede
compartimentos inferiores a 25 mm no eixo subdividido. Um retângulo puro
continua válido nas medidas anteriores. Os comandos LINE são sempre
construídos a partir de números validados e executados em uma sessão MCP
descartável. Não existe entrada para comandos arbitrários.

A interpretação gratuita e o planejador generativo continuam extraindo
apenas as **dimensões externas**. O número de divisórias é escolhido por
controles específicos e **não é inferido pela IA**.

### Vincular a imagem ao produto

1. Em `/editor/`, abra ou crie um produto de **loja**.
2. Clique em **Gerar desenho técnico com CADCraft**; o gerador abre em outra aba.
3. Informe as medidas ou use a instrução **Desenhe um painel de 60 x 40 cm**.
4. Clique em **Interpretar medidas**, revise os números e **Gerar com CADCraft MCP**.
5. Escolha **PNG** e clique em **Aplicar imagem ao produto no VitraLibre**.
6. Volte ao editor, confira a imagem na prévia e **clique em Salvar produto**.

A transferência ocorre entre as duas abas na **mesma origem local**, usando
BroadcastChannel com identificador aleatório e vínculo ao formulário ainda aberto.
O tamanho máximo da imagem é 1 MiB, conforme a regra já existente no editor.
A operação **não salva automaticamente** e não substitui o backup JSON.
O canal é fechado ao concluir a aplicação ou fechar o formulário.
Se o navegador não oferecer BroadcastChannel, ainda é possível baixar o PNG e
enviá-lo manualmente pelo campo de imagem existente.

Um DXF continua disponível para download e edição fora do site, mas não é
armazenado no JSON v1 do VitraLibre.

### Comandos em linguagem natural

O botão **Interpretar medidas** utiliza um parser **determinístico local**,
não um agente com LLM. Ele só aceita pedidos de desenhos retangulares com
duas medidas e unidade explícita (mm, cm ou m), como
`Crie um cômodo de 4 x 5 metros`. Não existe execução de comandos livres:
nenhuma frase é repassada diretamente ao MCP.

## Planejamento com IA (opcional e desativado por padrão)

Além do interpretador local gratuito, a extensão suporta um **planejador
generativo** usando a [OpenAI Responses API](https://platform.openai.com/docs/guides/structured-outputs).
Ele é **opcional**, não utiliza automaticamente a assinatura do ChatGPT
e pode gerar custos de API. Não configure credenciais para manter o modo
inteiramente gratuito.

Para habilitar no **ambiente do processo**, configure as variáveis:

- `OPENAI_API_KEY`: chave criada pelo proprietário no serviço de API,
  mantida no backend e **nunca** adicionada ao repositório, HTML ou frontend.
- `CADCRAFT_AI_MODEL`: identificador de um modelo da conta que aceite
  Structured Outputs no Responses API.

Recomenda-se utilizar o gerenciador de segredos do ambiente. Reinicie o servidor
após configurar as variáveis. A rota de saúde ativa o botão
**Planejar com IA (opcional)** apenas se ambas estiverem presentes.

**Fluxo:** o usuário digita o pedido → clica em Planejar com IA →
o servidor consulta o modelo com schema JSON estrito →
valida os campos e os limites de 1 a 10.000 mm →
preenche largura/altura → **aguarda o usuário clicar em Gerar** →
executa o fluxo MCP determinístico já homologado. A resposta do modelo
**nunca** é enviada como comando livre ao CADCraft.

Controles adicionais:

- Somente solicitações de retângulos, com duas medidas numéricas e unidade
  explícita, até 280 caracteres.
- O modelo não recebe arquivos, catálogos, dados de produtos ou credenciais.
- Endpoint externo fixo, `store:false`, timeout de 12 segundos e máximo
  de 400 tokens de saída. A política de retenção do provedor deve ser
  avaliada separadamente; `store:false` não significa zero retenção.
- **No máximo seis consultas ao modelo por hora**, por processo do servidor;
  falhas também podem contar, e reiniciar o serviço reinicia a contagem.
  Esse limite não substitui controles de gasto e cotas na conta da API.
- Limites de medidas, lista de ferramentas e política de arquivos continuam
  validados pelo backend, independentemente do modelo.
- Sem chamadas de IA durante testes e em uso sem configuração.
- Testes automatizados simulam o provedor. **Não foi homologada nesta
  execução uma requisição cobrada a um modelo de produção**, pois não há
  credenciais de API fornecidas para essa finalidade.

## Limites e segurança

- Uso **local, mono-usuário e experimental**. Não expor a porta na internet,
  colocar atrás de proxy público ou publicar sem autenticação, isolamentos,
  controle de tenants, cotas, observabilidade, CSRF e auditoria adicionais.
- O frontend só usa HTTP na origem local; verificações de Host, Origin e
  cabeçalho próprio, além de CSP e limitação de uma geração de cada vez.
- Sem comandos arbitrários, uploads, DWG ou operações sobre arquivos do
  usuário. A origem não pode pedir um caminho arbitrário ao MCP.
- Os diretórios temporários são removidos ao terminar, inclusive após erro.
- O modelo generativo, quando configurado, **apenas propõe medidas**. A execução
  continua determinística; sem configuração, nenhuma consulta a IA é feita.
  MCP é um protocolo de ferramentas, não um modelo de linguagem.
- Não foi estabelecido que todo desenho exportado será interoperável com o
  AutoCAD. O CADCraft é um projeto em desenvolvimento inicial.
- Os testes automatizados verificam contrato MCP simulado, segurança e regras de
  negócio. O workflow também usa o CADCraft **real** e Chromium headless para
  comprovar geração e aplicação da imagem ao produto.

## Validação

```sh
node --test tests/cadcraft.test.mjs
npm run verify
```

**Execução automatizada real:** o workflow `CADCraft MCP E2E (experimental)`
usa CADCraft 0.17.0 e testa a geração de PNG e DXF por MCP, com verificação
SHA-256 do artefato de release. O mesmo workflow inicia o servidor local,
abre o **Chromium headless**, cria a imagem via MCP real, aplica-a ao produto
em duas abas e verifica persistência apenas após clicar em salvar. O teste
registra PNG/DXF e screenshots como artefatos. O ciclo de integração no
navegador está validado automaticamente, mas permanece pendente a
homologação humana de UX e compatibilidade geométrica ampla.

**Execuções CI de referência:**
- [Verificação geral](https://github.com/sylviohmartins/vitralibre/actions/runs/41774420957)
- [CADCraft real + Chromium](https://github.com/sylviohmartins/vitralibre/actions/runs/41774420975)

O workflow também executa um desenho parametrizado com divisórias e confere as três entidades LINE no espaço de desenho, excluindo os blocos gráficos de cotas.

Validações manuais adicionais pendentes:
1. Criar retângulo 600 × 400 mm e baixar PNG.
2. Confirmar que o PNG abre e mostra a geometria solicitada.
3. Gerar DXF e reabrir em uma ferramenta CAD independente.
4. Confirmar geometria, unidades, dimensões e ausência de perda de dados.
5. Exercitar entradas inválidas, duas chamadas concorrentes, CLI ausente
   e encerramento por timeout.
6. Verificar que a publicação estática do VitraLibre continua operando.

## Decisão arquitetural

| Abordagem | Avaliação |
| --- | --- |
| A — WebAssembly | Em tese poderia rodar desenho no navegador, mas integrar o projeto Rust/egui à UI atual traz build, tamanho e suporte de arquivo adicionais. |
| B — CLI + MCP em serviço local | **Escolhida para a prova de conceito.** Menor mudança no VitraLibre e permite verificar um fluxo CAD real em máquina compatível. |
| C — Híbrida | Faz sentido apenas se um módulo CAD permanente tiver demanda e infraestrutura operacional justificadas. |

Próximas etapas, mediante necessidade comprovada: homologar o modelo com
credenciais próprias sob cota reduzida, armazenar anexos DXF em esquema
versionado, revisar UX/acessibilidade em dispositivos reais e desenvolver serviço
multiusuário seguro. O planejador não equivale a um agente CAD geral. Não converter o catálogo estático
em aplicação dependente de backend.
