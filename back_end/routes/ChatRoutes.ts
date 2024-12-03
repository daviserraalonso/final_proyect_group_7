import { Router } from 'express';
import ChatController from '../controllers/ChatController';

const router = Router();

// get chat by user
router.get('/:userId', ChatController.getMessagesByUser);
router.post('/:chatId/message', ChatController.sendMessage);
router.post('/:userId/new-chat', ChatController.createNewChat);



module.exports = router;
