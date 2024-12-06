import { Router } from 'express';
import {
    getAllCourseEvent,
    getCourseEventById,
    getCoursesByProfessor, // Controlador para cursos por profesor
} from '../controllers/CalendarController';

const router = Router();

// Rutas existentes
router.get('/', getAllCourseEvent); // Obtener todos los eventos del curso
router.get('/:id', getCourseEventById); // Obtener un evento por ID

// Nueva ruta para obtener cursos por profesor
router.get('/professor/:id/courses', getCoursesByProfessor); // Obtener cursos por ID de profesor

module.exports = router;
