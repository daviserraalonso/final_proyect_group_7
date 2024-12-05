import { Router } from 'express';
import { assignTaskToStudent, createTask, deleteTask, getAllTasks, getEarningsForProfessor, getPendingTasksByProfessor, getProgressByUserId, getStudentCountByProfessor, getTaskById, getTaskCountsByStatus, getTaskDetailsById, getTasksByUserId, updateTask } from '../controllers/TasksController';

const router = Router();

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.get('/user/:userId', getTasksByUserId);
router.get('/progress/:userId', getProgressByUserId);
router.post('/assign', assignTaskToStudent);

router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/profesor/:professorId/pending-tasks', getPendingTasksByProfessor);


router.get('/details/:taskId', getTaskDetailsById);
router.get('/counts/:professorId', getTaskCountsByStatus);
// Nueva ruta para obtener el conteo de estudiantes por profesor
router.get('/profesor/:professorId/student-count', getStudentCountByProfessor);
router.get('/profesor/:professorId/earnings', getEarningsForProfessor);




module.exports = router; // Exportamos el router