"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const UserController_1 = require("../controllers/UserController");
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const router = Router();
// use controller in route
router.post('/register', UserController_1.registerUser);
router.get('/confirm/:token', UserController_1.confirmEmail); // route to call function confirm in controller pass token
router.post('/login', LoginController_1.default.login); // login route
module.exports = router;
