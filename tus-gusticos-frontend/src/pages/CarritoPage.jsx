// CarritoPage.jsx - CORREGIDO: botón de comprar va al pago
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarritoPage.css';

function CarritoPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState([]);

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

  const actualizarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const eliminarProducto = (idPlato) => {
    const nuevoCarrito = carrito.filter(item => item.idPlato !== idPlato);
    actualizarCarrito(nuevoCarrito);
  };

  const cambiarCantidad = (idPlato, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarProducto(idPlato);
      return;
    }

    const nuevoCarrito = carrito.map(item =>
      item.idPlato === idPlato
        ? { ...item, cantidad: nuevaCantidad }
        : item
    );
    actualizarCarrito(nuevoCarrito);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const volverAlMenu = () => {
    navigate('/menus');
  };

  // CORREGIDO: ir directamente a la página de pagos
  const irAlPago = () => {
    if (carrito.length === 0) {
      alert('El carrito esta vacio');
      return;
    }
    // DEBE IR A /pago - página de pagos para llenar datos de tarjeta
    navigate('/pago');
  };

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="carrito-page">
      <header className="carrito-header">
        <h1>Mi Carrito</h1>
        <div className="header-controls">
          <button onClick={volverAlMenu} className="btn-volver">
            Volver al Menu
          </button>
        </div>
      </header>

      <div className="carrito-container">
        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <h2>Tu carrito esta vacio</h2>
            <p>Agrega algunos productos desde el menu</p>
            <button onClick={volverAlMenu} className="btn-menu">
              Ir al Menu
            </button>
          </div>
        ) : (
          <>
            <div className="productos-lista">
              {carrito.map((item) => (
                <div key={item.idPlato} className="producto-item">
                  <div className="producto-imagen">
                    {item.imagenUrl ? (
                      <img src={item.imagenUrl} alt={item.nombre} />
                    ) : (
                      <div className="imagen-placeholder">Sin imagen</div>
                    )}
                  </div>
                  
                  <div className="producto-info">
                    <h3>{item.nombre}</h3>
                    <p className="producto-descripcion">{item.descripcion}</p>
                    <p className="producto-precio">${item.precio.toLocaleString()}</p>
                  </div>
                  
                  <div className="producto-controles">
                    <div className="cantidad-controles">
                      <button
                        onClick={() => cambiarCantidad(item.idPlato, item.cantidad - 1)}
                        className="btn-cantidad"
                      >
                        -
                      </button>
                      <span className="cantidad">{item.cantidad}</span>
                      <button
                        onClick={() => cambiarCantidad(item.idPlato, item.cantidad + 1)}
                        className="btn-cantidad"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="subtotal">
                      ${(item.precio * item.cantidad).toLocaleString()}
                    </div>
                    
                    <button
                      onClick={() => eliminarProducto(item.idPlato)}
                      className="btn-eliminar"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="carrito-resumen">
              <div className="total-container">
                <h3>Total: ${calcularTotal().toLocaleString()}</h3>
              </div>
              
              <div className="botones-finales">
                <button onClick={volverAlMenu} className="btn-seguir">
                  Seguir Comprando
                </button>
                {/* CORREGIDO: este botón va al pago */}
                <button onClick={irAlPago} className="btn-comprar">
                  Comprar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CarritoPage;