"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const router = (0, express_1.Router)();
router.get('/:id/courses', UserController_1.getUserSubscribedCourses);
router.get('/:id/details', UserController_1.getUserDetails);
router.put('/:id', UserController_1.modifyUser);
router.delete('/:id', UserController_1.deleteUser);
// general routes
router.get('/teachers', UserController_1.getTeachers);
router.get('/teachers/favorites', UserController_1.getFavoriteTeachers);
router.get('/search', UserController_1.searchTeachers);
router.get('/names', UserController_1.names);
router.get('/cities', UserController_1.cities);
router.get('/:city', UserController_1.cityCords);
// other routes
router.post('/register', UserController_1.registerUser);
router.get('/confirm/:token', UserController_1.confirmEmail);
router.post('/login', LoginController_1.default.login);
router.put('/:userId/validate', UserController_1.validate);
router.get('/', UserController_1.getAllUsers);
module.exports = router;
