"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getPresentialCourses, getOnlineCourses, getCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/CourseController');
const router = (0, express_1.Router)();
router.get('/', getCourses);
router.get('/presential', getPresentialCourses);
router.get('/online', getOnlineCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
module.exports = router; // export router
