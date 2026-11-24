---
agent: 'agent'
description: 'Prepara sob demanda o bônus de descadastro da Newsletter do Pinguim com requisitos, roteiro TDD e custom agents.'
---

# Preparar bônus opcional de descadastro

Configure no repositório, somente quando este prompt for executado, uma atividade bônus para adicionar descadastro self-service à Newsletter do Pinguim usando custom agents e TDD. Este prompt prepara o material e os agentes; **não implementa a feature da aplicação**.

## 1. Inspecione antes de alterar

- Leia as instruções do repositório, `public/index.html`, `public/app.js`, os testes Playwright existentes, `playwright.config.js` e `.github/steps/x-review.md`.
- Consulte `git status` e preserve alterações existentes.
- Confirme como o formulário de inscrição funciona hoje. Não assuma que a implementação do exercício já está completa.
- Verifique as instruções atuais do VS Code para custom agents e prompt files quando precisar confirmar frontmatter, caminhos ou delegação.
- Não altere arquivos do app, testes, workflows, dependências ou configuração do MCP. Não execute o exercício de descadastro.

## 2. Escopo fixo dos requisitos

Crie um documento de requisitos em `.github/steps/bonus-unsubscribe-requirements.md` que estabeleça:

- Depois de uma inscrição bem-sucedida, mostrar um botão acessível `Cancelar inscrição`.
- Ao cancelar, limpar o estado da inscrição mantido em memória, anunciar `Inscrição cancelada!` em uma região de status e mostrar novamente o formulário.
- Permitir nova inscrição depois do cancelamento e preservar o comportamento existente de inscrição e validação.
- Esclarecer que o estado não persiste após recarregar a página.
- Excluir explicitamente backend, banco de dados, API, `localStorage`, integração com serviço de e-mail, remoção administrativa, exclusão de conta e mudanças nos workflows.
- Incluir critérios de aceitação observáveis e cenários Playwright derivados.

Não transforme o exercício em descadastro real de uma lista de e-mails: é uma simulação de estado de interface.

## 3. Obtenha os custom agents somente agora

O repositório não deve receber esses agentes antes da execução deste prompt. Como esta execução é o setup sob demanda:

- Consulte e obtenha as versões atuais dos seguintes arquivos em `https://github.com/github/awesome-copilot/tree/main/agents`:
  - `plan.agent.md`
  - `playwright-tester.agent.md`
  - `tdd-red.agent.md`
  - `tdd-green.agent.md`
  - `tdd-refactor.agent.md`
- Coloque-os em `.github/agents/` apenas agora, preservando a atribuição e o conteúdo de origem. Faça somente adaptações necessárias para compatibilidade com este repositório ou para remover pré-requisitos não aplicáveis, mantendo o papel e os limites de cada agente. Não invente issues ou números de issue.
- Antes de instalar, verifique se já há arquivos no destino. Não sobrescreva agentes existentes: compare conteúdo e, se houver conflito, peça decisão em vez de substituir.
- Se não conseguir ler a fonte upstream ou verificar compatibilidade, pare sem criar um orquestrador que dependa de agentes indisponíveis e informe o bloqueio.

## 4. Prepare os materiais do bônus

Crie `.github/steps/bonus-agents-unsubscribe.md` em português, como atividade opcional de até 30 minutos. Deve:

- apontar para o documento de requisitos como contrato;
- mostrar como selecionar e executar o agente orquestrador;
- explicar a sequência e os handoffs: planejamento, inspeção do browser com Playwright, RED, GREEN, refactor e verificação final;
- dizer que cada agente recebe os requisitos e o resultado da fase anterior;
- explicar que a configuração inicial dos agentes só ocorre ao executar este prompt;
- incluir critérios manuais de conferência, comandos de teste existentes e limitações de estado em memória;
- deixar explícito que nenhum workflow obrigatório é adicionado ou alterado.

Crie `.github/agents/newsletter-unsubscribe-orchestrator.agent.md` seguindo o formato de custom agents compatível com o workspace. Configure-o como agente invocável pelo usuário e com capacidade explícita de delegar para os especialistas instalados nesta configuração. Use os identificadores/nome reais declarados nos arquivos obtidos; não suponha que o nome do arquivo seja o nome invocável.

O orquestrador deve:

1. ler os requisitos e verificar a disponibilidade dos especialistas;
2. chamar cada especialista sequencialmente, passando os requisitos e os handoffs anteriores;
3. garantir que RED adiciona/ajusta apenas testes e prova uma falha pelo comportamento ausente antes de permitir GREEN;
4. garantir que GREEN modifica a aplicação sem enfraquecer os testes e executa os testes;
5. permitir somente refactor que preserve o comportamento, seguido de nova verificação;
6. encerrar com a verificação do fluxo no browser e com evidência dos testes;
7. interromper e explicar qualquer falha de gate, conflito de requisitos ou agente indisponível, sem pular fases ou substituir especialistas silenciosamente.

O orquestrador não edita código ou testes diretamente, não cria issues, não faz commits/pushes e não amplia o escopo.

Atualize `.github/steps/x-review.md` com uma seção curta que apresente os dois documentos bônus e identifique claramente a atividade como opcional.

## 5. Verifique o setup e relate

- Confirme que foram criados apenas os documentos do bônus, os custom agents previstos e a referência opcional na revisão final.
- Confirme que nenhum workflow, código de produção, teste existente ou dependência foi alterado.
- Verifique manualmente a sintaxe/frontmatter dos prompt/agent files e os links relativos entre os documentos.
- Inspecione o diff final e relate arquivos criados/alterados, agentes obtidos e qualquer limitação.
- Não alegue que a feature foi implementada nem que os testes do futuro descadastro passaram.
