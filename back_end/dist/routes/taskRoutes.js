"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TasksController_1 = require("../controllers/TasksController");
const router = (0, express_1.Router)();
router.get('/', TasksController_1.getAllTasks);
router.get('/:id', TasksController_1.getTaskById);
router.get('/user/:userId', TasksController_1.getTasksByUserId);
router.get('/progress/:userId', TasksController_1.getProgressByUserId);
router.post('/', TasksController_1.createTask);
router.put('/:id', TasksController_1.updateTask);
router.delete('/:id', TasksController_1.deleteTask);
module.exports = router; // Exportamos el router
