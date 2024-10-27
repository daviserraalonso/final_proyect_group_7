"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const UserController_1 = require("../controllers/UserController");
const router = Router();
// use controller in route
router.post('/register', UserController_1.registerUser);
module.exports = router;
