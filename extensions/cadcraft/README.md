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

Para ilustrar um produto no VitraLibre: gerar PNG, baixar o arquivo e
usar o upload de imagem existente no editor. **Essa associação ainda é
manual.** O arquivo CAD não vira automaticamente uma propriedade do
catálogo. O VitraLibre não armazena um arquivo DXF em seu JSON v1.

## Limites e segurança

- Uso **local, mono-usuário e experimental**. Não expor a porta na internet,
  colocar atrás de proxy público ou publicar sem autenticação, isolamentos,
  controle de tenants, cotas, observabilidade, CSRF e auditoria adicionais.
- O frontend só usa HTTP na origem local; verificações de Host, Origin e
  cabeçalho próprio, além de CSP e limitação de uma geração de cada vez.
- Sem comandos arbitrários, uploads, DWG ou operações sobre arquivos do
  usuário. A origem não pode pedir um caminho arbitrário ao MCP.
- Os diretórios temporários são removidos ao terminar, inclusive após erro.
- Sem modelo de linguagem: **MCP é um protocolo de ferramentas, não uma IA**.
  Adicionar entendimento de linguagem natural exigiria um agente autorizado,
  orçamento de execução, revisão de comandos e testes contra prompt injection.
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

Homologação com CADCraft real (pendente até haver binário executável):
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

Próxima etapa, somente mediante necessidade comprovada: associar desenhos a
produtos por uma extensão de esquema versionada, incluir agente de IA opcional
e desenvolver serviço multiusuário seguro. Não converter o catálogo estático
em aplicação dependente de backend.
