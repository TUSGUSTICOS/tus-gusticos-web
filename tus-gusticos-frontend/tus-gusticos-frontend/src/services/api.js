import axios from "axios";

// Configuración automática de URL según el entorno
const getBaseURL = () => {
  // Si estamos en desarrollo local
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return "http://localhost:8080";
  }
  
  // Si estamos en producción, usar la URL del backend desplegado
  // IMPORTANTE: Reemplaza esta URL por la que te dé Railway cuando despliegues el backend
  return "https://tu-app-backend.railway.app";
};

export default axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000 // 10 segundos de timeout
});

// Variable para debugging
console.log("🌐 API Base URL:", getBaseURL());
