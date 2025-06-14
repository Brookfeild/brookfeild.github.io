document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('listings');
  
    fetch('listings.json')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        data.forEach(listing => {
          const div = document.createElement('div');
          div.className = 'listing-card';
          div.innerHTML = `
            <h2>${listing.title || '(No Title)'}</h2>
            <p><strong>Zip:</strong> ${listing.zip || 'N/A'}</p>
            ${listing.images?.length ? `<img src="${listing.images[0]}" style="max-width:300px;">` : ''}
          `;
          container.appendChild(div);
        });
      });
  });