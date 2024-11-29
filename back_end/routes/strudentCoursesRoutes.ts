import { Router } from 'express';
import { getStudentCourses } from '../controllers/StudentController';

const router = Router();

// route specific to user
router.get('/:userId', getStudentCourses);

module.exports = router;
