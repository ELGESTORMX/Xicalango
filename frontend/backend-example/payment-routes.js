// API Routes para procesar pagos
// Este archivo es solo un ejemplo de cómo estructurar tu backend

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mercadopago = require('mercadopago');

// Configurar MercadoPago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

const router = express.Router();

// Ruta para procesar pagos con Stripe
router.post('/api/process-stripe-payment', async (req, res) => {
  try {
    const { payment_method_id, amount, currency, customer_data } = req.body;

    // Crear el payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // en centavos
      currency: currency || 'mxn',
      payment_method: payment_method_id,
      confirmation_method: 'manual',
      confirm: true,
      return_url: 'https://tu-dominio.com/return',
    });

    // Guardar la orden en tu base de datos
    const order = await saveOrder({
      customer: customer_data,
      payment_method: 'stripe',
      payment_intent_id: paymentIntent.id,
      amount: amount / 100,
      status: paymentIntent.status === 'succeeded' ? 'completed' : 'pending'
    });

    res.json({
      success: true,
      payment_intent: paymentIntent,
      order_id: order.id
    });

  } catch (error) {
    console.error('Error procesando pago Stripe:', error);
    res.status(400).json({ error: error.message });
  }
});

// Ruta para crear preferencia de MercadoPago
router.post('/api/create-mercadopago-preference', async (req, res) => {
  try {
    const { items, payer, shipments } = req.body;

    const preference = {
      items: items.map(item => ({
        title: item.title,
        unit_price: item.unit_price,
        quantity: item.quantity,
      })),
      payer: payer,
      shipments: shipments,
      back_urls: {
        success: 'https://tu-dominio.com/success',
        failure: 'https://tu-dominio.com/failure',
        pending: 'https://tu-dominio.com/pending'
      },
      auto_return: 'approved',
      notification_url: 'https://tu-dominio.com/webhook/mercadopago'
    };

    const response = await mercadopago.preferences.create(preference);

    res.json({
      id: response.body.id,
      init_point: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point
    });

  } catch (error) {
    console.error('Error creando preferencia MercadoPago:', error);
    res.status(400).json({ error: error.message });
  }
});

// Webhook para recibir notificaciones de MercadoPago
router.post('/webhook/mercadopago', async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const payment = await mercadopago.payment.findById(data.id);
      
      // Actualizar el estado de la orden en tu base de datos
      await updateOrderStatus(payment.body.external_reference, {
        status: payment.body.status,
        payment_id: payment.body.id
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error en webhook MercadoPago:', error);
    res.status(400).json({ error: error.message });
  }
});

// Funciones auxiliares (implementar según tu base de datos)
async function saveOrder(orderData) {
  // Implementar guardado en base de datos
  console.log('Guardando orden:', orderData);
  return { id: 'order_' + Date.now() };
}

async function updateOrderStatus(orderId, statusData) {
  // Implementar actualización de estado
  console.log('Actualizando orden:', orderId, statusData);
}

module.exports = router;
