document.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem('admin-auth')) {
    window.location.href = 'login.html';
    return;
  }

  const form = document.getElementById('admin-form');
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  fetch('../settings.json')
    .then(res => res.json())
    .then(data => {
      if (data.hours && typeof data.hours === 'object') {
        days.forEach(day => {
          const open = document.querySelector(`[name="${day.toLowerCase()}_open"]`);
          const start = document.querySelector(`[name="${day.toLowerCase()}_start"]`);
          const end = document.querySelector(`[name="${day.toLowerCase()}_end"]`);

          const setting = data.hours[day];
          if (setting) {
            open.checked = setting.open;
            start.value = setting.start || "";
            end.value = setting.end || "";
          }
        });
      }

      document.getElementById('phone').value = data.phone || '';
    });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const result = {
      phone: document.getElementById('phone').value,
      hours: {}
    };

    days.forEach(day => {
      result.hours[day] = {
        open: document.querySelector(`[name="${day.toLowerCase()}_open"]`).checked,
        start: document.querySelector(`[name="${day.toLowerCase()}_start"]`).value,
        end: document.querySelector(`[name="${day.toLowerCase()}_end"]`).value
      };
    });

    alert('Simulated save to settings.json:\n' + JSON.stringify(result, null, 2));
    // TODO: Integrate GitHub API or backend to persist settings.json update
  });

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
