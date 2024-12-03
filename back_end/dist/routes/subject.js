"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getSubjects, getSubjectById, createSubject, updateSubject, deleteSubject } = require('../controllers/SubjectController');
const router = (0, express_1.Router)();
router.get('/', getSubjects);
router.get('/:id', getSubjectById);
router.post('/', createSubject);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject);
module.exports = router; // Exportamos el router
