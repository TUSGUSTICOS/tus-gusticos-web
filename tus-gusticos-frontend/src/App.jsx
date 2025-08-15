// App.jsx - Aplicación principal con todas las rutas incluyendo gestión de usuarios
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import MenusPage from './pages/MenusPage';
import CarritoPage from './pages/CarritoPage';
import PagoPage from './pages/PagoPage';
import PerfilPage from './pages/PerfilPage';
import GestionUsuariosPage from './pages/GestionUsuariosPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de login - página principal */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Ruta de registro */}
        <Route path="/registro" element={<RegistroPage />} />
        
        {/* Ruta de menús (después del login) */}
        <Route path="/menus" element={<MenusPage />} />
        
        {/* Ruta del carrito */}
        <Route path="/carrito" element={<CarritoPage />} />
        
        {/* Ruta de pago */}
        <Route path="/pago" element={<PagoPage />} />
        
        {/* Ruta del perfil */}
        <Route path="/perfil" element={<PerfilPage />} />
        
        {/* Ruta de gestión de usuarios (solo administradores) */}
        <Route path="/gestion-usuarios" element={<GestionUsuariosPage />} />
        
        {/* Redirigir cualquier otra ruta al login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


