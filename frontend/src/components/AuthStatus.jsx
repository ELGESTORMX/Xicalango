import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authUtils from '../utils/auth';

const AuthStatus = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar estado de autenticación al montar el componente
    checkAuthStatus();

    // Escuchar cambios en la autenticación
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('authChanged', handleAuthChange);

    // Cleanup del event listener
    return () => {
      window.removeEventListener('authChanged', handleAuthChange);
    };
  }, []);

  const checkAuthStatus = () => {
    const authenticated = authUtils.isAuthenticated();
    const userData = authUtils.getUserData();
    
    setIsAuthenticated(authenticated);
    setUser(userData);
  };

  const handleLogout = () => {
    authUtils.logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => navigate('/login')}
          className="bg-[#6FAD46] hover:bg-[#5a9639] text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2 text-sm">
        <div className="w-8 h-8 bg-[#6FAD46] rounded-full flex items-center justify-center">
          <span className="text-white font-medium">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
        <div className="hidden md:block">
          <p className="text-gray-700 font-medium">{user?.name || 'Usuario'}</p>
          <p className="text-xs text-gray-500">{user?.role || 'user'}</p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => navigate('/admin')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          Panel
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          Salir
        </button>
      </div>
    </div>
  );
};

export default AuthStatus;
