"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CalendarController_1 = require("../controllers/CalendarController");
const router = (0, express_1.Router)();
// Rutas del calendario
router.get('/', CalendarController_1.getAllCourseEvent); // Obtener todos los eventos
module.exports = router;
