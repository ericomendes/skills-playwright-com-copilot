# Requisitos: bônus de cancelamento da Newsletter

Este documento é o contrato da atividade opcional de até 30 minutos. Esta atividade simula a entrada e saída de uma inscrição na interface; não implementa descadastro real de uma lista de e-mails.

## Comportamento esperado

1. Após uma inscrição bem-sucedida, ocultar ou desativar o formulário e mostrar um botão acessível chamado **Cancelar inscrição**.
2. Ao clicar em **Cancelar inscrição**:
   - limpar o estado da inscrição mantido apenas na memória da página;
   - anunciar exatamente **Inscrição cancelada!** em uma região `role="status"`; e
   - mostrar novamente o formulário de inscrição.
3. Depois do cancelamento, permitir nova inscrição e preservar o comportamento existente de inscrição e validação.
4. O estado não persiste após recarregar a página.

## Fora de escopo

Não incluir backend, banco de dados, API, `localStorage`, integração com serviço de e-mail, remoção administrativa, exclusão de conta ou mudanças em workflows. Não adicionar dependências. Não alterar o código da aplicação e os testes fora desta atividade, exceto pelo fluxo necessário ao bônus durante a fase GREEN.

## Critérios de aceitação

- `Seu e-mail` continua identificado por um label associado ao campo.
- A inscrição aceita um e-mail válido e continua rejeitando entradas inválidas pelo comportamento HTML existente.
- Depois da inscrição, o texto `Inscrição confirmada!` permanece visível e o botão `Cancelar inscrição` fica acessível por papel e nome.
- Ao cancelar, o formulário volta a ficar visível, o campo pode ser preenchido novamente e a região de status contém `Inscrição cancelada!`.
- Uma nova inscrição volta a mostrar `Inscrição confirmada!`.
- Recarregar a página restaura o estado inicial e não mantém a inscrição anterior.
- Os testes existentes continuam verdes.

## Cenários Playwright derivados

```javascript
test('permite cancelar uma inscrição bem-sucedida', async ({ page }) => {
  // Inscrever com um e-mail válido.
  // Confirmar o estado atual de inscrição.
  // Clicar no botão acessível "Cancelar inscrição".
  // Verificar "Inscrição cancelada!" em role="status".
  // Verificar que o formulário volta a ficar visível.
});

test('permite inscrever novamente após cancelar', async ({ page }) => {
  // Inscrever, cancelar e preencher outro e-mail válido.
  // Verificar "Inscrição confirmada!" novamente.
});

test('não mantém o estado após recarregar', async ({ page }) => {
  // Inscrever, recarregar e verificar o formulário inicial.
});
```
