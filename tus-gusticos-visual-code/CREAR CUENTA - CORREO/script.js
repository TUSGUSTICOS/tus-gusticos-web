document.addEventListener('DOMContentLoaded', () => {
    const contactInput = document.getElementById('nombres');
    const siguienteBoton = document.querySelector('.btn-siguiente');
    const backArrow = document.querySelector('.back-arrow');

    // Función para validar correo electrónico
    function esCorreoValido(correo) {
        const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexCorreo.test(correo);
    }

    // Función para validar número de celular (colombiano)
    function esNumeroCelularValido(numero) {
        // Validación para números colombianos (10 dígitos, puede incluir espacios o guiones)
        const regexCelular = /^(3\d{9}|\+?57\s?3\d{9}|3\d{2}\s?\d{3}\s?\d{4})$/;
        return regexCelular.test(numero.replace(/[\s-]/g, ''));
    }

    // Función para validar el input
    function validarContacto() {
        const contacto = contactInput.value.trim();

        // Limpiar errores previos
        eliminarErrores();

        // Validaciones
        if (contacto === '') {
            mostrarError('Por favor ingresa un correo electrónico o número de celular');
            return false;
        }

        // Verificar si es correo o número de celular
        const esCorreo = esCorreoValido(contacto);
        const esCelular = esNumeroCelularValido(contacto);

        if (!esCorreo && !esCelular) {
            mostrarError('Ingresa un correo electrónico o número de celular válido');
            return false;
        }

        return true;
    }

    // Función para mostrar errores
    function mostrarError(mensaje) {
        // Eliminar errores previos
        const errorExistente = document.querySelector('.error-message');
        if (errorExistente) {
            errorExistente.remove();
        }

        // Crear nuevo mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '10px';
        errorDiv.style.textAlign = 'center';
        errorDiv.textContent = mensaje;

        // Insertar el mensaje de error después del input
        contactInput.parentNode.insertBefore(errorDiv, contactInput.nextSibling);
    }

    // Función para eliminar errores
    function eliminarErrores() {
        const errorExistente = document.querySelector('.error-message');
        if (errorExistente) {
            errorExistente.remove();
        }
    }

    // Evento de clic en botón Siguiente
    siguienteBoton.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (validarContacto()) {
            // Contacto válido
            alert('Contacto verificado correctamente');
            // Aquí puedes redirigir a la siguiente página
            // window.location.href = 'pagina-de-verificacion.html';
        }
    });

    // Evento de retorno (flecha atrás)
    backArrow.addEventListener('click', (e) => {
        e.preventDefault();
        // Puedes redirigir a la página anterior
        // window.location.href = 'pagina-anterior.html';
    });

    // Limpiar errores al escribir
    contactInput.addEventListener('input', eliminarErrores);
});