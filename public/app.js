const CONFIRMATION_MESSAGE = 'Inscrição confirmada!';
const newsletterForm = document.querySelector('#newsletter-form');
const statusElement = document.querySelector('[role="status"]');

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  statusElement.textContent = CONFIRMATION_MESSAGE;
});
