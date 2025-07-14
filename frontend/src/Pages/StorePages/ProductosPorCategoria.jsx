import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StoreLayout from '../../layouts/StoreLayout';

export default function ProductosPorCategoria() {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [ordenPor, setOrdenPor] = useState('nombre');
  const [paginaActual, setPaginaActual] = useState(1);
  const [rangoPrecioSeleccionado, setRangoPrecioSeleccionado] = useState('todos');
  const productosPorPagina = 12;

  // Mapeo de categorías para mostrar información
  const categoriasInfo = {
    'plantas-cesped': {
      nombre: 'Plantas y Césped',
      descripcion: 'Encuentra las mejores plantas, flores y césped para tu jardín',
      icono: '🌱',
      color: 'bg-green-100 text-green-800'
    },
    'macetas': {
      nombre: 'Macetas',
      descripcion: 'Macetas y jardineras de todos los tamaños y materiales',
      icono: '🏺',
      color: 'bg-orange-100 text-orange-800'
    },
    'herramientas': {
      nombre: 'Herramientas de Jardinería',
      descripcion: 'Herramientas profesionales para el cuidado de tu jardín',
      icono: '🔧',
      color: 'bg-blue-100 text-blue-800'
    },
    'fertilizantes': {
      nombre: 'Fertilizantes',
      descripcion: 'Fertilizantes y abonos para el crecimiento óptimo de tus plantas',
      icono: '🌿',
      color: 'bg-emerald-100 text-emerald-800'
    }
  };

  // Rangos de precio
  const rangosPrecio = [
    { id: 'todos', label: 'Todos los precios', min: 0, max: Infinity },
    { id: '0-25', label: '$0 - $25', min: 0, max: 25 },
    { id: '26-50', label: '$26 - $50', min: 26, max: 50 },
    { id: '51-100', label: '$51 - $100', min: 51, max: 100 },
    { id: '101-200', label: '$101 - $200', min: 101, max: 200 },
    { id: '201+', label: '$201+', min: 201, max: Infinity }
  ];

  // Productos por categoría (normalmente vendrían de una API)
  useEffect(() => {
    const todosLosProductos = {
      'plantas-cesped': [
        { id: 1, nombre: "Rosa Roja Premium", precio: 18.99, imagen: "/images/logo.png", rating: 4.8, vendidos: 234, descripcion: "Rosa roja de alta calidad, perfecta para jardines" },
        { id: 2, nombre: "Césped Natural San Agustín", precio: 45.99, imagen: "/images/logo.png", rating: 4.5, vendidos: 156, descripcion: "Césped resistente y de fácil mantenimiento" },
        { id: 3, nombre: "Lavanda Francesa", precio: 22.50, imagen: "/images/logo.png", rating: 4.7, vendidos: 89, descripcion: "Lavanda aromática, ideal para jardines y relajación" },
        { id: 4, nombre: "Palmera Areca", precio: 125.00, imagen: "/images/logo.png", rating: 4.6, vendidos: 67, descripcion: "Palmera decorativa para interiores y exteriores" },
        { id: 17, nombre: "Geranios Rojos", precio: 12.99, imagen: "/images/logo.png", rating: 4.4, vendidos: 198, descripcion: "Geranios vibrantes para macetas y jardines" },
        { id: 18, nombre: "Hortensia Azul", precio: 35.50, imagen: "/images/logo.png", rating: 4.8, vendidos: 145, descripcion: "Hermosas hortensias azules para decoración" },
        { id: 19, nombre: "Césped Bermuda", precio: 38.99, imagen: "/images/logo.png", rating: 4.3, vendidos: 234, descripcion: "Césped resistente al calor y sequía" },
        { id: 20, nombre: "Rosas Blancas", precio: 21.99, imagen: "/images/logo.png", rating: 4.6, vendidos: 156, descripcion: "Elegantes rosas blancas para ocasiones especiales" }
      ],
      'macetas': [
        { id: 5, nombre: "Maceta de Barro Grande", precio: 35.99, imagen: "/images/logo.png", rating: 4.4, vendidos: 145, descripcion: "Maceta de barro tradicional, tamaño grande" },
        { id: 6, nombre: "Set 3 Macetas Cerámica", precio: 89.99, imagen: "/images/logo.png", rating: 4.8, vendidos: 203, descripcion: "Conjunto de 3 macetas de cerámica decorativas" },
        { id: 7, nombre: "Jardinera Rectangular", precio: 55.50, imagen: "/images/logo.png", rating: 4.3, vendidos: 78, descripcion: "Jardinera rectangular ideal para balcones" },
        { id: 8, nombre: "Maceta Colgante", precio: 28.99, imagen: "/images/logo.png", rating: 4.5, vendidos: 112, descripcion: "Maceta colgante perfecta para plantas trepadoras" },
        { id: 21, nombre: "Maceta de Fibra", precio: 42.50, imagen: "/images/logo.png", rating: 4.2, vendidos: 167, descripcion: "Maceta ecológica de fibra natural" },
        { id: 22, nombre: "Set Macetas Miniatura", precio: 24.99, imagen: "/images/logo.png", rating: 4.7, vendidos: 289, descripcion: "Set de 6 macetas pequeñas para suculentas" },
        { id: 23, nombre: "Jardinera con Ruedas", precio: 75.00, imagen: "/images/logo.png", rating: 4.5, vendidos: 89, descripcion: "Jardinera móvil con sistema de ruedas" },
        { id: 24, nombre: "Maceta Auto-Riego", precio: 68.99, imagen: "/images/logo.png", rating: 4.8, vendidos: 134, descripcion: "Maceta inteligente con sistema de auto-riego" }
      ],
      'herramientas': [
        { id: 9, nombre: "Kit Herramientas Básico", precio: 75.99, imagen: "/images/logo.png", rating: 4.6, vendidos: 189, descripcion: "Kit completo con las herramientas esenciales" },
        { id: 10, nombre: "Podadora Profesional", precio: 145.00, imagen: "/images/logo.png", rating: 4.9, vendidos: 56, descripcion: "Podadora de alta calidad para uso profesional" },
        { id: 11, nombre: "Manguera 20m", precio: 42.50, imagen: "/images/logo.png", rating: 4.2, vendidos: 134, descripcion: "Manguera resistente de 20 metros con conectores" },
        { id: 12, nombre: "Regadera 10L", precio: 25.99, imagen: "/images/logo.png", rating: 4.4, vendidos: 98, descripcion: "Regadera de gran capacidad con rociador ajustable" },
        { id: 25, nombre: "Pala de Jardín", precio: 18.50, imagen: "/images/logo.png", rating: 4.3, vendidos: 245, descripcion: "Pala resistente con mango ergonómico" },
        { id: 26, nombre: "Tijeras de Podar", precio: 32.99, imagen: "/images/logo.png", rating: 4.7, vendidos: 178, descripcion: "Tijeras profesionales para poda precisa" },
        { id: 27, nombre: "Rastrillo Metálico", precio: 28.50, imagen: "/images/logo.png", rating: 4.1, vendidos: 156, descripcion: "Rastrillo resistente para limpieza de jardines" },
        { id: 28, nombre: "Aspersores Automáticos", precio: 89.99, imagen: "/images/logo.png", rating: 4.6, vendidos: 95, descripcion: "Sistema de aspersores automáticos programables" }
      ],
      'fertilizantes': [
        { id: 13, nombre: "Fertilizante Orgánico 5kg", precio: 32.99, imagen: "/images/logo.png", rating: 4.7, vendidos: 167, descripcion: "Fertilizante 100% orgánico para todo tipo de plantas" },
        { id: 14, nombre: "Abono Líquido Universal", precio: 18.50, imagen: "/images/logo.png", rating: 4.5, vendidos: 223, descripcion: "Abono líquido concentrado de acción rápida" },
        { id: 15, nombre: "Tierra Negra Premium", precio: 28.99, imagen: "/images/logo.png", rating: 4.6, vendidos: 145, descripcion: "Tierra negra rica en nutrientes para plantación" },
        { id: 16, nombre: "Compost Orgánico", precio: 22.50, imagen: "/images/logo.png", rating: 4.8, vendidos: 89, descripcion: "Compost natural para mejorar la estructura del suelo" },
        { id: 29, nombre: "Fertilizante para Rosas", precio: 35.99, imagen: "/images/logo.png", rating: 4.9, vendidos: 78, descripcion: "Fertilizante especializado para el cuidado de rosas" },
        { id: 30, nombre: "Abono para Césped", precio: 45.50, imagen: "/images/logo.png", rating: 4.4, vendidos: 134, descripcion: "Abono específico para mantener césped verde y saludable" },
        { id: 31, nombre: "Humus de Lombriz", precio: 26.99, imagen: "/images/logo.png", rating: 4.8, vendidos: 203, descripcion: "Humus natural de lombriz, excelente para todas las plantas" },
        { id: 32, nombre: "Fertilizante Granulado", precio: 38.99, imagen: "/images/logo.png", rating: 4.3, vendidos: 167, descripcion: "Fertilizante granulado de liberación lenta" }
      ]
    };

    const productosCategoria = todosLosProductos[categoria] || [];
    setProductos(productosCategoria);
    setProductosFiltrados(productosCategoria);
  }, [categoria]);

  // Función para filtrar productos
  useEffect(() => {
    let resultado = [...productos];

    // Filtrar por búsqueda
    if (busqueda) {
      resultado = resultado.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtrar por rango de precio
    if (rangoPrecioSeleccionado !== 'todos') {
      const rango = rangosPrecio.find(r => r.id === rangoPrecioSeleccionado);
      resultado = resultado.filter(producto =>
        producto.precio >= rango.min && producto.precio <= rango.max
      );
    }

    // Ordenar productos
    resultado.sort((a, b) => {
      switch (ordenPor) {
        case 'precio-asc':
          return a.precio - b.precio;
        case 'precio-desc':
          return b.precio - a.precio;
        case 'rating':
          return b.rating - a.rating;
        case 'vendidos':
          return b.vendidos - a.vendidos;
        default:
          return a.nombre.localeCompare(b.nombre);
      }
    });

    setProductosFiltrados(resultado);
    setPaginaActual(1);
  }, [productos, busqueda, rangoPrecioSeleccionado, ordenPor]);

  // Calcular productos para la página actual
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;
  const productosActuales = productosFiltrados.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const categoriaActual = categoriasInfo[categoria];

  if (!categoriaActual) {
    return (
      <StoreLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Categoría no encontrada</h1>
            <p className="text-gray-600 mb-6">La categoría que buscas no existe.</p>
            <a href="/store" className="bg-[#6FAD46] text-white px-6 py-3 rounded-lg hover:bg-[#5a9639] transition-colors">
              Volver a la tienda
            </a>
          </div>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero de la categoría */}
        <div className="bg-gradient-to-r from-[#6FAD46] to-[#5a9639] text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="text-6xl mb-4">{categoriaActual.icono}</div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {categoriaActual.nombre}
              </h1>
              <p className="text-xl lg:text-2xl text-green-100 mb-6">
                {categoriaActual.descripcion}
              </p>
              <div className={`inline-block px-4 py-2 rounded-full ${categoriaActual.color} font-medium`}>
                {productosFiltrados.length} productos disponibles
              </div>
            </div>
          </div>
        </div>

        {/* Barra de herramientas */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Breadcrumb */}
              <div className="flex items-center text-sm text-gray-600">
                <a href="/" className="hover:text-[#6FAD46]">Inicio</a>
                <span className="mx-2">/</span>
                <a href="/store" className="hover:text-[#6FAD46]">Tienda</a>
                <span className="mx-2">/</span>
                <span className="text-[#6FAD46] font-medium">{categoriaActual.nombre}</span>
              </div>
              
              {/* Herramientas de filtrado */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar en esta categoría..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                
                <select
                  value={ordenPor}
                  onChange={(e) => setOrdenPor(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent"
                >
                  <option value="nombre">Ordenar por nombre</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                  <option value="rating">Mejor calificados</option>
                  <option value="vendidos">Más vendidos</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar de filtros */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                {/* Filtro de precio */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtrar por precio</h3>
                  <div className="space-y-2">
                    {rangosPrecio.map((rango) => (
                      <label key={rango.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name="precio"
                          value={rango.id}
                          checked={rangoPrecioSeleccionado === rango.id}
                          onChange={(e) => setRangoPrecioSeleccionado(e.target.value)}
                          className="text-[#6FAD46] focus:ring-[#6FAD46]"
                        />
                        <span className="ml-2 text-gray-700">{rango.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Enlaces rápidos */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Otras categorías</h3>
                  <div className="space-y-2">
                    {Object.entries(categoriasInfo).map(([key, cat]) => (
                      <a
                        key={key}
                        href={`/tienda/${key}`}
                        className={`block p-2 rounded transition-colors ${
                          key === categoria
                            ? 'bg-[#6FAD46] text-white'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-[#6FAD46]'
                        }`}
                      >
                        <span className="mr-2">{cat.icono}</span>
                        {cat.nombre}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="flex-1">
              {/* Grid de productos */}
              {productosActuales.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {productosActuales.map((producto) => (
                      <div key={producto.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group border">
                        {/* Imagen del producto */}
                        <div className="relative overflow-hidden h-48">
                          <img 
                            src={producto.imagen} 
                            alt={producto.nombre}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          
                          {/* Botones de acción */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
                              <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                              </button>
                              <button className="bg-[#6FAD46] text-white p-2 rounded-full hover:bg-[#5a9639] transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 16h16M7 13v4a2 2 0 002 2h6a2 2 0 002-2v-4m-8 2h8"></path>
                                </svg>
                              </button>
                              <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Información del producto */}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                            {producto.nombre}
                          </h3>
                          
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {producto.descripcion}
                          </p>
                          
                          {/* Rating y ventas */}
                          <div className="flex items-center mb-3">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < Math.floor(producto.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({producto.vendidos})</span>
                          </div>
                          
                          {/* Precio */}
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-[#6FAD46]">
                              ${producto.precio}
                            </span>
                            <button className="bg-[#6FAD46] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#5a9639] transition-colors">
                              Agregar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Paginación */}
                  {totalPaginas > 1 && (
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
                        disabled={paginaActual === 1}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Anterior
                      </button>
                      
                      {[...Array(totalPaginas)].map((_, index) => {
                        const numeroPagina = index + 1;
                        if (
                          numeroPagina === 1 ||
                          numeroPagina === totalPaginas ||
                          (numeroPagina >= paginaActual - 2 && numeroPagina <= paginaActual + 2)
                        ) {
                          return (
                            <button
                              key={numeroPagina}
                              onClick={() => setPaginaActual(numeroPagina)}
                              className={`px-3 py-2 rounded-lg ${
                                paginaActual === numeroPagina
                                  ? 'bg-[#6FAD46] text-white'
                                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {numeroPagina}
                            </button>
                          );
                        } else if (
                          numeroPagina === paginaActual - 3 ||
                          numeroPagina === paginaActual + 3
                        ) {
                          return <span key={numeroPagina} className="px-2">...</span>;
                        }
                        return null;
                      })}
                      
                      <button
                        onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
                        disabled={paginaActual === totalPaginas}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Siguiente
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">No se encontraron productos</h3>
                  <p className="text-gray-600 mb-6">
                    No hay productos que coincidan con tus criterios de búsqueda.
                  </p>
                  <button
                    onClick={() => {
                      setBusqueda('');
                      setRangoPrecioSeleccionado('todos');
                    }}
                    className="bg-[#6FAD46] text-white px-6 py-3 rounded-lg hover:bg-[#5a9639] transition-colors"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
