"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseEventById = exports.getEventsByProfessor = exports.deleteCourseEvent = exports.createCourseEvent = exports.updateCourseEvent = exports.getSubjectsByCourse = exports.getCoursesByProfessor = exports.getEventsByStudentId = exports.getCourseLocationByCourseId = exports.getAllCourseEvent = void 0;
const CourseEvent_1 = __importDefault(require("../models/CourseEvent"));
const Subject_1 = __importDefault(require("../models/Subject"));
const Course_1 = __importDefault(require("../models/Course"));
const CourseLocation_1 = __importDefault(require("../models/CourseLocation"));
const StudentCourse_1 = __importDefault(require("../models/StudentCourse"));
const getAllCourseEvent = async (req, res) => {
    try {
        const events = await CourseEvent_1.default.findAll({
            include: [
                {
                    model: Course_1.default,
                    as: 'course',
                    attributes: ['id', 'name'],
                },
                {
                    model: Subject_1.default,
                    as: 'subject',
                    attributes: ['id', 'name'],
                },
                {
                    model: CourseLocation_1.default,
                    as: 'location',
                    attributes: ['address', 'onlineLink'], // Incluye los campos necesarios
                },
            ],
        });
        res.status(200).json(events);
    }
    catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ message: 'Error al obtener los eventos' });
    }
};
exports.getAllCourseEvent = getAllCourseEvent;
const getCourseLocationByCourseId = async (req, res) => {
    try {
        const { courseId } = req.params;
        console.log('Obteniendo ubicación para CourseID:', courseId); // Log para depurar
        if (!courseId) {
            return res.status(400).json({ message: 'El ID del curso es obligatorio' });
        }
        const location = await CourseLocation_1.default.findOne({
            where: { courseId: Number(courseId) },
        });
        if (!location) {
            return res.status(200).json({ address: null, onlineLink: null });
        }
        console.log('Ubicación encontrada:', location);
        res.status(200).json(location);
    }
    catch (error) {
        console.error('Error al obtener la ubicación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.getCourseLocationByCourseId = getCourseLocationByCourseId;
const getEventsByStudentId = async (req, res) => {
    const { id: studentId } = req.params;
    if (!studentId) {
        return res.status(400).json({ message: 'ID del estudiante no proporcionado' });
    }
    try {
        // Buscar los cursos en los que está inscrito el estudiante
        const studentCourses = await StudentCourse_1.default.findAll({
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
        const events = await CourseEvent_1.default.findAll({
            where: {
                courseId: courseIds, // Filtrar eventos por los cursos del estudiante
            },
            include: [
                {
                    model: Course_1.default,
                    as: 'course',
                    attributes: ['id', 'name'],
                },
                {
                    model: Subject_1.default,
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
    }
    catch (error) {
        console.error('Error al obtener los eventos del estudiante:', error);
        res.status(500).json({ message: 'Error interno del servidor', error });
    }
};
exports.getEventsByStudentId = getEventsByStudentId;
const getCoursesByProfessor = async (req, res) => {
    console.log('Parámetros recibidos:', req.params); // Agrega este log para depuración
    try {
        const { id: professorId } = req.params; // Extrae el parámetro id
        if (!professorId) {
            return res.status(400).json({ message: 'No se proporcionó el ID del profesor' });
        }
        const courses = await Course_1.default.findAll({
            where: { professor_id: Number(professorId) },
            attributes: ['id', 'name'],
        });
        if (!courses.length) {
            return res.status(404).json({ message: 'No se encontraron cursos para este profesor' });
        }
        res.status(200).json(courses);
    }
    catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).json({ message: 'Error al obtener los cursos' });
    }
};
exports.getCoursesByProfessor = getCoursesByProfessor;
const getSubjectsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.status(400).json({ message: 'El ID del curso es obligatorio' });
        }
        const subjects = await Subject_1.default.findAll({
            where: { courseId: Number(courseId) },
        });
        if (!subjects.length) {
            return res.status(404).json({ message: 'No se encontraron asignaturas para este curso' });
        }
        res.status(200).json(subjects);
    }
    catch (error) {
        console.error('Error al obtener las asignaturas:', error);
        res.status(500).json({ message: 'Error al obtener las asignaturas' });
    }
};
exports.getSubjectsByCourse = getSubjectsByCourse;
const updateCourseEvent = async (req, res) => {
    try {
        const { id } = req.params; // ID del evento a actualizar
        const updatedData = req.body; // Datos actualizados del evento
        // Buscar el evento por su ID
        const event = await CourseEvent_1.default.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        // Actualizar el evento con los datos recibidos
        await event.update(updatedData);
        res.status(200).json(event);
    }
    catch (error) {
        console.error('Error al actualizar el evento:', error);
        res.status(500).json({ message: 'Error al actualizar el evento', error });
    }
};
exports.updateCourseEvent = updateCourseEvent;
const createCourseEvent = async (req, res) => {
    try {
        const { title, description, startDateTime, endDateTime, locationType, locationId, onlineLink, courseId, subjectId, professorId, eventType, } = req.body;
        const newEvent = await CourseEvent_1.default.create({
            title,
            description,
            startDateTime: new Date(startDateTime), // Convertir a objeto Date
            endDateTime: new Date(endDateTime), // Convertir a objeto Date
            locationType,
            locationId,
            onlineLink,
            courseId,
            subjectId,
            professorId,
            eventType,
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.error('Error al crear el evento:', error);
        res.status(500).json({ message: 'Error al crear el evento', error });
    }
};
exports.createCourseEvent = createCourseEvent;
const deleteCourseEvent = async (req, res) => {
    try {
        const { id } = req.params; // ID del evento a eliminar
        // Buscar el evento por su ID
        const event = await CourseEvent_1.default.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        // Eliminar el evento
        await event.destroy();
        res.status(200).json({ message: 'Evento eliminado correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar el evento:', error);
        res.status(500).json({ message: 'Error al eliminar el evento', error });
    }
};
exports.deleteCourseEvent = deleteCourseEvent;
const getEventsByProfessor = async (req, res) => {
    const { id: professorId } = req.params;
    if (!professorId) {
        return res.status(400).json({ message: 'ID del profesor no proporcionado' });
    }
    try {
        const events = await CourseEvent_1.default.findAll({
            where: { professorId },
            include: [
                {
                    model: Course_1.default,
                    as: 'course',
                    attributes: ['id', 'name'],
                },
                {
                    model: Subject_1.default,
                    as: 'subject',
                    attributes: ['id', 'name'],
                },
            ],
        });
        if (!events.length) {
            return res.status(404).json({ message: 'No se encontraron eventos para este profesor' });
        }
        res.status(200).json(events);
    }
    catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ message: 'Error al obtener los eventos', error });
    }
};
exports.getEventsByProfessor = getEventsByProfessor;
const getCourseEventById = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await CourseEvent_1.default.findByPk(eventId, {
            include: [
                {
                    model: Course_1.default,
                    as: 'course',
                    attributes: ['id', 'name'],
                },
                {
                    model: Subject_1.default,
                    as: 'subject',
                    attributes: ['id', 'name'],
                },
            ],
        });
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(event);
    }
    catch (error) {
        console.error('Error al obtener el evento:', error);
        res.status(500).json({ message: 'Error al obtener el evento', error });
    }
};
exports.getCourseEventById = getCourseEventById;
