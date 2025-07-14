import React, { useState, useEffect } from 'react';
import whatsapp from '../../public/images/whatsapp.png';
import logo from '../../public/images/logo.png';

export default function ChatbotFlotante() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'faq', 'chat'
  const [messages, setMessages] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Detectar si estamos en la tienda
  const isInStore = window.location.pathname.includes('/tienda');

  // Función para reproducir sonidos
  const playSound = (type) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      if (type === 'open') {
        // Sonido suave de apertura (do-mi-sol)
        playNote(audioContext, 523.25, 0.1, 0.05); // Do
        setTimeout(() => playNote(audioContext, 659.25, 0.1, 0.05), 100); // Mi
        setTimeout(() => playNote(audioContext, 783.99, 0.15, 0.05), 200); // Sol
      } else if (type === 'message') {
        // Sonido de mensaje (notification suave)
        playNote(audioContext, 880, 0.1, 0.03); // La
        setTimeout(() => playNote(audioContext, 1046.5, 0.1, 0.03), 80); // Do octava alta
      }
    } catch (error) {
      // Silenciosamente manejar errores de audio
      console.log('Audio no disponible');
    }
  };

  const playNote = (audioContext, frequency, duration, volume = 0.1) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  // Preguntas frecuentes
  const faqs = [
    {
      id: 1,
      question: "¿Qué servicios ofrecen?",
      answer: "Ofrecemos servicios completos de jardinería:\n\n🌿 SERVICIOS PRINCIPALES:\n• Diseño y mantenimiento de jardines\n• Instalación de sistemas de riego\n• Paisajismo para residencias y hoteles\n• Mantenimiento de áreas verdes\n• Consultoría en jardinería ecológica\n\n🛒 TIENDA EN LÍNEA:\n• Plantas nativas y ornamentales\n• Herramientas de jardinería\n• Fertilizantes y abonos\n• Macetas y contenedores\n• Equipos de riego"
    },
    {
      id: 2,
      question: "¿Hacen envíos a domicilio?",
      answer: "¡Sí! Realizamos envíos en toda la región:\n\n📦 ZONAS DE ENTREGA:\n• Villahermosa y área metropolitana: GRATIS en compras +$500\n• Cárdenas, Comalcalco, Cunduacán: $50 pesos\n• Paraíso, Centla: $80 pesos\n• Otras comunidades: Consultar disponibilidad\n\n⏰ TIEMPOS DE ENTREGA:\n• Zona metropolitana: 24-48 horas\n• Interior del estado: 2-4 días hábiles\n\n📞 ¡Contáctanos para coordinar tu envío!"
    },
    {
      id: 3,
      question: "¿Qué plantas recomiendan para Tabasco?",
      answer: "Tenemos plantas perfectas para nuestro clima tropical:\n\n🌱 PLANTAS NATIVAS RECOMENDADAS:\n• Ceiba, Ramón, Chicozapote\n• Flamboyán, Tulipán africano\n• Palma real, Cocotero\n• Platanillo, Ave del paraíso\n• Crotos y coleos (sombra)\n\n🌿 VENTAJAS:\n• Resistentes al calor y humedad\n• Requieren menos agua\n• Atraen fauna local\n• Bajo mantenimiento\n• Adaptadas a suelos tabasqueños\n\n💡 ¡Visita nuestra tienda para ver toda la variedad!"
    },
    {
      id: 4,
      question: "¿Cuánto cuesta un proyecto de jardinería?",
      answer: "Nuestros precios son muy competitivos:\n\n💰 SERVICIOS:\n• Mantenimiento básico: $800-1,500/mes\n• Diseño jardín pequeño: $3,000-8,000\n• Instalación de riego: $2,500-15,000\n• Proyectos comerciales: Cotización personalizada\n\n🛒 PRODUCTOS (ejemplos):\n• Plantas ornamentales: $25-150\n• Macetas decorativas: $80-500\n• Herramientas básicas: $120-800\n• Fertilizantes: $35-200\n\n✨ PROMOCIONES ACTUALES:\n• Descuentos en compras +$1,000\n• 2x1 en plantas seleccionadas\n• Instalación GRATIS en compras +$3,000\n\n📞 ¡Solicita tu cotización gratuita!"
    }
  ];

  useEffect(() => {
    if (isOpen && showWelcome) {
      const welcomeMessage = {
        id: Date.now(),
        text: isInStore 
          ? "¡Hola! 👋 Soy el asistente virtual de Xicalango Tienda. ¿Te ayudo a encontrar lo que buscas para tu jardín?"
          : "¡Hola! 👋 Soy el asistente virtual de Xicalango. ¿En qué puedo ayudarte con tu proyecto de jardinería?",
        sender: 'bot',
        timestamp: new Date()
      };
      
      const optionsMessage = {
        id: Date.now() + 1,
        text: "Puedes preguntarme sobre:",
        sender: 'bot',
        timestamp: new Date(),
        showOptions: true
      };
      
      setMessages([welcomeMessage, optionsMessage]);
      setShowWelcome(false);
      
      // Reproducir sonido de mensaje de bienvenida
      setTimeout(() => playSound('message'), 300);
      
      // NO hacer scroll al inicio - dejar que se vea el saludo desde arriba
    }
  }, [isOpen, showWelcome, isInStore]);

  const handleFaqClick = (faq) => {
    const userMessage = {
      id: Date.now(),
      text: faq.question,
      sender: 'user',
      timestamp: new Date()
    };
    
    const botResponseId = Date.now() + 1;
    const botResponse = {
      id: botResponseId,
      text: faq.answer,
      sender: 'bot',
      timestamp: new Date()
    };

    const moreHelpMessage = {
      id: Date.now() + 2,
      text: "¿Te ayudo con algo más?",
      sender: 'bot',
      timestamp: new Date(),
      showOptions: true
    };

    setMessages(prev => [...prev, userMessage, botResponse, moreHelpMessage]);
    setCurrentView('chat');
    
    // Reproducir sonido cuando el bot responde
    setTimeout(() => playSound('message'), 500);
    
    // Scroll al comienzo de la respuesta del bot
    setTimeout(() => {
      const botMessageElement = document.querySelector(`[data-message-id="${botResponseId}"]`);
      if (botMessageElement) {
        botMessageElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 600);
  };

  // Auto-scroll solo cuando hay interacción (no en mensajes iniciales)
  useEffect(() => {
    // Solo hacer scroll si hay más de 2 mensajes (después del saludo inicial)
    if (messages.length > 2) {
      setTimeout(() => {
        const container = document.getElementById('messages-container');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 100);
    }
  }, [messages]);

  const handleWhatsApp = () => {
    let message = "¡Hola! Me interesa obtener más información sobre ";
    
    if (isInStore) {
      message += "los productos de la tienda en línea de Xicalango 🛒🌿\n\n";
      message += "Me gustaría saber sobre:\n";
      message += "• Disponibilidad de productos\n";
      message += "• Envíos a mi zona\n";
      message += "• Asesoría para mi proyecto";
    } else {
      message += "los servicios de jardinería de Xicalango 🌿\n\n";
      message += "Me interesa:\n";
      message += "• Cotización para mi proyecto\n";
      message += "• Servicios de mantenimiento\n";
      message += "• Asesoría especializada";
    }
    
    const whatsappUrl = `https://wa.link/gpu01d?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetChat = () => {
    setCurrentView('chat'); // Mantener en modo chat
    setMessages([]);
    setShowWelcome(true);
    
    // Scroll al inicio cuando se resetea
    setTimeout(() => {
      const container = document.getElementById('messages-container');
      if (container) {
        container.scrollTop = 0;
      }
    }, 100);
  };

  const toggleChat = () => {
    const wasOpen = isOpen;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setCurrentView('chat'); // Ir directo al chat
      // Reproducir sonido de apertura
      playSound('open');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col animate-fadeInUp">
          {/* Header */}
          <div className="bg-[#6FAD46] text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Xicalango" className="w-8 h-8 rounded-full" />
              <div>
                <h3 className="font-semibold">Asistente Xicalango</h3>
                <p className="text-xs opacity-90">En línea</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {currentView === 'menu' && (
              <div className="p-4 h-full flex flex-col">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-[#6FAD46] rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-2xl">🌿</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">¿Cómo te puedo ayudar?</h4>
                  <p className="text-sm text-gray-600">Selecciona una opción:</p>
                </div>

                <div className="space-y-2 flex-1">
                  <button 
                    onClick={() => setCurrentView('faq')}
                    className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">❓</span>
                      <span className="font-medium">Preguntas Frecuentes</span>
                    </div>
                  </button>
                  
                  <button 
                    onClick={handleWhatsApp}
                    className="w-full p-3 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">💬</span>
                      <span className="font-medium">Chatear por WhatsApp</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {currentView === 'faq' && (
              <div className="p-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800">Preguntas Frecuentes</h4>
                  <button 
                    onClick={() => setCurrentView('menu')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m0 0h18" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-2">
                  {faqs.map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => handleFaqClick(faq)}
                      className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-800">{faq.question}</p>
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <button 
                    onClick={handleWhatsApp}
                    className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
                  >
                    ¿No encuentras tu respuesta? Chatea con nosotros
                  </button>
                </div>
              </div>
            )}

            {currentView === 'chat' && (
              <div className="h-full flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3" id="messages-container">
                  {messages.map((message) => (
                    <div key={message.id} data-message-id={message.id}>
                      <div
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-[#6FAD46] text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                        </div>
                      </div>
                      
                      {/* Mostrar opciones de preguntas después de mensajes del bot */}
                      {message.sender === 'bot' && message.showOptions && (
                        <div className="mt-3 space-y-2">
                          {faqs.map((faq) => (
                            <button
                              key={faq.id}
                              onClick={() => handleFaqClick(faq)}
                              className="w-full p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors border border-blue-200"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-blue-600">•</span>
                                <span className="text-sm text-blue-800">{faq.question}</span>
                              </div>
                            </button>
                          ))}
                          
                          {/* Opción de WhatsApp */}
                          <button 
                            onClick={handleWhatsApp}
                            className="w-full p-2 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors border border-green-200"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-green-600">💬</span>
                              <span className="text-sm text-green-800">Hablar por WhatsApp</span>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="p-3 border-t bg-gray-50 space-y-2">
                  <button 
                    onClick={resetChat}
                    className="w-full p-2 bg-gray-200 hover:bg-gray-300 rounded text-sm transition-colors"
                  >
                    🔄 Nuevo chat
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Button - Solo visible cuando el chat está cerrado */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="w-14 h-14 bg-[#6FAD46] hover:bg-[#5a9639] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        >
          <div className="relative">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </button>
      )}
    </div>
  );
}
