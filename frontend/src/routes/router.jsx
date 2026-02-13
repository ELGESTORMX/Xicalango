// filepath: c:\Users\tavov\OneDrive\Desktop\nuew\front-end\src\routes\router.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/LandingPage/Home';
import Homepage from '../Pages/StorePages/Homepage';
import ServiciosResidenciales from '../Pages/LandingPage/servicesPages/residenciales';
import ProyectosHoteleros from '../Pages/LandingPage/servicesPages/hoteleros';
import ServiciosComerciales from '../Pages/LandingPage/servicesPages/comerciales';
import ServiciosJardineria from '../Pages/LandingPage/servicesPages/jardineria';
import EventosEspeciales from '../Pages/LandingPage/servicesPages/eventos';
import Catalogo from '../Pages/StorePages/catalogo';
import ProductosPorCategoria from '../Pages/StorePages/ProductosPorCategoria';
import ShoppingCart from '../Pages/StorePages/shoppinngCart';
import Checkout from '../Pages/StorePages/Checkout';
import Login from '../Pages/login';
import AdminPanel from '../components/adminPanel';
import ProtectedRoute, { PublicRoute, AdminRoute } from '../components/ProtectedRoute';
import AdminDashboard from '../Pages/admin/dashboard';
function RouterComponent() {
  return (
    <Routes>
      {/* Rutas públicas - accesibles para todos */}
      <Route path="/" element={<Home/>} /> {/* Ruta raíz */}
      <Route path="/tienda" element={<Homepage/>} /> {/* Ruta para la tienda */}
      <Route path="/servicios/eventos" element={<EventosEspeciales />} /> {/* Ruta para eventos especiales */}
      <Route path="/servicios/residencial" element={<ServiciosResidenciales />} /> {/* Ruta para servicios residenciales */}
      <Route path="/servicios/hotelero" element={<ProyectosHoteleros />} /> {/* Ruta para proyectos hoteleros */}
      <Route path="/servicios/comercial" element={<ServiciosComerciales />} /> {/* Ruta para servicios comerciales */}
      <Route path="/servicios/jardineria" element={<ServiciosJardineria />} /> {/* Ruta para servicios de jardinería */}
      <Route path="/tienda/productos" element={<Catalogo />} /> {/* Ruta para el catálogo de productos */}
      <Route path="/tienda/carrito" element={<ShoppingCart />} /> {/* Ruta para el carrito de compras */}
      <Route path="/tienda/checkout" element={<Checkout />} /> {/* Ruta para el proceso de pago */}
      <Route path="/dashboard" element={<AdminDashboard />} /> {/* Ruta para el proceso de pago */}
      
      {/* Ruta de login - solo accesible si NO estás logueado */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      
      {/* Ruta de admin - solo accesible si estás logueado */}
      <Route path="/admin" element={<AdminPanel />
      } />
      
      {/* Ruta dinámica para categorías (fallback) */}
      <Route path="/tienda/:categoria" element={<ProductosPorCategoria />} /> {/* Ruta dinámica para cualquier categoría */}

    </Routes>
  );
}

export default RouterComponent;