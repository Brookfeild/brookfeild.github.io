document.addEventListener('DOMContentLoaded', () => {
  const listingsContainer = document.getElementById('listings-container');
  const addBtn = document.getElementById('add-listing');

  // Example: Simulated database fetch
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

  addBtn.addEventListener('click', () => {
    alert("This would open a form to add a new listing (not yet implemented).");
  });

  renderListings();
});
