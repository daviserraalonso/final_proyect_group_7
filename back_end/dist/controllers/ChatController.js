"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Op } = require('sequelize');
const Chat_1 = __importDefault(require("../models/Chat"));
const Message_1 = __importDefault(require("../models/Message"));
const user_1 = __importDefault(require("../models/user"));
class MessagesController {
    /**
     * GET MENSSAGES BY USER
     *
     * @param req
     * @param res
     * @returns
     */
    static async getMessagesByUser(req, res) {
        const { userId } = req.params;
        if (!userId) {
            console.error('userId no está definido');
            res.status(400).json({ message: 'El parámetro userId es obligatorio' });
            return;
        }
        try {
            const messages = await Chat_1.default.findAll({
                where: {
                    [Op.or]: [
                        { studentId: userId },
                        { professorId: userId },
                    ],
                },
                include: [
                    {
                        model: Message_1.default,
                        as: 'messages',
                        include: [
                            {
                                model: user_1.default,
                                as: 'sender',
                                attributes: ['id', 'name'],
                            },
                        ],
                    },
                    {
                        model: user_1.default,
                        as: 'professor',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: user_1.default,
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
        }
        catch (error) {
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
    static async sendMessage(req, res) {
        const { chatId } = req.params; // CHAT ID
        const { userId, content } = req.body; // SENDER ID AND MESSAGE
        if (!chatId || !userId || !content) {
            res.status(400).json({ message: 'Todos los campos (chatId, userId, content) son obligatorios.' });
            return;
        }
        try {
            // CHECK IF EXISTS CHAT
            const chat = await Chat_1.default.findByPk(chatId);
            if (!chat) {
                res.status(404).json({ message: 'El chat no existe.' });
                return;
            }
            // CREATE MESSAGE
            const newMessage = await Message_1.default.create({
                chatId,
                senderId: userId,
                content,
                timestamp: new Date(),
            });
            res.status(201).json({
                message: 'Mensaje enviado exitosamente.',
                data: newMessage,
            });
        }
        catch (error) {
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
    static async createNewChat(req, res) {
        const userId = Number(req.params.userId);
        const { creatorId, content } = req.body;
        if (!userId || !creatorId || !content) {
            res.status(400).json({ message: 'Ambos campos (userId y creatorId) son obligatorios.' });
            return;
        }
        try {
            // create new chat
            const newChat = await Chat_1.default.create({
                studentId: userId,
                professorId: creatorId,
            });
            const initialMessage = await Message_1.default.create({
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
        }
        catch (error) {
            console.error('Error al crear un nuevo chat:', error);
            res.status(500).json({ message: 'Error al crear un nuevo chat.' });
        }
    }
}
exports.default = MessagesController;
