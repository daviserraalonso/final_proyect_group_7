"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TasksController_1 = require("../controllers/TasksController");
const router = (0, express_1.Router)();
router.get('/', TasksController_1.getAllTasks);
router.get('/:id', TasksController_1.getTaskById);
router.get('/user/:userId', TasksController_1.getTasksByUserId);
router.get('/progress/:userId', TasksController_1.getProgressByUserId);
router.post('/assign', TasksController_1.assignTaskToStudent);
router.post('/', TasksController_1.createTask);
router.put('/:id', TasksController_1.updateTask);
router.delete('/:id', TasksController_1.deleteTask);
router.get('/profesor/:professorId/pending-tasks', TasksController_1.getPendingTasksByProfessor);
router.get('/details/:taskId', TasksController_1.getTaskDetailsById);
router.get('/counts/:professorId', TasksController_1.getTaskCountsByStatus);
// Nueva ruta para obtener el conteo de estudiantes por profesor
router.get('/profesor/:professorId/student-count', TasksController_1.getStudentCountByProfessor);
router.get('/profesor/:professorId/earnings', TasksController_1.getEarningsForProfessor);
module.exports = router; // Exportamos el router
