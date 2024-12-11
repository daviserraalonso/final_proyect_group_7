"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatController_1 = __importDefault(require("../controllers/ChatController"));
const router = (0, express_1.Router)();
// ROUTE TO SEND MESSAGE
router.post('/:chatId/message', ChatController_1.default.sendMessage);
exports.default = router;
