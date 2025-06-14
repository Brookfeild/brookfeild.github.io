document.addEventListener('DOMContentLoaded', () => {
    fetch('partials/header.html')
      .then(res => res.text())
      .then(html => {
        const header = document.createElement('div');
        header.innerHTML = html;
        document.body.insertBefore(header, document.body.firstChild);
      });
  });