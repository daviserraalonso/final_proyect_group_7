"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatController_1 = __importDefault(require("../controllers/ChatController"));
const router = (0, express_1.Router)();
// get chat by user
router.get('/:userId', ChatController_1.default.getMessagesByUser);
router.post('/:chatId/message', ChatController_1.default.sendMessage);
router.post('/:userId/new-chat', ChatController_1.default.createNewChat);
module.exports = router;
