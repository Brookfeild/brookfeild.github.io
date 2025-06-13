document.addEventListener('DOMContentLoaded', () => {
  const listingsContainer = document.getElementById('listings-container');
  const addBtn = document.getElementById('add-listing');
  const listings = [];

  function renderListings() {
    listingsContainer.innerHTML = '';
    listings.forEach(listing => {
      const div = document.createElement('div');
      div.className = 'listing';
      const imageHTML = listing.photos.length ? `<img src="${listing.photos[0]}" alt="Property Photo" style="width:100px; height:auto;">` : '';
      div.innerHTML = `
        ${imageHTML}
        <strong>${listing.basic.title}</strong>
        <p>${listing.basic.address}</p>
        <p>${listing.location.zip}</p>
      `;
      listingsContainer.appendChild(div);
    });
  }

  function showAddListingForm() {
    const form = document.createElement('form');
    form.enctype = 'multipart/form-data';
    form.innerHTML = `
      <h3>Add New Listing</h3>
      <fieldset><legend>Basic Information</legend>
        <label>Title: <input name="title" required></label>
        <label>MLSPIN: <input name="mlspin"></label>
        <label>Rooms: <input name="rooms" type="number"></label>
        <label>Year Built: <input name="yearBuilt"></label>
        <label>Roof: <input name="roof"></label>
        <label>Living Area (sqft): <input name="livingArea"></label>
        <label>Foundation: <input name="foundation"></label>
        <label>Acreage: <input name="acreage"></label>
        <label>Garage Spaces: <input name="garageSpaces" type="number"></label>
      </fieldset>

      <fieldset><legend>Location</legend>
        <label>Town: <input name="town"></label>
        <label>County: <input name="county"></label>
        <label>State: <input name="state"></label>
        <label>Zip: <input name="zip"></label>
      </fieldset>

      <fieldset><legend>Finance</legend>
        <label>Taxes: <input name="taxes"></label>
      </fieldset>

      <fieldset><legend>Interior Features</legend>
        <label>Basement: <input name="basement"></label>
        <label>Fireplace: <input type="checkbox" name="fireplace"></label>
        <label>Fireplaces Total: <input name="fireplacesTotal" type="number"></label>
        <label>Fireplace Features: <input name="fireplaceFeatures"></label>
      </fieldset>

      <fieldset><legend>Exterior Features</legend>
        <label>Parking Spaces: <input name="parkingSpaces"></label>
        <label>Parking Features: <input name="parkingFeatures"></label>
      </fieldset>

      <fieldset><legend>Utilities and Appliances</legend>
        <label>Heat System: <input type="checkbox" name="heatSystem"></label>
        <label>Appliances Included: <input name="appliances"></label>
      </fieldset>

      <fieldset><legend>Schools</legend>
        <label>Elementary School: <input name="elementary"></label>
        <label>Junior High: <input name="junior"></label>
        <label>High School: <input name="high"></label>
      </fieldset>

      <fieldset><legend>Amenities</legend>
        <label>Amenities: <textarea name="amenities"></textarea></label>
      </fieldset>

      <fieldset><legend>Photos</legend>
        <label>Upload Images: <input type="file" name="photos" accept="image/*" multiple></label>
      </fieldset>

      <button type="submit">Save Listing</button>
    `;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);

      const photos = [];
      const photoFiles = fd.getAll('photos');
      photoFiles.forEach(file => {
        const url = URL.createObjectURL(file);
        photos.push(url);
      });

      const newListing = {
        basic: {
          title: fd.get('title'),
          mlspin: fd.get('mlspin'),
          rooms: fd.get('rooms'),
          yearBuilt: fd.get('yearBuilt'),
          roof: fd.get('roof'),
          livingArea: fd.get('livingArea'),
          foundation: fd.get('foundation'),
          acreage: fd.get('acreage'),
          garageSpaces: fd.get('garageSpaces'),
          address: fd.get('town') + ', ' + fd.get('state')
        },
        location: {
          town: fd.get('town'),
          county: fd.get('county'),
          state: fd.get('state'),
          zip: fd.get('zip')
        },
        finance: {
          taxes: fd.get('taxes')
        },
        interior: {
          basement: fd.get('basement'),
          fireplace: fd.get('fireplace') === 'on',
          fireplacesTotal: fd.get('fireplacesTotal'),
          fireplaceFeatures: fd.get('fireplaceFeatures')
        },
        exterior: {
          parkingSpaces: fd.get('parkingSpaces'),
          parkingFeatures: fd.get('parkingFeatures')
        },
        utilities: {
          heatSystem: fd.get('heatSystem') === 'on',
          appliances: fd.get('appliances')
        },
        schools: {
          elementary: fd.get('elementary'),
          junior: fd.get('junior'),
          high: fd.get('high')
        },
        amenities: fd.get('amenities'),
        photos: photos
      };

      listings.push(newListing);
      renderListings();
      form.remove();
    });

    listingsContainer.insertAdjacentElement('beforebegin', form);
  }

  addBtn.addEventListener('click', () => {
    showAddListingForm();
  });

  renderListings();
});
