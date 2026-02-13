import React, { useState } from 'react';
import residencialesImg from '../../../../public/images/categorias/residenciales.jpg'
import LandingLayout from '../../../layouts/LandingLayout';

export default function residenciales() {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  
  // Galería de fotos de proyectos residenciales
  const galeriaResidenciales = [
    {
      id: 1,
      titulo: "Jardín Familiar Moderno",
      categoria: "Jardines",
      imagen: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Diseño de jardín contemporáneo con áreas de descanso y juegos para niños"
    },
    {
      id: 2,
      titulo: "Patio Interior Zen",
      categoria: "Patios",
      imagen: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Espacio de meditación con plantas tropicales y fuente de agua"
    },
    {
      id: 3,
      titulo: "Terraza Verde Urbana",
      categoria: "Terrazas",
      imagen: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Transformación de terraza en oasis verde urbano con jardín vertical"
    },
    {
      id: 4,
      titulo: "Jardín de Entrada Elegante",
      categoria: "Fachadas",
      imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Paisajismo de entrada con palmeras y diseño simétrico"
    },
    {
      id: 5,
      titulo: "Área de Barbacoa Familiar",
      categoria: "Recreación",
      imagen: "https://st.depositphotos.com/1037987/4830/i/450/depositphotos_48302323-stock-photo-family-enjoying-outdoor-barbecue.jpg",
      descripcion: "Espacio de convivencia familiar con jardín integrado y área de parrilla"
    },
    {
      id: 6,
      titulo: "Piscina con Jardín Tropical",
      categoria: "Piscinas",
      imagen: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Paisajismo alrededor de piscina con vegetación tropical y iluminación"
    }
  ];

  return (
    <LandingLayout>
      {/* Espaciado para navbar fijo */}
      <div className='pt-16'>
        
        {/* Hero Section */}
        <section className='relative text-white h-[92vh] flex items-center justify-center' style={{ backgroundImage: `url(${residencialesImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Overlay oscuro para mejorar legibilidad */}
          <div className='absolute inset-0 bg-black bg-opacity-60'></div>
          
          <div className='relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center'>
            <h1 className='text-5xl lg:text-7xl font-bold mb-6'>
              Servicios Residenciales
            </h1>
            <p className='text-2xl lg:text-3xl mb-8 font-light opacity-95 max-w-3xl mx-auto'>
              Transformamos tu hogar con jardines familiares y espacios exteriores únicos y acogedores
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a 
                href='#galeria' 
                className='bg-white text-[#6FAD46] px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('galeria').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Ver nuestros proyectos residenciales
              </a>
            </div>
          </div>
        </section>

        {/* Galería Profesional */}
        <section id='galeria' className='py-16 bg-white'>
          <div className='max-w-7xl mx-auto px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
                Galería de Proyectos Residenciales
              </h2>
            </div>
            
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {galeriaResidenciales.map((proyecto) => (
                <div 
                  key={proyecto.id} 
                  className='group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer'
                  onClick={() => setImagenSeleccionada(proyecto)}
                >
                  <div className='aspect-w-4 aspect-h-3'>
                    <img 
                      src={proyecto.imagen} 
                      alt={proyecto.titulo}
                      className='w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                      <span className='inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2'>
                        {proyecto.categoria}
                      </span>
                      <h3 className='text-xl font-bold mb-2'>{proyecto.titulo}</h3>
                      <p className='text-sm opacity-90'>{proyecto.descripcion}</p>
                    </div>
                    
                    {/* Icono de ampliar */}
                    <div className='absolute top-4 right-4'>
                      <div className='w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center'>
                        <svg className='w-5 h-5 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className='py-16 bg-[#6FAD46] text-white'>
          <div className='max-w-4xl mx-auto px-6 lg:px-8 text-center'>
            <h2 className='text-3xl lg:text-4xl font-bold mb-6'>
              ¿Listo para Transformar tu Hogar?
            </h2>
            <p className='text-xl mb-8 opacity-90'>
              Contáctanos y hagamos realidad el jardín de tus sueños.
            </p>
            
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a 
                href='https://wa.me/529382550290?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20paisajismo%20residencial.%20¿Podrían%20proporcionarme%20una%20cotización%3F' 
                className='border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#6FAD46] transition-colors duration-300 flex items-center justify-center'
                target="_blank"
                rel="noopener noreferrer"
              >
                Cotiza tu proyecto residencial
              </a>
            </div>
          </div>
        </section>

      </div>
      
      {/* Modal para imagen ampliada */}
      {imagenSeleccionada && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4'
          onClick={() => setImagenSeleccionada(null)}
        >
          <div className='relative max-w-5xl max-h-full'>
            {/* Botón de cerrar */}
            <button
              onClick={() => setImagenSeleccionada(null)}
              className='absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-300'
            >
              <svg className='w-8 h-8' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            {/* Imagen ampliada */}
            <img
              src={imagenSeleccionada.imagen}
              alt={imagenSeleccionada.titulo}
              className='max-w-full max-h-full object-contain rounded-lg shadow-2xl'
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Información de la imagen */}
            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg'>
              <span className='inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2'>
                {imagenSeleccionada.categoria}
              </span>
              <h3 className='text-2xl font-bold mb-2'>{imagenSeleccionada.titulo}</h3>
              <p className='text-lg opacity-90'>{imagenSeleccionada.descripcion}</p>
            </div>
          </div>
        </div>
      )}
    </LandingLayout>
  );
}
