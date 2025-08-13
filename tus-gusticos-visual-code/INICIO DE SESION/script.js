document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const correoInput = document.getElementById('correo');
    const contraseñaInput = document.getElementById('contraseña');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validaciones básicas
        const correo = correoInput.value.trim();
        const contraseña = contraseñaInput.value.trim();

        // Aquí irían tus validaciones específicas
        if (correo === '' || contraseña === '') {
            mostrarError('Por favor, completa todos los campos');
            return;
        }

        // Validación de formato de correo (opcional)
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
        if (!correoValido && isNaN(correo)) {
            mostrarError('Ingresa un correo o número de celular válido');
            return;
        }

        // Aquí simulamos una validación (reemplazar con tu lógica de backend)
        if (correo === 'usuario@ejemplo.com' && contraseña === 'contraseña123') {
            // Inicio de sesión exitoso
            errorMessage.style.display = 'none';
            alert('Inicio de sesión exitoso');
            // Redirigir a otra página
            // window.location.href = 'dashboard.html';
        } else {
            mostrarError('Usuario o contraseña incorrectos');
        }
    });

    function mostrarError(mensaje) {
        errorMessage.textContent = mensaje;
        errorMessage.style.display = 'block';
    }

    // Ocultar mensaje de error al escribir
    correoInput.addEventListener('input', () => {
        errorMessage.style.display = 'none';
    });

    contraseñaInput.addEventListener('input', () => {
        errorMessage.style.display = 'none';
    });
});