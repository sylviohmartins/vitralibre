# Impeccable — integração executada
Origem: https://github.com/pbakaus/impeccable e https://impeccable.style/docs/.
Versão CLI/skill: 4.7.0; engine: 0.1.16; licença Apache-2.0.

Instalação oficial com `install --scope=project --providers=codex --no-hooks`; stdout e comando exato em logs/install-project.*. A instalação nativa escreveu inicialmente em /workspace/.agents apesar do cwd; somente a skill recém-criada foi movida para o projeto. Correção registrada em installation-path-correction.json. LICENSE/NOTICE preservados. Binário de execução não precisa acompanhar a aplicação final.

`context --target src/app.js` executou e carregou PRODUCT.md e DESIGN.md, conforme logs/context.*. O contexto detectou schema documental legado e interpretou corretamente a plataforma como web, mas apontou formato não canônico. Não foi afirmada execução de `/impeccable init`, nem integração interativa automática com Work. Os arquivos foram elaborados com contexto confirmado fornecido pelo usuário e código, sem inventar entrevistas. A adaptação ao formato completo da versão atual de init segue pendente.

Detector estático inicial: `detect --json src/`, saída 2, um alerta de uso recorrente de Inter. Removida referência à fonte não entregue, preservando a pilha de sistema efetiva. Detector final em logs/detect-after.json. `audit`, `critique`, `typeset`, `adapt`, `harden`, `polish` e demais comandos são orientações da skill, não verbos CLI fictícios; a aplicação dessas orientações está em docs/design/ux-audit.md. Sem análise renderizada `detect URL` ou Live Mode, porque estas iniciariam outro navegador fora da superfície autorizada e, depois, o navegador autorizado atingiu limite de uso.

A skill instalada pode ser lida diretamente no projeto; não foi necessário reiniciar a sessão para a leitura manual e execução da CLI. Reconhecimento automático em um futuro harness depende de sua integração. Não há hook automático ativado; o CI possui scan explícito de fonte quando configurado. Scanner sem achados não prova acessibilidade, qualidade visual ou ausência de regressões.
