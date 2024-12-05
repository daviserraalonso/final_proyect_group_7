import { Request, Response } from 'express';
import CourseEvent from '../models/CourseEvent';
import Subject from '../models/Subject';
import Course from '../models/Course';

export const getAllCourseEvent = async (req: Request, res: Response) => {
    console.log('Obteniendo datos del calendario')
    try {
        const events = await CourseEvent.findAll();
        console.log(events)
        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ message: 'Error al obtener los eventos' });
    }
};

export const getCoursesByProfessor = async (req: Request, res: Response) => {
    console.log('Obteniendo cursos del profesor');
    try {
        const user = req.headers['user'];

        console.log('Encabezado user recibido:', user);

        if (!user) {
            return res.status(400).json({ message: 'No se proporcionó información del usuario' });
        }

        const parsedUser = JSON.parse(user as string);
        console.log('Usuario parseado:', parsedUser);

        const professorId = parsedUser.id;
        console.log('ID del profesor:', professorId);

        if (!professorId) {
            return res.status(400).json({ message: 'El ID del profesor no es válido' });
        }

        // Realizar la consulta con inclusión de Course y filtro por professor_id
        const courses = await CourseEvent.findAll({
            include: {
                model: Course,
                where: { professor_id: professorId }, // Filtrar por el ID del profesor en la tabla Course
                attributes: [] // Evitar traer datos innecesarios de Course
            }
        });

        console.log('Cursos obtenidos:', courses);

        if (!courses.length) {
            return res.status(404).json({ message: 'No se encontraron cursos para este profesor' });
        }

        res.status(200).json(courses);
    } catch (error: any) {
        console.error('Error al obtener los cursos:', error.message, error.stack);
        res.status(500).json({ message: 'Error al obtener los cursos' });
    }
};


export const getCourseEventById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const event = await CourseEvent.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el evento', error });
    }
};

export const createCourseEvent = async (req: Request, res: Response) => {
    try {
        const newEvent = await CourseEvent.create(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el evento', error });
    }
};

// Actualizar un evento existente
export const updateCourseEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const event = await CourseEvent.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        await event.update(req.body);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el evento', error });
    }
};

// Eliminar un evento
export const deleteCourseEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const event = await CourseEvent.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        await event.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el evento', error });
    }
};

export const getSubjectsByCourse = async (req: Request, res: Response) => {
    console.log('Obteniendo materias del curso');
    try {
        const { courseId } = req.params;

        if (!courseId) {
            return res.status(400).json({ message: 'El ID del curso no fue proporcionado' });
        }

        const subjects = await Subject.findAll({ where: { courseId } });

        if (!subjects.length) {
            return res.status(404).json({ message: 'No se encontraron materias para este curso' });
        }

        console.log(subjects);
        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error al obtener las materias:', error);
        res.status(500).json({ message: 'Error al obtener las materias' });
    }
};



