document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('listing-form');
  const listEl = document.getElementById('listing-list');
  const addBtn = document.getElementById('add-listing');

  if (addBtn) {
    addBtn.onclick = () => {
      iframe.src = 'listings/form.html';
    };
  }

  fetch('/ravi/listings.json')
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch listings.json");
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) throw new Error("Invalid JSON structure");

      if (data.length === 0) {
        const msg = document.createElement('li');
        msg.textContent = 'No listings yet.';
        listEl.appendChild(msg);
        return;
      }

      data.forEach((l, i) => {
        const li = document.createElement('li');
        li.textContent = `${l.title || 'Untitled'} (${l.zip || 'N/A'})`;

        const btn = document.createElement('button');
        btn.textContent = 'Edit';
        btn.onclick = () => {
          iframe.src = `listings/form.html?index=${i}`;
        };

        li.appendChild(btn);
        listEl.appendChild(li);
      });
    })
    .catch(err => {
      const errorMsg = document.createElement('li');
      errorMsg.textContent = 'Error loading listings: ' + err.message;
      listEl.appendChild(errorMsg);
    });
});
