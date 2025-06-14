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

        // Edit button
        const btn = document.createElement('button');
        btn.textContent = 'Edit';
        btn.onclick = () => {
          iframe.src = `listings/form.html?index=${i}`;
        };
        li.appendChild(btn);

        // Delete button
        const del = document.createElement('button');
        del.textContent = 'Delete';
        del.style.marginLeft = '10px';
        del.onclick = () => {
          if (confirm('Are you sure you want to delete this listing?')) {
            fetch('/ravi/delete-listing.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ index: parseInt(i, 10) }) // Fixed here
            })
            .then(res => res.text())
            .then(msg => {
              alert(msg);
              location.reload();
            });
          }
        };
        li.appendChild(del);

        listEl.appendChild(li);
      });
    })
    .catch(err => {
      const errorMsg = document.createElement('li');
      errorMsg.textContent = 'Error loading listings: ' + err.message;
      listEl.appendChild(errorMsg);
    });
});
