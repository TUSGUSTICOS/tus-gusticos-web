// GestionUsuariosPage.jsx - CORREGIDO: URLs dinámicas según entorno - VERSIÓN COMPLETA
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GestionUsuariosPage.css';

// Función helper para obtener la URL base según el entorno
const getBaseUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8080';
  }
  return 'https://tusgusticosintellij-production.up.railway.app';
};

function GestionUsuariosPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar si hay usuario logueado y es administrador
    const usuarioGuardado = localStorage.getItem('usuario');
    if (!usuarioGuardado) {
      navigate('/');
      return;
    }

    const usuarioData = JSON.parse(usuarioGuardado);
    if (usuarioData.rol !== 'Administrador') {
      navigate('/perfil');
      return;
    }

    setUsuario(usuarioData);
    cargarUsuarios();
  }, [navigate]);

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}/api/usuarios`);
      if (response.ok) {
        const usuariosData = await response.json();
        setUsuarios(usuariosData);
        console.log('Usuarios cargados:', usuariosData);
      } else {
        console.error('Error al cargar usuarios:', response.status);
        alert('Error al cargar usuarios');
      }
    } catch (error) {
      console.error('Error cargando usuarios:', error);
      alert('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicion = (usuario) => {
    setUsuarioEditando({ ...usuario });
    console.log('Iniciando edición de usuario:', usuario);
  };

  const cancelarEdicion = () => {
    setUsuarioEditando(null);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuarioEditando({
      ...usuarioEditando,
      [name]: value
    });
    console.log('Campo actualizado:', name, '=', value);
  };

  const actualizarUsuario = async () => {
    if (!usuarioEditando) return;

    console.log('=== INICIO ACTUALIZACIÓN ===');
    console.log('Usuario original:', usuarios.find(u => u.idUsuario === usuarioEditando.idUsuario));
    console.log('Datos editados:', usuarioEditando);
    
    setLoading(true);
    
    try {
      // Preparar datos para enviar - asegurar tipos correctos
      const datosActualizados = {
        nombres: usuarioEditando.nombres?.trim(),
        apellidos: usuarioEditando.apellidos?.trim(),
        genero: usuarioEditando.genero,
        fechaNacimiento: usuarioEditando.fechaNacimiento,
        correoElectronico: usuarioEditando.correoElectronico?.trim(),
        telefono: usuarioEditando.telefono?.trim(),
        rol: usuarioEditando.rol // IMPORTANTE: incluir rol
      };

      console.log('Datos finales a enviar:', datosActualizados);
      
      const baseUrl = getBaseUrl();
      const url = `${baseUrl}/api/usuarios/${usuarioEditando.idUsuario}`;
      console.log('URL de actualización:', url);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizados)
      });

      console.log('Status de respuesta:', response.status);
      console.log('Headers de respuesta:', response.headers);
      
      const responseText = await response.text();
      console.log('Respuesta raw del servidor:', responseText);
      
      let resultado;
      try {
        resultado = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parseando respuesta JSON:', e);
        resultado = { success: false, message: 'Respuesta no válida del servidor' };
      }
      
      console.log('Resultado parseado:', resultado);
      
      if (response.ok && resultado.success) {
        console.log('✅ Actualización exitosa');
        alert('Usuario actualizado exitosamente');
        setUsuarioEditando(null);
        // Recargar la lista de usuarios para ver los cambios
        await cargarUsuarios();
      } else {
        console.error('❌ Error en la actualización:', resultado);
        alert('Error al actualizar usuario: ' + (resultado.message || `Código ${response.status}`));
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      alert('Error de conexión al actualizar usuario: ' + error.message);
    } finally {
      setLoading(false);
      console.log('=== FIN ACTUALIZACIÓN ===');
    }
  };

  const confirmarEliminar = (usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarConfirmacion(true);
  };

  const eliminarUsuario = async (confirmar) => {
    setMostrarConfirmacion(false);

    if (!confirmar || !usuarioAEliminar) {
      setUsuarioAEliminar(null);
      return;
    }

    console.log('Eliminando usuario:', usuarioAEliminar.idUsuario);
    setLoading(true);
    
    try {
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}/api/usuarios/${usuarioAEliminar.idUsuario}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const resultado = await response.json();
        console.log('Usuario eliminado:', resultado);
        
        if (resultado.success) {
          alert('Usuario eliminado exitosamente');
          // Recargar la lista de usuarios
          await cargarUsuarios();
        } else {
          alert('Error al eliminar usuario: ' + (resultado.message || 'Error desconocido'));
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Error de comunicación' }));
        console.error('Error del servidor al eliminar:', errorData);
        alert('Error al eliminar usuario: ' + (errorData.message || `Código ${response.status}`));
      }
    } catch (error) {
      console.error('Error en eliminarUsuario:', error);
      alert('Error de conexión al eliminar usuario');
    } finally {
      setLoading(false);
      setUsuarioAEliminar(null);
    }
  };

  const volverAlPerfil = () => {
    navigate('/perfil');
  };

  const irAlMenu = () => {
    navigate('/menus');
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('carrito');
    navigate('/');
  };

  // Función para mostrar género correctamente
  const mostrarGenero = (genero) => {
    if (genero === 'OTRO') {
      return 'Prefiero no decirlo';
    }
    return genero;
  };

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="gestion-page">
      <header className="gestion-header">
        <h1>Gestion de Usuarios</h1>
        <div className="header-controls">
          <button onClick={volverAlPerfil} className="btn-perfil">
            Perfil
          </button>
          <button onClick={irAlMenu} className="btn-menu">
            Menu
          </button>
          <button onClick={cerrarSesion} className="btn-cerrar">
            Cerrar Sesion
          </button>
        </div>
      </header>

      <div className="gestion-container">
        {loading && <div className="loading">Cargando...</div>}

        <div className="usuarios-lista">
          <h2>Usuarios Registrados ({usuarios.length})</h2>
          
          {usuarios.length === 0 ? (
            <div className="sin-usuarios">
              <p>No hay usuarios registrados</p>
            </div>
          ) : (
            <div className="tabla-usuarios">
              <div className="tabla-header">
                <span>ID</span>
                <span>Nombres</span>
                <span>Apellidos</span>
                <span>Correo</span>
                <span>Telefono</span>
                <span>Genero</span>
                <span>Rol</span>
                <span>Acciones</span>
              </div>

              {usuarios.map((usr) => (
                <div key={usr.idUsuario} className="tabla-fila">
                  {usuarioEditando && usuarioEditando.idUsuario === usr.idUsuario ? (
                    // Modo edición
                    <>
                      <span>{usr.idUsuario}</span>
                      <input
                        type="text"
                        name="nombres"
                        value={usuarioEditando.nombres || ''}
                        onChange={manejarCambio}
                        className="input-edicion"
                        placeholder="Nombres"
                      />
                      <input
                        type="text"
                        name="apellidos"
                        value={usuarioEditando.apellidos || ''}
                        onChange={manejarCambio}
                        className="input-edicion"
                        placeholder="Apellidos"
                      />
                      <input
                        type="email"
                        name="correoElectronico"
                        value={usuarioEditando.correoElectronico || ''}
                        onChange={manejarCambio}
                        className="input-edicion"
                        placeholder="correo@ejemplo.com"
                      />
                      <input
                        type="text"
                        name="telefono"
                        value={usuarioEditando.telefono || ''}
                        onChange={manejarCambio}
                        className="input-edicion"
                        placeholder="Telefono"
                      />
                      <select
                        name="genero"
                        value={usuarioEditando.genero || ''}
                        onChange={manejarCambio}
                        className="input-edicion"
                      >
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMENINO">Femenino</option>
                        <option value="OTRO">Prefiero no decirlo</option>
                      </select>
                      <select
                        name="rol"
                        value={usuarioEditando.rol || ''}
                        onChange={manejarCambio}
                        className="input-edicion"
                      >
                        <option value="Cliente">Cliente</option>
                        <option value="Administrador">Administrador</option>
                      </select>
                      <div className="acciones-edicion">
                        <button 
                          onClick={actualizarUsuario} 
                          className="btn-guardar" 
                          disabled={loading}
                        >
                          {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                        <button 
                          onClick={cancelarEdicion} 
                          className="btn-cancelar"
                          disabled={loading}
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    // Modo visualización
                    <>
                      <span>{usr.idUsuario}</span>
                      <span>{usr.nombres}</span>
                      <span>{usr.apellidos}</span>
                      <span>{usr.correoElectronico}</span>
                      <span>{usr.telefono || 'N/A'}</span>
                      <span>{mostrarGenero(usr.genero)}</span>
                      <span className={`rol rol-${usr.rol.toLowerCase()}`}>{usr.rol}</span>
                      <div className="acciones">
                        <button
                          onClick={() => iniciarEdicion(usr)}
                          className="btn-editar"
                          disabled={loading || usuarioEditando !== null}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => confirmarEliminar(usr)}
                          className="btn-eliminar"
                          disabled={loading || usuarioEditando !== null || usr.idUsuario === usuario.idUsuario}
                        >
                          Eliminar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      {mostrarConfirmacion && (
        <div className="confirmacion-overlay">
          <div className="confirmacion-modal">
            <h3>Eliminar Usuario</h3>
            <p>
              Estas seguro de que quieres eliminar al usuario{' '}
              <strong>{usuarioAEliminar?.nombres} {usuarioAEliminar?.apellidos}</strong>?
            </p>
            <p className="advertencia">Esta accion no se puede deshacer.</p>
            <div className="confirmacion-botones">
              <button
                onClick={() => eliminarUsuario(false)}
                className="btn-no"
                disabled={loading}
              >
                No
              </button>
              <button
                onClick={() => eliminarUsuario(true)}
                className="btn-si"
                disabled={loading}
              >
                {loading ? 'Eliminando...' : 'Si'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionUsuariosPage;