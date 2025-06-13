document.addEventListener('DOMContentLoaded', () => {
  fetch('../settings.json')
    .then(res => res.json())
    .then(data => {
      document.getElementById('hours').value = data.hours;
      document.getElementById('phone').value = data.phone;
    });

  document.getElementById('admin-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const updated = {
      hours: this.hours.value,
      phone: this.phone.value
    };

    alert('Simulated save (GitHub API or backend required):\n' + JSON.stringify(updated, null, 2));
  });

  // Tab switching logic
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
