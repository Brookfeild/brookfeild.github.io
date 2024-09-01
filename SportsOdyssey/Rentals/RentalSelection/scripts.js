document.addEventListener('DOMContentLoaded', function () {
    let totalPrice = 0;

    function updateTotalPrice(amount) {
        totalPrice += amount;
        document.getElementById('total-price').textContent = `Total Price: $${totalPrice}`;
    }

    function deleteRental(rentalBox, rentalPrice) {
        rentalBox.remove();
        updateTotalPrice(-rentalPrice);
    }

    function validateInput(input, regex) {
        return regex.test(input);
    }
    
    document.getElementById('add-rental-btn').addEventListener('click', function () {
        alert('Button clicked!');
        const rentalBox = document.createElement('div');
        rentalBox.className = 'rental-box';
        rentalBox.dataset.previousPrice = 0;  // Initialize data attribute to store previous price

        rentalBox.innerHTML = `
            <!-- HTML content here for the rental box with event listeners, input fields, and buttons -->
        `;
        document.getElementById('rental-overview').insertBefore(rentalBox, document.getElementById('rental-overview').firstChild);

        const packageTypeSelect = rentalBox.querySelector('.package-type');
            const packageDetails = rentalBox.querySelector('.package-details');
            const highPerformanceChildren = rentalBox.querySelector('.high-performance-children select');
            const highPerformanceAdults = rentalBox.querySelector('.high-performance-adults select');
            const toggleArrow = rentalBox.querySelector('.toggle-arrow');
            const deleteBtn = rentalBox.querySelector('.delete-btn');
            const errorMessage = rentalBox.querySelector('.error-msg');
            let rentalPrice = 0;

            packageTypeSelect.addEventListener('change', function () {
                const selectedOption = packageTypeSelect.options[packageTypeSelect.selectedIndex];
                const submenu = selectedOption.getAttribute('data-submenu');

                packageDetails.classList.remove('hidden');

                highPerformanceChildren.parentNode.classList.add('hidden');
                highPerformanceAdults.parentNode.classList.add('hidden');

                if (submenu === 'high-performance-children') {
                    highPerformanceChildren.parentNode.classList.remove('hidden');
                } else if (submenu === 'high-performance-adults') {
                    highPerformanceAdults.parentNode.classList.remove('hidden');
                }

                const newRentalPrice = parseInt(selectedOption.value);
                updateTotalPrice(newRentalPrice - rentalPrice);
                rentalPrice = newRentalPrice;
            });

            [highPerformanceChildren, highPerformanceAdults].forEach(select => {
                select.addEventListener('change', function () {
                    const optionPrice = parseInt(this.value);
                    const previousPrice = parseInt(rentalBox.dataset.previousPrice);
                    updateTotalPrice(optionPrice - previousPrice);
                    rentalBox.dataset.previousPrice = optionPrice;
                });
            });

            deleteBtn.addEventListener('click', function () {
                deleteRental(rentalBox, rentalPrice);
            });

            rentalBox.querySelector('.save-rental-btn').addEventListener('click', function () {
                const firstName = rentalBox.querySelector('input[placeholder="Enter First Name"]');
                const lastName = rentalBox.querySelector('input[placeholder="Enter Last Name"]');
                const city = rentalBox.querySelector('input[placeholder="Enter City"]');
                const zipCode = rentalBox.querySelector('input[placeholder="Enter Zip Code"]');
                const age = rentalBox.querySelector('input[placeholder="Enter Age"]');

                // Basic validation
                if (!validateInput(firstName.value, /^[A-Za-z]{2,}$/) ||
                    !validateInput(lastName.value, /^[A-Za-z]{2,}$/) ||
                    !validateInput(city.value, /^[A-Za-z]{2,}$/) ||
                    !validateInput(zipCode.value, /^\d{5}$/) ||
                    !validateInput(age.value, /^(?:[1-9][0-9]?|99)$/)) {
                    errorMessage.textContent = 'Please check your inputs. Ensure names and city contain only letters (2+ characters), zip code is 5 digits, and age is between 1 and 99.';
                    errorMessage.style.display = 'block';
                    return;
                } else {
                    errorMessage.style.display = 'none';
                }

                if (rentalBox.querySelector('.insurance-checkbox').checked) {
                    rentalPrice += 1;
                }

                updateTotalPrice(rentalPrice);

                alert('Rental saved successfully!');

                rentalBox.querySelectorAll('input, select, button').forEach(function (element) {
                    element.disabled = true;
                });

                const selectedPackageText = packageTypeSelect.options[packageTypeSelect.selectedIndex].textContent;

                rentalBox.innerHTML =
                    <div class="collapsed-box">
                        <div>${selectedPackageText}</div>
                        <div class="toggle-arrow">&gt</div>
                        <button class="delete-btn">X</button>
        </div>
                    ;

                rentalBox.querySelector('.toggle-arrow').addEventListener('click', function () {
                    rentalBox.innerHTML = '';
                    rentalBox.appendChild(packageTypeSelect.parentNode);
                    rentalBox.appendChild(packageDetails);
                    packageDetails.classList.add('hidden');
                    toggleArrow.textContent = 'V';
                    packageTypeSelect.disabled = false;
                    rentalBox.querySelectorAll('input, select, button').forEach(function (element) {
                        element.disabled = false;
                    });
                    deleteBtn.addEventListener('click', function () {
                        deleteRental(rentalBox, rentalPrice);
                    });
                });

            rentalBox.querySelector('.delete-btn').addEventListener('click', function () {
                deleteRental(rentalBox, rentalPrice);
             });
         });
    });
});
