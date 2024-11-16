import { Request, Response } from 'express';
const Subject = require('../models/Subject');
import { Sequelize } from 'sequelize';


export const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await Subject.findAll();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const subject = await Subject.findByPk(id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subject', error });
  }
};

export const createSubject = async (req: Request, res: Response) => {
  const { name, courseId, description, finalGrade } = req.body;

  try {
      const newSubject = await Subject.create({
          name,
          courseId,
          description,
          finalGrade,
      });
      res.status(201).json(newSubject);
  } catch (error) {
      console.error('Error al crear la asignatura:', error);
      res.status(500).json({ message: 'Error al crear la asignatura.', error });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, courseId, description, finalGrade } = req.body;
  try {
    const subject = await Subject.findByPk(id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    await subject.update({ name, courseId, description, finalGrade });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subject', error });
  }
};

export const deleteSubject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const subject = await Subject.findByPk(id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    await subject.destroy();
    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subject', error });
  }
};
