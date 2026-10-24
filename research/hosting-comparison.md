# Hospedagem de VitraLibre — políticas e quotas revalidadas

Data de consulta: **23/10/2026 UTC**. Método: recuperação das páginas oficiais via pesquisa web. [D] indica documentação; [I] indica decisão/inferência do projeto; [NV] indica condição não testada. Não houve abertura de conta de hospedagem ou medição de disponibilidade nesta pesquisa.

| Opção | Uso e elegibilidade | Plano gratuito/limites relevantes | Adequação ao projeto |
|---|---|---|---|
| GitHub Pages | [D] Não permite atuar como hospedagem gratuita de negócio online, e-commerce ou SaaS comercial; não usar para transações sensíveis. | [D] Site até 1 GB; banda soft 100 GB/mês; timeout de deploy 10 min; 10 builds/h soft, exceto workflow próprio Actions. | [I] Documentação OSS e demo fictícia compatível com política; não recomendar para catálogo que facilita transação comercial real. Não fornece backend. |
| Cloudflare Pages | [D] Termos de self-service regem conteúdo e uso aceitável; a documentação consultada não traz a restrição pessoal/não comercial de Vercel Hobby. Isso não é certificação jurídica. | [D] Free: 500 builds/mês, 1 simultâneo, timeout 20 min, 20.000 arquivos, 25 MiB por arquivo, 100 domínios por projeto. Requisições estáticas grátis e ilimitadas, sem invocar Functions. | [I] Opção para exportação estática, sujeita a termos e quotas. Manter backup e evitar uploads gigantes. |
| Cloudflare Workers Static Assets | [D] Cloudflare orienta novos projetos para Workers, sua plataforma principal, com mais recursos que Pages. | [D] Assets estáticos sem custo por requisição ou armazenamento; execução de Worker/SSR obedece cobrança própria. `run_worker_first` pode consumir quota e devolver 429 no Free ao exceder. | [I] Preferência para nova implantação Cloudflare e evolução dinâmica; não exigir Worker no editor local. Não aplicar quotas Pages automaticamente ao Workers. |
| Cloudflare Pages Functions | [D] Funções consomem quota Workers compartilhada, inclusive com chamadas a bindings. | [D] Free: 100.000 requisições dinâmicas/dia combinadas Workers + Functions, reinício à meia-noite UTC. Serviços de persistência têm regras próprias. | [I] Apenas para módulo dinâmico futuro; não é armazenamento ilimitado nem backend gratuito garantido. |
| Vercel Hobby | [D] Restrito a uso pessoal e não comercial, conforme página oficial Hobby/fair-use. | [D] Ao exceder limites normalmente é preciso aguardar janela de renovação; uso comercial requer outro plano adequado. | [I] Não é rota grátis para catálogo comercial. Pode servir a experimento pessoal elegível; núcleo continua exportável. |
| Netlify Free atual | [D] Blog oficial permite projetos comerciais; comparar com termos no momento de cadastro. Quotas antigas de 2024 não são as quotas atuais. | [D] Plano de créditos: 300/mês, limite rígido, sem recarga. Deploy produção 15 créditos; tráfego 2/10.000 requisições; banda 20/GB; recursos dinâmicos também consomem. Domínio/SSL e previews incluídos. | [I] Alternativa para catálogo estático comercial elegível dentro dos créditos. Não prometer banda gratuita ilimitada. Deve monitorar consumo e poder migrar. |
| Hospedagem própria estática | [I] Servidor HTTP sob controle do operador; condições dependem do provedor e da legislação aplicável. | [NV] Não foi verificada oferta gratuita universal. Software OSS não elimina custo de máquina, domínio, operação, mídia ou rede. | [I] Exportação estática é portável. Container/servidor opcional não deve ser requisito do primeiro teste local. |

## Decisão de implantação

[I] **Rota de avaliação a R$ 0:** editor local, dados fictícios e exportação estática sem backend obrigatório. Publicação de documentação/demo fictícia em host compatível não autoriza uso comercial genérico de GitHub Pages. Para catálogo efetivo de negócio, priorizar Cloudflare Workers/Assets ou Pages conforme configuração e termos, com Netlify Free como alternativa de créditos limitados. Vercel Hobby não entra como recomendação gratuita comercial.

[I] A edição local não publica sozinha. Dados em localStorage pertencem ao navegador/dispositivo; exportação JSON é backup. URL compartilhável requer arquivo publicado em endereço HTTPS alcançável. API keys e credenciais de deploy ficam em secret de CI/servidor, nunca em HTML/JSON público. Estoque sincronizado, equipe, pedidos, checkout e métricas centralizadas requerem serviços adicionais.

[I] Na Netlify, 20 deploys de produção consumiriam os 300 créditos se nenhum outro recurso fosse usado; esse cálculo ilustra a quota, não prevê tráfego. Não reutilizar números antigos de 100 GB e 300 minutos do anúncio de 2024 como plano vigente. Domínio próprio, gateway, envio, banco e imagem remota têm custos independentes.

## Fontes oficiais

- GH-01: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits — proibição comercial e quotas. Recuperado `turn6view0`.
- CF-01: https://developers.cloudflare.com/pages/platform/limits/ — limites Pages. Recuperado `turn7view0`.
- CF-02: https://developers.cloudflare.com/pages/functions/pricing/ — estáticos e Functions/Workers. Recuperado `turn7view1`.
- CF-03: https://developers.cloudflare.com/pages/ — orientação de iniciar novos projetos em Workers. Recuperado `turn11view0`.
- CF-04: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/ — static assets e risco run_worker_first. Recuperado `turn14view2`.
- CF-05: https://www.cloudflare.com/terms/ — self-service, Free/Trial e acceptable use; não aceito nesta pesquisa. Recuperado `turn15view3`.
- VE-01: https://vercel.com/docs/plans/hobby — uso pessoal/não comercial. Recuperado `turn7view2`.
- NE-01: https://www.netlify.com/pricing/ — preço atual 300 créditos Free. Recuperado `turn6view4`.
- NE-02: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/ — unidades de créditos atuais, hard limit. Recuperado `turn15view0`.
- NE-03: https://www.netlify.com/blog/introducing-netlify-free-plan/ — elegibilidade comercial documentada em 2024; quotas antigas não utilizadas. Recuperado `turn14view0`.

[NV] Não foram assinados contratos nem realizadas validações jurídicas de uma operação particular. Nenhuma quota foi testada até exaustão; são números documentais mutáveis. Uma URL de documentação que retornou 404 na primeira consulta foi substituída pelo caminho específico de credit-based-pricing-plans acima, recuperado pelo link oficial de pricing.
