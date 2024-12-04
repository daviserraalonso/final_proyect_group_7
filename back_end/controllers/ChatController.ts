import { Request, Response } from 'express';
const { Op } = require('sequelize');
import Chat from '../models/Chat';
import Message from '../models/Message';
import User from '../models/User';

class MessagesController {
  
    /**
     * GET MENSSAGES BY USER
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    static async getMessagesByUser(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;

        if (!userId) {
            console.error('userId no está definido');
            res.status(400).json({ message: 'El parámetro userId es obligatorio' });
            return;
          }

        try {
            const messages = await Chat.findAll({
                where: {
                  [Op.or]: [
                    { studentId: userId },
                    { professorId: userId },
                  ],
                },
                include: [
                  {
                    model: Message,
                    as: 'messages',
                    include: [
                      {
                        model: User,
                        as: 'sender',
                        attributes: ['id', 'name'],
                      },
                    ],
                  },
                  {
                    model: User,
                    as: 'professor',
                    attributes: ['id', 'name'],
                  },
                  {
                    model: User,
                    as: 'student',
                    attributes: ['id', 'name'],
                  },
                ],
                order: [['createdAt', 'DESC']],
              });
              

            if (!messages || messages.length === 0) {
                res.status(404).json({ message: 'No se encontraron mensajes.' });
                return;
            }

            res.status(200).json(messages);
        } catch (error) {
            console.error('Error al obtener los mensajes:', error);
            res.status(500).json({ message: 'Error al obtener los mensajes' });
        }
    }


    /**
     * SEND MESSAGE
     *
     * @param req
     * @param res
     * @returns
     */
    static async sendMessage(req: Request, res: Response): Promise<void> {
        const { chatId } = req.params; // CHAT ID
        const { userId, content } = req.body; // SENDER ID AND MESSAGE
    
        if (!chatId || !userId || !content) {
          res.status(400).json({ message: 'Todos los campos (chatId, userId, content) son obligatorios.' });
          return;
        }
    
        try {
          // CHECK IF EXISTS CHAT
          const chat = await Chat.findByPk(chatId);
    
          if (!chat) {
            res.status(404).json({ message: 'El chat no existe.' });
            return;
          }
    
          // CREATE MESSAGE
          const newMessage = await Message.create({
            chatId,
            senderId: userId,
            content,
            timestamp: new Date(),
          });
    
          res.status(201).json({
            message: 'Mensaje enviado exitosamente.',
            data: newMessage,
          });
        } catch (error) {
          console.error('Error al enviar el mensaje:', error);
          res.status(500).json({ message: 'Error al enviar el mensaje' });
        }
    }

    /**
     * FUNCTION TO CREATE NEW CHAT
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    static async createNewChat(req: Request, res: Response): Promise<void> {
        const userId = Number(req.params.userId);
        const { creatorId, content } = req.body;
    
        if (!userId || !creatorId || !content) {
          res.status(400).json({ message: 'Ambos campos (userId y creatorId) son obligatorios.' });
          return;
        }
    
        try {
          // create new chat
          const newChat = await Chat.create({
            studentId: userId,
            professorId: creatorId,
          });

          const initialMessage = await Message.create({
            chatId: newChat.id,
            senderId: creatorId,
            content: content,
            timestamp: new Date(),
          });
    
          res.status(201).json({
            message: 'Chat creado y mensaje enviado exitosamente.',
            chat: newChat,
            initialMessage: initialMessage,
          });

        } catch (error) {
          console.error('Error al crear un nuevo chat:', error);
          res.status(500).json({ message: 'Error al crear un nuevo chat.' });
        }
    }       

}

export default MessagesController;
