import API from './api';

// Función auxiliar para manejar errores
const handleError = (error, operation) => {
  console.error(`Error en ${operation}:`, error);
  
  if (error.response) {
    // El servidor respondió con un error
    const message = error.response.data?.message || error.response.data || 'Error del servidor';
    throw new Error(`${operation} falló: ${message}`);
  } else if (error.request) {
    // La solicitud se hizo pero no se recibió respuesta
    throw new Error(`${operation} falló: No se pudo conectar con el servidor. Verifica que esté ejecutándose en http://localhost:8080`);
  } else {
    // Algo más causó el error
    throw new Error(`${operation} falló: ${error.message}`);
  }
};

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await API.get('/usuarios');
    console.log("📦 Datos recibidos del backend:", response.data);
    
    // Validar que la respuesta sea un array
    if (!Array.isArray(response.data)) {
      console.warn("⚠️ La respuesta no es un array:", response.data);
      return [];
    }
    
    return response.data;
  } catch (error) {
    handleError(error, 'Obtener usuarios');
  }
};

// Crear un nuevo usuario
export const createUsuario = async (usuario) => {
  try {
    // Validar datos antes de enviar
    if (!usuario.nombre || !usuario.correo || !usuario.contrasena) {
      throw new Error('Faltan campos obligatorios: nombre, correo y contraseña');
    }
    
    const response = await API.post('/usuarios', usuario);
    console.log("✅ Usuario creado:", response.data);
    return response.data;
  } catch (error) {
    handleError(error, 'Crear usuario');
  }
};

// Actualizar un usuario por ID
export const updateUsuario = async (id, usuario) => {
  try {
    if (!id) {
      throw new Error('ID de usuario es requerido para actualizar');
    }
    
    // Validar datos antes de enviar
    if (!usuario.nombre || !usuario.correo) {
      throw new Error('Faltan campos obligatorios: nombre y correo');
    }
    
    const response = await API.put(`/usuarios/${id}`, usuario);
    console.log("✅ Usuario actualizado:", response.data);
    return response.data;
  } catch (error) {
    handleError(error, 'Actualizar usuario');
  }
};

// Eliminar un usuario por ID
export const deleteUsuario = async (id) => {
  try {
    if (!id) {
      throw new Error('ID de usuario es requerido para eliminar');
    }
    
    const response = await API.delete(`/usuarios/${id}`);
    console.log("✅ Usuario eliminado, ID:", id);
    return response.data;
  } catch (error) {
    handleError(error, 'Eliminar usuario');
  }
};

// Obtener un usuario específico por ID (función adicional útil)
export const getUsuarioById = async (id) => {
  try {
    if (!id) {
      throw new Error('ID de usuario es requerido');
    }
    
    const response = await API.get(`/usuarios/${id}`);
    console.log("📦 Usuario obtenido:", response.data);
    return response.data;
  } catch (error) {
    handleError(error, 'Obtener usuario por ID');
  }
};
