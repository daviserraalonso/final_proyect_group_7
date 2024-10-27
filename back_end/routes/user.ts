const { Router } = require('express');
import { registerUser } from '../controllers/UserController';

const router = Router();

// use controller in route
router.post('/register', registerUser);

module.exports = router;