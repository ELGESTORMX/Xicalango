import React from 'react';
import StoreLayout from '../../layouts/StoreLayout';
import Carrousel from '../../components/store/carrousel';

export default function Homepage() {
  
  // Productos destacados de ejemplo
  const productosDestacados = [
    {
      id: 1,
      nombre: "Plantas Ornamentales",
      precio: 25.99,
      precioAnterior: 35.99,
      imagen: "/images/logo.png",
      categoria: "Plantas y Césped",
      descuento: 28,
      rating: 4.5,
      vendidos: 127
    },
    {
      id: 2,
      nombre: "Macetas de Barro",
      precio: 89.99,
      imagen: "/images/logo.png",
      categoria: "Macetas",
      rating: 4.8,
      vendidos: 203
    },
    {
      id: 3,
      nombre: "Fertilizante Orgánico",
      precio: 45.99,
      precioAnterior: 55.99,
      imagen: "/images/logo.png",
      categoria: "Fertilizantes",
      descuento: 18,
      rating: 4.7,
      vendidos: 89
    },
    {
      id: 4,
      nombre: "Kit Herramientas Jardinería",
      precio: 134.99,
      imagen: "/images/logo.png",
      categoria: "Herramientas de Jardinería",
      rating: 4.6,
      vendidos: 156
    }
  ];

  // Categorías principales
  const categorias = [
    { nombre: "Plantas y Césped", icono: "🌱", productos: 312 },
    { nombre: "Macetas", icono: "🏺", productos: 156 },
    { nombre: "Herramientas de Jardinería", icono: "🔧", productos: 89 },
    { nombre: "Fertilizantes", icono: "🌿", productos: 45 }
  ];

  return (
    <StoreLayout>
      {/* Carrousel */}
      <Carrousel/>

      {/* Categorías */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
              Explora Nuestras Categorías
            </h2>
            <p className='text-xl text-gray-600'>
              Tenemos lo que necesitas para tu proyecto
            </p>
          </div>
          
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {categorias.map((categoria, index) => (
              <div key={index} className='bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer group'>
                <div className='text-4xl mb-4 group-hover:scale-110 transition-transform duration-300'>
                  {categoria.icono}
                </div>
                <h3 className='font-bold text-gray-800 mb-2'>{categoria.nombre}</h3>
                <p className='text-sm text-gray-600'>{categoria.productos} productos</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
              Lo más vendido
            </h2>
            <p className='text-xl text-gray-600'>
              Los favoritos de nuestros clientes
            </p>
          </div>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {productosDestacados.map((producto) => (
              <div key={producto.id} className='bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group'>
                {/* Imagen del producto */}
                <div className='relative overflow-hidden h-48'>
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                  
                  {/* Etiquetas */}
                  <div className='absolute top-4 left-4'>
                    <span className='bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium'>
                      {producto.categoria}
                    </span>
                  </div>
                  
                  {producto.descuento && (
                    <div className='absolute top-4 right-4'>
                      <span className='bg-red-500 text-white px-2 py-1 rounded text-xs font-bold'>
                        -{producto.descuento}%
                      </span>
                    </div>
                  )}
                  
                  {/* Botones de acción */}
                  <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
                    <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2'>
                      <button className='bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors'>
                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      </button>
                      <button className='bg-[#6FAD46] text-white p-2 rounded-full hover:bg-[#5a9639] transition-colors'>
                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 16h16M7 13v4a2 2 0 002 2h6a2 2 0 002-2v-4m-8 2h8"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Información del producto */}
                <div className='p-6'>
                  <h3 className='font-bold text-gray-800 mb-2 text-lg'>
                    {producto.nombre}
                  </h3>
                  
                  {/* Rating y ventas */}
                  <div className='flex items-center mb-3'>
                    <div className='flex text-yellow-400 mr-2'>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(producto.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className='text-sm text-gray-600'>({producto.vendidos} vendidos)</span>
                  </div>
                  
                  {/* Precio */}
                  <div className='flex items-center justify-between'>
                    <div>
                      <span className='text-2xl font-bold text-[#6FAD46]'>
                        ${producto.precio}
                      </span>
                      {producto.precioAnterior && (
                        <span className='text-gray-500 line-through ml-2'>
                          ${producto.precioAnterior}
                        </span>
                      )}
                    </div>
                    <button className='bg-[#6FAD46] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5a9639] transition-colors'>
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Ver más productos */}
          <div className='text-center mt-12'>
            <button className='bg-[#6FAD46] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#5a9639] transition-colors shadow-lg hover:shadow-xl'>
              Explora todo nuestro catálogo
            </button>
          </div>
        </div>
      </section>
    </StoreLayout>
  );
}
