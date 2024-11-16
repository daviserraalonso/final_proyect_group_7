import { Router, Request, Response } from 'express';

const { 
  getSubjects, 
  getSubjectById, 
  createSubject, 
  updateSubject, 
  deleteSubject 
} = require('../controllers/SubjectController');

const router = Router();


router.get('/', getSubjects);
router.get('/:id', getSubjectById);
router.post('/', createSubject);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject);

module.exports = router; // Exportamos el router

