import { Request, Response } from "express";
import ProfessorRating from "../models/ProfessorRating";
import Course from "../models/Course";
import AvgTeacher from "../models/avg_teacher";
import sequelize from "../config/database";
import AvgCourse from "../models/avg_course";
import { QueryTypes } from "sequelize";

export const insertScore = async (req: Request, res: Response): Promise<Response> => {
    const { studentId, scoreTeacher, scoreCourse, idTeacher, idCourse, opinion } = req.body;

    try {
        // Validación de campos obligatorios
        if (!studentId || !scoreTeacher || !scoreCourse || !idTeacher || !idCourse) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Verificar si ya existe una entrada con la misma combinación de professorId, studentId y courseId
        const existingEntry = await ProfessorRating.findOne({
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
        const result = await sequelize.query('SELECT MAX(id) AS last_id FROM professor_rating', {
            type: QueryTypes.SELECT,
        });

        const lastId = (result[0] as any).last_id || 0;
        const nextId = lastId + 1;

        // 2. Inserta en la tabla `professor_rating` con el ID generado
        const insertRatingQuery = `
            INSERT INTO professor_rating (id, professorId, studentId, courseId, rating_teacher, rating_course, comments)
            VALUES (:id, :idTeacher, :studentId, :idCourse, :scoreTeacher, :scoreCourse, :opinion);
        `;

        await sequelize.query(insertRatingQuery, {
            replacements: {
                id: nextId,
                studentId,
                scoreTeacher,
                scoreCourse,
                idTeacher,
                idCourse,
                opinion,
            },
            type: QueryTypes.INSERT,
        });

        // 3. Actualiza o inserta el promedio en `avg_course`
        const updateAverageQuery = `
            INSERT INTO avg_course (courseId, avg)
            VALUES (:idCourse, (SELECT AVG(rating_course) FROM professor_rating WHERE courseId = :idCourse))
            ON DUPLICATE KEY UPDATE avg = (SELECT AVG(rating_course) FROM professor_rating WHERE courseId = :idCourse);
        `;

        await sequelize.query(updateAverageQuery, {
            replacements: { idCourse },
            type: QueryTypes.INSERT,
        });

        return res.status(201).json({
            message: "Puntuación insertada y promedio actualizado correctamente.",
        });
    } catch (error) {
        console.error("Error al insertar puntuación y actualizar promedios:", error);
        return res.status(500).json({
            message: "Error al insertar puntuación y actualizar promedios.",
            error,
        });
    } finally {
        await sequelize.close(); // Cerrar la conexión a la base de datos
    }
};

export const getScore = async (req: Request, res: Response, next: any) => {
    const {studentId, idCourse} = req.query
    console.log(studentId, idCourse)

    try {
        const score = await ProfessorRating.findOne({
            where: {
                studentId: studentId,
                courseId: idCourse
            }
        })
        res.status(200).json(score)
    } catch (error) {
        console.log('hola')
    }
}

export const getComments = async (req: Request, res: Response, next: any) => {
    const {userId} = req.params

    try {
        const comments = await ProfessorRating.findAll({
            where: {
                professorId: userId
            },
            attributes: ['comments', 'rating_teacher']
        })
        res.status(200).json(comments)
    } catch (error) {
        
    }
}


