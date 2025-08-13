document.addEventListener('DOMContentLoaded', function() {
    // Select key elements
    const form = document.querySelector('form');
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const twoFactorCheckbox = document.getElementById('two-factor');
    const saveButton = document.querySelector('.save-button');
    const backArrows = document.querySelectorAll('.back-arrow');
    const profileImage = document.querySelector('.profile-image');

    // Load saved user data from localStorage
    function loadUserData() {
        const userData = JSON.parse(localStorage.getItem('userProfileData') || '{}');
        
        nombreInput.value = userData.nombre || '';
        apellidosInput.value = userData.apellidos || '';
        emailInput.value = userData.email || '';
        twoFactorCheckbox.checked = userData.twoFactor || false;
    }

    // Validate form inputs
    function validateForm() {
        let isValid = true;
        
        // Clear previous error messages
        clearErrors();

        // Nombre validation
        if (nombreInput.value.trim() === '') {
            showError(nombreInput, 'El nombre es requerido');
            isValid = false;
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombreInput.value)) {
            showError(nombreInput, 'El nombre solo puede contener letras');
            isValid = false;
        }

        // Apellidos validation
        if (apellidosInput.value.trim() === '') {
            showError(apellidosInput, 'Los apellidos son requeridos');
            isValid = false;
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellidosInput.value)) {
            showError(apellidosInput, 'Los apellidos solo pueden contener letras');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'El correo electrónico es requerido');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Ingresa un correo electrónico válido');
            isValid = false;
        }

        // Password validation
        if (passwordInput.value !== '') {
            if (passwordInput.value.length < 8) {
                showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres');
                isValid = false;
            }

            if (passwordInput.value !== confirmPasswordInput.value) {
                showError(confirmPasswordInput, 'Las contraseñas no coinciden');
                isValid = false;
            }
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

    // Save user profile data
    function saveUserData(e) {
        e.preventDefault();

        if (validateForm()) {
            const userData = {
                nombre: nombreInput.value.trim(),
                apellidos: apellidosInput.value.trim(),
                email: emailInput.value.trim(),
                twoFactor: twoFactorCheckbox.checked
            };

            // Save to localStorage
            localStorage.setItem('userProfileData', JSON.stringify(userData));

            // Optional: Update profile image
            updateProfileImage();

            // Show success message
            showSuccessMessage();
        }
    }

    // Update profile image
    function updateProfileImage() {
        // Placeholder for image upload functionality
        // In a real app, this would handle file upload
        console.log('Profile image update placeholder');
    }

    // Show success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.textContent = 'Perfil actualizado exitosamente';
        successMessage.style.backgroundColor = 'green';
        successMessage.style.color = 'white';
        successMessage.style.padding = '10px';
        successMessage.style.position = 'fixed';
        successMessage.style.top = '20px';
        successMessage.style.left = '50%';
        successMessage.style.transform = 'translateX(-50%)';
        successMessage.style.zIndex = '1000';
        
        document.body.appendChild(successMessage);

        // Remove success message after 3 seconds
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 3000);
    }

    // Handle back arrow navigation
    backArrows.forEach(arrow => {
        arrow.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    });

    // Add event listeners
    form.addEventListener('submit', saveUserData);

    // Add profile image click handler (placeholder for image upload)
    profileImage.addEventListener('click', function() {
        alert('Funcionalidad de carga de imagen próximamente');
    });

    // Load existing user data on page load
    loadUserData();

    // Real-time input validation
    nombreInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
    });

    apellidosInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
    });
});

// Optional: Add some additional styling for interactions
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerHTML = `
.input-error {
    border-color: red !important;
}

.order-status {
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.8em;
}

.status-completed {
    background-color: #4CAF50;
    color: white;
}

.status-pending {
    background-color: #FFC107;
    color: black;
}
`;
document.head.appendChild(styleSheet);