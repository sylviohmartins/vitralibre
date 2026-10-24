# Links de contexto no catálogo público
Autorização: continuação autônoma do prompt mestre; necessidade observada em pesquisa prática Stoqui (filtro com URL persistente). Não copiar código/ativos.

Objetivo: compartilhar e restaurar contexto de descoberta no catálogo independente.
Interfaces: URL q=text, category=id, available=1, product=id. Somente dados públicos do próprio catálogo. Nenhuma mudança de schema de catálogo. Desconhecidos/IDs inválidos não derrubam a página.

Arquivos: src/export.js; testes novos tests/public-navigation.test.mjs; docs/core-contract.md (adendo). Não alterar core/app ou temas.

Critérios: link com busca/filtro válido restaura controles e resultado; item abre detalhe ao carregar URL; fechar detalhe mantém busca e permite retorno seguro; botão Compartilhar usa URL pública configurada acrescida do contexto, ou endereço http(s) real da própria vitrine; about/srcdoc/file não vira link público; back/forward sincroniza UI; erros de History API não impedem busca. URLs nunca carregam HTML ou dados de edição.

Execução: escrever testes DOM com URL fixa e dados fictícios → verificar falha → implementar mínimo → suíte completa verde → navegador real/teclado e atualização de cobertura. Regex/source-text assertions não substituem comportamento. Mantém exportação autocontida e licença.
