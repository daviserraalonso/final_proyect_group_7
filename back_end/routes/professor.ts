import express from 'express';
import { getStudentsByProfessor } from '../controllers/ProfessorController';

const router = express.Router();

router.get('/:professorId/students', getStudentsByProfessor);

module.exports = router;
