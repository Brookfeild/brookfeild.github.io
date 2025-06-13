document.addEventListener('DOMContentLoaded', () => {
  // Load dynamic basic site settings (phone, hours) if needed
  fetch('settings.json')
    .then(res => res.json())
    .then(data => {
      const phoneElement = document.getElementById('site-phone');
      const hoursElement = document.getElementById('site-hours');
      if (phoneElement) phoneElement.textContent = data.phone;
      if (hoursElement) hoursElement.textContent = data.hours;
    })
    .catch(err => console.error('Failed to load site settings:', err));

  // Example: Navigation toggle, search handlers, or interactivity
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      document.querySelector('nav ul').classList.toggle('open');
    });
  }
});
