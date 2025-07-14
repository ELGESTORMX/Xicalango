import React, { useState } from 'react';
import jardineriaImg from '../../../../public/images/categorias/jardineria.jpg'
import LandingLayout from '../../../layouts/LandingLayout';

export default function jardineria() {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  
  // Galería de fotos de jardinería
  const galeriaJardineria = [
    {
      id: 1,
      titulo: "Mantenimiento Residencial",
      categoria: "Residencial",
      imagen: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Cuidado integral de jardines familiares con poda, riego y fertilización"
    },
    {
      id: 2,
      titulo: "Poda Especializada",
      categoria: "Poda",
      imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Poda técnica de árboles y arbustos para mantener salud y forma"
    },
    {
      id: 3,
      titulo: "Sistemas de Riego",
      categoria: "Riego",
      imagen: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Instalación y mantenimiento de sistemas de riego automatizado"
    },
    {
      id: 4,
      titulo: "Cuidado de Césped",
      categoria: "Césped",
      imagen: "https://images.unsplash.com/photo-1563090120-eec6cf59ea14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Mantenimiento profesional de césped con corte y tratamientos"
    },
    {
      id: 5,
      titulo: "Control de Plagas",
      categoria: "Tratamientos",
      imagen: "https://images.unsplash.com/photo-1519906041020-ba0b623b4545?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Control ecológico de plagas y enfermedades en plantas"
    },
    {
      id: 6,
      titulo: "Jardín Comercial",
      categoria: "Comercial",
      imagen: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      descripcion: "Mantenimiento especializado para espacios comerciales"
    }
  ];

  const serviciosIncluidos = [
    {
      icono: "✂️",
      titulo: "Poda de Árboles",
      descripcion: "Poda técnica profesional de árboles y arbustos ornamentales"
    },
    {
      icono: "🧹",
      titulo: "Limpieza de Maleza",
      descripcion: "Limpieza y adecuación de terrenos, eliminación de maleza"
    },
    {
      icono: "🌿",
      titulo: "Mantenimiento de Áreas Verdes",
      descripcion: "Conservación y mantenimiento profesional de jardines y espacios verdes"
    },
    {
      icono: "🌱",
      titulo: "Fertilización y Nutrición",
      descripcion: "Programas de fertilización para mantener plantas saludables"
    },
    {
      icono: "🛡️",
      titulo: "Control de Plagas",
      descripcion: "Tratamientos ecológicos contra plagas y enfermedades"
    },
    {
      icono: "🌿",
      titulo: "Mantenimiento de Césped",
      descripcion: "Corte, aireación y tratamientos para césped saludable"
    },
    {
      icono: "📅",
      titulo: "Planes de Mantenimiento",
      descripcion: "Programas mensuales, trimestrales o anuales personalizados"
    }
  ];

  return (
    <LandingLayout >
      {/* Espaciado para navbar fijo */}
      <div className='pt-16'>
        
        {/* Hero Section */}
        <section className='relative text-white h-[92vh] flex items-center justify-center' style={{ backgroundImage: `url(${jardineriaImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Overlay oscuro para mejorar legibilidad */}
          <div className='absolute inset-0 bg-black bg-opacity-60'></div>
          
          <div className='relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center'>
            <h1 className='text-5xl lg:text-7xl font-bold mb-6'>
              Servicios de Jardinería
            </h1>
            <p className='text-2xl lg:text-3xl mb-8 font-light opacity-95 max-w-3xl mx-auto'>
              Mantenimiento y conservación de áreas verdes, poda de árboles y limpieza de maleza con servicio profesional
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
                Ver nuestros servicios de jardinería
              </a>
            </div>
          </div>
        </section>

        {/* Galería Profesional */}
        <section id='galeria' className='py-16 bg-white'>
          <div className='max-w-7xl mx-auto px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
                Galería de Nuestros Servicios de Jardinería
              </h2>
            </div>
            
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {galeriaJardineria.map((jardin) => (
                <div 
                  key={jardin.id} 
                  className='group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer'
                  onClick={() => setImagenSeleccionada(jardin)}
                >
                  <div className='aspect-w-4 aspect-h-3'>
                    <img 
                      src={jardin.imagen} 
                      alt={jardin.titulo}
                      className='w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                      <span className='inline-block bg-[#16A34A] text-white px-3 py-1 rounded-full text-sm font-medium mb-2'>
                        {jardin.categoria}
                      </span>
                      <h3 className='text-xl font-bold mb-2'>{jardin.titulo}</h3>
                      <p className='text-sm opacity-90'>{jardin.descripcion}</p>
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
              ¿Tu Jardín Necesita Cuidado Profesional?
            </h2>
            <p className='text-xl mb-8 opacity-90'>
              Contáctanos para una evaluación gratuita y mantén tu jardín siempre perfecto.
            </p>
            
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a 
                href='https://wa.me/529382550290?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20mantenimiento%20de%20jardines.%20¿Podrían%20proporcionarme%20una%20cotización%3F' 
                className='border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#6FAD46] transition-colors duration-300 flex items-center justify-center'
                target="_blank"
                rel="noopener noreferrer"
              >
                Cotiza tu mantenimiento de jardín
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
