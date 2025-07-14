import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authUtils from '../../utils/auth';
import logo from '../../../public/XICA-LOGO.png';
export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
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

    const handleLogin = () => {
        closeMenu();
        navigate('/login');
    };

    const handleLogout = () => {
        authUtils.logout();
        setUser(null);
        setShowUserMenu(false);
        closeMenu();
        navigate('/');
    };

    // Verificar autenticación al cargar el componente
    useEffect(() => {
        const checkAuth = () => {
            const isAuth = authUtils.isAuthenticated();
            const userData = authUtils.getUserData();
            const token = authUtils.getToken();
            
            // Debug - eliminar después de probar
            console.log('🔍 Navbar checkAuth:', {
                isAuthenticated: isAuth,
                userData,
                token: token ? 'Token presente' : 'No token'
            });
            
            if (isAuth && userData) {
                setUser(userData);
            } else {
                setUser(null);
            }
        };
        
        // Verificar al cargar
        checkAuth();

        // Escuchar cambios en localStorage
        const handleStorageChange = (e) => {
            if (e.key === 'user_data' || e.key === 'auth_token') {
                checkAuth();
            }
        };

        // Escuchar eventos customizados para cambios de auth
        const handleAuthChange = () => {
            checkAuth();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('authChanged', handleAuthChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authChanged', handleAuthChange);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 50); // Cambia el fondo después de 50px de scroll
        };

        const handleClickOutside = (event) => {
            if (showUserMenu && !event.target.closest('.user-menu-container')) {
                setShowUserMenu(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);
        
        // Cleanup del listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showUserMenu]);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled || isMenuOpen ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
            }`}>
                <div className='max-w-7xl mx-auto px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-28'>
                        
                        {/* Logo y nombre */}
                        <div className='flex items-center'>
                            <button onClick={navigateToHome} className='flex items-center cursor-pointer'>
                                <img src={logo} alt="Xicalango Logo" className='h-24 w-auto object-contain shadow-sm hover:shadow-md transition-shadow duration-300' />
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
                            
                            {/* Botón de autenticación / Usuario */}
                            {user ? (
                                // Usuario logueado - Mostrar dropdown
                                <div className="relative user-menu-container">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="hidden lg:flex items-center bg-[#111827] text-white px-4 py-2 rounded-full font-medium hover:bg-[#232f46] transition-colors duration-300 shadow-md hover:shadow-lg"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {user.name}
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    {/* Dropdown del usuario */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    navigate('/admin');
                                                    setShowUserMenu(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Panel Administrativo
                                            </button>
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Usuario no logueado - Mostrar botón de login
                                <button
                                    onClick={handleLogin}
                                    className="hidden lg:flex items-center bg-gray-700 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 shadow-md hover:shadow-lg"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Iniciar Sesión
                                </button>
                            )}
                            
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

                    {/* Autenticación móvil */}
                    {user ? (
                        // Usuario logueado - Opciones móvil
                        <>
                            <div className="border-t pt-4">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-8 h-8 bg-[#6FAD46] rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        navigate('/admin');
                                        closeMenu();
                                    }}
                                    className="block w-full text-left text-gray-700 hover:text-[#6FAD46] font-medium transition-colors py-2"
                                >
                                    ⚙️ Panel Admin
                                </button>
                                <button 
                                    onClick={handleLogout}
                                    className="block w-full text-left text-red-600 hover:text-red-700 font-medium transition-colors py-2"
                                >
                                    🚪 Cerrar Sesión
                                </button>
                            </div>
                        </>
                    ) : (
                        // Usuario no logueado - Botón login móvil
                        <button 
                            onClick={handleLogin}
                            className="block w-full bg-gray-700 text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-gray-800 transition-colors"
                        >
                            🔑 Iniciar Sesión
                        </button>
                    )}
                    
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
