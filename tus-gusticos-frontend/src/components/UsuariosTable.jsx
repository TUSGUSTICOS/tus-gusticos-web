import React from 'react';

const UsuariosTable = ({ usuarios, onEdit, onDelete, loading }) => {
  
  const formatFecha = (fecha) => {
    try {
      return new Date(fecha).toLocaleString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  };

  const getRolIcon = (rol) => {
    return rol === 'administrador' ? '👑' : '👤';
  };

  const getRolClass = (rol) => {
    return rol === 'administrador' ? 'rol-admin' : 'rol-cliente';
  };

  if (loading) {
    return (
      <div className="loading-table">
        <div className="spinner">🔄</div>
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (usuarios.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👥</div>
        <h3>No hay usuarios registrados</h3>
        <p>Crea el primer usuario usando el formulario de arriba</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>🆔 ID</th>
              <th>👤 Nombre</th>
              <th>📧 Correo</th>
              <th>🎭 Rol</th>
              <th>📅 Fecha Registro</th>
              <th>⚙️ Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.idUsuario} className="usuario-row">
                <td className="id-cell">{usuario.idUsuario}</td>
                
                <td className="nombre-cell">
                  <div className="user-info">
                    <strong>{usuario.nombre}</strong>
                  </div>
                </td>
                
                <td className="correo-cell">
                  <a href={`mailto:${usuario.correo}`} className="email-link">
                    {usuario.correo}
                  </a>
                </td>
                
                <td className="rol-cell">
                  <span className={`rol-badge ${getRolClass(usuario.rol)}`}>
                    {getRolIcon(usuario.rol)} {usuario.rol}
                  </span>
                </td>
                
                <td className="fecha-cell">
                  {formatFecha(usuario.fechaRegistro)}
                </td>
                
                <td className="acciones-cell">
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(usuario)}
                      className="btn btn-edit"
                      title="Editar usuario"
                      disabled={loading}
                    >
                      ✏️ Editar
                    </button>
                    
                    <button
                      onClick={() => onDelete(usuario.idUsuario)}
                      className="btn btn-delete"
                      title="Eliminar usuario"
                      disabled={loading}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-footer">
        <p>Total de usuarios: <strong>{usuarios.length}</strong></p>
      </div>
    </div>
  );
};

export default UsuariosTable;