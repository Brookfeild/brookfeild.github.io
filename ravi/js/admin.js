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

    // Future: send `updated` to GitHub API or backend service
  });
});
