// RegistroPage.jsx - Página de registro con género corregido
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuario } from "../services/usuarioService";
import "./RegistroPage.css";

function RegistroPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombres: "",
    apellidos: "",
    genero: "",
    fechaNacimiento: "",
    correoElectronico: "",
    telefono: "",
    contrasena: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Manejar cambios en los inputs
  const manejarCambio = (e) => {
    setUsuario({ 
      ...usuario, 
      [e.target.name]: e.target.value 
    });
    setError(""); // Limpiar error al escribir
  };

  // Manejar el envío del formulario
  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const resultado = await registrarUsuario(usuario);
      
      if (resultado.success) {
        // Registro exitoso
        alert("Usuario registrado exitosamente");
        navigate("/");
      } else {
        // Mostrar error del servidor
        setError(resultado.message);
      }
    } catch (err) {
      // Manejar errores
      if (err.response && err.response.status === 409) {
        setError("El correo o telefono ya esta registrado");
      } else {
        setError("Error al registrar usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container">
      <h1>Crear Cuenta</h1>
      
      <form onSubmit={manejarRegistro} className="registro-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nombres *</label>
            <input 
              name="nombres" 
              placeholder="Nombres" 
              onChange={manejarCambio}
              value={usuario.nombres}
              required 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Apellidos *</label>
            <input 
              name="apellidos" 
              placeholder="Apellidos" 
              onChange={manejarCambio}
              value={usuario.apellidos}
              required 
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Genero *</label>
            <select 
              name="genero" 
              onChange={manejarCambio}
              value={usuario.genero}
              required
              disabled={loading}
            >
              <option value="">Seleccione genero</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Prefiero no decirlo</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fecha de Nacimiento *</label>
            <input 
              type="date" 
              name="fechaNacimiento" 
              onChange={manejarCambio}
              value={usuario.fechaNacimiento}
              required 
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Correo Electronico *</label>
            <input 
              type="email" 
              name="correoElectronico" 
              placeholder="correo@ejemplo.com" 
              onChange={manejarCambio}
              value={usuario.correoElectronico}
              required 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Telefono *</label>
            <input 
              name="telefono" 
              placeholder="3001234567" 
              onChange={manejarCambio}
              value={usuario.telefono}
              required 
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Contraseña *</label>
          <input 
            type="password" 
            name="contrasena" 
            placeholder="Minimo 6 caracteres" 
            onChange={manejarCambio}
            value={usuario.contrasena}
            required 
            disabled={loading}
          />
        </div>

        {/* Mostrar error si existe */}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <div className="form-footer">
        <Link to="/">Ya tengo cuenta</Link>
      </div>
    </div>
  );
}

export default RegistroPage;