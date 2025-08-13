document.addEventListener('DOMContentLoaded', () => {
    const codigoInput = document.getElementById('nombres');
    const siguienteBoton = document.querySelector('.btn-siguiente');
    const backArrow = document.querySelector('.back-arrow');

    // Configuración básica de validación de código
    const CODIGO_CORRECTO = '123456'; // Código de ejemplo, reemplazar con lógica real

    // Función para validar el código
    function validarCodigo() {
        const codigoIngresado = codigoInput.value.trim();

        // Validaciones
        if (codigoIngresado === '') {
            mostrarError('Por favor ingresa el código de verificación');
            return false;
        }

        if (codigoIngresado.length !== 6) {
            mostrarError('El código debe tener 6 dígitos');
            return false;
        }

        if (codigoIngresado !== CODIGO_CORRECTO) {
            mostrarError('Código incorrecto. Verifica e intenta nuevamente');
            return false;
        }

        return true;
    }

    // Función para mostrar errores
    function mostrarError(mensaje) {
        // Si ya existe un mensaje de error, lo elimina
        const errorExistente = document.querySelector('.error-message');
        if (errorExistente) {
            errorExistente.remove();
        }

        // Crea nuevo mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '10px';
        errorDiv.textContent = mensaje;

        // Inserta el mensaje de error después del input
        codigoInput.parentNode.insertBefore(errorDiv, codigoInput.nextSibling);
    }

    // Evento de clic en botón Siguiente
    siguienteBoton.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (validarCodigo()) {
            // Código correcto
            alert('Código verificado correctamente');
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
    codigoInput.addEventListener('input', () => {
        const errorExistente = document.querySelector('.error-message');
        if (errorExistente) {
            errorExistente.remove();
        }
    });

    // Solo permitir números en el input
    codigoInput.addEventListener('keypress', (e) => {
        const soloNumeros = /[0-9]/;
        if (!soloNumeros.test(e.key)) {
            e.preventDefault();
        }
    });
});