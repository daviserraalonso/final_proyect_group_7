import { Router } from 'express';
import {
    createCourseEvent,
    deleteCourseEvent,
    getAllCourseEvent,
    getCourseEventById,
    updateCourseEvent,
    getCoursesByProfessor, // Importa el controlador
} from '../controllers/CalendarController';

const router = Router();

// Rutas existentes
router.get('/', getAllCourseEvent);
router.get('/:id', getCourseEventById);
router.post('/', createCourseEvent);
router.put('/:id', updateCourseEvent);
router.delete('/:id', deleteCourseEvent);

// Nueva ruta para obtener cursos por profesor
router.get('/course-event/courses-by-professor', getCoursesByProfessor);

module.exports = router;
