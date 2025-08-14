// usuarioService.js - Servicio para conectar con el backend
import axios from 'axios';

// Configuración base de la API
const API_URL = 'http://localhost:8080/api';

/**
 * Servicio para login de usuario
 * @param {string} identificador - Correo o teléfono
 * @param {string} contrasena - Contraseña del usuario
 * @returns {Promise} Respuesta del servidor
 */
export const loginUsuario = async (identificador, contrasena) => {
  try {
    // Determinar si es correo o teléfono
    const esCorreo = identificador.includes('@');
    
    const datos = {
      [esCorreo ? 'correoElectronico' : 'telefono']: identificador,
      contrasena: contrasena
    };

    const response = await axios.post(`${API_URL}/login`, datos);
    
    if (response.data.success) {
      // Guardar datos del usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(response.data.data));
      return response.data;
    }
    
    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

/**
 * Servicio para registrar nuevo usuario
 * @param {Object} datosUsuario - Datos del usuario a registrar
 * @returns {Promise} Respuesta del servidor
 */
export const registrarUsuario = async (datosUsuario) => {
  try {
    // Convertir nombres de campos al formato del backend
    const usuarioFormateado = {
      nombres: datosUsuario.nombres,
      apellidos: datosUsuario.apellidos,
      genero: datosUsuario.genero.toUpperCase(), // MASCULINO, FEMENINO, OTRO
      fechaNacimiento: datosUsuario.fechaNacimiento,
      correoElectronico: datosUsuario.correoElectronico,
      telefono: datosUsuario.telefono,
      contrasena: datosUsuario.contrasena
    };

    const response = await axios.post(`${API_URL}/registro`, usuarioFormateado);
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

