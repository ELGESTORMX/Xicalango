import React, { useState } from 'react';
import eventosImg from '../../../../public/images/categorias/eventos2.jpg'
import LandingLayout from '../../../layouts/LandingLayout';
export default function eventos() {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  
  // Galería de fotos de eventos
  const galeriaEventos = [
    {
      id: 1,
      titulo: "Boda en Jardín Privado",
      categoria: "Bodas",
      imagen: "https://www.cocinajosefernandez.com/wp-content/uploads/2024/01/JARDINES-3.png",
      descripcion: "Decoración floral y renta de macetas para ceremonia al aire libre"
    },
    {
      id: 2,
      titulo: "Evento Corporativo",
      categoria: "Empresarial",
      imagen: "https://www.tudecoracionoriginal.es/wp-content/uploads/decoracion-terraza-eventos-de-empresa-02.jpg",
      descripcion: "Ambientación verde para evento de empresa"
    },
    {
      id: 3,
      titulo: "Quinceañera en Terraza",
      categoria: "Celebraciones",
      imagen: "https://images.homify.com/v1444062380/p/photo/image/971902/_MDC6173.jpg",
      descripcion: "Decoración tropical con palmeras y plantas ornamentales"
    },
    {
      id: 4,
      titulo: "Aniversario Familiar",
      categoria: "Familiares",
      imagen: "https://glowfurniturefactory.com/wp-content/uploads/2021/10/LED-luminous-Waterproof-solar-powered-plant-pots.jpg",
      descripcion: "Renta de macetones con flores de temporada"
    },
    {
      id: 5,
      titulo: "Graduación Universitaria",
      categoria: "Graduaciones",
      imagen: "https://www.grupo-montblanc.com.mx/wp-content/uploads/2014/06/mont-blanc-banquetes-graduaciones-1-600x646.jpg",
      descripcion: "Decoración elegante con plantas verdes y flores blancas"
    },
    {
      id: 6,
      titulo: "Baby Shower",
      categoria: "Celebraciones",
      imagen: "https://www.shutterstock.com/image-photo/creative-gender-neutral-baby-shower-600nw-2259944459.jpg",
      descripcion: "Ambiente dulce con flores pasteles y plantas suculentas"
    }
  ];

  const serviciosIncluidos = [
    {
      icono: "🪴",
      titulo: "Renta de Macetas",
      descripcion: "Amplio catálogo de macetas y jardineras de diferentes tamaños y estilos"
    },
    {
      icono: "🌸",
      titulo: "Arreglos Florales",
      descripcion: "Diseños personalizados con flores frescas y de temporada"
    },
    {
      icono: "🌿",
      titulo: "Plantas Ornamentales",
      descripcion: "Selección de plantas verdes y decorativas para cualquier ambiente"
    },
    {
      icono: "🎨",
      titulo: "Diseño Personalizado",
      descripcion: "Asesoría en decoración y diseño acorde al tema de tu evento"
    },
    {
      icono: "🚚",
      titulo: "Entrega y Montaje",
      descripcion: "Servicio completo de entrega, montaje y retiro posterior al evento"
    },
    {
      icono: "💡",
      titulo: "Asesoría Profesional",
      descripcion: "Consultoría especializada para optimizar espacios y presupuesto"
    }
  ];

  return (
    <LandingLayout>
      
      {/* Espaciado para navbar fijo */}
      <div className='pt-16'>
        
        {/* Hero Section */}
        <section className='relative text-white h-[92vh] flex items-center justify-center' style={{ backgroundImage: `url(${eventosImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Overlay oscuro para mejorar legibilidad */}
          <div className='absolute inset-0 bg-black bg-opacity-60'></div>
          
          <div className='relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center'>
            <h1 className='text-5xl lg:text-7xl font-bold mb-6'>
              Eventos Especiales
            </h1>
            <p className='text-2xl lg:text-3xl mb-8 font-light opacity-95 max-w-3xl mx-auto'>
              Decoración con plantas y flores naturales para bodas, quinceañeras, graduaciones y celebraciones especiales
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
                Mira nuestra galería de eventos
              </a>
            </div>
          </div>
        </section>

        {/* Galería Profesional */}
        <section id='galeria' className='py-16 bg-white'>
          <div className='max-w-7xl mx-auto px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
                Galería de Nuestros Eventos
              </h2>
            </div>
            
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {galeriaEventos.map((evento) => (
                <div 
                  key={evento.id} 
                  className='group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer'
                  onClick={() => setImagenSeleccionada(evento)}
                >
                  <div className='aspect-w-4 aspect-h-3'>
                    <img 
                      src={evento.imagen} 
                      alt={evento.titulo}
                      className='w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                      <span className='inline-block bg-[#16A34A] text-white px-3 py-1 rounded-full text-sm font-medium mb-2'>
                        {evento.categoria}
                      </span>
                      <h3 className='text-xl font-bold mb-2'>{evento.titulo}</h3>
                      <p className='text-sm opacity-90'>{evento.descripcion}</p>
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
              ¿Listo para tu Evento Especial?
            </h2>
            <p className='text-xl mb-8 opacity-90'>
              Contáctanos y hagamos realidad la decoración de tus sueños.
            </p>
            
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a 
                href='https://wa.me/529382550290?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20eventos%20especiales.%20¿Podrían%20proporcionarme%20una%20cotización%3F' 
                className='border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#6FAD46] transition-colors duration-300 flex items-center justify-center'
                target="_blank"
                rel="noopener noreferrer"
              >
                Cotiza tu evento con nosotros
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
              <span className='inline-block bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2'>
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
