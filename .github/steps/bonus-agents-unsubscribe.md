# Bônus opcional: descadastro da Newsletter com agentes

Esta atividade opcional leva até 30 minutos. Ela usa custom agents e TDD para preparar a implementação de cancelamento da Newsletter do Pinguim. O requisito completo está em [bonus-unsubscribe-requirements.md](bonus-unsubscribe-requirements.md).

## Instalação desta configuração

Os custom agents desta atividade são adicionados somente quando a skill `setup-newsletter-unsubscribe-bonus` é executada. Nenhum workflow obrigatório é criado ou alterado.

## Executar

1. Abra o Copilot Chat.
2. Selecione o modo Agent.
3. Execute o agente `newsletter-unsubscribe-orchestrator` pelo nome mostrado no catálogo de custom agents.
4. Informe que a atividade deve seguir os requisitos do arquivo citado acima.

## Fluxo e handoffs

O orquestrador delega sequencialmente:

1. **Plan**: lê o contrato e planeja mudanças sem editar código.
2. **Playwright Tester**: inspeiona o fluxo real no browser e registra locators observáveis.
3. **TDD RED**: adiciona ou ajusta somente testes e prova que falham pelo comportamento ausente.
4. **TDD GREEN**: implementa o mínimo na aplicação e roda os testes; não enfraquece os testes.
5. **TDD Refactor**: melhora o código sem alterar o comportamento e verifica novamente.
6. **Verificação final**: confirma o fluxo no browser e apresenta a evidência dos testes.

Cada especialista recebe o documento de requisitos e o resultado da fase anterior. Nenhum especialista deve substituir silenciosamente a fase seguinte. Qualquer agente indisponível ou conflito de requisitos interrompe o fluxo.

## Conferência manual

Com o servidor iniciado por `npm start`, confirme:

- inscrição válida mostra `Inscrição confirmada!`;
- o botão `Cancelar inscrição` aparece após a inscrição;
- cancelar restaura o formulário e anuncia `Inscrição cancelada!`;
- é possível inscrever novamente;
- recarregar a página restaura o estado inicial.

## Comandos

```bash
npm start
npx playwright test
npx playwright test --headed
```

As duas últimas opções exigem que o terminal não esteja bloqueado pelo servidor em execução.

## Limites

O cancelamento é apenas estado em memória no browser. Ele não remove um cadastro real, não usa banco de dados ou API e não persiste após recarregar. Nenhum workflow obrigatório ou dependência deve ser alterado por esta atividade.
