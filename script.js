const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const WHATSAPP_NUMBER = '918904893793';
function formToWhatsApp(form) {
  const data = new FormData(form);
  const type = form.dataset.form;
  let lines = [];
  if (type === 'event') {
    lines = [
      'Hello The Spice Studio, I would like to enquire about an event.',
      `Name: ${data.get('name')}`,
      `Mobile: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      `Event type: ${data.get('eventType')}`,
      `Estimated guests: ${data.get('guests')}`,
      `Preferred date: ${data.get('date')}`
    ];
  } else if (type === 'reservation') {
    lines = [
      'Hello The Spice Studio, I would like to request a table reservation.',
      `Name: ${data.get('name')}`,
      `Mobile: ${data.get('phone')}`,
      `Guests: ${data.get('guests')}`,
      `Date: ${data.get('date')}`,
      `Preferred time: ${data.get('time')}`
    ];
  } else {
    lines = [
      'Hello The Spice Studio, please call me back.',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Message: ${data.get('message') || 'I would like to speak with your team.'}`
    ];
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  const status = form.querySelector('.form-status');
  if (status) status.textContent = 'Your enquiry is ready in WhatsApp. Please press Send to submit it.';
}
document.querySelectorAll('form[data-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    formToWhatsApp(form);
  });
});

const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0,10);
dateInputs.forEach(input => input.min = localDate);
