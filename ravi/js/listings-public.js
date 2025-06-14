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

          <h3>Property Details</h3>
          <p><strong>MLSPIN:</strong> ${listing.mlspin || ''}</p>
          <p><strong>Rooms:</strong> ${listing.rooms || ''}</p>
          <p><strong>Year Built:</strong> ${listing.yearBuilt || ''}</p>
          <p><strong>Roof:</strong> ${listing.roof || ''}</p>
          <p><strong>Living Area:</strong> ${listing.livingArea || ''}</p>
          <p><strong>Foundation:</strong> ${listing.foundation || ''}</p>
          <p><strong>Acreage:</strong> ${listing.acreage || ''}</p>
          <p><strong>Garage Spaces:</strong> ${listing.garageSpaces || ''}</p>
          <p><strong>Virtual Tour:</strong> ${listing.virtualTour || ''}</p>

          <h3>Location</h3>
          <p><strong>Town:</strong> ${listing.town}</p>
          <p><strong>County:</strong> ${listing.county}</p>
          <p><strong>State:</strong> ${listing.state}</p>
          <p><strong>Zip:</strong> ${listing.zip}</p>

          <h3>Finance</h3>
          <p><strong>Taxes:</strong> ${listing.taxes}</p>

          <h3>Interior Features</h3>
          <p><strong>Basement:</strong> ${listing.basement}</p>
          <p><strong>Fireplace:</strong> ${listing.fireplace}</p>
          <p><strong>Fireplaces Total:</strong> ${listing.fireplacesTotal}</p>
          <p><strong>Fireplace Features:</strong> ${listing.fireplaceFeatures}</p>

          <h3>Exterior Features</h3>
          <p><strong>Parking Spaces:</strong> ${listing.parkingSpaces}</p>
          <p><strong>Parking Features:</strong> ${listing.parkingFeatures}</p>

          <h3>Utilities and Appliances</h3>
          <p><strong>Heat System:</strong> ${listing.heatSystem}</p>
          <p><strong>Appliances Included:</strong> ${listing.appliances}</p>

          <h3>Schools</h3>
          <p><strong>Elementary School:</strong> ${listing.elementary}</p>
          <p><strong>Junior High:</strong> ${listing.junior}</p>
          <p><strong>High School:</strong> ${listing.high}</p>

          <h3>Amenities</h3>
          <p>${listing.amenities}</p>
        `;
        container.appendChild(div);
      });
    });
});