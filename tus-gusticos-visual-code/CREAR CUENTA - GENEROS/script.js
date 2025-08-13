document.addEventListener('DOMContentLoaded', function() {
    // Select key elements
    const genderInputs = document.querySelectorAll('input[name="genero"]');
    const nextButton = document.querySelector('.btn-siguiente');
    const backArrow = document.querySelector('.back-arrow');

    // Validate gender selection
    function validateGenderSelection() {
        const selectedGender = document.querySelector('input[name="genero"]:checked');
        
        if (!selectedGender) {
            showError('Por favor, selecciona tu género');
            return false;
        }

        return true;
    }

    // Show error message
    function showError(message) {
        // Remove any existing error message
        let errorEl = document.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.classList.add('error-message');
            // Insert error message after gender selection
            const genderSelection = document.querySelector('.gender-selection');
            genderSelection.parentNode.insertBefore(errorEl, genderSelection.nextSibling);
        }
        
        errorEl.textContent = message;
        errorEl.style.color = 'red';
    }

    // Next button click handler
    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateGenderSelection()) {
            // Get selected gender value
            const selectedGender = document.querySelector('input[name="genero"]:checked').value;
            
            // Store gender in local storage to pass between pages
            localStorage.setItem('userGender', selectedGender);
            
            // Navigate to next registration step
            // Replace with your actual next page URL
            window.location.href = 'nombre-registro.html';
        }
    });

    // Back arrow navigation
    backArrow.addEventListener('click', function(e) {
        e.preventDefault();
        window.history.back(); // Go to previous page
    });

    // Optional: Remove error message when a gender is selected
    genderInputs.forEach(input => {
        input.addEventListener('change', function() {
            const errorEl = document.querySelector('.error-message');
            if (errorEl) {
                errorEl.remove();
            }
        });
    });

    // Check if gender was previously selected (in case of navigation back)
    const savedGender = localStorage.getItem('userGender');
    if (savedGender) {
        const genderInput = document.querySelector(`input[name="genero"][value="${savedGender}"]`);
        if (genderInput) {
            genderInput.checked = true;
        }
    }
});