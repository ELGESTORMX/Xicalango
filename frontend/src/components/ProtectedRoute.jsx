import React from 'react';
import { Navigate } from 'react-router-dom';
import authUtils from '../utils/auth';

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authUtils.isAuthenticated();
  
  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Componente para proteger rutas que NO deben ser accesibles si ya estás logueado
export const PublicRoute = ({ children }) => {
  const isAuthenticated = authUtils.isAuthenticated();
  
  // Si ya está autenticado, redirigir al admin
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Componente para rutas de admin que requieren roles específicos
export const AdminRoute = ({ children, requiredRole = 'admin' }) => {
  const isAuthenticated = authUtils.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Verificar rol del usuario si está disponible
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = user.role || 'user';
    
    if (requiredRole === 'admin' && userRole !== 'admin') {
      return <Navigate to="/" replace />; // Redirigir a home si no es admin
    }
  } catch (error) {
    console.warn('Error al verificar rol del usuario:', error);
  }
  
  return children;
};

export default ProtectedRoute;
