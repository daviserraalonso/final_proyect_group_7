"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectsByCourse = exports.deleteCourseEvent = exports.updateCourseEvent = exports.createCourseEvent = exports.getCourseEventById = exports.getCoursesByProfessor = exports.getAllCourseEvent = void 0;
const CourseEvent_1 = __importDefault(require("../models/CourseEvent"));
const Subject_1 = __importDefault(require("../models/Subject"));
const getAllCourseEvent = async (req, res) => {
    console.log('Obteniendo datos del calendario');
    try {
        const events = await CourseEvent_1.default.findAll();
        console.log(events);
        res.status(200).json(events);
    }
    catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ message: 'Error al obtener los eventos' });
    }
};
exports.getAllCourseEvent = getAllCourseEvent;
const getCoursesByProfessor = async (req, res) => {
    console.log('Obteniendo cursos del profesor');
    try {
        // Simula obtener el ID del usuario desde localStorage.
        const user = req.headers['user']; // Supongamos que envías el ID en el encabezado 'user'.
        if (!user) {
            return res.status(400).json({ message: 'No se proporcionó información del usuario' });
        }
        const parsedUser = JSON.parse(user);
        const professorId = parsedUser.id;
        if (!professorId) {
            return res.status(400).json({ message: 'El ID del profesor no es válido' });
        }
        const courses = await CourseEvent_1.default.findAll({ where: { professor_id: professorId } });
        if (!courses.length) {
            return res.status(404).json({ message: 'No se encontraron cursos para este profesor' });
        }
        console.log(courses);
        res.status(200).json(courses);
    }
    catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).json({ message: 'Error al obtener los cursos' });
    }
};
exports.getCoursesByProfessor = getCoursesByProfessor;
const getCourseEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await CourseEvent_1.default.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el evento', error });
    }
};
exports.getCourseEventById = getCourseEventById;
const createCourseEvent = async (req, res) => {
    try {
        const newEvent = await CourseEvent_1.default.create(req.body);
        res.status(201).json(newEvent);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el evento', error });
    }
};
exports.createCourseEvent = createCourseEvent;
// Actualizar un evento existente
const updateCourseEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await CourseEvent_1.default.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        await event.update(req.body);
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el evento', error });
    }
};
exports.updateCourseEvent = updateCourseEvent;
// Eliminar un evento
const deleteCourseEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await CourseEvent_1.default.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        await event.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el evento', error });
    }
};
exports.deleteCourseEvent = deleteCourseEvent;
const getSubjectsByCourse = async (req, res) => {
    console.log('Obteniendo materias del curso');
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.status(400).json({ message: 'El ID del curso no fue proporcionado' });
        }
        const subjects = await Subject_1.default.findAll({ where: { courseId } });
        if (!subjects.length) {
            return res.status(404).json({ message: 'No se encontraron materias para este curso' });
        }
        console.log(subjects);
        res.status(200).json(subjects);
    }
    catch (error) {
        console.error('Error al obtener las materias:', error);
        res.status(500).json({ message: 'Error al obtener las materias' });
    }
};
exports.getSubjectsByCourse = getSubjectsByCourse;
