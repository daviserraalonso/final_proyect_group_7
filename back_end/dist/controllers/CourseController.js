"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourseById = exports.getCourses = void 0;
const Course_1 = __importDefault(require("../models/Course"));
// Obtener todos los cursos
const getCourses = async (req, res) => {
    try {
        const courses = await Course_1.default.findAll();
        res.status(200).json(courses);
    }
    catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).json({ message: 'Error al obtener los cursos.' });
    }
};
exports.getCourses = getCourses;
// Obtener un curso por ID
const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course_1.default.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Curso no encontrado.' });
        }
        res.status(200).json(course);
    }
    catch (error) {
        console.error('Error al obtener el curso:', error);
        res.status(500).json({ message: 'Error al obtener el curso.' });
    }
};
exports.getCourseById = getCourseById;
// Crear un nuevo curso
const createCourse = async (req, res) => {
    console.log('Datos recibidos:', req.body);
    const { body } = req.body;
    try {
        const { name, categoryId, modalityId, teacherId } = req.body;
        // Validar campos requeridos
        if (!name || !categoryId || !modalityId || !teacherId) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios: name, categoryId, modalityId' });
        }
        console.log('Intentando crear el curso con:', {
            name,
            category_id: categoryId,
            modality_id: modalityId,
            professor_id: teacherId,
        });
        const newCourse = await Course_1.default.create({
            name,
            category_id: categoryId,
            modality_id: modalityId,
            professor_id: teacherId,
        });
        res.status(201).json(newCourse);
    }
    catch (error) {
        console.error('Error al crear el curso:', error);
    }
};
exports.createCourse = createCourse;
// Actualizar un curso existente
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const course = await Course_1.default.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Curso no encontrado.' });
        }
        if (!name) {
            return res.status(400).json({ message: 'El nombre del curso es obligatorio.' });
        }
        await course.update({ name });
        res.status(200).json(course);
    }
    catch (error) {
        console.error('Error al actualizar el curso:', error);
        res.status(500).json({ message: 'Error al actualizar el curso.' });
    }
};
exports.updateCourse = updateCourse;
// Eliminar un curso
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course_1.default.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Curso no encontrado.' });
        }
        await course.destroy();
        res.status(200).json({ message: 'Curso eliminado correctamente.' });
    }
    catch (error) {
        console.error('Error al eliminar el curso:', error);
        res.status(500).json({ message: 'Error al eliminar el curso.' });
    }
};
exports.deleteCourse = deleteCourse;
