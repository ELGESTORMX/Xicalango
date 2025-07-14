import React, { useState, useEffect } from 'react';
import StoreLayout from '../../layouts/StoreLayout';

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [ordenPor, setOrdenPor] = useState('nombre');
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const productosPorPagina = 12;

  // Categorías disponibles
  const categorias = [
    { id: 'todas', nombre: 'Todas las categorías', count: 0 },
    { id: 'plantas-cesped', nombre: 'Plantas y Césped', count: 312 },
    { id: 'macetas', nombre: 'Macetas', count: 156 },
    { id: 'herramientas', nombre: 'Herramientas de Jardinería', count: 89 },
    { id: 'fertilizantes', nombre: 'Fertilizantes', count: 45 }
  ];

  // Rangos de precio
  const rangosPrecio = [
    { id: 'todos', label: 'Todos los precios', min: 0, max: Infinity },
    { id: '0-25', label: '$0 - $25', min: 0, max: 25 },
    { id: '26-50', label: '$26 - $50', min: 26, max: 50 },
    { id: '51-100', label: '$51 - $100', min: 51, max: 100 },
    { id: '101-200', label: '$101 - $200', min: 101, max: 200 },
    { id: '201+', label: '$201+', min: 201, max: Infinity }
  ];

  const [rangoPrecioSeleccionado, setRangoPrecioSeleccionado] = useState('todos');

  // Productos de ejemplo (normalmente vendrían de una API)
  useEffect(() => {
    const productosEjemplo = [
      // Plantas y Césped
      { id: 1, nombre: "Rosa Roja Premium", precio: 18.99, categoria: "plantas-cesped", imagen: "/images/logo.png", rating: 4.8, vendidos: 234 },
      { id: 2, nombre: "Césped Natural San Agustín", precio: 45.99, categoria: "plantas-cesped", imagen: "/images/logo.png", rating: 4.5, vendidos: 156 },
      { id: 3, nombre: "Lavanda Francesa", precio: 22.50, categoria: "plantas-cesped", imagen: "/images/logo.png", rating: 4.7, vendidos: 89 },
      { id: 4, nombre: "Palmera Areca", precio: 125.00, categoria: "plantas-cesped", imagen: "/images/logo.png", rating: 4.6, vendidos: 67 },
      
      // Macetas
      { id: 5, nombre: "Maceta de Barro Grande", precio: 35.99, categoria: "macetas", imagen: "/images/logo.png", rating: 4.4, vendidos: 145 },
      { id: 6, nombre: "Set 3 Macetas Cerámica", precio: 89.99, categoria: "macetas", imagen: "/images/logo.png", rating: 4.8, vendidos: 203 },
      { id: 7, nombre: "Jardinera Rectangular", precio: 55.50, categoria: "macetas", imagen: "/images/logo.png", rating: 4.3, vendidos: 78 },
      { id: 8, nombre: "Maceta Colgante", precio: 28.99, categoria: "macetas", imagen: "/images/logo.png", rating: 4.5, vendidos: 112 },
      
      // Herramientas
      { id: 9, nombre: "Kit Herramientas Básico", precio: 75.99, categoria: "herramientas", imagen: "/images/logo.png", rating: 4.6, vendidos: 189 },
      { id: 10, nombre: "Podadora Profesional", precio: 145.00, categoria: "herramientas", imagen: "/images/logo.png", rating: 4.9, vendidos: 56 },
      { id: 11, nombre: "Manguera 20m", precio: 42.50, categoria: "herramientas", imagen: "/images/logo.png", rating: 4.2, vendidos: 134 },
      { id: 12, nombre: "Regadera 10L", precio: 25.99, categoria: "herramientas", imagen: "/images/logo.png", rating: 4.4, vendidos: 98 },
      
      // Fertilizantes
      { id: 13, nombre: "Fertilizante Orgánico 5kg", precio: 32.99, categoria: "fertilizantes", imagen: "/images/logo.png", rating: 4.7, vendidos: 167 },
      { id: 14, nombre: "Abono Líquido Universal", precio: 18.50, categoria: "fertilizantes", imagen: "/images/logo.png", rating: 4.5, vendidos: 223 },
      { id: 15, nombre: "Tierra Negra Premium", precio: 28.99, categoria: "fertilizantes", imagen: "/images/logo.png", rating: 4.6, vendidos: 145 },
      { id: 16, nombre: "Compost Orgánico", precio: 22.50, categoria: "fertilizantes", imagen: "/images/logo.png", rating: 4.8, vendidos: 89 }
    ];
    
    setProductos(productosEjemplo);
    setProductosFiltrados(productosEjemplo);
  }, []);

  // Función para filtrar productos
  useEffect(() => {
    let resultado = [...productos];

    // Filtrar por categoría
    if (categoriaSeleccionada !== 'todas') {
      resultado = resultado.filter(producto => producto.categoria === categoriaSeleccionada);
    }

    // Filtrar por búsqueda
    if (busqueda) {
      resultado = resultado.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
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
    setPaginaActual(1); // Resetear a la primera página cuando se filtra
  }, [productos, categoriaSeleccionada, busqueda, rangoPrecioSeleccionado, ordenPor]);

  // Calcular productos para la página actual
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;
  const productosActuales = productosFiltrados.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  return (
    <StoreLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header del catálogo */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Catálogo de Productos</h1>
                <p className="text-gray-600 mt-1">
                  {productosFiltrados.length} productos encontrados
                </p>
              </div>
              
              {/* Barra de búsqueda y ordenamiento */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
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
                {/* Categorías */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h3>
                  <div className="space-y-2">
                    {categorias.map((categoria) => (
                      <label key={categoria.id} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="categoria"
                            value={categoria.id}
                            checked={categoriaSeleccionada === categoria.id}
                            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                            className="text-[#6FAD46] focus:ring-[#6FAD46]"
                          />
                          <span className="ml-2 text-gray-700">{categoria.nombre}</span>
                        </div>
                        {categoria.id !== 'todas' && (
                          <span className="text-gray-400 text-sm">({categoria.count})</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rango de precios */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Precio</h3>
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
              </div>
            </div>

            {/* Botón de filtros móvil */}
            <div className="lg:hidden fixed bottom-4 right-4 z-50">
              <button
                onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
                className="bg-[#6FAD46] text-white p-4 rounded-full shadow-lg hover:bg-[#5a9639] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
                </svg>
              </button>
            </div>

            {/* Contenido principal */}
            <div className="flex-1">
              {/* Grid de productos */}
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
                        </div>
                      </div>
                    </div>
                    
                    {/* Información del producto */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {producto.nombre}
                      </h3>
                      
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
            </div>
          </div>
        </div>

        {/* Modal de filtros móvil */}
        {filtrosAbiertos && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setFiltrosAbiertos(false)}>
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Filtros</h3>
                <button onClick={() => setFiltrosAbiertos(false)}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {/* Categorías móvil */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h4>
                <div className="space-y-2">
                  {categorias.map((categoria) => (
                    <label key={categoria.id} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="categoria-mobile"
                          value={categoria.id}
                          checked={categoriaSeleccionada === categoria.id}
                          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                          className="text-[#6FAD46] focus:ring-[#6FAD46]"
                        />
                        <span className="ml-2 text-gray-700">{categoria.nombre}</span>
                      </div>
                      {categoria.id !== 'todas' && (
                        <span className="text-gray-400 text-sm">({categoria.count})</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Rango de precios móvil */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Precio</h4>
                <div className="space-y-2">
                  {rangosPrecio.map((rango) => (
                    <label key={rango.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="precio-mobile"
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
            </div>
          </div>
        )}
      </div>
    </StoreLayout>
  );
}
