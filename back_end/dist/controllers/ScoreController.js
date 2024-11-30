"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertScore = void 0;
const ProfessorRating_1 = __importDefault(require("../models/ProfessorRating"));
const insertScore = async (req, res, next) => {
    const { studentId, scoreTeacher, scoreCourse, idTeacher, idCourse } = req.body;
    console.log(req.body);
    try {
        if (!studentId || !scoreTeacher || !scoreCourse || !idTeacher || !idCourse) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        const newScoreTeacher = await ProfessorRating_1.default.create({
            professorId: idTeacher,
            studentId: studentId,
            rating_teacher: scoreTeacher,
            rating_course: scoreCourse,
            courseId: idCourse
        });
        res.status(201).json(newScoreTeacher);
    }
    catch (error) {
        next(error);
        console.log(error);
    }
};
exports.insertScore = insertScore;
