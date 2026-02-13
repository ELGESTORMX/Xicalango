import axios from 'axios';
import authUtils from '../utils/auth';

// Crear una instancia de axios con configuración por defecto
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = authUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores de autenticación
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el token ha expirado o es inválido
    if (error.response?.status === 401) {
      // Limpiar sesión y redirigir al login
      authUtils.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
