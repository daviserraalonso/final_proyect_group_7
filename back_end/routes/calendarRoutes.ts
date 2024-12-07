import { Router } from 'express';
import {
    getAllCourseEvent,
    getCourseEventById,
    getCoursesByProfessor,
    getSubjectsByCourse,
    getEventsByProfessor,
    getCourseLocationById
} from '../controllers/CalendarController';
import ModalityController from '../controllers/ModalityController';

const router = Router();

// Rutas existentes
router.get('/', getAllCourseEvent); // Obtener todos los eventos del curso
router.get('/:id', getCourseEventById); // Obtener un evento por ID

// Nueva ruta para obtener cursos por profesor
router.get('/professor/:id', getCoursesByProfessor); // Obtener cursos por ID de profesor
router.get('/course/:courseId/subjects', getSubjectsByCourse);
router.get('/professor/:id/events', getEventsByProfessor);
router.get('/location/:id', getCourseLocationById); // Obtener la ubicación de un curso por ID


module.exports = router;
