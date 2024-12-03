import { Request, Response } from 'express';
import sequelize from '../config/database';
import { QueryTypes } from 'sequelize';
import Course from '../models/Course';
import User from '../models/user';
import StudentCourse from '../models/StudentCourse';

export const getStudentsByProfessor = async (req: Request, res: Response): Promise<Response> => {
  const { professorId } = req.params;

  try {
    // Consulta SQL para obtener los alumnos y sus cursos
    const query = `
      SELECT 
        u.id AS student_id,         -- ID del estudiante
        u.name AS student_name,     -- Nombre del estudiante
        u.email AS student_email,   -- Correo electrónico del estudiante
        c.id AS course_id,          -- ID del curso
        c.name AS course_name       -- Nombre del curso
      FROM 
        course AS c
      JOIN 
        student_course AS sc ON c.id = sc.courseId
      JOIN 
        user AS u ON sc.studentId = u.id
      WHERE 
        c.professor_id = :professorId
      ORDER BY 
        c.id, u.id;
    `;

    // Ejecución de la consulta SQL
    const students = await sequelize.query(query, {
      replacements: { professorId }, // Sustituye el :professorId en la consulta
      type: QueryTypes.SELECT,       // Indica que queremos un resultado SELECT
    });

    // Agregar la URL de la imagen generada dinámicamente
    const studentsWithImages = (students as any[]).map((student) => ({
      ...student,
      student_image: `https://robohash.org/${encodeURIComponent(student.student_name)}?set=set4`,
    }));

    // Enviar la respuesta JSON
    return res.status(200).json(studentsWithImages);
  } catch (error) {
    console.error('Error al obtener los estudiantes del profesor:', error);
    return res.status(500).json({
      message: 'Error al obtener los estudiantes del profesor',
      error,
    });
  }
};