import React, { useEffect, useState } from 'react';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../services/usuarioService';
import UsuarioForm from '../components/UsuarioForm';
import UsuariosTable from '../components/UsuariosTable';
import './UsuariosPage.css';

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Cargar usuarios al iniciar
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Función para traer los usuarios desde el backend
  const fetchUsuarios = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setError('Error al cargar los usuarios. Verifica que el servidor esté funcionando.');
    } finally {
      setLoading(false);
    }
  };

  // Función para crear un nuevo usuario
  const handleCreate = async (nuevoUsuario) => {
    setLoading(true);
    setError('');
    try {
      await createUsuario(nuevoUsuario);
      setMensaje('✅ Usuario creado exitosamente');
      fetchUsuarios(); // Refrescar lista
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setError('❌ Error al crear usuario. Verifica que el correo no esté duplicado.');
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar usuario
  const handleUpdate = async (usuarioActualizado) => {
    setLoading(true);
    setError('');
    try {
      await updateUsuario(usuarioEditando.idUsuario, usuarioActualizado);
      setMensaje('✅ Usuario actualizado exitosamente');
      setUsuarioEditando(null);
      fetchUsuarios(); // Refrescar lista
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      setError('❌ Error al actualizar usuario.');
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar usuario
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      setLoading(true);
      setError('');
      try {
        await deleteUsuario(id);
        setMensaje('✅ Usuario eliminado exitosamente');
        fetchUsuarios(); // Refrescar lista
        setTimeout(() => setMensaje(''), 3000);
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        setError('❌ Error al eliminar usuario.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Función para editar usuario
  const handleEdit = (usuario) => {
    setUsuarioEditando(usuario);
    setError('');
    setMensaje('');
  };

  // Función para cancelar edición
  const handleCancelEdit = () => {
    setUsuarioEditando(null);
    setError('');
    setMensaje('');
  };

  return (
    <div className="usuarios-page">
      <div className="container">
        <h1>👥 Gestión de Usuarios</h1>

        {/* Mensajes */}
        {error && <div className="alert alert-error">{error}</div>}
        {mensaje && <div className="alert alert-success">{mensaje}</div>}
        {loading && <div className="loading">🔄 Cargando...</div>}

        {/* FORMULARIO */}
        <div className="form-section">
          <h2>{usuarioEditando ? '✏️ Editar Usuario' : '➕ Crear Nuevo Usuario'}</h2>
          <UsuarioForm
            onSubmit={usuarioEditando ? handleUpdate : handleCreate}
            initialData={usuarioEditando}
            onCancel={usuarioEditando ? handleCancelEdit : null}
            isEditing={!!usuarioEditando}
            loading={loading}
          />
        </div>

        {/* LISTA */}
        <div className="table-section">
          <h2>📋 Lista de Usuarios ({usuarios.length})</h2>
          <UsuariosTable
            usuarios={usuarios}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default UsuariosPage;

