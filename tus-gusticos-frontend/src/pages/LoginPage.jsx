// LoginPage.jsx - Página de login actualizada
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

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const resultado = await loginUsuario(identificador, contrasena);
      
      if (resultado.success) {
        alert("Autenticación satisfactoria");
        navigate("/menus"); // Redirigir a menús en lugar de dashboard
      } else {
        setError(resultado.message);
      }
    } catch (err) {
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
    <div className="login-page">
      <div className="login-container">
        <header>
          <h1>Tus Gusticos</h1>
        </header>
        
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

          {error && <div className="error-general">{error}</div>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Iniciando..." : "Entrar"}
          </button>
        </form>

        <div className="form-footer">
          <Link to="/registro">¿No tienes cuenta? Crear cuenta</Link>
        </div>

        <footer>
          <p>© 2025 Tus Gusticos - Sistema de Pedidos</p>
        </footer>
      </div>
    </div>
  );
}

export default LoginPage;