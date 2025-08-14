// App.jsx - Aplicación principal simplificada
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de login - página principal */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Ruta de registro */}
        <Route path="/registro" element={<RegistroPage />} />
        
        {/* Ruta del dashboard (después del login) */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Redirigir cualquier otra ruta al login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


