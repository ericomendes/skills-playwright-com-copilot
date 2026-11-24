const { test, expect } = require('@playwright/test');

test('permite cancelar uma inscrição bem-sucedida e reexibe o formulário', async ({ page }) => {
  // Arrange: iniciar uma inscrição válida.
  await page.goto('/');
  const form = page.locator('#newsletter-form');
  const email = page.getByLabel('Seu e-mail', { exact: true });
  const subscribe = page.getByRole('button', { name: 'Inscrever', exact: true });
  const cancel = page.getByRole('button', { name: 'Cancelar inscrição', exact: true });
  await email.fill('ada@example.com');
  await subscribe.click();
  await expect(page.getByRole('status')).toHaveText('Inscrição confirmada!');
  await expect(page.getByRole('status')).toBeVisible();
  await expect(cancel).toBeVisible();
  await expect(cancel).toBeEnabled();
  await expect.poll(async () => (
    !(await form.isVisible()) ||
    ((await email.isDisabled()) && (await subscribe.isDisabled()))
  ), { message: 'Após inscrever, o formulário deve estar oculto ou desativado' }).toBe(true);

  // Act: cancelar pelo botão acessível.
  await cancel.click();

  // Assert: anunciar o cancelamento e disponibilizar novamente o formulário.
  await expect(page.getByRole('status')).toHaveText('Inscrição cancelada!');
  await expect(page.getByRole('status')).toBeVisible();
  await expect(form).toBeVisible();
  await expect(email).toBeVisible();
  await expect(email).toBeEditable();
  await expect(subscribe).toBeEnabled();
});

test('permite inscrever outro e-mail após cancelar', async ({ page }) => {
  // Arrange: inscrever e cancelar antes de tentar uma nova inscrição.
  await page.goto('/');
  const email = page.getByLabel('Seu e-mail', { exact: true });
  const subscribe = page.getByRole('button', { name: 'Inscrever', exact: true });
  const status = page.getByRole('status');
  await email.fill('ada@example.com');
  await subscribe.click();
  await expect(status).toHaveText('Inscrição confirmada!');
  const cancel = page.getByRole('button', { name: 'Cancelar inscrição', exact: true });
  await expect(cancel).toBeVisible();
  await cancel.click();
  await expect(status).toHaveText('Inscrição cancelada!');

  // Act: inscrever um e-mail diferente.
  await email.fill('grace@example.com');
  await subscribe.click();

  // Assert: confirmar uma nova inscrição, não a mensagem da inscrição anterior.
  await expect(status).toHaveText('Inscrição confirmada!');
  await expect(status).toBeVisible();
  await expect(cancel).toBeVisible();
  await expect(cancel).toBeEnabled();
});

test('não mantém a inscrição após recarregar a página', async ({ page }) => {
  // Arrange: partir do estado inscrito completo exigido pelo contrato.
  await page.goto('/');
  const email = page.getByLabel('Seu e-mail', { exact: true });
  const subscribe = page.getByRole('button', { name: 'Inscrever', exact: true });
  const cancel = page.getByRole('button', { name: 'Cancelar inscrição', exact: true });
  const status = page.getByRole('status');
  await email.fill('ada@example.com');
  await subscribe.click();
  await expect(status).toHaveText('Inscrição confirmada!');
  await expect(cancel).toBeVisible();

  // Act: recarregar para descartar o estado em memória.
  await page.reload();

  // Assert: restaurar o formulário inicial sem inscrição anterior.
  await expect(page.locator('#newsletter-form')).toBeVisible();
  await expect(email).toBeVisible();
  await expect(email).toBeEditable();
  await expect(email).toHaveValue('');
  await expect(email).toHaveAttribute('type', 'email');
  await expect(email).toHaveAttribute('required', '');
  await expect(subscribe).toBeVisible();
  await expect(subscribe).toBeEnabled();
  await expect(status).toHaveText('');
  await expect(cancel).toHaveCount(0);
});
