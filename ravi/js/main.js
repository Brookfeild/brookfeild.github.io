document.addEventListener('DOMContentLoaded', () => {
  // Load dynamic basic site settings (phone, hours) if needed
  fetch('settings.json')
    .then(res => res.json())
    .then(data => {
      // Update site phone and hours
      const phoneElement = document.getElementById('site-phone');
      const hoursElement = document.getElementById('site-hours');
      if (phoneElement) phoneElement.textContent = data.phone;
      if (hoursElement) phoneElement.textContent = data.hours;

      // Update public phone number
      const phoneEl = document.getElementById('public-phone');
      if (phoneEl && data.phone) phoneEl.textContent = data.phone;

      // Update business hours
      const hoursEl = document.getElementById('business-hours');
      if (hoursEl && data.hours) {
        hoursEl.innerHTML = Object.entries(data.hours)
          .map(([day, info]) =>
            `<li>${day}: ${info.open ? `${info.start} – ${info.end}` : 'Closed'}</li>`)
          .join('');
      }
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
