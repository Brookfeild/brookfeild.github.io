document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('listings');

  fetch('/ravi/listings.json') // Updated path
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch listings.json");
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) throw new Error("Invalid JSON structure");

      data.forEach(listing => {
        const div = document.createElement('div');
        div.className = 'listing-card';

        const safe = key => listing[key] ?? '—';

        div.innerHTML = `
          <h2>${safe('title')}</h2>
          <p><strong>Zip:</strong> ${safe('zip')}</p>
          ${listing.images?.length ? `<img src="${listing.images[0]}" style="max-width:300px;">` : ''}

          <h3>Property Details</h3>
          <p><strong>MLSPIN:</strong> ${safe('mlspin')}</p>
          <p><strong>Rooms:</strong> ${safe('rooms')}</p>
          <p><strong>Year Built:</strong> ${safe('yearBuilt')}</p>
          <p><strong>Roof:</strong> ${safe('roof')}</p>
          <p><strong>Living Area:</strong> ${safe('livingArea')}</p>
          <p><strong>Foundation:</strong> ${safe('foundation')}</p>
          <p><strong>Acreage:</strong> ${safe('acreage')}</p>
          <p><strong>Garage Spaces:</strong> ${safe('garageSpaces')}</p>
          <p><strong>Virtual Tour:</strong> ${safe('virtualTour')}</p>

          <h3>Location</h3>
          <p><strong>Town:</strong> ${safe('town')}</p>
          <p><strong>County:</strong> ${safe('county')}</p>
          <p><strong>State:</strong> ${safe('state')}</p>
          <p><strong>Zip:</strong> ${safe('zip')}</p>

          <h3>Finance</h3>
          <p><strong>Taxes:</strong> ${safe('taxes')}</p>

          <h3>Interior Features</h3>
          <p><strong>Basement:</strong> ${safe('basement')}</p>
          <p><strong>Fireplace:</strong> ${listing.fireplace ? 'Yes' : 'No'}</p>
          <p><strong>Fireplaces Total:</strong> ${safe('fireplacesTotal')}</p>
          <p><strong>Fireplace Features:</strong> ${safe('fireplaceFeatures')}</p>

          <h3>Exterior Features</h3>
          <p><strong>Parking Spaces:</strong> ${safe('parkingSpaces')}</p>
          <p><strong>Parking Features:</strong> ${safe('parkingFeatures')}</p>

          <h3>Utilities and Appliances</h3>
          <p><strong>Heat System:</strong> ${listing.heatSystem ? 'Yes' : 'No'}</p>
          <p><strong>Appliances Included:</strong> ${safe('appliances')}</p>

          <h3>Schools</h3>
          <p><strong>Elementary School:</strong> ${safe('elementary')}</p>
          <p><strong>Junior High:</strong> ${safe('junior')}</p>
          <p><strong>High School:</strong> ${safe('high')}</p>

          <h3>Amenities</h3>
          <p>${safe('amenities')}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      const msg = document.createElement('p');
      msg.className = 'error';
      msg.textContent = 'Failed to load listings: ' + err.message;
      container.appendChild(msg);
    });
});
