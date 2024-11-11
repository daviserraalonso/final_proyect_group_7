import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const router = Router();

// Define la ruta para el login
router.post('/api/login', LoginController.login);

export default router;
