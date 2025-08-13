document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const crearAhoraBoton = document.querySelector('.btn-siguiente');
    const backArrow = document.querySelector('.back-arrow');

    // Función para validar contraseña
    function validarContrasena() {
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Limpiar errores previos
        eliminarErrores();

        // Validaciones
        if (password === '') {
            mostrarError(passwordInput, 'La contraseña no puede estar vacía');
            return false;
        }

        if (password.length < 6) {
            mostrarError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
            return false;
        }

        // Validación de complejidad (opcional)
        const tieneNumero = /\d/.test(password);
        const tieneMayuscula = /[A-Z]/.test(password);
        const tieneMinuscula = /[a-z]/.test(password);

        if (!(tieneNumero && tieneMayuscula && tieneMinuscula)) {
            mostrarError(passwordInput, 'La contraseña debe contener números, mayúsculas y minúsculas');
            return false;
        }

        if (confirmPassword === '') {
            mostrarError(confirmPasswordInput, 'Por favor confirma tu contraseña');
            return false;
        }

        if (password !== confirmPassword) {
            mostrarError(confirmPasswordInput, 'Las contraseñas no coinciden');
            return false;
        }

        return true;
    }

    // Función para mostrar errores
    function mostrarError(input, mensaje) {
        // Eliminar errores previos
        const errorExistente = input.parentNode.querySelector('.error-message');
        if (errorExistente) {
            errorExistente.remove();
        }

        // Crear nuevo mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = mensaje;

        // Insertar mensaje de error
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }

    // Función para eliminar errores
    function eliminarErrores() {
        const errores = document.querySelectorAll('.error-message');
        errores.forEach(error => error.remove());
    }

    // Evento de clic en botón Crear Ahora
    crearAhoraBoton.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (validarContrasena()) {
            // Contraseña válida
            alert('Contraseña creada correctamente');
            // Aquí puedes redirigir a la siguiente página
            // window.location.href = 'siguiente-pagina.html';
        }
    });

    // Evento de retorno (flecha atrás)
    backArrow.addEventListener('click', (e) => {
        e.preventDefault();
        // Puedes redirigir a la página anterior
        // window.location.href = 'pagina-anterior.html';
    });

    // Limpiar errores al escribir
    passwordInput.addEventListener('input', eliminarErrores);
    confirmPasswordInput.addEventListener('input', eliminarErrores);

    // Funciones para mostrar/ocultar contraseña
    function togglePassword(inputId) {
        const passwordField = document.getElementById(inputId);
        const icon = passwordField.nextElementSibling;
        
        if (passwordField.type === "password") {
            passwordField.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            passwordField.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    }

    // Asignar eventos a los iconos de mostrar/ocultar
    const passwordToggleIcons = document.querySelectorAll('.password-toggle');
    passwordToggleIcons.forEach((icon, index) => {
        icon.addEventListener('click', () => {
            togglePassword(index === 0 ? 'password' : 'confirm-password');
        });
    });
});