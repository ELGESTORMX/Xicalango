import React from 'react';
import logo from '../../public/images/logo.png';

export default function footer() {
  return (
    <footer className='bg-gray-900 text-white'>
      
      {/* Sección principal del footer */}
      <div className='max-w-7xl mx-auto px-6 lg:px-8 py-12'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          
          {/* Columna 1 - Información de la empresa */}
          <div className='lg:col-span-2'>
            <div className='flex items-center mb-4'>
              <img src={logo} alt="Xicalango Logo" className='h-12 w-12 rounded-full mr-3' />
              <div>
                <h3 className='text-xl font-bold'>Xicalango</h3>
                <p className='text-gray-400 text-sm'>La Reserva Ecológica</p>
              </div>
            </div>
            
            <p className='text-gray-300 mb-6 max-w-md'>
              Especialistas en paisajismo y jardinería desde 1985. Transformamos espacios exteriores en verdaderos oasis naturales con diseño profesional y sostenible.
            </p>

            {/* Redes sociales */}
            <div className='flex space-x-4 mt-5'>
              <a href="#" className='w-10 h-10 bg-[#6FAD46] rounded-full flex items-center justify-center hover:bg-[#5a9639] transition-colors duration-300'>
                <svg className='w-5 h-5' fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className='w-10 h-10 bg-[#6FAD46] rounded-full flex items-center justify-center hover:bg-[#5a9639] transition-colors duration-300'>
                <svg className='w-5 h-5' fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2 - Navegación rápida */}
          <div>
            <h4 className='text-lg font-bold mb-4'>Navegación</h4>
            <ul className='space-y-3'>
              <li>
                <a href="#" className='text-gray-300 hover:text-[#6FAD46] transition-colors duration-300'>
                  Inicio
                </a>
              </li>
              <li>
                <a href="#aboutUs" className='text-gray-300 hover:text-[#6FAD46] transition-colors duration-300'>
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#servicios" className='text-gray-300 hover:text-[#6FAD46] transition-colors duration-300'>
                  Servicios
                </a>
              </li>
              <li>
                <a href="#proyectos" className='text-gray-300 hover:text-[#6FAD46] transition-colors duration-300'>
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#contacto" className='text-gray-300 hover:text-[#6FAD46] transition-colors duration-300'>
                  Contacto
                </a>
              </li>
              <li>
                <a href="/tienda" className='text-gray-300 hover:text-[#6FAD46] transition-colors duration-300'>
                  Tienda
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Mapa de ubicación */}
          <div>
            <h4 className='text-lg font-bold mb-4'>Nuestra Ubicación</h4>
            <div className='bg-gray-800 rounded-lg overflow-hidden'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9822087924544!2d-99.13315868469238!3d19.04337078710988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0059e39edf27%3A0x3b2dca89bbef6e0f!2sViveros%20de%20Coyoac%C3%A1n%2C%20Coyoac%C3%A1n%2C%2004100%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20Mexico!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Xicalango"
                className='grayscale hover:grayscale-0 transition-all duration-300'
              ></iframe>
            </div>
            <div className='mt-3 text-gray-300 text-sm'>
              <p className='font-medium'>Dirección:</p>
              <p>Viveros de Coyoacán</p>
              <p>Coyoacán, CDMX 04100</p>
              <p>México</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de contacto rápido */}
      <div className='bg-white py-8'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='grid md:grid-cols-3 gap-6 text-center'>
            
            {/* Teléfono */}
            <div className='flex items-center justify-center md:justify-start text-gray-800'>
              <svg className='w-6 h-6 mr-3 text-[#6FAD46]' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <div className='text-left'>
                <p className='font-medium text-gray-800'>Llámanos</p>
                <p className='text-sm text-gray-600'>938 255 0290</p>
              </div>
            </div>

            {/* Email */}
            <div className='flex items-center justify-center md:justify-start text-gray-800'>
              <svg className='w-6 h-6 mr-3 text-[#6FAD46]' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <div className='text-left'>
                <p className='font-medium text-gray-800'>Escríbenos</p>
                <p className='text-sm text-gray-600'>info@xicalango.com</p>
              </div>
            </div>

            {/* Horarios */}
            <div className='flex items-center justify-center md:justify-start text-gray-800'>
              <svg className='w-6 h-6 mr-3 text-[#6FAD46]' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div className='text-left'>
                <p className='font-medium text-gray-800'>Horarios</p>
                <p className='text-sm text-gray-600'>Lun-Vie: 8AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className='bg-gray-900 border-t border-gray-800 py-6'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row justify-between items-center text-center md:text-left'>
            <div className='text-gray-400 mb-4 md:mb-0'>
              <p>© 2025 Xicalango La Reserva Ecológica. Todos los derechos reservados.</p>
            </div>
            
            <div className='flex space-x-6 text-sm'>
              <a href="#" className='text-gray-400 hover:text-[#6FAD46] transition-colors duration-300'>
                Política de Privacidad
              </a>
              <a href="#" className='text-gray-400 hover:text-[#6FAD46] transition-colors duration-300'>
                Términos de Servicio
              </a>
              <a href="#" className='text-gray-400 hover:text-[#6FAD46] transition-colors duration-300'>
                Aviso Legal
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
