// usuarioService.js - VERSIÓN PARA PRODUCCIÓN
import axios from 'axios';

// Configuración automática de URL según el entorno
const getApiUrl = () => {
  // Si estamos en desarrollo local
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8080/api';
  }
  
  // Si estamos en producción, usar la URL del backend desplegado
  // IMPORTANTE: Reemplaza esta URL por la que te dé Railway cuando despliegues el backend
  return 'https://tu-app-backend.railway.app/api';
};

const API_URL = getApiUrl();

// Log para debugging
console.log('🔗 API URL configurada:', API_URL);

/**
 * ✅ FUNCIÓN HELPER: Parsear respuesta segura con manejo de referencias circulares
 */
const parsearRespuestaSegura = (respuesta) => {
  try {
    // Si ya es un objeto, intentar extraer lo básico
    if (typeof respuesta === 'object' && respuesta !== null) {
      // Si tiene success directamente
      if (respuesta.hasOwnProperty('success')) {
        return respuesta;
      }
      
      // Si es la respuesta de axios
      if (respuesta.data) {
        return parsearRespuestaSegura(respuesta.data);
      }
    }

    // Si es string, intentar parsearlo
    if (typeof respuesta === 'string') {
      // Buscar el JSON básico sin referencias circulares
      const matchSuccess = respuesta.match(/"success":(true|false)/);
      const matchMessage = respuesta.match(/"message":"([^"]+)"/);
      const matchIdPedido = respuesta.match(/"idPedido":(\d+)/);
      const matchIdPago = respuesta.match(/"idPago":(\d+)/);
      
      if (matchSuccess) {
        const resultado = {
          success: matchSuccess[1] === 'true',
          message: matchMessage ? matchMessage[1] : 'Operación completada',
          data: null
        };
        
        // Si encontramos idPedido, agregarlo
        if (matchIdPedido) {
          resultado.data = {
            idPedido: parseInt(matchIdPedido[1])
          };
        }
        
        // Si encontramos idPago, agregarlo
        if (matchIdPago) {
          if (!resultado.data) resultado.data = {};
          resultado.data.idPago = parseInt(matchIdPago[1]);
        }
        
        return resultado;
      }
    }

    // Fallback: si no podemos parsear, asumir error
    return {
      success: false,
      message: 'Respuesta del servidor no reconocida'
    };

  } catch (error) {
    console.error('Error parseando respuesta:', error);
    return {
      success: false,
      message: 'Error procesando respuesta del servidor'
    };
  }
};

/**
 * Configuración de axios con timeout y headers
 */
const configureAxios = () => {
  axios.defaults.timeout = 10000; // 10 segundos
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  
  // Interceptor para requests
  axios.interceptors.request.use(
    (config) => {
      console.log('🚀 Request:', config.method?.toUpperCase(), config.url);
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Interceptor para responses
  axios.interceptors.response.use(
    (response) => {
      console.log('✅ Response:', response.status, response.config.url);
      return response;
    },
    (error) => {
      console.error('❌ Response Error:', error.response?.status, error.config?.url);
      return Promise.reject(error);
    }
  );
};

// Configurar axios al inicializar
configureAxios();

/**
 * Servicio para login de usuario
 */
export const loginUsuario = async (identificador, contrasena) => {
  try {
    const esCorreo = identificador.includes('@');
    
    const datos = {
      [esCorreo ? 'correoElectronico' : 'telefono']: identificador,
      contrasena: contrasena
    };

    const response = await axios.post(`${API_URL}/login`, datos);
    const resultado = parsearRespuestaSegura(response.data);
    
    if (resultado.success && resultado.data) {
      localStorage.setItem('usuario', JSON.stringify(resultado.data));
    }
    
    return resultado;
  } catch (error) {
    console.error('Error en login:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Error de conexión con el servidor'
    };
  }
};

/**
 * Servicio para registrar nuevo usuario
 */
export const registrarUsuario = async (datosUsuario) => {
  try {
    const usuarioFormateado = {
      nombres: datosUsuario.nombres,
      apellidos: datosUsuario.apellidos,
      genero: datosUsuario.genero.toUpperCase(),
      fechaNacimiento: datosUsuario.fechaNacimiento,
      correoElectronico: datosUsuario.correoElectronico,
      telefono: datosUsuario.telefono,
      contrasena: datosUsuario.contrasena
    };

    const response = await axios.post(`${API_URL}/registro`, usuarioFormateado);
    return parsearRespuestaSegura(response.data);
  } catch (error) {
    console.error('Error en registro:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Error de conexión con el servidor'
    };
  }
};

/**
 * Servicio para actualizar usuario
 */
export const actualizarUsuario = async (id, datosUsuario) => {
  try {
    const response = await axios.put(`${API_URL}/usuarios/${id}`, datosUsuario);
    return parsearRespuestaSegura(response.data);
  } catch (error) {
    console.error('Error en actualización:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Error de conexión con el servidor'
    };
  }
};

/**
 * Servicio para obtener platos por categoría
 */
export const obtenerPlatosPorCategoria = async (categoria) => {
  try {
    const response = await axios.get(`${API_URL}/platos/categoria/${categoria}`);
    return parsearRespuestaSegura(response.data);
  } catch (error) {
    console.error('Error obteniendo platos:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Error de conexión con el servidor'
    };
  }
};

/**
 * Servicio para obtener todas las categorías
 */
export const obtenerCategorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias`);
    return parsearRespuestaSegura(response.data);
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Error de conexión con el servidor'
    };
  }
};

/**
 * ✅ CORREGIDO: Servicio para crear pedido con manejo seguro de respuesta
 */
export const crearPedido = async (pedidoData) => {
  try {
    console.log('🔍 Enviando pedido:', pedidoData);

    // Validaciones básicas
    if (!pedidoData.id_usuario) {
      throw new Error('ID de usuario requerido');
    }

    if (!pedidoData.items || pedidoData.items.length === 0) {
      throw new Error('Items del pedido requeridos');
    }

    // Validar cada item
    for (let i = 0; i < pedidoData.items.length; i++) {
      const item = pedidoData.items[i];
      if (!item.id_plato || !item.cantidad || !item.precio_unitario) {
        throw new Error(`Item ${i + 1}: Datos incompletos`);
      }
    }

    const response = await axios.post(`${API_URL}/pedidos`, pedidoData);
    
    console.log('📨 Respuesta raw del servidor:', response);
    console.log('📦 Data de la respuesta:', response.data);
    
    // ✅ USAR EL PARSEADOR SEGURO
    const resultado = parsearRespuestaSegura(response.data);
    
    console.log('✅ Resultado parseado:', resultado);
    return resultado;

  } catch (error) {
    console.error('❌ Error creando pedido:', error);
    
    return {
      success: false,
      message: error.message || error.response?.data?.message || 'Error al crear pedido'
    };
  }
};

/**
 * ✅ CORREGIDO: Servicio para procesar pago con tipos de datos correctos
 */
export const procesarPago = async (pagoData) => {
  try {
    console.log('🔍 Datos de pago recibidos:', pagoData);

    // Validaciones básicas
    if (!pagoData.id_pedido) {
      throw new Error('ID de pedido requerido');
    }

    if (!pagoData.metodo_pago) {
      throw new Error('Método de pago requerido');
    }

    if (!pagoData.monto || pagoData.monto <= 0) {
      throw new Error('Monto inválido');
    }

    // ✅ FORMATO CORRECTO: Asegurar tipos de datos correctos para Java
    const pagoFormateado = {
      id_pedido: parseInt(pagoData.id_pedido), // ✅ Asegurar que sea entero
      metodo_pago: String(pagoData.metodo_pago), // ✅ Asegurar que sea string
      monto: parseFloat(pagoData.monto) // ✅ Asegurar que sea decimal
    };

    console.log('💳 Datos de pago formateados para enviar:', pagoFormateado);

    // Validación final
    if (isNaN(pagoFormateado.id_pedido) || pagoFormateado.id_pedido <= 0) {
      throw new Error('ID de pedido inválido: ' + pagoData.id_pedido);
    }

    if (isNaN(pagoFormateado.monto) || pagoFormateado.monto <= 0) {
      throw new Error('Monto inválido: ' + pagoData.monto);
    }

    const response = await axios.post(`${API_URL}/pagos`, pagoFormateado);
    
    console.log('📨 Respuesta raw del servidor (pago):', response);
    console.log('💰 Data de la respuesta (pago):', response.data);
    
    // ✅ USAR EL PARSEADOR SEGURO
    const resultado = parsearRespuestaSegura(response.data);
    
    console.log('✅ Resultado parseado (pago):', resultado);
    return resultado;

  } catch (error) {
    console.error('❌ Error procesando pago:', error);
    console.error('❌ Detalles del error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText
    });
    
    return {
      success: false,
      message: error.message || error.response?.data?.message || 'Error al procesar pago'
    };
  }
};

/**
 * Servicio para obtener historial de pedidos
 */
export const obtenerHistorialPedidos = async (idUsuario) => {
  try {
    const response = await axios.get(`${API_URL}/pedidos/usuario/${idUsuario}`);
    return parsearRespuestaSegura(response.data);
  } catch (error) {
    console.error('Error obteniendo historial:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Error de conexión con el servidor'
    };
  }
};

/**
 * Función helper para debugging del usuario
 */
export const debugUsuario = () => {
  const usuario = localStorage.getItem('usuario');
  if (usuario) {
    const parsed = JSON.parse(usuario);
    console.log('👤 Usuario en localStorage:', parsed);
    console.log('🔑 Campos disponibles:', Object.keys(parsed));
    return parsed;
  }
  console.log('❌ No hay usuario en localStorage');
  return null;
};

/**
 * Función helper para debugging del carrito
 */
export const debugCarrito = () => {
  const carrito = localStorage.getItem('carrito');
  if (carrito) {
    const parsed = JSON.parse(carrito);
    console.log('🛒 Carrito en localStorage:', parsed);
    if (parsed.length > 0) {
      console.log('🔑 Campos del primer item:', Object.keys(parsed[0]));
    }
    return parsed;
  }
  console.log('❌ No hay carrito en localStorage');
  return null;
};

/**
 * Helper para obtener la configuración actual
 */
export const getConfiguracion = () => {
  return {
    apiUrl: API_URL,
    entorno: window.location.hostname === 'localhost' ? 'desarrollo' : 'produccion',
    hostname: window.location.hostname
  };
};