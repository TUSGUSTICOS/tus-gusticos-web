document.addEventListener('DOMContentLoaded', function() {
    // Select key elements
    const recoveryInput = document.getElementById('nombres');
    const nextButton = document.querySelector('.btn-siguiente');
    const backArrow = document.querySelector('.back-arrow');
    const createAccountLink = document.querySelector('.reset-link');

    // Validate recovery input (email or phone)
    function validateRecoveryInput() {
        const input = recoveryInput.value.trim();
        
        // Clear previous errors
        clearErrors();

        // Validate email or phone number
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+?57)?[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/;

        if (input === '') {
            showError('Por favor, ingresa tu correo electrónico o número de teléfono');
            return false;
        }

        if (!emailRegex.test(input) && !phoneRegex.test(input)) {
            showError('Ingresa un correo electrónico o número de teléfono válido');
            return false;
        }

        return true;
    }

    // Show error message
    function showError(message) {
        const errorEl = document.createElement('div');
        errorEl.classList.add('error-message');
        errorEl.textContent = message;
        errorEl.style.color = 'red';
        errorEl.style.fontSize = '0.8em';
        errorEl.style.marginTop = '5px';
        
        recoveryInput.classList.add('input-error');
        recoveryInput.parentNode.appendChild(errorEl);
    }

    // Clear error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(el => el.remove());
        
        recoveryInput.classList.remove('input-error');
    }

    // Next button click handler
    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateRecoveryInput()) {
            // Store recovery input for next steps
            localStorage.setItem('recoveryIdentifier', recoveryInput.value.trim());
            
            // Navigate to verification page
            // Replace with your actual verification page URL
            window.location.href = 'verificacion-codigo.html';
        }
    });

    // Back arrow navigation
    backArrow.addEventListener('click', function(e) {
        e.preventDefault();
        window.history.back();
    });

    // Create account link
    createAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Navigate to registration page
        // Replace with your actual registration page URL
        window.location.href = 'registro.html';
    });

    // Real-time input formatting and validation
    recoveryInput.addEventListener('input', function() {
        // Remove any non-alphanumeric characters except @ and .
        this.value = this.value.replace(/[^a-zA-Z0-9@. -]/g, '');
    });

    // Restore previously entered recovery input if returning to page
    const savedRecoveryInput = localStorage.getItem('recoveryIdentifier');
    if (savedRecoveryInput) {
        recoveryInput.value = savedRecoveryInput;
    }
});

// Optional: Add some additional styling for interactions
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerHTML = `
.input-error {
    border-color: red !important;
}

.btn-siguiente {
    transition: background-color 0.3s, transform 0.2s;
}

.btn-siguiente:hover {
    background-color: #0056b3;
}

.btn-siguiente:active {
    transform: scale(0.98);
}
`;
document.head.appendChild(styleSheet);