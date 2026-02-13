import React, { useState } from 'react';
import LayoutStore from '../../layouts/StoreLayout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Inicializar Stripe (usar variable de entorno)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdef...');

// Componente de formulario de tarjeta con Stripe
const StripeCardForm = ({ onPaymentSuccess, total, formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [cardData, setCardData] = useState({
    cardholderName: '',
    identificacion: '',
    tipoId: 'IFE' // IFE, Pasaporte, etc.
  });

  const handleCardDataChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements || !cardData.cardholderName || !cardData.identificacion) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      // Crear el payment method con datos mexicanos
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: cardData.cardholderName,
          email: formData.email,
          phone: formData.phone,
          address: {
            line1: formData.address,
            city: formData.city,
            postal_code: formData.zipCode,
            country: 'MX',
          },
        },
        metadata: {
          identificacion: cardData.identificacion,
          tipo_identificacion: cardData.tipoId,
        }
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      // Aquí llamarías a tu backend para procesar el pago
      // Simulamos éxito por ahora
      setTimeout(() => {
        setProcessing(false);
        onPaymentSuccess('stripe', paymentMethod.id, {
          ...formData,
          cardholderName: cardData.cardholderName,
          identificacion: cardData.identificacion,
          tipoId: cardData.tipoId
        });
      }, 2000);

    } catch (err) {
      setError('Error procesando el pago');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        
        {/* Datos del titular */}
        <div className="space-y-4 mb-4">
          <h3 className="font-medium text-gray-800">Datos del Titular de la Tarjeta</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo del Titular *
            </label>
            <input
              type="text"
              name="cardholderName"
              value={cardData.cardholderName}
              onChange={handleCardDataChange}
              placeholder="Como aparece en la tarjeta"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Identificación
              </label>
              <select
                name="tipoId"
                value={cardData.tipoId}
                onChange={handleCardDataChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none"
              >
                <option value="IFE">INE/IFE</option>
                <option value="CURP">CURP</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="RFC">RFC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Identificación *
              </label>
              <input
                type="text"
                name="identificacion"
                value={cardData.identificacion}
                onChange={handleCardDataChange}
                placeholder="Número de identificación"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Información de la tarjeta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Información de la Tarjeta *
          </label>
          <div className="p-3 bg-white border border-gray-300 rounded-lg">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
        <p className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          Tu información está protegida con encriptación SSL de 256 bits
        </p>
      </div>
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-[#6FAD46] text-white py-3 rounded-lg font-medium hover:bg-[#5a9639] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {processing ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando pago seguro...
          </>
        ) : (
          `Pagar $${total.toFixed(2)} MXN`
        )}
      </button>
    </form>
  );
};

export default function Checkout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Datos de envío
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  // Datos simulados del carrito (normalmente vendrían de un context o props)
  const cartItems = [
    { id: 1, name: "Rosa Premium Red", price: 25.99, quantity: 2 },
    { id: 2, name: "Maceta de Cerámica Grande", price: 35.50, quantity: 1 },
  ];
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 8.99;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función para manejar MercadoPago
  const handleMercadoPago = async () => {
    setProcessing(true);
    
    try {
      // Aquí llamarías a tu backend para crear la preferencia de MercadoPago
      // const response = await fetch('/api/create-preference', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     items: cartItems.map(item => ({
      //       title: item.name,
      //       unit_price: item.price,
      //       quantity: item.quantity,
      //     })),
      //     payer: {
      //       name: formData.firstName,
      //       surname: formData.lastName,
      //       email: formData.email,
      //       phone: { number: formData.phone }
      //     },
      //     shipments: {
      //       receiver_address: {
      //         street_name: formData.address,
      //         city_name: formData.city,
      //         zip_code: formData.zipCode
      //       }
      //     }
      //   })
      // });
      
      // const { init_point } = await response.json();
      // window.open(init_point, '_blank');
      
      // Por ahora simulamos redirección
      setTimeout(() => {
        setProcessing(false);
        alert('Redirigiendo a MercadoPago...');
        // window.open('https://www.mercadopago.com.mx/', '_blank');
      }, 1000);
      
    } catch (error) {
      setProcessing(false);
      alert('Error al procesar con MercadoPago');
    }
  };

  // Función para generar ticket de transferencia
  const generateTransferTicket = () => {
    const ticketNumber = 'XIC-' + Date.now().toString().slice(-8);
    return {
      ticketNumber,
      date: new Date().toLocaleDateString('es-MX'),
      time: new Date().toLocaleTimeString('es-MX'),
      customer: formData,
      items: cartItems,
      subtotal,
      shipping,
      total
    };
  };

  // Función para manejar transferencia bancaria
  const handleTransfer = () => {
    // Validar que los datos estén completos
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address) {
      alert('Por favor completa todos los datos de envío antes de continuar');
      return;
    }

    setProcessing(true);
    
    // Generar y descargar ticket
    const ticketData = generateTransferTicket();
    
    setTimeout(() => {
      downloadTicket(ticketData);
      setProcessing(false);
      onPaymentSuccess('transfer', ticketData.ticketNumber, formData);
    }, 1000);
  };
  const downloadTicket = (ticketData) => {
    // Crear canvas para generar imagen del ticket
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Configurar canvas
    canvas.width = 600;
    canvas.height = 800;
    
    // Fondo blanco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Título
    ctx.fillStyle = '#6FAD46';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('XICALANGO', canvas.width / 2, 50);
    
    ctx.fillStyle = '#666666';
    ctx.font = '16px Arial';
    ctx.fillText('Ticket de Compra', canvas.width / 2, 75);
    
    // Información del ticket
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Ticket: ${ticketData.ticketNumber}`, 40, 120);
    ctx.fillText(`Fecha: ${ticketData.date} ${ticketData.time}`, 40, 140);
    
    // Datos del cliente
    ctx.font = 'bold 16px Arial';
    ctx.fillText('DATOS DEL CLIENTE:', 40, 180);
    ctx.font = '14px Arial';
    ctx.fillText(`${ticketData.customer.firstName} ${ticketData.customer.lastName}`, 40, 205);
    ctx.fillText(`Email: ${ticketData.customer.email}`, 40, 225);
    ctx.fillText(`Teléfono: ${ticketData.customer.phone}`, 40, 245);
    ctx.fillText(`Dirección: ${ticketData.customer.address}`, 40, 265);
    ctx.fillText(`${ticketData.customer.city}, CP: ${ticketData.customer.zipCode}`, 40, 285);
    
    // Productos
    ctx.font = 'bold 16px Arial';
    ctx.fillText('PRODUCTOS:', 40, 325);
    
    let yPos = 350;
    ticketData.items.forEach((item, index) => {
      ctx.font = '14px Arial';
      ctx.fillText(`${item.quantity}x ${item.name}`, 40, yPos);
      ctx.textAlign = 'right';
      ctx.fillText(`$${(item.price * item.quantity).toFixed(2)}`, 560, yPos);
      ctx.textAlign = 'left';
      yPos += 25;
    });
    
    // Totales
    yPos += 20;
    ctx.font = '14px Arial';
    ctx.fillText(`Subtotal:`, 350, yPos);
    ctx.textAlign = 'right';
    ctx.fillText(`$${ticketData.subtotal.toFixed(2)}`, 560, yPos);
    
    yPos += 20;
    ctx.textAlign = 'left';
    ctx.fillText(`Envío:`, 350, yPos);
    ctx.textAlign = 'right';
    ctx.fillText(`$${ticketData.shipping.toFixed(2)}`, 560, yPos);
    
    yPos += 30;
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`TOTAL:`, 350, yPos);
    ctx.textAlign = 'right';
    ctx.fillText(`$${ticketData.total.toFixed(2)} MXN`, 560, yPos);
    
    // Datos bancarios
    yPos += 60;
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#6FAD46';
    ctx.textAlign = 'center';
    ctx.fillText('DATOS PARA TRANSFERENCIA', canvas.width / 2, yPos);
    
    ctx.fillStyle = '#333333';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    yPos += 30;
    ctx.fillText('Banco: Banco Nacional de México', 40, yPos);
    yPos += 20;
    ctx.fillText('Cuenta: 1234-5678-9012-3456', 40, yPos);
    yPos += 20;
    ctx.fillText('CLABE: 123456789012345678', 40, yPos);
    yPos += 20;
    ctx.fillText('Beneficiario: Xicalango S.A. de C.V.', 40, yPos);
    
    // Instrucciones
    yPos += 40;
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#d97706';
    ctx.textAlign = 'center';
    ctx.fillText('INSTRUCCIONES:', canvas.width / 2, yPos);
    
    ctx.font = '12px Arial';
    ctx.fillStyle = '#333333';
    yPos += 25;
    ctx.fillText('1. Realiza la transferencia por el monto total', canvas.width / 2, yPos);
    yPos += 20;
    ctx.fillText('2. Toma foto de este ticket y del comprobante', canvas.width / 2, yPos);
    yPos += 20;
    ctx.fillText('3. Envía ambas fotos al WhatsApp:', canvas.width / 2, yPos);
    
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#25D366';
    yPos += 30;
    ctx.fillText('+52 999 123 4567', canvas.width / 2, yPos);
    
    // Descargar imagen
    const link = document.createElement('a');
    link.download = `ticket-xicalango-${ticketData.ticketNumber}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  // Función cuando el pago es exitoso
  const onPaymentSuccess = (method, transactionId, customerData = formData) => {
    setPaymentSuccess(true);
    console.log('Pago exitoso:', { method, transactionId, customerData, cartItems, total });
    
    // Aquí enviarías los datos a tu backend para crear la orden
    // fetch('/api/create-order', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     customer: customerData,
    //     items: cartItems,
    //     payment_method: method,
    //     transaction_id: transactionId,
    //     total: total
    //   })
    // });
  };

  // Si el pago fue exitoso, mostrar página de confirmación
  if (paymentSuccess) {
    return (
      <LayoutStore>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="mb-8">
              <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Pedido Confirmado!</h2>
            
            {/* Mensaje específico según método de pago */}
            {processing && (
              <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  📋 Transferencia Bancaria - Instrucciones Importantes
                </h3>
                <div className="text-yellow-700 space-y-2">
                  <p>✅ Tu ticket ha sido generado y descargado automáticamente</p>
                  <p>📱 Ahora envía las siguientes fotos al WhatsApp de Xicalango:</p>
                  <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                    <p className="font-medium">1. Foto del ticket descargado</p>
                    <p className="font-medium">2. Foto del comprobante de transferencia</p>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <a 
                      href="https://wa.me/5219991234567" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.462-.96-4.779-2.705-6.526-1.746-1.746-4.065-2.709-6.526-2.711-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.092-.636z"/>
                      </svg>
                      Enviar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            <p className="text-gray-600 mb-8">
              {processing 
                ? "Tu pedido será procesado una vez que recibamos y verifiquemos tu transferencia."
                : "Gracias por tu compra. Recibirás un email de confirmación en breve."
              }
            </p>
            
            <div className="space-x-4">
              <a 
                href="/tienda" 
                className="inline-block bg-[#6FAD46] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#5a9639] transition-colors"
              >
                Volver a la Tienda
              </a>
              <a 
                href="/" 
                className="inline-block border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Ir al Inicio
              </a>
            </div>
          </div>
        </div>
      </LayoutStore>
    );
  }

  return (
    <LayoutStore>
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Finalizar Compra</h1>
          <div className="flex items-center text-sm text-gray-600">
            <a href="/tienda/carrito" className="hover:text-[#6FAD46]">Carrito</a>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span className="text-[#6FAD46] font-medium">Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Formulario de checkout */}
          <div className="space-y-6">
            
            {/* Información de envío */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Información de Envío</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Métodos de pago */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Método de Pago</h2>
              
              <div className="space-y-3">
                {/* Transferencia Bancaria */}
                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#6FAD46] transition-colors">
                  <input
                    type="radio"
                    id="transfer"
                    name="paymentMethod"
                    value="transfer"
                    checked={selectedPaymentMethod === 'transfer'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="text-[#6FAD46] focus:ring-[#6FAD46]"
                  />
                  <label htmlFor="transfer" className="ml-3 flex items-center cursor-pointer flex-1">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2 6h20v2H2V6zm0 4h20v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8zm4 4h8v2H6v-2z"/>
                      </svg>
                      <div>
                        <p className="font-medium text-gray-800">Transferencia Bancaria</p>
                        <p className="text-sm text-gray-600">Transferencia directa a nuestra cuenta</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* MercadoPago */}
                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#6FAD46] transition-colors">
                  <input
                    type="radio"
                    id="mercadopago"
                    name="paymentMethod"
                    value="mercadopago"
                    checked={selectedPaymentMethod === 'mercadopago'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="text-[#6FAD46] focus:ring-[#6FAD46]"
                  />
                  <label htmlFor="mercadopago" className="ml-3 flex items-center cursor-pointer flex-1">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 rounded mr-3 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">MP</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">MercadoPago</p>
                        <p className="text-sm text-gray-600">Paga con MercadoPago de forma segura</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Tarjeta de Crédito/Débito */}
                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#6FAD46] transition-colors">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={selectedPaymentMethod === 'card'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="text-[#6FAD46] focus:ring-[#6FAD46]"
                  />
                  <label htmlFor="card" className="ml-3 flex items-center cursor-pointer flex-1">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                      </svg>
                      <div>
                        <p className="font-medium text-gray-800">Tarjeta de Crédito/Débito</p>
                        <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Formulario de tarjeta (solo si se selecciona tarjeta) */}
              {selectedPaymentMethod === 'card' && (
                <div className="mt-6">
                  <Elements stripe={stripePromise}>
                    <StripeCardForm 
                      onPaymentSuccess={onPaymentSuccess}
                      total={total}
                      formData={formData}
                    />
                  </Elements>
                </div>
              )}

              {/* Información para transferencia */}
              {selectedPaymentMethod === 'transfer' && (
                <div className="mt-6 p-6 border border-blue-200 rounded-lg bg-blue-50">
                  <h3 className="font-medium text-blue-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Proceso de Transferencia Bancaria
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Datos Bancarios:</h4>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p><strong>Banco:</strong> Banco Nacional de México</p>
                        <p><strong>Cuenta:</strong> 1234-5678-9012-3456</p>
                        <p><strong>CLABE:</strong> 123456789012345678</p>
                        <p><strong>Beneficiario:</strong> Xicalango S.A. de C.V.</p>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Instrucciones:</h4>
                      <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                        <li>Haz clic en "Generar Ticket" para descargar tu comprobante</li>
                        <li>Realiza la transferencia por el monto total: <strong>${total.toFixed(2)} MXN</strong></li>
                        <li>Toma foto del ticket descargado y del comprobante de transferencia</li>
                        <li>Envía ambas fotos al WhatsApp de Xicalango</li>
                        <li>Nuestro personal procesará tu pedido en máximo 24 horas</li>
                      </ol>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <p className="text-green-800 font-medium mb-2">WhatsApp de Xicalango:</p>
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.462-.96-4.779-2.705-6.526-1.746-1.746-4.065-2.709-6.526-2.711-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.092-.636z"/>
                          <path d="M11.893 5.5c-3.531 0-6.4 2.869-6.4 6.4s2.869 6.4 6.4 6.4 6.4-2.869 6.4-6.4-2.869-6.4-6.4-6.4zm0 11.5c-2.817 0-5.1-2.283-5.1-5.1s2.283-5.1 5.1-5.1 5.1 2.283 5.1 5.1-2.283 5.1-5.1 5.1z"/>
                        </svg>
                        <a 
                          href="https://wa.me/5219991234567" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-600 font-bold text-lg hover:text-green-700"
                        >
                          +52 999 123 4567
                        </a>
                      </div>
                      <p className="text-xs text-green-600 mt-1">Haz clic para abrir WhatsApp</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border sticky top-24">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Resumen del Pedido</h2>
              </div>
              
              <div className="p-6">
                {/* Productos */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Totales */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-3">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Botón de comprar */}
                {selectedPaymentMethod !== 'card' && (
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        if (selectedPaymentMethod === 'mercadopago') {
                          handleMercadoPago();
                        } else if (selectedPaymentMethod === 'transfer') {
                          handleTransfer();
                        }
                      }}
                      disabled={!selectedPaymentMethod || processing}
                      className="w-full bg-[#6FAD46] text-white py-3 rounded-lg font-medium hover:bg-[#5a9639] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {processing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generando ticket...
                        </>
                      ) : (
                        selectedPaymentMethod === 'transfer' ? (
                          <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Generar Ticket de Compra
                          </>
                        ) :
                        selectedPaymentMethod === 'mercadopago' ? 'Pagar con MercadoPago' :
                        'Selecciona un método de pago'
                      )}
                    </button>
                  </div>
                )}
                
                {/* Seguridad */}
                <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  Pago 100% seguro y encriptado
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutStore>
  );
}
