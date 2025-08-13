document.addEventListener('DOMContentLoaded', function() {
    // Select key elements
    const nombresInput = document.getElementById('nombres');
    const apellidosInput = document.getElementById('apellidos');
    const nextButton = document.querySelector('.btn-siguiente');
    const backArrow = document.querySelector('.back-arrow');

    // Validate name inputs
    function validateNames() {
        const nombres = nombresInput.value.trim();
        const apellidos = apellidosInput.value.trim();

        // Clear previous errors
        clearErrors();

        let isValid = true;

        // Validate nombres
        if (nombres === '') {
            showError(nombresInput, 'Por favor, ingresa tu(s) nombre(s)');
            isValid = false;
        } else if (nombres.length < 2) {
            showError(nombresInput, 'El nombre debe tener al menos 2 caracteres');
            isValid = false;
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombres)) {
            showError(nombresInput, 'El nombre solo puede contener letras');
            isValid = false;
        }

        // Validate apellidos
        if (apellidos === '') {
            showError(apellidosInput, 'Por favor, ingresa tu(s) apellido(s)');
            isValid = false;
        } else if (apellidos.length < 2) {
            showError(apellidosInput, 'El apellido debe tener al menos 2 caracteres');
            isValid = false;
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellidos)) {
            showError(apellidosInput, 'El apellido solo puede contener letras');
            isValid = false;
        }

        return isValid;
    }

    // Show error message for a specific input
    function showError(inputElement, message) {
        const errorEl = document.createElement('div');
        errorEl.classList.add('error-message');
        errorEl.textContent = message;
        errorEl.style.color = 'red';
        errorEl.style.fontSize = '0.8em';
        errorEl.style.marginTop = '5px';
        
        inputElement.classList.add('input-error');
        inputElement.parentNode.appendChild(errorEl);
    }

    // Clear all error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(el => el.remove());
        
        const errorInputs = document.querySelectorAll('.input-error');
        errorInputs.forEach(input => input.classList.remove('input-error'));
    }

    // Next button click handler
    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateNames()) {
            // Store names in local storage
            localStorage.setItem('userFirstName', nombresInput.value.trim());
            localStorage.setItem('userLastName', apellidosInput.value.trim());
            
            // Navigate to next registration step
            // Replace with your actual next page URL
            window.location.href = 'email-registro.html';
        }
    });

    // Back arrow navigation
    backArrow.addEventListener('click', function(e) {
        e.preventDefault();
        window.history.back(); // Go to previous page
    });

    // Restore previously entered names if returning to this page
    const savedFirstName = localStorage.getItem('userFirstName');
    const savedLastName = localStorage.getItem('userLastName');
    
    if (savedFirstName) {
        nombresInput.value = savedFirstName;
    }
    
    if (savedLastName) {
        apellidosInput.value = savedLastName;
    }

    // Real-time validation as user types
    nombresInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
    });

    apellidosInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
    });
});