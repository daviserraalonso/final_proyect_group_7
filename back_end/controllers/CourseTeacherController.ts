import { Request, Response } from 'express';
import { getStudentsByProfessor } from '../services/CourseTeacherService';

export const getStudentsByteacher = async (req: Request, res: Response) => {
  const { professorId } = req.params;

  try {
    const CourseWithStudents = await getStudentsByProfessor(Number(professorId));
    res.status(200).json(CourseWithStudents); 
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los estudiantes', error });
  }
};