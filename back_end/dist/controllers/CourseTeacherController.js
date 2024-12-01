"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentsByteacher = void 0;
const CourseTeacherService_1 = require("../services/CourseTeacherService");
const getStudentsByteacher = async (req, res) => {
    const { professorId } = req.params; // Obtener el ID del profesor desde la URL
    try {
        const CourseWithStudents = await (0, CourseTeacherService_1.getStudentsByProfessor)(Number(professorId));
        res.status(200).json(CourseWithStudents); // Enviar la respuesta en formato JSON
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los estudiantes', error });
    }
};
exports.getStudentsByteacher = getStudentsByteacher;
