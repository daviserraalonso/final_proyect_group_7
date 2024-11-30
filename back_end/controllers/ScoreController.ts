import { Request, Response } from "express";
import ProfessorRating from "../models/ProfessorRating";
import Course from "../models/Course";





    export const insertScore = async (req: Request, res: Response, next: any) => {
        const {studentId, scoreTeacher, scoreCourse, idTeacher, idCourse, opinion} = req.body
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
                   courseId: idCourse,
                   comments: opinion
                });
                res.status(201).json(newScoreTeacher) 
        } catch (error) {
            next(error)
            console.log(error)
        }

    }

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


