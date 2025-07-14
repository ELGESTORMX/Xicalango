import { useState, useEffect } from 'react';
import authUtils from '../utils/auth';

export const useAuth = () => {
  const [auth, setAuth] = useState({
    logged: false,
    user: null,
    token: null,
    loading: true
  });

  // Verificar si hay una sesión guardada al cargar la app
  useEffect(() => {
    const checkAuth = () => {
      if (authUtils.isAuthenticated()) {
        const userData = authUtils.getUserData();
        const token = authUtils.getToken();
        setAuth({
          logged: true,
          user: userData,
          token: token,
          loading: false
        });
      } else {
        setAuth({
          logged: false,
          user: null,
          token: null,
          loading: false
        });
      }
    };

    checkAuth();
  }, []);

  // Función para hacer login
  const login = (userData, token) => {
    authUtils.setSession(userData, token);
    setAuth({
      logged: true,
      user: userData,
      token: token,
      loading: false
    });
  };

  // Función para hacer logout
  const logout = () => {
    authUtils.logout();
    setAuth({
      logged: false,
      user: null,
      token: null,
      loading: false
    });
  };

  return {
    auth,
    login,
    logout,
    setAuth
  };
};

export default useAuth;
