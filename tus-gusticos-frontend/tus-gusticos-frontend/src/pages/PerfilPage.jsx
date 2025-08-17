// PerfilPage.jsx - CORREGIDO: URLs dinámicas según entorno
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { actualizarUsuario } from '../services/usuarioService';
import './PerfilPage.css';

// Función helper para obtener la URL base según el entorno
const getBaseUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8080';
  }
  return 'https://tusgusticosintellij-production.up.railway.app';
};

function PerfilPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [datosEdicion, setDatosEdicion] = useState({});
  const [editando, setEditando] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mostrarCancelacion, setMostrarCancelacion] = useState(false);
  const [pedidoACancelar, setPedidoACancelar] = useState(null);

  useEffect(() => {
    // Verificar si hay usuario logueado
    const usuarioGuardado = localStorage.getItem('usuario');
    if (!usuarioGuardado) {
      navigate('/');
      return;
    }
    
    const usuarioData = JSON.parse(usuarioGuardado);
    setUsuario(usuarioData);
    setDatosEdicion(usuarioData);
    
    // Cargar imagen de perfil si existe
    const imagenGuardada = localStorage.getItem(`imagen_perfil_${usuarioData.idUsuario}`);
    if (imagenGuardada) {
      setImagenPerfil(imagenGuardada);
    }

    // Cargar historial de pedidos
    cargarHistorial(usuarioData.idUsuario);
  }, [navigate]);

  const cargarHistorial = async (idUsuario) => {
    try {
      console.log('Cargando historial para usuario:', idUsuario);
      
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}/api/pedidos/usuario/${idUsuario}`);
      const resultado = await response.json();
      
      console.log('Respuesta del historial:', resultado);
      
      if (resultado.success && resultado.data) {
        setHistorialPedidos(resultado.data);
        console.log('Historial cargado:', resultado.data);
      } else {
        console.log('No se encontraron pedidos o error en la respuesta');
        setHistorialPedidos([]);
      }
    } catch (error) {
      console.error('Error cargando historial:', error);
      setHistorialPedidos([]);
    }
  };

  const manejarCambio = (e) => {
    setDatosEdicion({
      ...datosEdicion,
      [e.target.name]: e.target.value
    });
  };

  const iniciarEdicion = () => {
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setEditando(false);
    setDatosEdicion(usuario);
  };

  const confirmarActualizacion = () => {
    setMostrarConfirmacion(true);
  };

  const actualizarDatos = async (confirmar) => {
    setMostrarConfirmacion(false);
    
    if (!confirmar) {
      return;
    }

    setLoading(true);
    try {
      const resultado = await actualizarUsuario(usuario.idUsuario, datosEdicion);
      
      if (resultado.success) {
        // Actualizar usuario en localStorage
        const usuarioActualizado = { ...datosEdicion };
        localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
        setUsuario(usuarioActualizado);
        setEditando(false);
        alert('Datos actualizados exitosamente');
      } else {
        alert('Error al actualizar: ' + resultado.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar los datos');
    } finally {
      setLoading(false);
    }
  };

  const manejarSubidaImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imagenBase64 = event.target.result;
        setImagenPerfil(imagenBase64);
        // Guardar en localStorage
        localStorage.setItem(`imagen_perfil_${usuario.idUsuario}`, imagenBase64);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const iniciarCancelacion = (pedido) => {
    setPedidoACancelar(pedido);
    setMostrarCancelacion(true);
  };

  const cancelarPedido = async (confirmar) => {
    setMostrarCancelacion(false);
    
    if (!confirmar || !pedidoACancelar) {
      setPedidoACancelar(null);
      return;
    }

    try {
      console.log('Cancelando pedido:', pedidoACancelar.idPedido);
      
      const baseUrl = getBaseUrl();
      
      // Actualizar estado del pedido a 'Cancelado'
      const responsePedido = await fetch(`${baseUrl}/api/pedidos/${pedidoACancelar.idPedido}/estado?estado=Cancelado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (responsePedido.ok) {
        console.log('Pedido cancelado exitosamente');
        
        // Buscar el pago asociado y marcarlo como 'Rechazado'
        const responsePagos = await fetch(`${baseUrl}/api/pagos/pedido/${pedidoACancelar.idPedido}`);
        const resultadoPagos = await responsePagos.json();
        
        if (resultadoPagos.success && resultadoPagos.data && resultadoPagos.data.length > 0) {
          const pago = resultadoPagos.data[0];
          console.log('Cancelando pago:', pago.idPago);
          
          await fetch(`${baseUrl}/api/pagos/${pago.idPago}/estado?estado=Rechazado`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Pago marcado como rechazado');
        }

        alert('Pedido cancelado exitosamente');
        // Recargar historial
        cargarHistorial(usuario.idUsuario);
      } else {
        alert('Error al cancelar el pedido');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cancelar el pedido');
    }
    
    setPedidoACancelar(null);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('carrito');
    navigate('/');
  };

  const irAlMenu = () => {
    navigate('/menus');
  };

  // Verificar si el usuario es administrador
  const esAdministrador = usuario && usuario.rol === 'Administrador';

  const irAGestionUsuarios = () => {
    navigate('/gestion-usuarios');
  };

  // Función para mostrar género correctamente
  const mostrarGenero = (genero) => {
    if (genero === 'OTRO') {
      return 'Prefiero no decirlo';
    }
    return genero;
  };

  // Función para formatear fecha
  const formatearFecha = (fechaString) => {
    try {
      const fecha = new Date(fechaString);
      return fecha.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return fechaString;
    }
  };

  // Función para calcular total del pedido
  const calcularTotalPedido = (detalles) => {
    if (!detalles || detalles.length === 0) return 0;
    return detalles.reduce((total, detalle) => {
      return total + (detalle.precioUnitario * detalle.cantidad);
    }, 0);
  };

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="perfil-page">
      <header className="perfil-header">
        <h1>Mi Perfil</h1>
        <div className="header-controls">
          {esAdministrador && (
            <button onClick={irAGestionUsuarios} className="btn-gestion">
              Gestion de Usuarios
            </button>
          )}
          <button onClick={irAlMenu} className="btn-menu">
            Ir al Menu
          </button>
          <button onClick={cerrarSesion} className="btn-cerrar">
            Cerrar Sesion
          </button>
        </div>
      </header>

      <div className="perfil-container">
        <div className="perfil-content">
          {/* Sección de foto de perfil */}
          <div className="foto-perfil-seccion">
            <div className="foto-perfil">
              {imagenPerfil ? (
                <img src={imagenPerfil} alt="Foto de perfil" />
              ) : (
                <div className="foto-placeholder">
                  Usuario
                </div>
              )}
            </div>
            <div className="foto-controles">
              <input
                type="file"
                id="foto-input"
                accept="image/*"
                onChange={manejarSubidaImagen}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => document.getElementById('foto-input').click()}
                className="btn-cambiar-foto"
              >
                Cambiar Foto
              </button>
            </div>
          </div>

          {/* Sección de datos personales */}
          <div className="datos-personales">
            <div className="seccion-header">
              <h2>Datos Personales</h2>
              {!editando ? (
                <button onClick={iniciarEdicion} className="btn-editar">
                  Actualizar
                </button>
              ) : (
                <div className="botones-edicion">
                  <button onClick={cancelarEdicion} className="btn-cancelar">
                    Cancelar
                  </button>
                  <button onClick={confirmarActualizacion} className="btn-guardar">
                    Guardar
                  </button>
                </div>
              )}
            </div>

            <div className="datos-grid">
              <div className="dato-item">
                <label>Nombres:</label>
                {editando ? (
                  <input
                    type="text"
                    name="nombres"
                    value={datosEdicion.nombres || ''}
                    onChange={manejarCambio}
                  />
                ) : (
                  <span>{usuario.nombres}</span>
                )}
              </div>

              <div className="dato-item">
                <label>Apellidos:</label>
                {editando ? (
                  <input
                    type="text"
                    name="apellidos"
                    value={datosEdicion.apellidos || ''}
                    onChange={manejarCambio}
                  />
                ) : (
                  <span>{usuario.apellidos}</span>
                )}
              </div>

              <div className="dato-item">
                <label>Genero:</label>
                {editando ? (
                  <select
                    name="genero"
                    value={datosEdicion.genero || ''}
                    onChange={manejarCambio}
                  >
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMENINO">Femenino</option>
                    <option value="OTRO">Prefiero no decirlo</option>
                  </select>
                ) : (
                  <span>{mostrarGenero(usuario.genero)}</span>
                )}
              </div>

              <div className="dato-item">
                <label>Fecha de Nacimiento:</label>
                {editando ? (
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={datosEdicion.fechaNacimiento || ''}
                    onChange={manejarCambio}
                  />
                ) : (
                  <span>{usuario.fechaNacimiento}</span>
                )}
              </div>

              <div className="dato-item">
                <label>Correo Electronico:</label>
                {editando ? (
                  <input
                    type="email"
                    name="correoElectronico"
                    value={datosEdicion.correoElectronico || ''}
                    onChange={manejarCambio}
                  />
                ) : (
                  <span>{usuario.correoElectronico}</span>
                )}
              </div>

              <div className="dato-item">
                <label>Telefono:</label>
                {editando ? (
                  <input
                    type="text"
                    name="telefono"
                    value={datosEdicion.telefono || ''}
                    onChange={manejarCambio}
                  />
                ) : (
                  <span>{usuario.telefono}</span>
                )}
              </div>
            </div>
          </div>

          {/* Sección de historial de compras */}
          <div className="historial-compras">
            <h2>Historial de Compras</h2>
            {historialPedidos.length > 0 ? (
              <div className="pedidos-lista">
                {historialPedidos.map((pedido) => (
                  <div key={pedido.idPedido} className="pedido-item">
                    <div className="pedido-header">
                      <span className="pedido-fecha">
                        Pedido #{pedido.idPedido} - {formatearFecha(pedido.fechaPedido)}
                      </span>
                      <span className={`estado estado-${pedido.estado.toLowerCase()}`}>
                        {pedido.estado}
                      </span>
                    </div>
                    
                    {/* Mostrar detalles de los productos */}
                    {pedido.detalles && pedido.detalles.length > 0 && (
                      <div className="pedido-productos">
                        <h4>Productos:</h4>
                        {pedido.detalles.map((detalle, index) => (
                          <div key={index} className="producto-detalle">
                            <span className="producto-nombre">{detalle.nombrePlato}</span>
                            <span className="producto-cantidad">Cantidad: {detalle.cantidad}</span>
                            <span className="producto-precio">
                              ${Number(detalle.precioUnitario).toLocaleString()} c/u
                            </span>
                            <span className="producto-subtotal">
                              Subtotal: ${(Number(detalle.precioUnitario) * detalle.cantidad).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pedido-acciones">
                      <span className="pedido-total">
                        Total: ${calcularTotalPedido(pedido.detalles).toLocaleString()}
                      </span>
                      
                      {pedido.estado === 'Pendiente' && (
                        <button
                          onClick={() => iniciarCancelacion(pedido)}
                          className="btn-cancelar-pedido"
                        >
                          Cancelar Pedido
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="sin-pedidos">
                <p>No tienes pedidos registrados</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmación para actualizar datos */}
      {mostrarConfirmacion && (
        <div className="confirmacion-overlay">
          <div className="confirmacion-modal">
            <h3>Confirmar actualizacion</h3>
            <p>Estas seguro de que quieres actualizar tus datos?</p>
            <div className="confirmacion-botones">
              <button
                onClick={() => actualizarDatos(false)}
                className="btn-no"
                disabled={loading}
              >
                No
              </button>
              <button
                onClick={() => actualizarDatos(true)}
                className="btn-si"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Si'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para cancelar pedido */}
      {mostrarCancelacion && (
        <div className="confirmacion-overlay">
          <div className="confirmacion-modal">
            <h3>Cancelar Pedido</h3>
            <p>Estas seguro de que quieres cancelar este pedido?</p>
            <div className="confirmacion-botones">
              <button
                onClick={() => cancelarPedido(false)}
                className="btn-no"
              >
                No
              </button>
              <button
                onClick={() => cancelarPedido(true)}
                className="btn-si"
              >
                Si
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerfilPage;