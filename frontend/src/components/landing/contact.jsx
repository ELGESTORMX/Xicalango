import React, { useState } from 'react';

export default function contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoProyecto: '',
    mensaje: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se puede agregar la lógica para enviar el formulario
    console.log('Datos del formulario:', formData);
    alert('¡Gracias por contactarnos! Te responderemos pronto.');
    // Resetear formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      tipoProyecto: '',
      mensaje: ''
    });
  };

  return (
    <section id='contacto' className='w-full min-h-screen py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        
        {/* Título principal */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-800 mb-4'>
            Contáctanos
          </h2>
          <div className='w-24 h-1 bg-[#6FAD46] mx-auto mb-6'></div>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Consúltanos y descubre cómo podemos hacer realidad tus ideas
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-12'>
          
          {/* Formulario de contacto */}
          <div className='bg-white rounded-2xl p-8 shadow-xl'>
            <h3 className='text-2xl font-bold text-gray-800 mb-6'>
              Solicita tu cotización
            </h3>
            
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Nombre */}
              <div>
                <label htmlFor='nombre' className='block text-sm font-medium text-gray-700 mb-2'>
                  Nombre completo *
                </label>
                <input
                  type='text'
                  id='nombre'
                  name='nombre'
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none transition-all duration-300'
                  placeholder='Tu nombre completo'
                />
              </div>

              {/* Email y Teléfono */}
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                    Email *
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none transition-all duration-300'
                    placeholder='tu@email.com'
                  />
                </div>
                <div>
                  <label htmlFor='telefono' className='block text-sm font-medium text-gray-700 mb-2'>
                    Teléfono
                  </label>
                  <input
                    type='tel'
                    id='telefono'
                    name='telefono'
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none transition-all duration-300'
                    placeholder='(123) 456-7890'
                  />
                </div>
              </div>

              {/* Tipo de proyecto */}
              <div>
                <label htmlFor='tipoProyecto' className='block text-sm font-medium text-gray-700 mb-2'>
                  Tipo de proyecto *
                </label>
                <select
                  id='tipoProyecto'
                  name='tipoProyecto'
                  value={formData.tipoProyecto}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none transition-all duration-300'
                >
                  <option value=''>Selecciona el tipo de proyecto</option>
                  <option value='residencial'>Jardín Residencial</option>
                  <option value='comercial'>Proyecto Comercial</option>
                  <option value='hotelero'>Paisajismo Hotelero</option>
                  <option value='mantenimiento'>Servicio de Mantenimiento</option>
                  <option value='consultoria'>Consultoría Ecológica</option>
                  <option value='otro'>Otro</option>
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor='mensaje' className='block text-sm font-medium text-gray-700 mb-2'>
                  Cuéntanos sobre tu proyecto *
                </label>
                <textarea
                  id='mensaje'
                  name='mensaje'
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none transition-all duration-300 resize-vertical'
                  placeholder='Describe tu espacio, ideas, presupuesto aproximado y cualquier detalle que consideres importante...'
                />
              </div>

              {/* Botón de envío */}
              <button
                type='submit'
                className='w-full bg-[#6FAD46] text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-[#5a9639] transition-colors duration-300 shadow-lg hover:shadow-xl'
              >
                Enviar Solicitud
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className='space-y-8'>
            
            {/* Información principal */}
            <div className='bg-white rounded-2xl p-8 shadow-xl'>
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>
                Información de Contacto
              </h3>
              
              <div className='space-y-6'>
                {/* Teléfono */}
                <div className='flex items-start'>
                  <div className='w-12 h-12 bg-[#6FAD46] rounded-full flex items-center justify-center mr-4 flex-shrink-0'>
                    <svg className='w-6 h-6 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-bold text-gray-800 mb-1'>Teléfono</h4>
                    <p className='text-gray-600'>
                      <a href="tel:+529382550290" className='hover:text-[#6FAD46] transition-colors'>
                        938 255 0290
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className='flex items-start'>
                  <div className='w-12 h-12 bg-[#6FAD46] rounded-full flex items-center justify-center mr-4 flex-shrink-0'>
                    <svg className='w-6 h-6 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-bold text-gray-800 mb-1'>Email</h4>
                    <p className='text-gray-600'>
                      <a href="mailto:info@xicalango.com" className='hover:text-[#6FAD46] transition-colors'>
                        info@xicalango.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Horarios */}
                <div className='flex items-start'>
                  <div className='w-12 h-12 bg-[#6FAD46] rounded-full flex items-center justify-center mr-4 flex-shrink-0'>
                    <svg className='w-6 h-6 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-bold text-gray-800 mb-1'>Horarios de Atención</h4>
                    <p className='text-gray-600'>
                      Lun-Vie: 8AM-6PM<br />
                      Sáb: 9AM-3PM<br />
                      Dom: Cerrado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className='bg-[#6FAD46] rounded-2xl p-8 text-white'>
              <h3 className='text-2xl font-bold mb-6'>Síguenos</h3>
              <p className='mb-6 opacity-90'>
                Mantente al día con nuestros últimos proyectos y consejos de jardinería
              </p>
              
              <div className='flex space-x-4'>
                <a href="#" className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300'>
                  <svg className='w-6 h-6' fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300'>
                  <svg className='w-6 h-6' fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Mensaje motivacional */}
            <div className='bg-white rounded-2xl p-8 shadow-xl text-center'>
              <div className='text-4xl mb-4'>🌱</div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>
                ¡Contáctanos y has realidad tu proyecto!
              </h3>
              <p className='text-gray-600'>
                Visitamos para darte la mejor propuesta personalizada
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
