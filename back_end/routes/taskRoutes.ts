import { Router } from 'express';
import { assignTaskToStudent, createTask, deleteTask, getAllTasks, getProgressByUserId, getTaskById, getTasksByUserId, updateTask } from '../controllers/TasksController';

const router = Router();

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.get('/user/:userId', getTasksByUserId);
router.get('/progress/:userId', getProgressByUserId);
router.post('/assign', assignTaskToStudent);

router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router; // Exportamos el router