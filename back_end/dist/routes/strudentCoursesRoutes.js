"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StudentController_1 = require("../controllers/StudentController");
const router = (0, express_1.Router)();
// route specific to user
router.get('/:userId', StudentController_1.getStudentCourses);
module.exports = router;
