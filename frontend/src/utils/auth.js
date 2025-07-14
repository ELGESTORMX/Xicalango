// Utilidades para manejar la autenticación
export const authUtils = {
  // Clave simple para ofuscar datos (NO es seguridad real)
  _encodeData: (data) => {
    return btoa(JSON.stringify(data)); // Base64 encode
  },

  _decodeData: (encodedData) => {
    try {
      return JSON.parse(atob(encodedData)); // Base64 decode
    } catch {
      return null;
    }
  },

  // Guardar datos de sesión en localStorage
  setSession: (userData, token) => {
    localStorage.setItem('auth_token', token);
    // Codificar datos del usuario (ofuscación básica)
    localStorage.setItem('user_data', authUtils._encodeData(userData));
    
    // Disparar evento personalizado para notificar cambios
    window.dispatchEvent(new CustomEvent('authChanged'));
  },

  // Obtener token del localStorage
  getToken: () => {
    return localStorage.getItem('auth_token');
  },

  // Obtener datos del usuario del localStorage
  getUserData: () => {
    const encodedData = localStorage.getItem('user_data');
    return encodedData ? authUtils._decodeData(encodedData) : null;
  },

  // Verificar si hay una sesión activa
  isAuthenticated: () => {
    const token = authUtils.getToken();
    const userData = authUtils.getUserData();
    return token && userData;
  },

  // Cerrar sesión (limpiar localStorage)
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    // Disparar evento personalizado para notificar cambios
    window.dispatchEvent(new CustomEvent('authChanged'));
  },

  // Obtener headers para peticiones autenticadas
  getAuthHeaders: () => {
    const token = authUtils.getToken();
    return token ? {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } : {
      'Content-Type': 'application/json'
    };
  }
};

export default authUtils;
