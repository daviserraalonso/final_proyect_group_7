import Course from '../models/Course';      
import StudentCourse from '../models/StudentCourse';
import User from '../models/User';

export async function getStudentsByProfessor(professorId: number) {
  try {
    const CourseWithStudents = await Course.findAll({
      where: { professor_id: professorId },
      include: [
        {
          model: StudentCourse,
          as: 'enrollments',
          include: [
            {
              model: User,
              as: 'student',
              attributes: ['id', 'name', 'email']
            }
          ]
        }
      ]
    });

    return CourseWithStudents;
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error);
    throw error;
  }
}
