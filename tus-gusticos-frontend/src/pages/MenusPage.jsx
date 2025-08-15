// MenusPage.jsx - CORREGIDO: botón de gestión de usuarios en el menú para administradores
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerPlatosPorCategoria } from '../services/usuarioService';
import './MenusPage.css';

function MenusPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('corriente');
  const [platos, setPlatos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar si hay usuario logueado
    const usuarioGuardado = localStorage.getItem('usuario');
    if (!usuarioGuardado) {
      navigate('/');
      return;
    }
    setUsuario(JSON.parse(usuarioGuardado));

    // Cargar carrito desde localStorage
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, [navigate]);

  useEffect(() => {
    if (categoriaSeleccionada) {
      cargarPlatos();
    }
  }, [categoriaSeleccionada]);

  const cargarPlatos = async () => {
    setLoading(true);
    try {
      const resultado = await obtenerPlatosPorCategoria(categoriaSeleccionada);
      if (resultado.success) {
        setPlatos(resultado.data);
      } else {
        console.error('Error cargando platos:', resultado.message);
        setPlatos([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setPlatos([]);
    } finally {
      setLoading(false);
    }
  };

  const agregarAlCarrito = (plato) => {
    const platoExistente = carrito.find(item => item.idPlato === plato.idPlato);
    let nuevoCarrito;

    if (platoExistente) {
      nuevoCarrito = carrito.map(item =>
        item.idPlato === plato.idPlato
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      nuevoCarrito = [...carrito, { ...plato, cantidad: 1 }];
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    alert(`${plato.nombre} agregado al carrito`);
  };

  const irAlCarrito = () => {
    navigate('/carrito');
  };

  const irAlPerfil = () => {
    navigate('/perfil');
  };

  // NUEVO: función para ir a gestión de usuarios
  const irAGestionUsuarios = () => {
    navigate('/gestion-usuarios');
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('carrito');
    navigate('/');
  };

  const cantidadTotalCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  // Verificar si el usuario es administrador
  const esAdministrador = usuario && usuario.rol === 'Administrador';

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="menus-page">
      <header className="menus-header">
        <h1>Tus Gusticos - Menus</h1>
        <div className="header-controls">
          <span>Bienvenido, {usuario.nombres}</span>
          {/* NUEVO: botón de gestión de usuarios solo para administradores */}
          {esAdministrador && (
            <button onClick={irAGestionUsuarios} className="btn-gestion">
              Gestion de Usuarios
            </button>
          )}
          <button onClick={irAlPerfil} className="btn-perfil">Perfil</button>
          <button onClick={irAlCarrito} className="btn-carrito">
            Carrito ({cantidadTotalCarrito})
          </button>
          <button onClick={cerrarSesion} className="btn-cerrar">Cerrar Sesion</button>
        </div>
      </header>

      <div className="filtros-container">
        <h2>Selecciona una categoria:</h2>
        <div className="filtros">
          <button
            className={categoriaSeleccionada === 'corriente' ? 'filtro-activo' : 'filtro'}
            onClick={() => setCategoriaSeleccionada('corriente')}
          >
            Corriente
          </button>
          <button
            className={categoriaSeleccionada === 'ejecutivo' ? 'filtro-activo' : 'filtro'}
            onClick={() => setCategoriaSeleccionada('ejecutivo')}
          >
            Ejecutivo
          </button>
          <button
            className={categoriaSeleccionada === 'carta' ? 'filtro-activo' : 'filtro'}
            onClick={() => setCategoriaSeleccionada('carta')}
          >
            Carta
          </button>
        </div>
      </div>

      <div className="platos-container">
        {loading ? (
          <div className="loading">Cargando platos...</div>
        ) : platos.length > 0 ? (
          <div className="platos-grid">
            {platos.map((plato) => (
              <div key={plato.idPlato} className="plato-card">
                <div className="plato-imagen">
                  {plato.imagenUrl ? (
                    <img src={plato.imagenUrl} alt={plato.nombre} />
                  ) : (
                    <div className="imagen-placeholder">Sin imagen</div>
                  )}
                </div>
                <div className="plato-info">
                  <h3>{plato.nombre}</h3>
                  <p className="plato-descripcion">{plato.descripcion}</p>
                  <p className="plato-precio">${plato.precio.toLocaleString()}</p>
                  <button
                    onClick={() => agregarAlCarrito(plato)}
                    className="btn-agregar"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-platos">
            No hay platos disponibles en esta categoria
          </div>
        )}
      </div>
    </div>
  );
}

export default MenusPage;