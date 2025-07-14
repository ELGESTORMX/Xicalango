import React, { useState } from 'react';
import hotelerosImg from '../../../../public/images/categorias/hoteleros.jpg'
import LandingLayout from '../../../layouts/LandingLayout';

export default function hoteleros() {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  
  // Galería de fotos de proyectos hoteleros
  const galeriaHoteleros = [
    {
      id: 1,
      titulo: "Resort de Playa Tropical",
      categoria: "Resorts",
      imagen: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Paisajismo tropical para resort de lujo con palmeras y jardines costeros"
    },
    {
      id: 2,
      titulo: "Hotel Boutique Urbano",
      categoria: "Hoteles",
      imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Diseño de jardines verticales y terrazas verdes para hotel boutique"
    },
    {
      id: 3,
      titulo: "Spa y Wellness Center",
      categoria: "Spa",
      imagen: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Ambiente zen con jardines meditativos y plantas aromáticas"
    },
    {
      id: 4,
      titulo: "Lobby y Recepción Hotelera",
      categoria: "Interiores",
      imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Paisajismo interior con plantas tropicales y jardines verticales"
    },
    {
      id: 5,
      titulo: "Área de Piscina Resort",
      categoria: "Piscinas",
      imagen: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Paisajismo de piscina infinity con vegetación tropical exuberante"
    },
    {
      id: 6,
      titulo: "Restaurante al Aire Libre",
      categoria: "Restaurantes",
      imagen: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Ambientación natural para restaurante hotelero con jardines temáticos"
    }
  ];

  const serviciosIncluidos = [
    {
      icono: "🏨",
      titulo: "Paisajismo de Lobby",
      descripcion: "Diseño de espacios verdes para recepción y áreas comunes del hotel"
    },
    {
      icono: "🌴",
      titulo: "Jardines Tropicales",
      descripcion: "Creación de ambientes tropicales para resorts y hoteles de playa"
    },
    {
      icono: "🏊",
      titulo: "Áreas de Piscina",
      descripcion: "Paisajismo especializado para zonas de piscina y áreas acuáticas"
    },
    {
      icono: "🍽️",
      titulo: "Restaurantes Temáticos",
      descripcion: "Ambientación natural para restaurantes y bares del hotel"
    },
    {
      icono: "🧘",
      titulo: "Espacios de Wellness",
      descripcion: "Jardines meditativos y espacios de relajación para spas"
    },
    {
      icono: "🌺",
      titulo: "Mantenimiento Hotelero",
      descripcion: "Servicio especializado de mantenimiento para el sector turístico"
    }
  ];

  return (
    <LandingLayout>
      {/* Espaciado para navbar fijo */}
      <div className='pt-16'>
        
        {/* Hero Section */}
        <section className='relative text-white h-[92vh] flex items-center justify-center' style={{ backgroundImage: `url(${hotelerosImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Overlay oscuro para mejorar legibilidad */}
          <div className='absolute inset-0 bg-black bg-opacity-60'></div>
          
          <div className='relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center'>
            <h1 className='text-5xl lg:text-7xl font-bold mb-6'>
              Proyectos Hoteleros
            </h1>
            <p className='text-2xl lg:text-3xl mb-8 font-light opacity-95 max-w-3xl mx-auto'>
              Creamos experiencias memorables con paisajismo profesional para hoteles, resorts y complejos turísticos
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
                Ver nuestros proyectos hoteleros
              </a>
            </div>
          </div>
        </section>

        {/* Galería Profesional */}
        <section id='galeria' className='py-16 bg-white'>
          <div className='max-w-7xl mx-auto px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
                Galería de Proyectos Hoteleros
              </h2>
            </div>
            
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {galeriaHoteleros.map((proyecto) => (
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
                      <span className='inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2'>
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
              ¿Listo para tu Proyecto Hotelero?
            </h2>
            <p className='text-xl mb-8 opacity-90'>
              Contáctanos y creemos juntos experiencias únicas para tus huéspedes.
            </p>
            
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a 
                href='https://wa.me/529382550290?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20paisajismo%20hotelero.%20¿Podrían%20proporcionarme%20una%20cotización%3F' 
                className='border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#6FAD46] transition-colors duration-300 flex items-center justify-center'
                target="_blank"
                rel="noopener noreferrer"
              >
                Cotiza tu proyecto hotelero
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
              <span className='inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2'>
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
