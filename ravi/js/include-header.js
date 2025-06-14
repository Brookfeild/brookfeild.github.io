document.addEventListener('DOMContentLoaded', () => {
    fetch('/ravi/partials/header.html') // use /ravi/ here
      .then(res => res.text())
      .then(html => {
        document.getElementById('site-header').innerHTML = html;
      })
      .catch(err => {
        console.error('Header load failed:', err);
      });
  });