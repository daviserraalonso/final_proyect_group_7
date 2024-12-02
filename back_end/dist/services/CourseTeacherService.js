"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentsByProfessor = getStudentsByProfessor;
const Course_1 = __importDefault(require("../models/Course"));
const StudentCourse_1 = __importDefault(require("../models/StudentCourse"));
const User_1 = __importDefault(require("../models/User"));
async function getStudentsByProfessor(professorId) {
    try {
        const CourseWithStudents = await Course_1.default.findAll({
            where: { professor_id: professorId },
            include: [
                {
                    model: StudentCourse_1.default,
                    as: 'enrollments',
                    include: [
                        {
                            model: User_1.default,
                            as: 'student',
                            attributes: ['id', 'name', 'email']
                        }
                    ]
                }
            ]
        });
        return CourseWithStudents;
    }
    catch (error) {
        console.error('Error al obtener los estudiantes:', error);
        throw error;
    }
}
