"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const UserController_2 = require("../controllers/UserController");
const UserController_3 = require("../controllers/UserController");
const UserController_4 = require("../controllers/UserController");
const UserController_5 = require("../controllers/UserController");
const router = (0, express_1.Router)();
const userPrefix = '/api/users';
// use controller in route
router.post('/register', UserController_1.registerUser);
router.get('/confirm/:token', UserController_1.confirmEmail); // route to call function confirm in controller pass token
router.post('/login', LoginController_1.default.login); // login route
// route to get all users in platform
router.get('/', UserController_2.getAllUsers);
// show user
router.get('/:id/details', UserController_5.getUserDetails);
router.put('/:id', UserController_3.modifyUser); // route to modify_user
// delete user
router.delete('/:id', UserController_4.deleteUser);
module.exports = router;
