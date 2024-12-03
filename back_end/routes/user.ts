import { Router } from 'express';
import {
  registerUser,
  confirmEmail,
  searchTeachers,
  names,
  cities,
  cityCords,
  getAllUsers,
  modifyUser,
  deleteUser,
  getUserDetails,
  getTeachers,
  getUserSubscribedCourses,
  getFavoriteTeachers, // Importa la nueva función
  validate
} from '../controllers/UserController';

import LoginController from '../controllers/LoginController';

const router = Router();

router.get('/:id/courses', getUserSubscribedCourses);
router.get('/:id/details', getUserDetails);
router.put('/:id', modifyUser);
router.delete('/:id', deleteUser);

// general routes
router.get('/teachers', getTeachers);
router.get('/teachers/favorites', getFavoriteTeachers);
router.get('/search', searchTeachers);
router.get('/names', names);
router.get('/cities', cities);
router.get('/:city', cityCords);

// other routes
router.post('/register', registerUser);
router.get('/confirm/:token', confirmEmail);
router.post('/login', LoginController.login);
router.put('/:userId/validate', validate)
router.get('/', getAllUsers);

module.exports = router;
