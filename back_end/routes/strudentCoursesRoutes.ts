import { Router } from 'express';
import { getStudentCourses, inscription } from '../controllers/StudentController';

const router = Router();

// route specific to user
router.get('/:userId', getStudentCourses);
router.post('/inscription', inscription)

module.exports = router;
