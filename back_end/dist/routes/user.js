"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const UserController_1 = require("../controllers/UserController");
const router = Router();
// use controller in route
router.post('/register', UserController_1.registerUser);
router.get('/confirm/:token', UserController_1.confirmEmail); // route to call function confirm in controller pass token
module.exports = router;
