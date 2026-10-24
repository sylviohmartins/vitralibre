# Publicar e atualizar um catálogo

Data de consulta das fontes: 2026-10-23. Este guia explica rotas de publicação; a existência de instruções e workflows não comprova deploy. Veja [STATUS](../STATUS.md) para URLs reais e bloqueios. O nome escolhido para o repositório é `vitralibre`; não presuma que ele já foi criado.

## Para quem usa o editor

Salvar no editor guarda o catálogo **somente neste navegador/origem**. Um editor online não publica seus dados locais automaticamente. Um consumidor precisa receber o catálogo HTML publicado, não a URL da sua sessão de edição.

1. Termine a edição e confira **Pré-visualizar**.
2. Clique em **Baixar backup** e guarde o JSON. Ele permite continuar a edição em outro dispositivo; não é a página para consumidores.
3. Na área de publicação, baixe o catálogo HTML e abra o arquivo. Verifique nome, preços, variantes e disponibilidade.
4. Crie uma pasta no seu computador e coloque uma cópia do HTML nela, renomeada para `index.html`. Ative a exibição de extensões para evitar `index.html.html`. Não coloque o backup JSON nessa pasta se não quiser publicá-lo.
5. Envie essa pasta para uma hospedagem estática compatível, como a rota de upload descrita abaixo. Use a URL HTTPS que o provedor entregar.
6. Abra a URL em janela anônima e, se possível, em outro dispositivo. Teste pesquisa, categorias e imagens.
7. No editor, informe a URL publicada e salve. Então copie/compartilhe o link ou baixe o QR. Leia o QR e confira o destino antes de imprimir.

Para atualizar: faça backup, edite, exporte novamente, substitua o `index.html` no mesmo projeto de hospedagem e confira a URL. Isso mantém o QR se o endereço não mudar. Guardar uma alteração local não modifica o HTML que já está no servidor.

O documento exportado inclui os recursos próprios necessários. Imagens por URL continuam externas; para maior independência use arquivos enviados e respeite tamanho/quota. Não publique credenciais, informações pessoais sensíveis ou fotos sem direito de uso.

## Upload manual no Cloudflare Pages

A [documentação de Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) permite enviar uma pasta ou ZIP pelo painel. Esse fluxo dispensa repositório e compilação no provedor para o catálogo já exportado.

1. Entre na sua conta Cloudflare e abra **Workers & Pages**.
2. Escolha criar aplicação e a opção de enviar arquivos por arrastar e soltar. Siga os rótulos atuais do painel.
3. Defina o nome do projeto e envie a pasta com `index.html`.
4. Conclua o deploy e copie a URL mostrada pelo serviço; não adivinhe o domínio pelo nome.
5. Para mudanças, crie uma nova implantação no mesmo projeto com a pasta atualizada.

Projetos Direct Upload não são convertidos depois em integração Git; para isso a documentação orienta criar outro projeto. O guia acima não foi apresentado como cadastro ou deploy executado nesta sessão.

A orientação atual da Cloudflare favorece Workers para novos projetos. Para nova implantação ou evolução dinâmica, avalie [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) e a orientação de migração do provedor. O P0 usa apenas arquivos estáticos e não precisa de Functions, banco ou Workers de API. Confira [limites de Pages](https://developers.cloudflare.com/pages/platform/limits/), [preço de Functions](https://developers.cloudflare.com/pages/functions/pricing/) e termos antes de operar um negócio. Não há promessa de hospedagem comercial ilimitada ou de aprovação do seu caso pelos termos.

## Editor completo e duas demonstrações

Para disponibilizar o editor, publique **todo o conteúdo de `dist/`** após:

```sh
npm ci --ignore-scripts
npm run verify
```

O editor usa `src/`, `assets/` e `vendor/`; enviar apenas o `index.html` do build deixa referências faltando. O HTML baixado na interface é diferente: ele já é um catálogo público independente. `restaurant.html` e `retail.html` são as demonstrações fictícias geradas no build.

Para hospedagem ligada a Git: configure Node.js 24, instalação `npm ci --ignore-scripts`, build `npm run verify` e saída `dist`. A conta do provedor deve ter acesso apenas ao repositório necessário. Não cole token em `src/`, JSON, HTML nem variáveis públicas de frontend. `_headers` só tem efeito em hosts que o reconhecem; confira os cabeçalhos recebidos.

## GitHub Pages: documentação e demo fictícia

As [regras oficiais do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) restringem seu uso como hospedagem gratuita de negócios online, e-commerce e SaaS comercial. A rota aqui é para documentação e demonstração open-source com dados fictícios; não é uma recomendação de Pages para operar a loja de um usuário. O serviço não fornece backend.

Quando houver repositório público real na conta autorizada:

1. Envie o projeto completo ao repositório, preservando licença e avisos das dependências.
2. Em **Settings → Pages**, escolha **GitHub Actions** como origem.
3. Em **Actions**, execute manualmente **Demo fictícia no GitHub Pages** (`.github/workflows/demo-pages.yml`). Ele instala, verifica e envia `dist` ao Pages.
4. Aguarde os jobs `build` e `deploy`; use a URL produzida por `deploy-pages` e confira `/restaurant.html` e `/retail.html`.
5. Registre URL, commit e resultado em `STATUS.md`. Sem execução real, o workflow permanece apenas configurado.

A CI de verificação roda em push/PR; o deploy de Pages é manual. Ambos usam permissões declaradas no YAML. Se a conta exigir aprovação do ambiente, resolva-a na interface do GitHub, sem mover credenciais para o código. Os dados salvos por um visitante do editor não fazem parte do commit nem do próximo build.

## Custos e alternativas

O núcleo não exige licença paga ou serviço externo. Hospedagem, mídia, domínio, uso de funções, banco e manutenção têm custos separados. Para experimentar, use o editor local e arquivos exportados sem contratar serviços. Para demo online, um plano gratuito pode atender dentro de políticas e limites.

Consulte [comparação de hospedagem](../research/hosting-comparison.md) para fontes, limites e diferenças entre Cloudflare, Vercel, Netlify e auto-hospedagem. Não escolha um plano pessoal para operação comercial sem confirmar seus termos. Pagar, contratar, fornecer identidade pessoal ou conceder acesso adicional exige decisão explícita do responsável; este guia não autoriza cobrança.

Após configurar a URL pública no editor, exporte o HTML novamente e substitua o arquivo hospedado: o HTML anterior ainda contém a URL antiga/vazia. O QR do editor só representa o endereço configurado; não comprova que houve deploy.

Servidor local: depois de `npm run build`, use `npm run dev`. O servidor de desenvolvimento entrega os bytes originais, sem injetar scripts nas ilustrações exportáveis.
