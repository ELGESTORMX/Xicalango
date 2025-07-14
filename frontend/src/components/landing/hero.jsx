import React from 'react';
import background from '../../../public/images/4.jpg'
export default function hero() {
  return (
    <section className=''>
        <div className="relative flex flex-col px-4 items-center justify-center h-screen bg-cover bg-center bg-no-repeat text-white" 
             style={{ backgroundImage: `url(${background})` }}>
            {/* Capa opaca para mejorar la legibilidad del texto */}
            <div className="absolute inset-0 bg-[#000000] bg-opacity-50"></div>
            
            {/* Contenido del hero */}
            <div className="relative z-10 text-center">
                <h1 className="lg:text-6xl text-4xl font-bold mb-4">Xicalango La Reserva Ecológica</h1>
                <p className="lg:text-xl text-lg mb-8">Transformamos tus espacios con diseños únicos de jardines y paisajismo.</p>
                <a href='#proyectos' className="bg-white text-[#6FAD46] font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300">
                Nuestros trabajos
                </a>
            </div>
        </div>
    </section>
  );
}
