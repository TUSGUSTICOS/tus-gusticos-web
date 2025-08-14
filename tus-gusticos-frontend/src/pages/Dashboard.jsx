// Dashboard.jsx - Página después del login exitoso
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Verificar si hay usuario logueado
    const usuarioGuardado = localStorage.getItem('usuario');
    if (!usuarioGuardado) {
      // Si no hay usuario, redirigir al login
      navigate('/');
    } else {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, [navigate]);

  const handleLogout = () => {
    // Limpiar localStorage y redirigir al login
    localStorage.removeItem('usuario');
    navigate('/');
  };

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Bienvenido al Sistema</h1>
      
      <div className="user-info">
        <h2>Información del Usuario</h2>
        <p><strong>Nombre:</strong> {usuario.nombres} {usuario.apellidos}</p>
        <p><strong>Correo:</strong> {usuario.correoElectronico}</p>
        <p><strong>Teléfono:</strong> {usuario.telefono}</p>
        <p><strong>Género:</strong> {usuario.genero}</p>
      </div>

      <button onClick={handleLogout} className="logout-button">
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Dashboard;