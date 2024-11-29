import { Request, Response } from 'express';
import CourseEvent from '../models/CourseEvent';

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



