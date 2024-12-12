"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.getScore = exports.insertScore = void 0;
const ProfessorRating_1 = __importDefault(require("../models/ProfessorRating"));
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const insertScore = async (req, res, next) => {
    const { studentId, scoreTeacher, scoreCourse, idTeacher, idCourse, opinion } = req.body;
    try {
        // Validar campos obligatorios
        if (!studentId || !idTeacher || !idCourse || !scoreCourse || !scoreTeacher) {
            return res.status(400).json({ message: 'Campos obligatorios faltantes.' });
        }
        // Comprobar si ya existe el registro
        const existingRating = await database_1.default.query(`
        SELECT * 
        FROM professor_rating 
        WHERE professorId = :idTeacher AND studentId = :studentId AND courseId = :idCourse;
      `, {
            replacements: { idTeacher, studentId, idCourse },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (existingRating.length > 0) {
            return res.status(400).json({ message: 'El estudiante ya ha calificado este curso y profesor.' });
        }
        // Inserción en la tabla
        const newScore = await database_1.default.query(`
        INSERT INTO professor_rating (professorId, studentId, courseId, rating_teacher, rating_course, comments, ratingDate)
        VALUES (:idTeacher, :studentId, :idCourse, :scoreTeacher, :scoreCourse, :opinion, NOW());
      `, {
            replacements: { idTeacher, studentId, idCourse, scoreTeacher, scoreCourse, opinion },
        });
        // Actualizar promedio en avg_course
        await database_1.default.query(`
        UPDATE avg_course
        SET avg = (
          SELECT AVG(rating_course)
          FROM professor_rating
          WHERE courseId = :idCourse
        )
        WHERE courseId = :idCourse;
      `, {
            replacements: { idCourse },
        });
        // Actualizar promedio en avg_teacher
        await database_1.default.query(`
        UPDATE avg_teacher
        SET avg = (
          SELECT AVG(rating_teacher)
          FROM professor_rating
          WHERE professorId = :idTeacher
        )
        WHERE professorId = :idTeacher;
      `, {
            replacements: { idTeacher },
        });
        res.status(201).json({ message: 'Calificación registrada y promedios actualizados exitosamente.', newScore });
    }
    catch (error) {
        console.error('Error al insertar puntaje y actualizar promedios:', error);
        res.status(500).json({ message: 'Error al insertar puntaje y actualizar promedios.' });
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
            },
            attributes: ['id']
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
