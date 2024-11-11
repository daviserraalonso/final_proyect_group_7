const { Router } = require('express');
import { registerUser, confirmEmail } from '../controllers/UserController';
import LoginController from '../controllers/LoginController';



const router = Router();

// use controller in route
router.post('/register', registerUser);
router.get('/confirm/:token', confirmEmail); // route to call function confirm in controller pass token
router.post('/login', LoginController.login); // login route



module.exports = router;