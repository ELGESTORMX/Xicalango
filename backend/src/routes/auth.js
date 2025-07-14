import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/login', authController.login);
router.post('/refresh', authController.verifyToken, authController.refreshToken);

export default router;
