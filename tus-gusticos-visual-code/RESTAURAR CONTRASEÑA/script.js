// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select necessary DOM elements
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const createButton = document.querySelector('.btn-siguiente');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // Password toggle functionality (for both password fields)
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const inputField = this.previousElementSibling;
            const icon = this;

            if (inputField.type === 'password') {
                inputField.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                inputField.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Password validation function
    function validatePassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Reset previous error states
        passwordInput.classList.remove('error');
        confirmPasswordInput.classList.remove('error');

        // Validation checks
        let isValid = true;
        let errorMessage = '';

        // Check password length
        if (password.length < 6) {
            isValid = false;
            errorMessage += 'La contraseña debe tener al menos 6 caracteres. ';
            passwordInput.classList.add('error');
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            isValid = false;
            errorMessage += 'Las contraseñas no coinciden. ';
            confirmPasswordInput.classList.add('error');
        }

        // Optional: Add more password strength checks
        const hasNumber = /\d/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);
        if (!hasNumber || !hasLetter) {
            isValid = false;
            errorMessage += 'La contraseña debe contener letras y números. ';
            passwordInput.classList.add('error');
        }

        // Display error or proceed
        if (!isValid) {
            alert(errorMessage.trim());
            return false;
        }

        return true;
    }

    // Event listener for create button
    createButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission

        if (validatePassword()) {
            // Here you would typically send the password to your backend
            // For now, we'll just show a success message
            alert('Contraseña creada exitosamente');
            
            // Optional: Redirect or enable next step
            // window.location.href = 'next-page.html';
        }
    });

    // Real-time password validation on input
    passwordInput.addEventListener('input', function() {
        // Optional: Provide immediate feedback as user types
        const passwordStrength = calculatePasswordStrength(this.value);
        updatePasswordStrengthIndicator(passwordStrength);
    });

    // Password strength calculation
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 6) strength++;
        if (password.length >= 8) strength++;
        if (/\d/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;

        return strength;
    }

    // Visual password strength indicator
    function updatePasswordStrengthIndicator(strength) {
        // You would need to add a strength indicator div in your HTML
        const strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'password-strength';
        
        const levels = ['Muy débil', 'Débil', 'Medio', 'Fuerte', 'Muy fuerte'];
        const colors = ['red', 'orange', 'yellow', 'lightgreen', 'green'];

        if (strength > 0) {
            strengthIndicator.textContent = levels[strength - 1];
            strengthIndicator.style.color = colors[strength - 1];
            
            // Insert or update the strength indicator
            const existingIndicator = document.querySelector('.password-strength');
            if (existingIndicator) {
                existingIndicator.replaceWith(strengthIndicator);
            } else {
                passwordInput.after(strengthIndicator);
            }
        }
    }
});