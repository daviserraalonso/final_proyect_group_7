"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inscription = exports.getStudentCourses = void 0;
const StudentCourse_1 = __importDefault(require("../models/StudentCourse"));
const Course_1 = __importDefault(require("../models/Course"));
const Category_1 = __importDefault(require("../models/Category"));
const User_1 = __importDefault(require("../models/User"));
const getStudentCourses = async (req, res) => {
    try {
        // get user if rom url
        const userId = parseInt(req.params.userId, 10);
        if (!userId) {
            res.status(400).json({ message: 'El ID del estudiante es obligatorio.' });
            return;
        }
        // get courser to student
        const courses = await StudentCourse_1.default.findAll({
            where: { studentId: userId },
            include: [
                {
                    model: Course_1.default,
                    as: 'course',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: Category_1.default,
                            as: 'category',
                            attributes: ['category_name'],
                        },
                        {
                            model: User_1.default, // Model user to teacher
                            as: 'professor',
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });
        const formattedCourses = courses.map((sc) => {
            const scPlain = sc.get({ plain: true });
            return {
                id: scPlain.id,
                studentId: scPlain.studentId,
                courseId: scPlain.courseId,
                courseName: scPlain.course?.name || 'No disponible',
                category: scPlain.course?.category?.category_name || 'No disponible',
                professor: scPlain.course?.professor?.name || 'No disponible',
                enrollmentDate: scPlain.enrollmentDate,
                createdAt: scPlain.createdAt,
                updatedAt: scPlain.updatedAt,
            };
        });
        res.status(200).json(formattedCourses);
    }
    catch (error) {
        console.error('Error al obtener los cursos del estudiante:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};
exports.getStudentCourses = getStudentCourses;
const inscription = async (req, res, next) => {
    const { studentId, courseId } = req.body;
    const date = new Date();
    if (!studentId || !courseId) {
        return res.status(400).json('Algo ha fallado');
    }
    try {
        const studentInscription = await StudentCourse_1.default.create({
            studentId: studentId,
            courseId: courseId,
            enrollmentDate: date
        });
        return res.status(200).json(studentInscription);
    }
    catch (error) {
        next(error);
    }
};
exports.inscription = inscription;
