import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../public/images/logo.png';
export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Función para navegar a secciones
    const navigateToSection = (sectionId) => {
        closeMenu();
        
        if (location.pathname === '/') {
            // Si ya estamos en la página principal, solo hacer scroll
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Si estamos en otra página, navegar a inicio y luego hacer scroll
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    const navigateToHome = () => {
        closeMenu();
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 50); // Cambia el fondo después de 50px de scroll
        };

        window.addEventListener('scroll', handleScroll);
        
        // Cleanup del listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled || isMenuOpen ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
            }`}>
                <div className='max-w-7xl mx-auto px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        
                        {/* Logo y nombre */}
                        <div className='flex items-center'>
                            <button onClick={navigateToHome} className='flex items-center space-x-3 cursor-pointer'>
                                <img src={logo} alt="Xicalango Logo" className='h-10 w-10 rounded-full object-cover' />
                                <div>
                                    <span className='text-xl font-bold text-gray-800'>Xicalango</span>
                                    <span className='block text-xs text-[#6FAD46] font-medium'>La Reserva Ecológica</span>
                                </div>
                            </button>
                        </div>

                        {/* Navegación Desktop */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <button onClick={navigateToHome} className="text-gray-700 hover:text-[#6FAD46] font-medium transition-colors duration-300">Inicio</button>
                            <button onClick={() => navigateToSection('aboutUs')} className="text-gray-700 hover:text-[#6FAD46] font-medium transition-colors duration-300">Nosotros</button>
                            <button onClick={() => navigateToSection('servicios')} className="text-gray-700 hover:text-[#6FAD46] font-medium transition-colors duration-300">Servicios</button>
                            <button onClick={() => navigateToSection('contacto')} className="text-gray-700 hover:text-[#6FAD46] font-medium transition-colors duration-300">Contacto</button>
                            <a href="/tienda" className="text-gray-700 hover:text-[#6FAD46] font-medium transition-colors duration-300">Tienda en Línea</a>
                        </div>

                        {/* Acciones de la derecha */}
                        <div className="flex items-center space-x-4">
                            
                            {/* Número telefónico */}
                            <a 
                                href="tel:+529382550290" 
                                className="hidden lg:flex items-center bg-[#6FAD46] text-white px-6 py-2 rounded-full font-medium hover:bg-[#5a9639] transition-colors duration-300 shadow-md hover:shadow-lg"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                938 255 0290
                            </a>

                            {/* Menú hamburguesa móvil */}
                            <button
                                onClick={toggleMenu}
                                className="lg:hidden p-2 text-gray-700 hover:text-[#6FAD46] transition-colors duration-300"
                                aria-label="Abrir menú"
                            >
                                <svg className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Menú móvil */}
            <div className={`lg:hidden bg-white border-t transition-all duration-300 ${
                isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <div className='px-6 py-4 space-y-4'>
                    <button 
                        onClick={navigateToHome}
                        className="block w-full text-left text-gray-700 hover:text-[#6FAD46] font-medium transition-colors py-2"
                    >
                        🏠 Inicio
                    </button>
                    <button 
                        onClick={() => navigateToSection('aboutUs')}
                        className="block w-full text-left text-gray-700 hover:text-[#6FAD46] font-medium transition-colors py-2"
                    >
                        👥 Nosotros
                    </button>
                    <button 
                        onClick={() => navigateToSection('servicios')}
                        className="block w-full text-left text-gray-700 hover:text-[#6FAD46] font-medium transition-colors py-2"
                    >
                        🌿 Servicios
                    </button>
                    <button 
                        onClick={() => navigateToSection('galeriaProyectos')}
                        className="block w-full text-left text-gray-700 hover:text-[#6FAD46] font-medium transition-colors py-2"
                    >
                        📸 Proyectos
                    </button>
                    <button 
                        onClick={() => navigateToSection('contacto')}
                        className="block w-full text-left text-gray-700 hover:text-[#6FAD46] font-medium transition-colors py-2"
                    >
                        📞 Contacto
                    </button>
                    <a 
                        href="/tienda" 
                        onClick={closeMenu}
                        className="block text-gray-700 hover:text-[#6FAD46] font-medium transition-colors py-2"
                    >
                        🛒 Tienda
                    </a>
                    
                    {/* Número telefónico móvil */}
                    <a 
                        href="tel:+529382550290" 
                        onClick={closeMenu}
                        className="block bg-[#6FAD46] text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-[#5a9639] transition-colors"
                    >
                        📞 Llamar: 938 255 0290
                    </a>
                </div>
            </div>
        </>
    );
}
