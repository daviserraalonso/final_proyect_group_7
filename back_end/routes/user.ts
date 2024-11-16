import { Router, Request, Response } from 'express';
import { registerUser, confirmEmail } from '../controllers/UserController';
import LoginController from '../controllers/LoginController';
import { getAllUsers } from '../controllers/UserController';
import { modifyUser } from '../controllers/UserController';
import { deleteUser } from '../controllers/UserController';
import { getUserDetails } from '../controllers/UserController';



const router = Router();
const userPrefix = '/api/users';

// use controller in route
router.post('/register', registerUser);
router.get('/confirm/:token', confirmEmail); // route to call function confirm in controller pass token
router.post('/login', LoginController.login); // login route

// route to get all users in platform
router.get('/', getAllUsers);
// show user
router.get('/:id/details', getUserDetails);

router.put('/:id', modifyUser); // route to modify_user
// delete user
router.delete('/:id', deleteUser);




module.exports = router;