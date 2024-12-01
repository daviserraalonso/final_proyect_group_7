import { Request, Response } from 'express';
import { getStudentsByProfessor } from '../services/CourseTeacherService';

export const getStudentsByteacher = async (req: Request, res: Response) => {
  const { professorId } = req.params;  // Obtener el ID del profesor desde la URL

  try {
    const CourseWithStudents = await getStudentsByProfessor(Number(professorId));
    res.status(200).json(CourseWithStudents); // Enviar la respuesta en formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los estudiantes', error });
  }
};