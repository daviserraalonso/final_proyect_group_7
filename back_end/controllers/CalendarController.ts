import { Request, Response } from 'express';
import CourseEvent from '../models/CourseEvent';
import Subject from '../models/Subject';
import Course from '../models/Course';


export const getAllCourseEvent = async (req: Request, res: Response) => {
    console.log('Obteniendo datos del calendario');
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
            ],
        });
        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ message: 'Error al obtener los eventos' });
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
        const { courseId } = req.params; // Extrae el parámetro courseId
        if (!courseId) {
            return res.status(400).json({ message: 'No se proporcionó el ID del curso' });
        }

        const subjects = await Subject.findAll({
            where: { courseId: Number(courseId) }, // Clave foránea en la tabla 'Subject'
            attributes: ['id', 'name'],
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
