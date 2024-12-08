import { Request, Response } from 'express';
import CourseEvent from '../models/CourseEvent';
import Subject from '../models/Subject';
import Course from '../models/Course';
import CourseLocation from '../models/CourseLocation';
import StudentCourse from '../models/StudentCourse';

export const getAllCourseEvent = async (req: Request, res: Response) => {
    try {
        const events = await CourseEvent.findAll({
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'name'],
                },
                {
                    model: Subject,
                    as: 'subject',
                    attributes: ['id', 'name'],
                },
                {
                    model: CourseLocation,
                    as: 'location',
                    attributes: ['address', 'onlineLink'], // Incluye los campos necesarios
                },
            ],
        });
        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ message: 'Error al obtener los eventos' });
    }
};
export const getCourseLocationByCourseId = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        console.log('Obteniendo ubicación para CourseID:', courseId); // Log para depurar

        if (!courseId) {
            return res.status(400).json({ message: 'El ID del curso es obligatorio' });
        }

        const location = await CourseLocation.findOne({
            where: { courseId: Number(courseId) },
        });

        if (!location) {
            return res.status(200).json({ address: null, onlineLink: null });
        }

        console.log('Ubicación encontrada:', location);
        res.status(200).json(location);
    } catch (error) {
        console.error('Error al obtener la ubicación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getEventsByStudentId = async (req: Request, res: Response) => {
    const { id: studentId } = req.params;

    if (!studentId) {
        return res.status(400).json({ message: 'ID del estudiante no proporcionado' });
    }

    try {
        // Buscar los cursos en los que está inscrito el estudiante
        const studentCourses = await StudentCourse.findAll({
            where: { studentId },
            attributes: ['courseId'],
            raw: true, // Asegura que los datos devueltos sean planos
        });

        console.log('Raw StudentCourses:', studentCourses);

        if (!studentCourses || !studentCourses.length) {
            return res.status(404).json({ message: 'El estudiante no está inscrito en ningún curso' });
        }

        const courseIds = studentCourses.map((sc) => sc.courseId);

        console.log('Extracted Course IDs:', courseIds);

        if (!courseIds || !courseIds.length) {
            return res.status(404).json({ message: 'El estudiante no está inscrito en cursos válidos' });
        }

        // Buscar eventos relacionados con esos cursos
        const events = await CourseEvent.findAll({
            where: {
                courseId: courseIds, // Filtrar eventos por los cursos del estudiante
            },
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'name'],
                },
                {
                    model: Subject,
                    as: 'subject',
                    attributes: ['id', 'name'],
                },
            ],
        });

        console.log('Events for student:', events);

        if (!events || !events.length) {
            return res.status(404).json({ message: 'No se encontraron eventos para este estudiante' });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener los eventos del estudiante:', error);
        res.status(500).json({ message: 'Error interno del servidor', error });
    }
};



export const getCoursesByProfessor = async (req, res) => {
    console.log('Parámetros recibidos:', req.params); // Agrega este log para depuración

    try {
        const { id: professorId } = req.params; // Extrae el parámetro id
        if (!professorId) {
            return res.status(400).json({ message: 'No se proporcionó el ID del profesor' });
        }

        const courses = await Course.findAll({
            where: { professor_id: Number(professorId) },
            attributes: ['id', 'name'],
        });

        if (!courses.length) {
            return res.status(404).json({ message: 'No se encontraron cursos para este profesor' });
        }

        res.status(200).json(courses);
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).json({ message: 'Error al obtener los cursos' });
    }
};

export const getSubjectsByCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.status(400).json({ message: 'El ID del curso es obligatorio' });
        }

        const subjects = await Subject.findAll({
            where: { courseId: Number(courseId) },
        });

        if (!subjects.length) {
            return res.status(404).json({ message: 'No se encontraron asignaturas para este curso' });
        }

        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error al obtener las asignaturas:', error);
        res.status(500).json({ message: 'Error al obtener las asignaturas' });
    }
};




export const getEventsByProfessor = async (req: Request, res: Response) => {
    const { id: professorId } = req.params;
    if (!professorId) {
        return res.status(400).json({ message: 'ID del profesor no proporcionado' });
    }

    try {
        const events = await CourseEvent.findAll({
            where: { professorId },
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'name'],
                },
                {
                    model: Subject,
                    as: 'subject',
                    attributes: ['id', 'name'],
                },
            ],
        });

        if (!events.length) {
            return res.status(404).json({ message: 'No se encontraron eventos para este profesor' });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ message: 'Error al obtener los eventos', error });
    }
};




export const getCourseEventById = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const event = await CourseEvent.findByPk(eventId, {
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'name'],
                },
                {
                    model: Subject,
                    as: 'subject',
                    attributes: ['id', 'name'],
                },
            ],
        });

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error al obtener el evento:', error);
        res.status(500).json({ message: 'Error al obtener el evento', error });
    }
};
