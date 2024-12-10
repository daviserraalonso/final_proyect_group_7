"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CalendarController_1 = require("../controllers/CalendarController");
const router = (0, express_1.Router)();
// Rutas existentes
router.get('/', CalendarController_1.getAllCourseEvent); // Obtener todos los eventos del curso
router.get('/:id', CalendarController_1.getCourseEventById); // Obtener un evento por ID
// Nueva ruta para obtener cursos por profesor
router.get('/professor/:id', CalendarController_1.getCoursesByProfessor); // Obtener cursos por ID de profesor
router.get('/course/:courseId/subjects', CalendarController_1.getSubjectsByCourse);
router.get('/professor/:id/events', CalendarController_1.getEventsByProfessor);
router.get('/location/:id', CalendarController_1.getCourseLocationByCourseId); // Obtener la ubicación de un curso por ID
router.get('/student/:id/events', CalendarController_1.getEventsByStudentId);
router.put('/:id', CalendarController_1.updateCourseEvent); // Endpoint para actualizar un evento
router.delete('/:id', CalendarController_1.deleteCourseEvent); // Endpoint para eliminar un evento
router.post('/', CalendarController_1.createCourseEvent);
module.exports = router;
