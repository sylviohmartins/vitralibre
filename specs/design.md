# VitraLibre — especificação de execução
Data: 2026-10-23. Escolhas de implementação do agente sob autorização autônoma do prompt mestre.

Produto: editor de catálogos local e gratuito, independente de servidores, com duas demonstrações originais. Público: pequeno comerciante e restaurante, consumidor em celular, contribuidores OSS.

## Abordagens e decisão (ADR-001)
React/Vite: tipagem/componentes úteis, mas compilação/dependências extras para uso local. Astro: excelente catálogo estático; ilhas acrescentam complexidade ao editor. HTML/CSS + módulos JS tipados por JSDoc: execução estática, exportação autocontida e pequena superfície de dependências. Adotada a terceira para P0; TypeScript via checkJs quando ferramenta disponível. Backend Next/Payload/Medusa: evolução P2, sem endpoints simulados.

## Experiência
Identidade original VitraLibre, fundo marfim, tipografia de sistema, verde floresta, detalhes cítricos. Sidebar de trabalho, cabeçalho com ações, catálogo visual central, painel/modal de edição acessível. Mobile com navegação compacta, cartões e formulários em coluna. Mensagens claras sobre dados locais.

## Contrato de dados v1
Catalog {version:1,id:string,name:string,description:string,segment:'restaurant'|'retail',theme:'forest'|'terracotta'|'midnight',logo:string,publicUrl:string,categories:[{id,name,parentId?:string}],products:[{id,name,description,categoryId,priceCents:integer>=0,available:boolean,image:string,variants:[{name,priceCents:integer>=0}]}]}.
Imagens: http(s), SVG próprio de public/assets, ou data:image/png|jpeg|webp|gif base64. SVG importado e esquemas ativos são rejeitados. Campos desconhecidos removidos na importação; limites de tamanho; IDs únicos; referências íntegras; preço em centavos. Categorias com filhos/produtos não podem ser excluídas sem realocação. Sem telefone comercial real nos exemplos.

## Critérios P0
CRUD de catálogo/produto/categorias/subcategorias/variantes, disponibilidade; tema mantém dados; pesquisa sem acentos e filtros; persistência local com backup e recuperação de erro, aviso de quota; importar/exportar JSON e exportar HTML público independente com dados escapados, estilos e imagens próprias embutidos; compartilhamento por URL publicada configurada, QR real para URL http(s); dois exemplos com confirmação antes de substituir trabalho. Sem pedido/pagamento/backend/analytics anunciados.

## Verificação
Testes Node para schema/preços/referências/roundtrip/XSS/geração/filtros/persistência. Browser autorizado para fluxos críticos, teclado, larguras 360/390/768/1280/1440, screenshot próprio. Lint/check/build e auditoria dependências. Limitações de a11y/performance e CI remoto explícitas.
