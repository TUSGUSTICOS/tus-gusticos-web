// PagoPage.jsx - VERIFICADO: flujo correcto carrito → pago → menú
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearPedido, procesarPago } from '../services/usuarioService';
import './PagoPage.css';

function PagoPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [metodoPago, setMetodoPago] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const [datosPago, setDatosPago] = useState({
    numeroTarjeta: '',
    nombreTarjeta: '',
    fechaVencimiento: '',
    codigoSeguridad: '',
    celularNequi: '',
    claveNequi: '',
    correoElectronico: ''
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (!usuarioGuardado) {
      navigate('/');
      return;
    }
    
    const usuarioParsed = JSON.parse(usuarioGuardado);
    setUsuario(usuarioParsed);

    // VERIFICAR: debe venir del carrito con productos
    const carritoGuardado = localStorage.getItem('carrito');
    if (!carritoGuardado || JSON.parse(carritoGuardado).length === 0) {
      // Si no hay carrito, regresar al carrito
      navigate('/carrito');
      return;
    }
    
    const carritoParsed = JSON.parse(carritoGuardado);
    setCarrito(carritoParsed);
  }, [navigate]);

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const manejarCambioDatos = (e) => {
    const { name, value } = e.target;
    let valorFormateado = value;
    
    if (name === 'numeroTarjeta') {
      valorFormateado = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (valorFormateado.length > 19) return;
    }
    
    if (name === 'fechaVencimiento') {
      valorFormateado = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (valorFormateado.length > 5) return;
    }
    
    if (name === 'codigoSeguridad') {
      valorFormateado = value.replace(/\D/g, '');
      if (valorFormateado.length > 4) return;
    }
    
    if (name === 'celularNequi') {
      valorFormateado = value.replace(/\D/g, '');
      if (valorFormateado.length > 10) return;
    }
    
    if (name === 'claveNequi') {
      valorFormateado = value.replace(/\D/g, '');
      if (valorFormateado.length > 6) return;
    }

    setDatosPago({
      ...datosPago,
      [name]: valorFormateado
    });
    
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: ''
      });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!metodoPago) {
      alert('Selecciona un metodo de pago');
      return false;
    }

    if (metodoPago === 'Credito' || metodoPago === 'Debito') {
      if (!datosPago.numeroTarjeta.trim() || datosPago.numeroTarjeta.replace(/\s/g, '').length < 16) {
        nuevosErrores.numeroTarjeta = 'Numero de tarjeta debe tener 16 digitos';
      }
      if (!datosPago.nombreTarjeta.trim()) {
        nuevosErrores.nombreTarjeta = 'Nombre del titular requerido';
      }
      if (!datosPago.fechaVencimiento.trim() || datosPago.fechaVencimiento.length < 5) {
        nuevosErrores.fechaVencimiento = 'Fecha debe ser MM/AA';
      }
      if (!datosPago.codigoSeguridad.trim() || datosPago.codigoSeguridad.length < 3) {
        nuevosErrores.codigoSeguridad = 'CVV debe tener 3-4 digitos';
      }
    }

    if (metodoPago === 'Nequi') {
      if (!datosPago.celularNequi.trim() || datosPago.celularNequi.length < 10) {
        nuevosErrores.celularNequi = 'Celular debe tener 10 digitos';
      }
      if (!datosPago.claveNequi.trim() || datosPago.claveNequi.length < 4) {
        nuevosErrores.claveNequi = 'Clave debe tener 4-6 digitos';
      }
    }

    setErrores(nuevosErrores);
    
    if (Object.keys(nuevosErrores).length > 0) {
      alert('Por favor completa todos los campos correctamente');
      return false;
    }
    
    return true;
  };

  // REGRESAR AL CARRITO (no al perfil)
  const volverAlCarrito = () => {
    navigate('/carrito');
  };

  const irAlPerfil = () => {
    navigate('/perfil');
  };

  const procesarCompra = async () => {
    if (!validarFormulario()) {
      return;
    }

    setLoading(true);
    
    try {
      console.log('Iniciando proceso de compra completo');

      // PASO 1: Crear el pedido
      const pedidoData = {
        id_usuario: usuario.idUsuario || usuario.id || usuario.id_usuario,
        items: carrito.map(item => ({
          id_plato: item.idPlato || item.id || item.id_plato || item.platoId,
          cantidad: parseInt(item.cantidad) || 1,
          precio_unitario: parseFloat(item.precio) || 0
        }))
      };

      console.log('Enviando pedido:', pedidoData);

      const resultadoPedido = await crearPedido(pedidoData);
      console.log('Resultado del pedido:', resultadoPedido);
      
      if (resultadoPedido && resultadoPedido.success) {
        console.log('Pedido creado exitosamente');
        
        // PASO 2: Obtener el ID del pedido
        let idPedido = null;
        
        if (resultadoPedido.data && resultadoPedido.data.idPedido) {
          idPedido = resultadoPedido.data.idPedido;
        }
        
        if (!idPedido) {
          const match = JSON.stringify(resultadoPedido).match(/"idPedido":(\d+)/);
          if (match) {
            idPedido = parseInt(match[1]);
          }
        }
        
        console.log('ID del pedido obtenido:', idPedido);

        if (!idPedido) {
          throw new Error('No se pudo obtener el ID del pedido creado');
        }

        // PASO 3: Procesar el pago
        const pagoData = {
          id_pedido: idPedido,
          metodo_pago: metodoPago,
          monto: calcularTotal()
        };

        console.log('Enviando pago:', pagoData);

        const resultadoPago = await procesarPago(pagoData);
        console.log('Resultado del pago:', resultadoPago);
        
        if (resultadoPago && resultadoPago.success) {
          console.log('Pago procesado exitosamente');
          
          // Limpiar carrito
          localStorage.removeItem('carrito');
          
          // Mostrar confirmación
          setMostrarConfirmacion(true);
          
          console.log('COMPRA COMPLETADA EXITOSAMENTE');
        } else {
          throw new Error(resultadoPago?.message || 'Error al procesar el pago');
        }
      } else {
        throw new Error(resultadoPedido?.message || 'Error al crear el pedido');
      }
    } catch (error) {
      console.error('Error en procesarCompra:', error);
      alert('Error al procesar la compra: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // DESPUÉS DEL PAGO EXITOSO: regresar al menú
  const continuarComprando = (destino) => {
    setMostrarConfirmacion(false);
    if (destino === 'menu') {
      navigate('/menus'); // REGRESA AL MENÚ
    } else {
      navigate('/perfil');
    }
  };

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  if (mostrarConfirmacion) {
    return (
      <div className="confirmacion-overlay">
        <div className="confirmacion-modal">
          <h2>Se confirmo su pago</h2>
          <p>Compra en gestion</p>
          <div className="confirmacion-pregunta">
            <h3>Quiere seguir comprando?</h3>
            <div className="confirmacion-botones">
              <button 
                onClick={() => continuarComprando('menu')}
                className="btn-menu-conf"
              >
                Menu
              </button>
              <button 
                onClick={() => continuarComprando('perfil')}
                className="btn-perfil-conf"
              >
                Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pago-page">
      <header className="pago-header">
        <h1>Pago</h1>
        <div className="header-controls">
          {/* BOTÓN PARA REGRESAR AL CARRITO */}
          <button onClick={volverAlCarrito} className="btn-volver">
            Volver al Carrito
          </button>
          <button onClick={irAlPerfil} className="btn-perfil">
            Perfil
          </button>
        </div>
      </header>

      <div className="pago-container">
        <div className="pago-content">
          <div className="resumen-pedido">
            <h2>Resumen del Pedido</h2>
            <div className="productos-resumen">
              {carrito.map((item, index) => (
                <div key={item.idPlato || item.id || item.id_plato || index} className="producto-resumen">
                  <span className="producto-nombre">{item.nombre}</span>
                  <span className="producto-cantidad">x{item.cantidad}</span>
                  <span className="producto-subtotal">
                    ${(item.precio * item.cantidad).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="total-final">
              <strong>Total: ${calcularTotal().toLocaleString()}</strong>
            </div>
          </div>

          <div className="metodos-pago-compact">
            <h2>Metodo de Pago</h2>
            <div className="metodos-botones">
              <button
                className={`metodo-btn ${metodoPago === 'Nequi' ? 'activo' : ''}`}
                onClick={() => setMetodoPago('Nequi')}
              >
                Nequi
              </button>
              <button
                className={`metodo-btn ${metodoPago === 'Credito' ? 'activo' : ''}`}
                onClick={() => setMetodoPago('Credito')}
              >
                Credito
              </button>
              <button
                className={`metodo-btn ${metodoPago === 'Debito' ? 'activo' : ''}`}
                onClick={() => setMetodoPago('Debito')}
              >
                Debito
              </button>
            </div>
          </div>

          {/* Formulario para Tarjetas de Crédito/Débito */}
          {(metodoPago === 'Credito' || metodoPago === 'Debito') && (
            <div className="formulario-pago">
              <h3>Datos de la Tarjeta</h3>
              
              <div className="campo-grupo">
                <label>Nombre completo (del titular de la tarjeta)</label>
                <input
                  type="text"
                  name="nombreTarjeta"
                  placeholder="JUAN PEREZ"
                  value={datosPago.nombreTarjeta}
                  onChange={manejarCambioDatos}
                  className={errores.nombreTarjeta ? 'error' : ''}
                />
                {errores.nombreTarjeta && <span className="error-msg">{errores.nombreTarjeta}</span>}
              </div>

              <div className="campo-grupo">
                <label>Numero de la tarjeta</label>
                <input
                  type="text"
                  name="numeroTarjeta"
                  placeholder="1234 5678 9012 3456"
                  value={datosPago.numeroTarjeta}
                  onChange={manejarCambioDatos}
                  className={errores.numeroTarjeta ? 'error' : ''}
                />
                {errores.numeroTarjeta && <span className="error-msg">{errores.numeroTarjeta}</span>}
              </div>

              <div className="fila-campos">
                <div className="campo-grupo">
                  <label>Fecha de vencimiento de la tarjeta</label>
                  <input
                    type="text"
                    name="fechaVencimiento"
                    placeholder="MM/AA"
                    value={datosPago.fechaVencimiento}
                    onChange={manejarCambioDatos}
                    className={errores.fechaVencimiento ? 'error' : ''}
                  />
                  {errores.fechaVencimiento && <span className="error-msg">{errores.fechaVencimiento}</span>}
                </div>

                <div className="campo-grupo">
                  <label>Codigo de seguridad</label>
                  <input
                    type="password"
                    name="codigoSeguridad"
                    placeholder="CVV"
                    value={datosPago.codigoSeguridad}
                    onChange={manejarCambioDatos}
                    className={errores.codigoSeguridad ? 'error' : ''}
                  />
                  {errores.codigoSeguridad && <span className="error-msg">{errores.codigoSeguridad}</span>}
                </div>
              </div>

              <div className="campo-grupo">
                <label>Correo Electronico (opcional)</label>
                <input
                  type="email"
                  name="correoElectronico"
                  placeholder="ejemplo@correo.com"
                  value={datosPago.correoElectronico}
                  onChange={manejarCambioDatos}
                />
              </div>
            </div>
          )}

          {/* Formulario para Nequi */}
          {metodoPago === 'Nequi' && (
            <div className="formulario-pago">
              <h3>Datos de Nequi</h3>
              
              <div className="campo-grupo">
                <label>Numero de Celular</label>
                <input
                  type="text"
                  name="celularNequi"
                  placeholder="3001234567"
                  value={datosPago.celularNequi}
                  onChange={manejarCambioDatos}
                  className={errores.celularNequi ? 'error' : ''}
                />
                {errores.celularNequi && <span className="error-msg">{errores.celularNequi}</span>}
              </div>

              <div className="campo-grupo">
                <label>Clave Nequi</label>
                <input
                  type="password"
                  name="claveNequi"
                  placeholder="••••"
                  value={datosPago.claveNequi}
                  onChange={manejarCambioDatos}
                  className={errores.claveNequi ? 'error' : ''}
                />
                {errores.claveNequi && <span className="error-msg">{errores.claveNequi}</span>}
              </div>

              <div className="campo-grupo">
                <label>Correo Electronico (opcional)</label>
                <input
                  type="email"
                  name="correoElectronico"
                  placeholder="ejemplo@correo.com"
                  value={datosPago.correoElectronico}
                  onChange={manejarCambioDatos}
                />
              </div>
            </div>
          )}

          {metodoPago && (
            <div className="pago-acciones">
              <button 
                onClick={procesarCompra}
                disabled={loading}
                className="btn-proceder-pago"
              >
                {loading ? 'Procesando...' : 'Proceder al pago'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PagoPage;