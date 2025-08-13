document.addEventListener('DOMContentLoaded', function() {
    // Select key elements
    const dateInput = document.getElementById('nombres');
    const nextButton = document.querySelector('.btn-siguiente');
    const backArrow = document.querySelector('.back-arrow');

    // Date picker initialization
    const datepicker = new Pikaday({
        field: dateInput,
        format: 'DD/MM/YYYY',
        yearRange: [1940, new Date().getFullYear() - 13], // Ensure users are at least 13
        maxDate: new Date(), // Prevent future dates
        i18n: {
            previousMonth: 'Mes anterior',
            nextMonth: 'Próximo mes',
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
        }
    });

    // Validate date of birth
    function validateDateOfBirth() {
        const dobValue = dateInput.value.trim();
        const dobDate = datepicker.getDate();

        if (!dobValue) {
            showError('Por favor, selecciona tu fecha de nacimiento');
            return false;
        }

        // Calculate age
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        if (age < 13) {
            showError('Debes tener al menos 13 años para registrarte');
            return false;
        }

        return true;
    }

    // Show error message
    function showError(message) {
        // Create or update error message element
        let errorEl = document.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.classList.add('error-message');
            dateInput.parentNode.insertBefore(errorEl, dateInput.nextSibling);
        }
        errorEl.textContent = message;
        errorEl.style.color = 'red';
        dateInput.classList.add('input-error');
    }

    // Next button click handler
    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateDateOfBirth()) {
            // TODO: Add navigation to next registration step
            // For now, just log the date
            console.log('Date of Birth:', dateInput.value);
            // Example: window.location.href = 'next-registration-step.html';
        }
    });

    // Back arrow navigation
    backArrow.addEventListener('click', function(e) {
        e.preventDefault();
        window.history.back(); // Go to previous page
    });

    // Optional: Clear error styling when user starts typing
    dateInput.addEventListener('input', function() {
        this.classList.remove('input-error');
        const errorEl = document.querySelector('.error-message');
        if (errorEl) errorEl.remove();
    });
});

// Note: This script requires Pikaday library for date picking
// Include Pikaday CSS and JS before this script:
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.css">
// <script src="https://cdn.jsdelivr.net/npm/pikaday/pikaday.js"></script>