document.addEventListener('DOMContentLoaded', () => {
  const listingsContainer = document.getElementById('listings-container');
  const addBtn = document.getElementById('add-listing');

  function renderListings(listings) {
    listingsContainer.innerHTML = '';
    listings.forEach(listing => {
      const div = document.createElement('div');
      div.className = 'listing';
      div.innerHTML = `<strong>${listing.basic.title}</strong><p>${listing.basic.address}</p><p>${listing.location.zip}</p>`;
      listingsContainer.appendChild(div);
    });
  }

  function loadListings() {
    fetch('../../listings.json')
      .then(res => res.json())
      .then(data => renderListings(data));
  }

  function showAddListingForm() {
    const form = document.createElement('form');
    form.setAttribute('enctype', 'multipart/form-data');
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

      <fieldset><legend>Images</legend>
        <label>Upload Images: <input type="file" name="images[]" multiple accept="image/*"></label>
      </fieldset>

      <button type="submit">Save Listing</button>
    `;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(form);
      fetch('../../save-listing.php', {
        method: 'POST',
        body: formData
      })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        loadListings();
        form.remove();
      });
    });

    listingsContainer.insertAdjacentElement('beforebegin', form);
  }

  addBtn.addEventListener('click', showAddListingForm);

  loadListings();
});
