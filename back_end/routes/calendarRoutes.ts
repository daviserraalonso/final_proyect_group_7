import { Router } from 'express';
import { getAllCourseEvent } from '../controllers/CalendarController';
const router = Router();


// Rutas del calendario
router.get('/', getAllCourseEvent); // Obtener todos los eventos


module.exports = router;
