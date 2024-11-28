import { Request, Response } from "express";
import ProfessorRating from "../models/ProfessorRating";
import Course from "../models/Course";




    export const insertScore = async (req: Request, res: Response, next: any) => {
        const {studentId, scoreTeacher, scoreCourse, idTeacher, idCourse} = req.body
        console.log(req.body)

        try {
            if ( !studentId || !scoreTeacher || !scoreCourse || !idTeacher || !idCourse) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios'});
            }
                const newScoreTeacher = await ProfessorRating.create({
                   professorId: idTeacher,
                   studentId: studentId,
                   rating_teacher: scoreTeacher,
                   rating_course: scoreCourse,
                   courseId: idCourse
                });
                res.status(201).json(newScoreTeacher)
                
            
        } catch (error) {
            next(error)
            console.log(error)
        }

    }


