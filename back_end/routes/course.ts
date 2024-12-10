import { Router, Request, Response } from 'express';

const {
  getPresentialCourses,
  getOnlineCourses,
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getTotalCourses
} = require('../controllers/CourseController');

const router = Router();

router.get('/', getCourses);
router.get('/presential', getPresentialCourses);
router.get('/online', getOnlineCourses);
router.get('/total', getTotalCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router; // export router
