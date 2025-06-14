document.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem('admin-auth')) {
    window.location.href = 'login.html';
    return;
  }

  const form = document.getElementById('admin-form');
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  // Add toggle behavior to buttons
  document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      button.textContent = button.classList.contains('active') ? 'Open' : 'Closed';
    });
  });

  // Load settings.json values
  fetch('../settings.json')
    .then(res => res.json())
    .then(data => {
      if (data.hours && typeof data.hours === 'object') {
        days.forEach(day => {
          const toggle = document.querySelector(`.toggle-btn[data-day="${day}"]`);
          const start = document.querySelector(`[name="${day}_start"]`);
          const end = document.querySelector(`[name="${day}_end"]`);
          const setting = data.hours[day.charAt(0).toUpperCase() + day.slice(1)];
          if (setting) {
            if (setting.open) toggle.classList.add('active');
            toggle.textContent = setting.open ? 'Open' : 'Closed';
            start.value = setting.start || '';
            end.value = setting.end || '';
          }
        });
      }
      document.getElementById('phone').value = data.phone || '';
    });

  // Save settings on submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const result = {
      phone: document.getElementById('phone').value,
      hours: {}
    };

    days.forEach(day => {
      const toggle = document.querySelector(`.toggle-btn[data-day="${day}"]`);
      const start = document.querySelector(`[name="${day}_start"]`).value;
      const end = document.querySelector(`[name="${day}_end"]`).value;

      result.hours[day.charAt(0).toUpperCase() + day.slice(1)] = {
        open: toggle.classList.contains('active'),
        start,
        end
      };
    });

    // Save settings via POST request
    fetch('../save-settings.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    })
      .then(res => res.text())
      .then(msg => alert(msg))
      .catch(err => alert('Error saving: ' + err));
  });

  // Tab switching
  document.querySelectorAll('nav a[data-tab]').forEach(tabLink => {
    tabLink.addEventListener('click', e => {
      e.preventDefault();
      const selected = tabLink.dataset.tab;
      document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.style.display = tab.id === selected ? 'block' : 'none';
      });
    });
  });
});
