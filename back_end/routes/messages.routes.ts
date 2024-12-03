import { Router } from 'express';
import ChatController from '../controllers/ChatController';

const router = Router();

// ROUTE TO SEND MESSAGE
router.post('/:chatId/message', ChatController.sendMessage);

export default router;
