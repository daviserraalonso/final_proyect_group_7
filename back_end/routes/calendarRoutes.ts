import { Router } from 'express';
import {
    getAllCourseEvent,
    getCourseEventById,
    getCoursesByProfessor,
    getSubjectsByCourse,
    getEventsByProfessor,
    getCourseLocationByCourseId,
    getEventsByStudentId
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
router.get('/location/:id', getCourseLocationByCourseId); // Obtener la ubicación de un curso por ID
router.get('/student/:id/events', getEventsByStudentId);


module.exports = router;
