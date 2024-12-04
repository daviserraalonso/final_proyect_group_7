"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const router = (0, express_1.Router)();
// Define la ruta para el login
router.post('/api/login', LoginController_1.default.login);
exports.default = router;
