import express from 'express';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

// Ruta pública para registro
router.post('/register', userController.register);

// Rutas protegidas (requieren autenticación)
router.get('/', authController.verifyToken, userController.getUsers);
router.get('/:id', authController.verifyToken, userController.getUserById);

export default router;
