# Integración de Pagos - Xicalango Store

## 🚀 APIs Integradas

### 1. Stripe (Tarjetas de Crédito/Débito)
- **Funcionalidad**: Procesamiento seguro de tarjetas
- **Configuración**: Variables de entorno `.env`
- **Componente**: `StripeCardForm` en `Checkout.jsx`

### 2. MercadoPago (Pagos Latinoamérica)
- **Funcionalidad**: Múltiples métodos de pago
- **Configuración**: Variables de entorno `.env`
- **Implementación**: Redirección a checkout de MercadoPago

### 3. Transferencia Bancaria
- **Funcionalidad**: Pago manual con datos bancarios
- **Proceso**: Confirmación manual del pedido

## 📋 Configuración Inicial

### 1. Variables de Entorno
Crear archivo `.env` basado en `.env.example`:

```bash
# Stripe (Obtener en https://dashboard.stripe.com/apikeys)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta

# MercadoPago (Obtener en https://www.mercadopago.com.mx/developers)
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-tu-clave-publica
MERCADOPAGO_ACCESS_TOKEN=TEST-tu-access-token
```

### 2. Dependencias Instaladas
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
npm install mercadopago
```

## 🔧 Backend Requerido

### Endpoints Necesarios:

#### Stripe
- `POST /api/process-stripe-payment`
  - Procesa el pago con Stripe
  - Crea payment intent
  - Guarda orden en base de datos

#### MercadoPago
- `POST /api/create-mercadopago-preference`
  - Crea preferencia de pago
  - Retorna URL de checkout
- `POST /webhook/mercadopago`
  - Recibe notificaciones de estado de pago

#### Órdenes
- `POST /api/create-order`
  - Crea orden en base de datos
  - Envía emails de confirmación

## 🛍️ Flujo de Compra

### 1. Carrito → Checkout
- Usuario hace clic en "Proceder al Pago"
- Redirección a `/tienda/checkout`

### 2. Formulario de Datos
- Información de envío obligatoria
- Selección de método de pago

### 3. Procesamiento según Método

#### Tarjeta (Stripe)
1. Formulario seguro de Stripe Elements
2. Validación en tiempo real
3. Creación de payment method
4. Envío a backend para procesar

#### MercadoPago
1. Envío de datos a backend
2. Creación de preferencia
3. Redirección a checkout de MP
4. Webhook de confirmación

#### Transferencia
1. Mostrar datos bancarios
2. Confirmación inmediata del pedido
3. Estado "pendiente" hasta confirmación manual

### 4. Confirmación
- Página de éxito con detalles
- Email de confirmación
- Actualización de inventario

## 🔒 Seguridad

### Implementado:
- ✅ Stripe Elements (PCI compliant)
- ✅ Variables de entorno para claves
- ✅ Validación de formularios
- ✅ HTTPS requerido en producción

### Recomendaciones:
- 🔐 Implementar rate limiting
- 🔐 Validación server-side
- 🔐 Logs de transacciones
- 🔐 Monitoreo de pagos fallidos

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Formularios adaptables
- ✅ Botones touch-friendly
- ✅ Layout optimizado para checkout móvil

## 🚀 Testing

### Tarjetas de Prueba Stripe:
- **Visa**: 4242424242424242
- **Mastercard**: 5555555555554444
- **Declined**: 4000000000000002

### MercadoPago Test:
- Usar credenciales de prueba
- Sandbox environment habilitado

## 📈 Próximas Mejoras

1. **Context para Carrito**: Estado global con React Context
2. **Inventario en Tiempo Real**: WebSockets para stock
3. **Múltiples Direcciones**: Gestión de direcciones de envío
4. **Historial de Pedidos**: Dashboard del usuario
5. **Notificaciones Push**: Actualizaciones de estado
6. **Analytics**: Seguimiento de conversiones

## 🐛 Troubleshooting

### Errores Comunes:

#### Stripe
- **Error de claves**: Verificar variables de entorno
- **CORS**: Configurar dominios permitidos
- **3D Secure**: Manejar autenticación adicional

#### MercadoPago
- **Webhook no recibido**: Verificar URL pública
- **Sandbox/Production**: Confirmar environment
- **Países soportados**: MX, AR, BR, CO, etc.

## 📞 Soporte

- **Stripe**: https://stripe.com/docs
- **MercadoPago**: https://www.mercadopago.com.mx/developers
- **Documentación**: Ver `backend-example/payment-routes.js`
