import { Request, Response } from 'express';
import StudentCourse from '../models/StudentCourse';
import Course from '../models/Course';
import Category from '../models/Category';
import User from '../models/User';

export const getStudentCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    // get user if rom url
    const userId = parseInt(req.params.userId, 10);

    if (!userId) {
      res.status(400).json({ message: 'El ID del estudiante es obligatorio.' });
      return;
    }

    // get courser to student
    const courses = await StudentCourse.findAll({
      where: { studentId: userId },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'name'],
          include: [
            {
              model: Category,
              as: 'category',
              attributes: ['category_name'],
            },
            {
              model: User, // Model user to teacher
              as: 'professor',
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    const formattedCourses = courses.map((sc: any) => {
      const scPlain = sc.get({ plain: true });
      return {
        id: scPlain.id,
        studentId: scPlain.studentId,
        courseId: scPlain.courseId,
        courseName: scPlain.course?.name || 'No disponible',
        category: scPlain.course?.category?.category_name || 'No disponible',
        professor: scPlain.course?.professor?.name || 'No disponible',
        enrollmentDate: scPlain.enrollmentDate,
        createdAt: scPlain.createdAt,
        updatedAt: scPlain.updatedAt,
      };
    });

    res.status(200).json(formattedCourses);
  } catch (error) {
    console.error('Error al obtener los cursos del estudiante:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
