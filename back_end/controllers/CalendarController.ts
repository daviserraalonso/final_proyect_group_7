import { Request, Response } from 'express';
import CourseEvent from '../models/CourseEvent';
import Subject from '../models/Subject';
import Course from '../models/Course';
import StudentCourse from '../models/StudentCourse';
import User from '../models/user';

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

export const getCoursesByProfessor = async (req: Request, res: Response) => {
    console.log('Obteniendo cursos del profesor');
    try {
        const { professorId } = req.params;

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
