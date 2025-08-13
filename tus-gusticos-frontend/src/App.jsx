import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsuariosPage from "./pages/UsuariosPage";
import './App.css';

function App() {
  return (
    <Router>
      {/* Navbar con tema Tus Gusticos */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            {/* Logo del restaurante - Reemplaza con la ruta correcta de tu imagen */}
            <img 
              src="/public/logo-tus-gusticos.jpg" 
              alt="Logo Tus Gusticos" 
              onError={(e) => {
                // Fallback si no encuentra la imagen
                e.target.style.display = 'none';
              }}
            />
            <h2>Tus Gusticos</h2>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              🏠 Inicio
            </Link>
            <Link to="/usuarios" className="nav-link">
              👥 Gestión de Usuarios
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="home-page">
                {/* Logo principal en la página de inicio */}
                <img 
                  src="/public/logo-tus-gusticos.jpg" 
                  alt="Restaurante Tus Gusticos" 
                  className="page-logo"
                  onError={(e) => {
                    // Mostrar emoji si no hay imagen
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.style.fontSize = '5rem';
                    fallback.style.marginBottom = '1rem';
                    fallback.textContent = '';
                    e.target.parentNode.insertBefore(fallback, e.target);
                  }}
                />
                
                <h1>Restaurante Tus Gusticos</h1>
                <p>El mejor lugar para disfrutar de deliciosos platillos</p>
                
                <div className="home-actions">
                  <Link to="/usuarios" className="btn btn-primary">
                    👥 Gestionar Usuarios
                  </Link>
                </div>
                
                {/* Información adicional */}
                <div style={{ 
                  marginTop: '3rem', 
                  padding: '2rem', 
                  background: 'white', 
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(255, 87, 34, 0.1)'
                }}>
                  <h3 style={{ 
                    color: '#ff5722', 
                    marginBottom: '1rem',
                    fontFamily: 'Georgia, Times New Roman, Times, serif'
                  }}>
                    🎯 Sistema de Gestión
                  </h3>
                  <p style={{ color: '#666', lineHeight: '1.8' }}>
                    Bienvenido al sistema administrativo de <strong>Tus Gusticos</strong>. 
                    Desde aquí podrás gestionar usuarios, administrar roles y mantener 
                    actualizada toda la información del restaurante.
                  </p>
                  
                  <div style={{ 
                    marginTop: '2rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem'
                  }}>
                    <div style={{
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                      borderRadius: '10px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
                      <strong style={{ color: '#ff5722' }}>Usuarios</strong>
                      <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.5rem 0' }}>
                        Administra clientes y personal
                      </p>
                    </div>
                    
                    <div style={{
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
                      borderRadius: '10px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔐</div>
                      <strong style={{ color: '#9c27b0' }}>Seguridad</strong>
                      <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.5rem 0' }}>
                        Control de acceso y permisos
                      </p>
                    </div>
                    
                    <div style={{
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                      borderRadius: '10px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                      <strong style={{ color: '#4caf50' }}>Reportes</strong>
                      <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.5rem 0' }}>
                        Estadísticas y análisis
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            } 
          />
          <Route path="/usuarios" element={<UsuariosPage />} />
        </Routes>
      </main>

      {/* Footer opcional */}
      <footer style={{
        background: 'linear-gradient(135deg, #333 0%, #555 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '2rem',
        marginTop: '3rem'
      }}>
        <p style={{ margin: 0, fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
          &copy; 2024 Tus Gusticos. Todos los derechos reservados.
        </p>
        <p style={{ 
          margin: '0.5rem 0 0', 
          fontSize: '0.9rem', 
          opacity: '0.8',
          fontStyle: 'italic' 
        }}>
          Sistema de Gestión Gastronómica - Desarrollado con React JS
        </p>
      </footer>
    </Router>
  );
}

export default App;