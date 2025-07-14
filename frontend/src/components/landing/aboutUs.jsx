import React from 'react';
import imagen from '../../../public/images/3.jpg'
export default function aboutUs() {
  return (
    <section id='aboutUs' className='w-full min-h-screen py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        
        {/* Título principal */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-800 mb-4'>
            Sobre Nosotros
          </h2>
          <div className='w-24 h-1 bg-[#6FAD46] mx-auto mb-6'></div>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Desde 1985 somos expertos en renovar cualquier espacio y transformarlos en ecosistemas únicos
          </p>
        </div>

        {/* Contenido principal */}
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          
          {/* Lado izquierdo - Imagen */}
          <div className='relative'>
            <div className='aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-xl'>
              <img 
                src={imagen}
                alt="Equipo Xicalango trabajando en jardín" 
                className='w-full h-96 object-cover rounded-lg'
              />
            </div>
            {/* Decoración */}
            <div className='absolute -top-4 -left-4 w-24 h-24 bg-[#6FAD46] rounded-full opacity-20'></div>
            <div className='absolute -bottom-4 -right-4 w-16 h-16 bg-[#6FAD46] rounded-full opacity-30'></div>
          </div>

          {/* Lado derecho - Contenido */}
          <div className='space-y-6'>
            <h3 className='text-3xl font-bold text-gray-800'>
              Xicalango La Reserva Ecológica
            </h3>
            
            <p className='text-lg text-gray-600 leading-relaxed'>
              Somos una empresa especializada en mantenimiento y conservación de áreas verdes, diseño y construcción de jardines a nivel paisajismo con más de 
              <span className='font-semibold text-[#6FAD46]'> 35 años de experiencia </span> 
              transformando espacios residenciales, comerciales y hoteleros desde 1985.
            </p>
            
            <p className='text-lg text-gray-600 leading-relaxed'>
              Ofrecemos servicios completos que incluyen poda de árboles, limpieza de maleza, adecuación de terrenos, 
              venta de plantas, macetas y césped. Nos especializamos en proyectos residenciales, hoteleros, comerciales y eventos especiales, 
              instalación y mantenimiento continuo. Hemos trabajado con hoteles, edificios comerciales 
              y residencias, siempre respetando el equilibrio ecológico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
