document.addEventListener('DOMContentLoaded', () => {
  const listingsContainer = document.getElementById('listings-container');
  const addBtn = document.getElementById('add-listing');

  const listings = [
    { id: 1, title: "3-Bedroom Home in Shrewsbury", price: "$350,000" },
    { id: 2, title: "Downtown Apartment", price: "$270,000" }
  ];

  function renderListings() {
    listingsContainer.innerHTML = '';
    listings.forEach(listing => {
      const div = document.createElement('div');
      div.className = 'listing';
      div.innerHTML = `<strong>${listing.title}</strong><p>${listing.price}</p>`;
      listingsContainer.appendChild(div);
    });
  }

  function showAddListingForm() {
    const form = document.createElement('form');
    form.innerHTML = `
      <h3>Add New Listing</h3>
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required>

      <label for="price">Price:</label>
      <input type="text" id="price" name="price" required>

      <button type="submit">Save</button>
    `;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const newListing = {
        id: listings.length + 1,
        title: form.title.value,
        price: form.price.value
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
