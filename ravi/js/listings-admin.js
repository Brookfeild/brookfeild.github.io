document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('listing-form');
  const listEl = document.getElementById('listing-list');

  // Open the form for adding a new listing
  document.getElementById('add-listing').onclick = () => {
    iframe.src = 'listings/form.html';
  };

  // Load and display existing listings
  fetch('/ravi/listings.json')
    .then(res => res.json())
    .then(data => {
      data.forEach((l, i) => {
        const li = document.createElement('li');
        li.textContent = l.title + ' (' + l.zip + ')';
        const btn = document.createElement('button');
        btn.textContent = 'Edit';
        btn.onclick = () => iframe.src = 'listings/form.html?index=' + i;
        li.appendChild(btn);
        listEl.appendChild(li);
      });
    });
});
