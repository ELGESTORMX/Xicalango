import React from 'react';

export default function whyUs() {
  const ventajas = [
    {
      id: 1,
      icono: (
        <svg className='w-8 h-8 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
        </svg>
      ),
      titulo: "35+ Años de Experiencia",
      descripcion: "Desde 1985 especializados en mantenimiento de áreas verdes, diseño y construcción de jardines, y venta de plantas y macetas."
    },
    {
      id: 2,
      icono: (
        <svg className='w-8 h-8 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      ),
      titulo: "Compromiso Ecológico",
      descripcion: "Utilizamos plantas nativas, técnicas sustentables y prácticas respetuosas con el medio ambiente en todos nuestros proyectos."
    },
    {
      id: 3,
      icono: (
        <svg className='w-8 h-8 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      titulo: "Equipo Profesional",
      descripcion: "Contamos con especialistas en paisajismo, botánica y mantenimiento que garantizan resultados excepcionales."
    },
    {
      id: 4,
      icono: (
        <svg className='w-8 h-8 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      titulo: "Servicios Integrales",
      descripcion: "Desde el diseño inicial hasta el mantenimiento continuo, ofrecemos soluciones completas para tu espacio verde."
    },
    {
      id: 5,
      icono: (
        <svg className='w-8 h-8 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      titulo: "Garantía de Calidad",
      descripcion: "Respaldamos nuestro trabajo con garantía y servicio post-instalación para asegurar tu total satisfacción."
    },
    {
      id: 6,
      icono: (
        <svg className='w-8 h-8 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      titulo: "Proyectos Personalizados",
      descripcion: "Cada diseño es único y adaptado a tus necesidades específicas, estilo de vida y características del terreno."
    }
  ];

  return (
    <section id='porque-elegirnos' className='w-full min-h-screen py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        
        {/* Título principal */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-800 mb-4'>
            ¿Por qué elegir Xicalango?
          </h2>
          <div className='w-24 h-1 bg-[#6FAD46] mx-auto mb-6'></div>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Somos la opción líder en paisajismo porque combinamos experiencia, 
            calidad y compromiso ecológico en cada proyecto
          </p>
        </div>

        {/* Grid de ventajas */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {ventajas.map((ventaja) => (
            <div key={ventaja.id} className='group bg-gray-50 rounded-xl p-8 hover:bg-[#6FAD46] transition-all duration-300 hover:shadow-xl hover:-translate-y-2'>
              {/* Icono */}
              <div className='w-16 h-16 bg-[#6FAD46] group-hover:bg-white rounded-full flex items-center justify-center mb-6 transition-colors duration-300'>
                <div className='group-hover:text-[#6FAD46] transition-colors duration-300'>
                  {ventaja.icono}
                </div>
              </div>
              
              {/* Contenido */}
              <h3 className='text-2xl font-bold text-gray-800 group-hover:text-white mb-4 transition-colors duration-300'>
                {ventaja.titulo}
              </h3>
              <p className='text-gray-600 group-hover:text-white leading-relaxed transition-colors duration-300'>
                {ventaja.descripcion}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center mt-16'>
          <h3 className='text-3xl font-bold text-gray-800 mb-4'>
            ¿Listo para transformar tu espacio?
          </h3>
          <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
            Únete a más de 500 clientes satisfechos que han confiado en nuestra experiencia
          </p>
        </div>
      </div>
    </section>
  );
}
