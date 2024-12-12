import { Request, Response } from "express";
import ProfessorRating from "../models/ProfessorRating";
import Course from "../models/Course";
import AvgTeacher from "../models/avg_teacher";
import sequelize from "../config/database";
import AvgCourse from "../models/avg_course";
import { QueryTypes } from "sequelize";

export const insertScore = async (req: Request, res: Response, next: any) => {
    const { studentId, scoreTeacher, scoreCourse, idTeacher, idCourse, opinion } = req.body;
  
    try {
      // Validar campos obligatorios
      if (!studentId || !idTeacher || !idCourse || !scoreCourse || !scoreTeacher) {
        return res.status(400).json({ message: 'Campos obligatorios faltantes.' });
      }
  
      // Comprobar si ya existe el registro
      const existingRating = await sequelize.query(`
        SELECT * 
        FROM professor_rating 
        WHERE professorId = :idTeacher AND studentId = :studentId AND courseId = :idCourse;
      `, {
        replacements: { idTeacher, studentId, idCourse },
        type: QueryTypes.SELECT,
      });
  
      if (existingRating.length > 0) {
        return res.status(400).json({ message: 'El estudiante ya ha calificado este curso y profesor.' });
      }
  
      // Inserción en la tabla
      const newScore = await sequelize.query(`
        INSERT INTO professor_rating (professorId, studentId, courseId, rating_teacher, rating_course, comments, ratingDate)
        VALUES (:idTeacher, :studentId, :idCourse, :scoreTeacher, :scoreCourse, :opinion, NOW());
      `, {
        replacements: { idTeacher, studentId, idCourse, scoreTeacher, scoreCourse, opinion },
      });
  
      // Actualizar promedio en avg_course
      await sequelize.query(`
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
      await sequelize.query(`
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
    } catch (error) {
      console.error('Error al insertar puntaje y actualizar promedios:', error);
      res.status(500).json({ message: 'Error al insertar puntaje y actualizar promedios.' });
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


