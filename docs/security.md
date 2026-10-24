# Segurança e privacidade do modo estático

Escopo: código próprio do editor e catálogo gerado. Esta documentação não constitui auditoria de terceiros nem certificação de segurança. Resultados executados ficam em [STATUS](../STATUS.md) e `evidence/`; comunicação de vulnerabilidades está em [SECURITY.md](../SECURITY.md).

## Fronteiras de confiança

JSON importado, texto de formulário e URLs são entradas não confiáveis. A validação normaliza a estrutura, remove campos desconhecidos, exige versão v1, limita tamanho/quantidade e verifica identificadores, relações, ciclos e centavos inteiros. Isso reduz estados inválidos e consumo acidental de recursos; não garante disponibilidade em arquivos próximos ao limite em todo dispositivo.

Texto é escapado para HTML e a serialização neutraliza fechamento de script. Nomes e descrições não aceitam HTML como funcionalidade. Imagens data permitem PNG/JPEG/WebP/GIF base64; SVG enviado como data e caminhos arbitrários são rejeitados. Somente ilustrações locais expressamente permitidas são incorporadas como SVG próprio. Base64 é validado sintaticamente; não é uma inspeção completa do arquivo.

URLs aceitam HTTP(S) sem credenciais e rejeitam esquemas ativos. A validação não baixa nem inspeciona o conteúdo/MIME remoto; uma URL pode mudar depois de salva. Prefira HTTPS e imagens próprias. O carregamento de imagens externas revela ao provedor dados usuais de acesso, como IP; disponibilidade e privacidade dependem desse terceiro. HTTP pode ser bloqueado como conteúdo misto quando a página está em HTTPS.

## Armazenamento e publicação

Dados ficam no armazenamento da origem do navegador; não são criptografados nem isolados por usuário de um dispositivo compartilhado. A cópia local anterior não substitui backup externo. Navegação privada, limpeza, quota e políticas do navegador podem remover ou bloquear dados. Nunca guardar senhas, tokens, dados de pagamento ou informação pessoal sensível no catálogo.

O HTML e JSON exportados são públicos para quem os recebe. Revisar conteúdo, fotos e metadados antes de publicar. Não colocar credenciais de GitHub/provedor em arquivos do editor, URL, JSON, HTML, screenshots ou logs. A publicação manual não exige que o catálogo conheça o token de deploy. Se um pipeline exigir credencial, usar o mecanismo secreto do provedor com privilégio mínimo; o workflow de Pages pode usar o token efêmero do GitHub Actions.

## Defesa e limites

O build inclui `_headers` para hosts compatíveis, com restrições de conteúdo, referência e capacidades. O HTML exportado possui sua própria política. Políticas inline necessárias ao documento independente não equivalem a uma CSP estrita com nonces/hashes; são defesa adicional, não substituto de escape. GitHub Pages não aplica `_headers` por esse nome. Verifique cabeçalhos reais no provedor.

Não há backend, autenticação, autorização por papéis, rate limit, isolamento por tenant ou registro central de auditoria. Não hospede conteúdo privado esperando proteção do editor. QR só codifica a URL fornecida: não confirma titularidade, legitimidade ou disponibilidade do destino.

Dependências estão fixadas no lockfile; instalar com scripts desabilitados, revisar atualizações e preservar avisos de licença. Uma auditoria sem achados reporta apenas a base consultada naquele momento. No desenvolvimento, manter CDP em loopback e usar perfil separado; não publicar cookies, HAR sensível nem dados de acesso de pesquisas concorrenciais.

Antes de adicionar backend, definir modelo de ameaça, autorização no servidor, isolamento, LGPD, backups, remoção/exportação, migrações, limites e gestão de segredos. Esses controles não existem implicitamente no modo local.
