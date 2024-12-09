"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.getScore = exports.insertScore = void 0;
const ProfessorRating_1 = __importDefault(require("../models/ProfessorRating"));
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const insertScore = async (req, res) => {
    const { studentId, scoreTeacher, scoreCourse, idTeacher, idCourse, opinion } = req.body;
    try {
        // Validación de campos obligatorios
        if (!studentId || !scoreTeacher || !scoreCourse || !idTeacher || !idCourse) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        // Verificar si ya existe una entrada con la misma combinación de professorId, studentId y courseId
        const existingEntry = await ProfessorRating_1.default.findOne({
            where: {
                professorId: idTeacher,
                studentId: studentId,
                courseId: idCourse
            }
        });
        if (existingEntry) {
            return res.status(400).json({ message: "Ya existe una calificación para esta combinación de profesor, estudiante y curso." });
        }
        // 1. Obtener el último ID disponible
        const result = await database_1.default.query('SELECT MAX(id) AS last_id FROM professor_rating', {
            type: sequelize_1.QueryTypes.SELECT,
        });
        const lastId = result[0].last_id || 0;
        const nextId = lastId + 1;
        // 2. Inserta en la tabla `professor_rating` con el ID generado
        const insertRatingQuery = `
            INSERT INTO professor_rating (id, professorId, studentId, courseId, rating_teacher, rating_course, comments)
            VALUES (:id, :idTeacher, :studentId, :idCourse, :scoreTeacher, :scoreCourse, :opinion);
        `;
        await database_1.default.query(insertRatingQuery, {
            replacements: {
                id: nextId,
                studentId,
                scoreTeacher,
                scoreCourse,
                idTeacher,
                idCourse,
                opinion,
            },
            type: sequelize_1.QueryTypes.INSERT,
        });
        // 3. Actualiza o inserta el promedio en `avg_course`
        const updateAverageQuery = `
            INSERT INTO avg_course (courseId, avg)
            VALUES (:idCourse, (SELECT AVG(rating_course) FROM professor_rating WHERE courseId = :idCourse))
            ON DUPLICATE KEY UPDATE avg = (SELECT AVG(rating_course) FROM professor_rating WHERE courseId = :idCourse);
        `;
        await database_1.default.query(updateAverageQuery, {
            replacements: { idCourse },
            type: sequelize_1.QueryTypes.INSERT,
        });
        return res.status(201).json({
            message: "Puntuación insertada y promedio actualizado correctamente.",
        });
    }
    catch (error) {
        console.error("Error al insertar puntuación y actualizar promedios:", error);
        return res.status(500).json({
            message: "Error al insertar puntuación y actualizar promedios.",
            error,
        });
    }
    finally {
        await database_1.default.close(); // Cerrar la conexión a la base de datos
    }
};
exports.insertScore = insertScore;
const getScore = async (req, res, next) => {
    const { studentId, idCourse } = req.query;
    console.log(studentId, idCourse);
    try {
        const score = await ProfessorRating_1.default.findOne({
            where: {
                studentId: studentId,
                courseId: idCourse
            }
        });
        res.status(200).json(score);
    }
    catch (error) {
        console.log('hola');
    }
};
exports.getScore = getScore;
const getComments = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const comments = await ProfessorRating_1.default.findAll({
            where: {
                professorId: userId
            },
            attributes: ['comments', 'rating_teacher']
        });
        res.status(200).json(comments);
    }
    catch (error) {
    }
};
exports.getComments = getComments;
