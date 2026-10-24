# VitraLibre

**Sua vitrine. Sua marca. Sua liberdade.**

Plataforma open-source para criação, personalização, gerenciamento e publicação de catálogos digitais interativos, destinada a restaurantes, comércios e outros segmentos.

Editor open-source de catálogos digitais em português: edite no navegador, guarde seus dados em JSON e gere um catálogo HTML independente. O núcleo é estático e não exige conta, backend ou serviço pago. As demonstrações **Casa Flora** (restaurante) e **Forma Studio** (loja) usam marcas, conteúdo e ilustrações próprios e fictícios.

**Cobertura das referências:** [COVERAGE.md](COVERAGE.md). Nenhuma paridade integral com concorrentes foi homologada; nenhum cadastro/login de avaliação foi concluído.

**Estado da entrega, resultados executados e URLs comprovadas:** [STATUS.md](STATUS.md). Os critérios desejados estão em [specs/requirements.csv](specs/requirements.csv); sua presença na especificação não significa que já passaram por todos os testes. A versão inicial é experimental.

## Executar localmente

Use Node.js 24 e npm. As versões estão fixadas em `package-lock.json`.

```sh
npm ci --ignore-scripts
npm run verify
python3 -m http.server 4173 --directory dist
```

Abra `http://localhost:4173`. O comando `verify` executa lint, verificação de tipos com JSDoc/checkJs, testes e build. O servidor Python é uma opção de prévia local; qualquer servidor de arquivos estáticos serve `dist/`. Abrir diretamente o editor por `file://` pode bloquear módulos JavaScript.

O build produz:

| Arquivo | Uso |
| --- | --- |
| `dist/index.html` + `src/`, `assets/`, `vendor/` | Editor local; publique a pasta inteira para disponibilizá-lo |
| `dist/restaurant.html` | Catálogo demonstrativo de restaurante |
| `dist/retail.html` | Catálogo demonstrativo de loja |
| `dist/restaurant.json`, `dist/retail.json` | Exemplos editáveis e portáveis |

## Criar e compartilhar

1. Abra o editor e escolha um exemplo. Trocar o exemplo substitui o catálogo atual: exporte um JSON antes.
2. Edite identidade, categorias, produtos, preços, imagens, variações e disponibilidade. Confira a prévia.
3. Exporte o JSON para backup. O salvamento no navegador pertence a esse dispositivo e origem; limpar os dados do navegador pode removê-lo.
4. Exporte o HTML público, abra o arquivo e confira o conteúdo. Para publicá-lo, siga [docs/deployment.md](docs/deployment.md).
5. Depois de receber a URL pública do provedor, configure-a no editor. Compartilhamento e QR Code precisam desse endereço publicado.

**Salvar no editor online não atualiza o catálogo publicado.** Exporte novamente e substitua o arquivo no provedor sempre que fizer alterações. Uma URL de prévia local ou `file://` não funciona no celular de outra pessoa.

O catálogo exportado incorpora estilo, comportamento e as ilustrações próprias. Imagens enviadas são armazenadas no JSON; imagens por URL continuam dependendo do servidor externo. Não há pedidos, pagamento, estoque sincronizado, autenticação, colaboradores ou analytics centralizados nesta versão.

## Estrutura e desenvolvimento

- `src/core.js`: contrato v1, validação, preços, filtros e persistência local.
- `src/export.js`: geração do catálogo público independente.
- `src/examples.js`, `public/assets/`: demonstrações e ilustrações originais.
- `tests/`, `evidence/`: testes executáveis e registros de verificação.
- `research/`: fontes e evidências concorrenciais; observação e documentação são diferenciadas de teste real.
- `specs/`, `docs/`: produto, arquitetura, segurança e publicação.

Consulte [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), [ROADMAP.md](ROADMAP.md), [arquitetura](docs/architecture.md) e [ADR-001](docs/adr/001-static-core.md). Licença do projeto: [MIT](LICENSE); avisos das dependências devem ser preservados na distribuição. Nenhum código ou ativo proprietário de concorrentes integra a implementação.

GitHub Pages é uma rota para documentação e demonstração fictícia, sujeita às políticas do serviço. Para uso comercial, compare alternativas e limites em [docs/deployment.md](docs/deployment.md). Software sem custo de licença não elimina custos de domínio, hospedagem, mídia ou manutenção.

## Demonstração publicada nesta execução

https://vitralibre.sylviohmartins.chatgpt.site

Publicação confirmada pelo provedor. Versão experimental: revisão visual final ainda pendente; há medições parciais de layout em nove larguras, descritas em STATUS.md. Os dados de edição permanecem apenas no seu navegador. Repositório público criado pelo proprietário: https://github.com/sylviohmartins/vitralibre . Código publicado e [CI aprovada](https://github.com/sylviohmartins/vitralibre/actions/runs/40071641939). A publicação do código e a CI não homologam paridade funcional com concorrentes.
