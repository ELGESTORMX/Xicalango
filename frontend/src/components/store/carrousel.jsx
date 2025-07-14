import React, { useState, useEffect } from 'react';
import macetas from '../../../public/images/carrouselStore/macetas.jpeg';
export default function Carrousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides del carrusel con productos/categorías destacados
  const slides = [
    {
      id: 1,
      titulo: "Plantas Ornamentales",
      subtitulo: "Decora tu hogar o negocio con plantas naturales",
      descripcion: "Amplia variedad de plantas para interior y exterior",
      imagen: "https://images.prismic.io/begreen/1b9b87fd-a62d-445e-88f6-c7de2875da24_que_necesitan_plantas_para_vivir.jpg?auto=compress,format&rect=0,0,1500,500&w=1500&h=500",
      boton: "Ver Plantas",
      color: "from-green-600 to-green-800"
    },
    {
      id: 2,
      titulo: "Macetas Profesionales",
      subtitulo: "Dale el hogar perfecto a tus plantas, decorando tu espacio",
      descripcion: "Macetas de barro, cerámica y más",
      imagen: `https://imagenes.elpais.com/resizer/v2/2N6NNAJ2JBGBDC2KPGZLDIREKE.jpg?auth=4a51fdb0bf032f5ee1dc0939fda41f5acfa094b12c45b113e84697e3957330f9&width=1960&height=1103&smart=true`,
      boton: "Ver Macetas",
      color: "from-orange-600 to-orange-800"
    },
    {
      id: 3,
      titulo: "Césped Natural",
      subtitulo: "Transforma tu jardín",
      descripcion: "Césped de la más alta calidad para tu hogar",
      imagen: "https://serviciosresidenciales.mx/wp-content/uploads/2021/06/cesped-natural-vs-cesped-artificial-5-1024x677.jpg",
      boton: "Ver Césped",
      color: "from-emerald-600 to-emerald-800"
    },
    {
      id: 4,
      titulo: "Herramientas de Jardiería",
      subtitulo: "Equipamiento profesional",
      descripcion: "Todo lo que necesitas para el cuidado de tus plantas",
      imagen: "https://www.hola.com/horizon/landscape/4f45fa31e34f-herramientas-jardin-t.jpg",
      boton: "Ver Herramientas",
      color: "from-blue-600 to-blue-800"
    }
  ];

  // Auto-avance del carrusel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
            style={{
              backgroundImage: `url(${slide.imagen})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay gradiente */}
            <div className={`absolute inset-0 bg-black opacity-40`}></div>
            
            {/* Contenido del slide */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="max-w-2xl text-white">
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    {slide.titulo}
                  </h1>
                  <h2 className="text-2xl lg:text-3xl font-light mb-6 ">
                    {slide.subtitulo}
                  </h2>
                  <p className="text-xl mb-8">
                    {slide.descripcion}
                  </p>
                  <button className="bg-white text-gray-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    {slide.boton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles del carrusel */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
        {/* Botón anterior */}
        <button
          onClick={prevSlide}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        {/* Botón siguiente */}
        <button
          onClick={nextSlide}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      {/* Indicadores de puntos */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Información de progreso */}
      <div className="absolute top-6 right-6 bg-black bg-opacity-30 text-white px-4 py-2 rounded-full backdrop-blur-sm z-20">
        <span className="text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </section>
  );
}
