// LoginPage.jsx - Página de login simplificada
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUsuario } from "../services/usuarioService";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [identificador, setIdentificador] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Manejar el envío del formulario
  const manejarLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const resultado = await loginUsuario(identificador, contrasena);
      
      if (resultado.success) {
        // Login exitoso - redirigir al dashboard
        alert("Autenticación satisfactoria");
        navigate("/dashboard");
      } else {
        // Mostrar error específico
        setError(resultado.message);
      }
    } catch (err) {
      // Manejar errores de conexión
      if (err.response) {
        if (err.response.status === 404) {
          setError("Usuario no registrado");
        } else if (err.response.status === 401) {
          setError("Contraseña incorrecta");
        } else {
          setError("Error en la autenticación");
        }
      } else {
        setError("Error de conexión con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión - Tus Gusticos</h1>
      
      <form onSubmit={manejarLogin} className="login-form">
        <div className="form-group">
          <label>Correo o Número de teléfono</label>
          <input
            type="text"
            placeholder="Ingresa correo o número de teléfono"
            value={identificador}
            onChange={(e) => setIdentificador(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Mostrar error si existe */}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Iniciando..." : "Entrar"}
        </button>
      </form>

      <div className="form-footer">
        <Link to="/registro">Crear cuenta</Link>
      </div>
    </div>
  );
}

export default LoginPage;