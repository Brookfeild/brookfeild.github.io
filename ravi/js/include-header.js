document.addEventListener('DOMContentLoaded', () => {
    fetch('/partials/header.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('site-header').innerHTML = html;
      })
      .catch(err => console.error('Failed to load header:', err));
  });
  