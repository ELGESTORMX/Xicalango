import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

const app = express();

// Middlewares
app.use(cors());

// Middleware básico para JSON con manejo de errores
app.use(express.json());

// Middleware global de manejo de errores JSON
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    console.error('❌ JSON Syntax Error:', error.message);
    console.error('� Error en posición:', error.message.match(/position (\d+)/)?.[1] || 'desconocida');
    
    return res.status(400).json({ 
      success: false,
      message: 'JSON malformado en la petición',
      error: error.message,
      tips: [
        'Usa comillas dobles (") para las propiedades y valores de string',
        'Asegúrate de que todas las propiedades tengan comas entre ellas',
        'Verifica que no sobren comas al final',
        'Ejemplo válido: {"name":"Juan","email":"juan@email.com"}'
      ]
    });
  }
  next(error);
});

// Rutas
app.get('/', (req, res) => {
  res.send('¡API Xicalango funcionando!');
});

// Auth routes
app.use('/api/auth', authRoutes);

// User routes
app.use('/api/users', userRoutes);

export default app;
