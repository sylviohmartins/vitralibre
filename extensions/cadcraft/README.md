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

## Limites e segurança

- Uso **local, mono-usuário e experimental**. Não expor a porta na internet,
  colocar atrás de proxy público ou publicar sem autenticação, isolamentos,
  controle de tenants, cotas, observabilidade, CSRF e auditoria adicionais.
- O frontend só usa HTTP na origem local; verificações de Host, Origin e
  cabeçalho próprio, além de CSP e limitação de uma geração de cada vez.
- Sem comandos arbitrários, uploads, DWG ou operações sobre arquivos do
  usuário. A origem não pode pedir um caminho arbitrário ao MCP.
- Os diretórios temporários são removidos ao terminar, inclusive após erro.
- Sem modelo de linguagem generativo: **MCP é um protocolo de ferramentas, não uma IA**.
  A interpretação atual é limitada a medidas retangulares e validada antes
  de executar CAD. Um futuro LLM precisa de chave e orçamento explícitos,
  ações em lista permitida e testes contra prompt injection.
- Não foi estabelecido que todo desenho exportado será interoperável com o
  AutoCAD. O CADCraft é um projeto em desenvolvimento inicial.
- Os testes automatizados desta extensão usam um servidor MCP simulado para
  verificar handshake, contratos HTTP e controles de segurança. A homologação
  com o binário CADCraft real exige um teste separado no ambiente com CLI.

## Validação

```sh
node --test tests/cadcraft.test.mjs
npm run verify
```

**Execução automatizada real:** o workflow `CADCraft MCP E2E (experimental)`
usa CADCraft 0.17.0 e testa a geração de PNG e DXF por MCP, com verificação
SHA-256 do artefato de release. Os testes de interface usam jsdom e um
processador MCP simulado. Ainda falta homologação visual/manual em navegador real.

Homologação visual/manual pendente:
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

Próxima etapa, somente mediante necessidade comprovada: armazenar anexos DXF
com esquema versionado, incluir agente generativo com credenciais e limites
de custo opcionais, validar no navegador real e desenvolver serviço
multiusuário seguro. Não converter o catálogo estático
em aplicação dependente de backend.
