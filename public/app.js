const CONFIRMATION_MESSAGE = 'Inscrição confirmada!';
const newsletterForm = document.querySelector('#newsletter-form');
const statusElement = document.querySelector('[role="status"]');
const unsubscribeButton = document.querySelector('#unsubscribe');

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  statusElement.textContent = CONFIRMATION_MESSAGE;
  newsletterForm.hidden = true;
  unsubscribeButton.hidden = false;
});

unsubscribeButton.addEventListener('click', () => {
  newsletterForm.reset();
  newsletterForm.hidden = false;
  unsubscribeButton.hidden = true;
  statusElement.textContent = 'Inscrição cancelada!';
});
