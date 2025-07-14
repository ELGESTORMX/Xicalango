import React, { useState, useEffect } from 'react';
import logo from '../../../public/images/logo.png';

export default function navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Simulado - número de productos en carrito

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMenuOpen ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          
          {/* Logo y nombre */}
          <div className='flex items-center'>
            <a href="/tienda" className='flex items-center space-x-3'>
              <img src={logo} alt="Xicalango Logo" className='h-10 w-10 rounded-full' />
              <div>
                <span className='text-xl font-bold text-gray-800'>Xicalango</span>
                <span className='block text-xs text-[#6FAD46] font-medium'>Tienda</span>
              </div>
            </a>
          </div>

          {/* Buscador - Desktop */}
          <div className='hidden lg:flex flex-1 max-w-lg mx-8'>
            <div className='relative w-full'>
              <input
                type='text'
                placeholder='Buscar productos, plantas, herramientas...'
                className='w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none'
              />
              <button className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#6FAD46] text-white p-2 rounded-full hover:bg-[#5a9639] transition-colors'>
                <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Navegación Desktop */}
          <div className='hidden lg:flex items-center space-x-8'>
            <a href="/tienda" className='text-gray-700 hover:text-[#6FAD46] font-medium transition-colors'>
              Inicio
            </a>
            <a href="/tienda/productos" className='text-gray-700 hover:text-[#6FAD46] font-medium transition-colors'>
              Catálogo de Productos
            </a>
            <div className='relative group'>
              <button className='text-gray-700 hover:text-[#6FAD46] font-medium transition-colors flex items-center'>
                Categorías
                <svg className='w-4 h-4 ml-1' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {/* Dropdown Categorías */}
              <div className='absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border'>
                <div className='py-2'>
                  <a href="/tienda/plantas-cesped" className='block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#6FAD46] transition-colors'>
                    🌱 Plantas y Césped
                  </a>
                  <a href="/tienda/herramientas" className='block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#6FAD46] transition-colors'>
                    🔧 Herramientas de Jardinería
                  </a>
                  <a href="/tienda/fertilizantes" className='block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#6FAD46] transition-colors'>
                    🌿 Fertilizantes
                  </a>
                  <a href="/tienda/macetas" className='block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#6FAD46] transition-colors'>
                    🏺 Macetas
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Iconos de acción - Desktop */}
          <div className='hidden lg:flex items-center space-x-6'>
            {/* Carrito */}
            <a href="/tienda/carrito" className='flex items-center space-x-2 p-2 text-gray-700 hover:text-[#6FAD46] transition-colors relative group'>
              <div className='relative'>
                <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 16h16M7 13v4a2 2 0 002 2h6a2 2 0 002-2v-4m-8 2h8"></path>
                </svg>
                {cartCount > 0 && (
                  <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold'>
                    {cartCount}
                  </span>
                )}
              </div>
              <span className='text-sm font-medium group-hover:text-[#6FAD46] transition-colors'>
                Mi Carrito
              </span>
            </a>

            {/* Botón volver al sitio principal */}
            <a 
              href="/" 
              className='bg-[#6FAD46] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5a9639] transition-colors shadow-md hover:shadow-lg transform hover:scale-105'
            >
              Sitio Principal
            </a>
          </div>

          {/* Menú hamburguesa - Mobile */}
          <div className='lg:hidden flex items-center space-x-3'>
            {/* Carrito móvil */}
            <a href="/tienda/carrito" className='flex items-center space-x-1 p-2 text-gray-700 hover:text-[#6FAD46] transition-colors relative'>
              <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 16h16M7 13v4a2 2 0 002 2h6a2 2 0 002-2v-4m-8 2h8"></path>
              </svg>
              {cartCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-[#6FAD46] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold'>
                  {cartCount}
                </span>
              )}
              <span className='text-xs font-medium'>Carrito</span>
            </a>

            {/* Hamburguesa */}
            <button 
              onClick={toggleMenu}
              className='p-2 text-gray-700 hover:text-[#6FAD46] transition-colors'
            >
              {isMenuOpen ? (
                <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Buscador móvil */}
        <div className='lg:hidden pb-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Buscar productos...'
              className='w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none'
            />
            <button className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#6FAD46] text-white p-2 rounded-full'>
              <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`lg:hidden bg-white border-t transition-all duration-300 ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className='px-6 py-4 space-y-4'>
          <a href="/tienda" className='block text-gray-700 hover:text-[#6FAD46] font-medium transition-colors'>
            🏠 Inicio Tienda
          </a>
          <a href="/tienda/productos" className='block text-gray-700 hover:text-[#6FAD46] font-medium transition-colors'>
            📦 Todos los Productos
          </a>
          
          {/* Categorías móvil */}
          <div className='space-y-2'>
            <p className='font-medium text-gray-800 text-sm uppercase tracking-wide'>Categorías</p>
            <a href="/tienda/plantas-cesped" className='block pl-4 text-gray-600 hover:text-[#6FAD46] transition-colors'>
              🌱 Plantas y Césped
            </a>
            <a href="/tienda/macetas" className='block pl-4 text-gray-600 hover:text-[#6FAD46] transition-colors'>
              🏺 Macetas
            </a>
            <a href="/tienda/herramientas" className='block pl-4 text-gray-600 hover:text-[#6FAD46] transition-colors'>
              � Herramientas de Jardinería
            </a>
            <a href="/tienda/fertilizantes" className='block pl-4 text-gray-600 hover:text-[#6FAD46] transition-colors'>
              🌿 Fertilizantes
            </a>
          </div>
          
          <a href="/tienda/ofertas" className='block text-gray-700 hover:text-[#6FAD46] font-medium transition-colors'>
            🏷️ Ofertas Especiales
          </a>
          
          <div className='border-t pt-4 space-y-2'>
            <a href="/tienda/carrito" className='block text-gray-700 hover:text-[#6FAD46] transition-colors'>
              🛒 Mi Carrito
            </a>
            <a href="#" className='block text-gray-700 hover:text-[#6FAD46] transition-colors'>
              👤 Mi Cuenta
            </a>
            <a href="#" className='block text-gray-700 hover:text-[#6FAD46] transition-colors'>
              ❤️ Mis Favoritos
            </a>
            <a href="/" className='block text-[#6FAD46] font-medium'>
              🏠 Sitio Principal
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
