document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const btnEntrar = document.getElementById('btn-entrar');
  const loginForm = document.getElementById('login-form');
  const welcomeMessage = document.querySelector('.welcome-message');
  const crearCuenta = document.getElementById('crear-cuenta');
  
  // Mostrar formulario de login cuando se hace clic en "Entrar"
  btnEntrar.addEventListener('click', function() {
      welcomeMessage.style.display = 'none';
      document.querySelector('.buttons-container').style.display = 'none';
      loginForm.style.display = 'flex';
  });
  
  // Redireccionar a página de registro cuando se hace clic en "crear cuenta"
  crearCuenta.addEventListener('click', function(e) {
      e.preventDefault();
      // Aquí puedes redireccionar a la página de registro
      window.location.href = "registro.html";
  });
  
  // Manejar envío del formulario de login
  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Obtener los valores ingresados
      const usuario = document.getElementById('correo').value;
      const contraseña = document.getElementById('contraseña').value;
      
      // Validar los datos
      if (usuario === "Usuariojj" && contraseña === "123") {
          // Redirigir a la página principal de Tus Gusticos
          window.location.href = "principal.html"; // Reemplaza con la URL correcta
      } else {
          // Mostrar un mensaje de error
          alert("Usuario o contraseña incorrectos. Por favor, intenta de nuevo.");
      }
  });
});