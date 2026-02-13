import React, { useState } from 'react';
import LayoutStore from '../../layouts/StoreLayout';

export default function ShoppingCart() {
  // Estado del carrito - datos simulados
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Rosa Premium Red",
      category: "Plantas y Césped",
      price: 25.99,
      quantity: 2,
      image: "/api/placeholder/100/100",
      inStock: true,
      description: "Rosa roja premium de alta calidad"
    },
    {
      id: 2,
      name: "Maceta de Cerámica Grande",
      category: "Macetas",
      price: 35.50,
      quantity: 1,
      image: "/api/placeholder/100/100",
      inStock: true,
      description: "Maceta de cerámica decorativa grande"
    },
    {
      id: 3,
      name: "Fertilizante Orgánico 5kg",
      category: "Fertilizantes",
      price: 18.75,
      quantity: 3,
      image: "/api/placeholder/100/100",
      inStock: false,
      description: "Fertilizante orgánico premium"
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Funciones del carrito
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'xica20') {
      setDiscount(20);
    } else if (promoCode.toLowerCase() === 'verde10') {
      setDiscount(10);
    } else {
      alert('Código promocional no válido');
    }
  };

  // Cálculos
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 8.99;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shipping - discountAmount;

  if (cartItems.length === 0) {
    return (
      <LayoutStore>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="mb-8">
              <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 16h16M7 13v4a2 2 0 002 2h6a2 2 0 002-2v-4m-8 2h8"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">¡Agrega algunos productos increíbles a tu carrito!</p>
            <a 
              href="/tienda/productos" 
              className="inline-block bg-[#6FAD46] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#5a9639] transition-colors"
            >
              Continuar Comprando
            </a>
          </div>
        </div>
      </LayoutStore>
    );
  }

  return (
    <LayoutStore>
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi Carrito de Compras</h1>
          <p className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu carrito</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Lista de productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Productos</h2>
              </div>
              
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      
                      {/* Imagen del producto */}
                      <div className="flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                      </div>
                      
                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            
                            {!item.inStock && (
                              <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                                Sin stock
                              </span>
                            )}
                          </div>
                          
                          {/* Precio */}
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-800">
                              ${item.price.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">c/u</p>
                          </div>
                        </div>
                        
                        {/* Controles de cantidad y eliminar */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">Cantidad:</span>
                            <div className="flex items-center border rounded-lg">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                                disabled={!item.inStock}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                </svg>
                              </button>
                              <span className="px-4 py-2 text-center min-w-[3rem]">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                                disabled={!item.inStock}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className="text-lg font-semibold text-gray-800">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Continuar comprando */}
            <div className="mt-6">
              <a 
                href="/tienda/productos" 
                className="inline-flex items-center text-[#6FAD46] hover:text-[#5a9639] font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Continuar Comprando
              </a>
            </div>
          </div>
          
          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border sticky top-24">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Resumen del Pedido</h2>
              </div>
              
              <div className="p-6 space-y-4">
                
                {/* Código promocional */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código Promocional
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Ingresa código"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent outline-none"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ Descuento del {discount}% aplicado
                    </p>
                  )}
                </div>
                
                {/* Cálculos */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento ({discount}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Envío:</span>
                    <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  {shipping === 0 && (
                    <p className="text-sm text-green-600">
                      ✓ Envío gratis en compras superiores a $50
                    </p>
                  )}
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-semibold text-gray-800">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Botones de acción */}
                <div className="space-y-3 pt-6">
                  <a 
                    href="/tienda/checkout"
                    className="w-full bg-[#6FAD46] text-white py-3 rounded-lg font-medium hover:bg-[#5a9639] transition-colors block text-center"
                  >
                    Proceder al Pago
                  </a>
                  
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Guardar para Después
                  </button>
                </div>
                
                {/* Información adicional */}
                <div className="pt-4 border-t">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Envío seguro y confiable
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      30 días de garantía
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Soporte especializado
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutStore>
  );
}
