document.addEventListener('DOMContentLoaded', function() {
    // Select necessary DOM elements
    const recoveryOptions = document.querySelectorAll('input[name="recovery"]');
    const nextButton = document.querySelector('.btn-siguiente');
    const genderOptions = document.querySelectorAll('.gender-option');

    // Add event listeners to radio buttons and their parent labels
    recoveryOptions.forEach((radio, index) => {
        radio.addEventListener('change', function() {
            // Remove selected class from all options
            genderOptions.forEach(option => {
                option.classList.remove('selected');
            });

            // Add selected class to the parent label of the checked radio
            if (this.checked) {
                genderOptions[index].classList.add('selected');
            }
        });
    });

    // Next button functionality
    nextButton.addEventListener('click', function(event) {
        event.preventDefault();

        // Check if a recovery method is selected
        const selectedMethod = document.querySelector('input[name="recovery"]:checked');

        if (!selectedMethod) {
            // Show alert if no method is selected
            alert('Por favor, selecciona un método de recuperación');
            return;
        }

        // Determine the selected recovery method
        const recoveryMethod = selectedMethod.value;

        // Example of how you might handle different recovery methods
        switch(recoveryMethod) {
            case 'email':
                // Simulate sending recovery code via email
                sendRecoveryCode('email');
                break;
            case 'phone':
                // Simulate sending recovery code via SMS
                sendRecoveryCode('phone');
                break;
            default:
                alert('Método de recuperación no válido');
        }
    });

    // Simulated function to send recovery code
    function sendRecoveryCode(method) {
        // In a real application, this would be an API call to your backend
        const methodName = method === 'email' ? 'correo electrónico' : 'número de celular';
        
        // Show loading state
        nextButton.textContent = 'Enviando código...';
        nextButton.disabled = true;

        // Simulate network request
        setTimeout(() => {
            // Reset button
            nextButton.textContent = 'Siguiente';
            nextButton.disabled = false;

            // Navigate to verification page or show code sent message
            alert(`Código enviado a tu ${methodName}. Verifica y continúa.`);
            
            // In a real app, you might navigate to a verification page
            // window.location.href = 'verify-code.html';
        }, 1500);
    }

    // Optional: Accessibility and keyboard navigation
    genderOptions.forEach(option => {
        option.addEventListener('keydown', function(event) {
            // Allow selection with spacebar
            if (event.key === ' ' || event.key === 'Enter') {
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
                radio.dispatchEvent(new Event('change'));
            }
        });

        // Make the entire label area clickable
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            radio.dispatchEvent(new Event('change'));
        });
    });
});