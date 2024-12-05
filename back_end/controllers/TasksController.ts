import { Request, Response } from 'express';
import sequelize from '../config/database';
import { QueryTypes } from 'sequelize';
import Task from '../models/Task'; // Cambiado a import
const Subject = require('../models/Subject'); // Importa el modelo Subject
import Course from '../models/Course'; // Importa el modelo Course
import StudentCourse from '../models/StudentCourse';
const User = require('../models/User'); // Importa el modelo User


export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll(); // Ejecuta un SELECT * FROM tasks
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      return res.status(200).json(task);
    } else {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la tarea:', error);
    return res.status(500).json({ message: 'Error al obtener la tarea' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<Response> => {
  console.log('req.body:', req.body);
  const { subjectId, userId, comments, punctuation, deadline, submission } = req.body;

  try {
    // Verifica que todos los datos necesarios estén presentes
    if (!subjectId || !userId || !deadline) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Crea la tarea
    const task = await Task.create({
      subjectId,
      userId,
      comments,
      punctuation,
      deadline,
      submission, // Asegúrate de incluir submission
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return res.status(500).json({ message: 'Error al crear la tarea.', error });
  }
};

export const assignTaskToStudent = async (req, res) => {
  const { studentId, subjectId, comments, deadline } = req.body;

  try {
    // Validar campos requeridos
    if (!studentId || !subjectId || !deadline) {
      return res.status(400).json({ message: 'Faltan campos obligatorios (studentId, subjectId, deadline).' });
    }

    // Crear la tarea asociada al estudiante
    const newTask = await Task.create({
      userId: studentId, // ID del estudiante
      subjectId, // ID de la materia
      comments, // Comentarios opcionales
      deadline, // Fecha límite
    });

    return res.status(201).json({ message: 'Tarea asignada con éxito.', task: newTask });
  } catch (error) {
    console.error('Error al asignar tarea:', error);
    return res.status(500).json({ message: 'Error al asignar tarea.', error });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { subjectId, userId, comments, punctuation, creationDate, deadline, submission, feedback } = req.body;

    // Verifica que el campo feedback esté presente en el cuerpo de la solicitud
    if (feedback === undefined) {
      return res.status(400).json({ message: 'El campo feedback es obligatorio' });
    }

    const [updated] = await Task.update(
      { subjectId, userId, comments, punctuation, creationDate, deadline, submission, feedback },
      { where: { id } }
    );
    if (updated) {
      const updatedTask = await Task.findByPk(id);
      return res.status(200).json(updatedTask);
    } else {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    return res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const deleted = await Task.destroy({
      where: { id }
    });
    if (deleted) {
      return res.status(204).json({ message: 'Tarea eliminada' });
    } else {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    return res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};

export const getTasksByUserId = async (req: Request, res: Response): Promise<Response> => { 
  const { userId } = req.params;

  try {
    const query = `
      SELECT 
        t.id AS tarea_id,
        t.comments AS tarea_comentarios,
        s.name AS materia_nombre,
        u.name AS profesor_nombre
      FROM 
        tasks t
      JOIN 
        subject s ON t.subjectId = s.id
      JOIN 
        course c ON s.courseId = c.id
      JOIN 
        user u ON c.professor_id = u.id
      WHERE 
        t.userId = :userId;
    `;

    const tasks = await sequelize.query(query, {
      replacements: { userId },
      type: QueryTypes.SELECT,
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    return res.status(500).json({ message: 'Error al obtener las tareas.' });
  }
};


export const getProgressByUserId = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;

  try {
    // Consulta SQL para calcular el progreso por materia
    const query = `
      SELECT 
        s.id AS subject_id,                 -- ID de la materia
        s.name AS materia_nombre,           -- Nombre de la materia
        u.name AS profesor_nombre,          -- Nombre del profesor
        ROUND((COUNT(t.id) / 10) * 100, 2) AS progreso_materia -- Progreso basado en tareas con puntuación asignada
      FROM 
        tasks t
      JOIN 
        subject s ON t.subjectId = s.id
      JOIN 
        course c ON s.courseId = c.id
      JOIN 
        user u ON c.professor_id = u.id
      WHERE 
        t.userId = :userId
        AND t.punctuation IS NOT NULL -- Solo incluir tareas con puntuación asignada
      GROUP BY 
        s.id, s.name, u.name;
    `;

    // Ejecución de la consulta SQL
    const progress = await sequelize.query(query, {
      replacements: { userId }, // Sustituye el :userId en la consulta
      type: QueryTypes.SELECT,  // Indica que queremos un resultado SELECT
    });

    // Enviar la respuesta JSON
    return res.status(200).json(progress);
  } catch (error) {
    console.error('Error al obtener el progreso del usuario:', error);
    return res.status(500).json({ message: 'Error al obtener el progreso del usuario', error });
  }
};

export const getPendingTasksByProfessor = async (req: Request, res: Response): Promise<Response> => {
  const { professorId } = req.params;

  try {
    // Consulta SQL para obtener las tareas pendientes por calificar
    const query = `
      SELECT 
        t.id AS taskId,
        u.name AS studentName,
        c.name AS courseName
      FROM 
        tasks t
      JOIN 
        user u ON t.userId = u.id
      JOIN 
        course c ON t.subjectId = c.id
      WHERE 
        t.punctuation IS NULL
        AND c.professor_id = :professorId;
    `;

    // Ejecutar la consulta SQL
    const pendingTasks = await sequelize.query(query, {
      replacements: { professorId }, // Sustituye el :professorId en la consulta
      type: QueryTypes.SELECT,       // Indica que queremos un resultado SELECT
    });

    // Enviar la respuesta JSON
    return res.status(200).json(pendingTasks);
  } catch (error) {
    console.error('Error al obtener las tareas pendientes por calificar:', error);
    return res.status(500).json({ message: 'Error al obtener las tareas pendientes por calificar', error });
  }
};

export const getTaskDetailsById = async (req: Request, res: Response): Promise<Response> => {
  const { taskId } = req.params;

  try {
    // Obtener los detalles de la tarea utilizando Sequelize
    const taskDetails = await Task.findOne({
      where: { id: taskId },
      attributes: ['id', 'userId', 'submission', 'createdAt'],
      include: [
        {
          model: Course,
          as: 'course', 
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!taskDetails) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // Enviar la respuesta JSON
    return res.status(200).json(taskDetails);
  } catch (error) {
    console.error('Error al obtener los detalles de la tarea:', error);
    return res.status(500).json({ message: 'Error al obtener los detalles de la tarea', error });
  }
};


export const getTaskCountsByStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { professorId } = req.params;

    // Verifica que el campo professorId esté presente y sea válido
    if (!professorId || isNaN(Number(professorId))) {
      return res.status(400).json({ message: 'El campo professorId es obligatorio y debe ser un número válido' });
    }

    const query = `
      SELECT 
        COUNT(CASE WHEN t.punctuation IS NULL THEN 1 END) AS pendingTasks,
        COUNT(CASE WHEN t.punctuation IS NOT NULL THEN 1 END) AS gradedTasks
      FROM 
        tasks t
      JOIN 
        course c ON t.subjectId = c.id
      WHERE 
        c.professor_id = :professorId;
    `;

    const result = await sequelize.query(query, {
      replacements: { professorId: Number(professorId) },
      type: QueryTypes.SELECT,
    });

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error('Error fetching task counts:', error);
    return res.status(500).json({
      message: 'Error al obtener el conteo de tareas',
      error,
    });
  }
};

export const getStudentCountByProfessor = async (req: Request, res: Response): Promise<Response> => {
  const { professorId } = req.params;

  try {
      const studentCount = await StudentCourse.count({
          include: [{
              model: Course,
              as: 'course', // Alias definido en la asociación
              where: { professor_id: professorId }, // Filtrar cursos por profesor
              attributes: [] // No necesitamos atributos del curso
          }],
          distinct: true, // Contar estudiantes únicos
          col: 'studentId' // Contar en la columna `studentId`
      });

      return res.status(200).json({ studentCount });
  } catch (error) {
      console.error('Error al obtener el conteo de estudiantes:', error);
      return res.status(500).json({ message: 'Error al obtener el conteo de estudiantes', error });
  }
};

export const getEarningsForProfessor = async (req: Request, res: Response): Promise<Response> => {
  const { professorId } = req.params;

  try {
      const earnings = await Course.findAll({
          where: { professor_id: professorId },
          attributes: [
              'id',
              'name',
              'price',
              [sequelize.fn('COUNT', sequelize.col('studentCourses.studentId')), 'studentCount'],
              [sequelize.literal('price * COUNT(studentCourses.studentId)'), 'totalEarnings']
          ],
          include: [
              {
                  model: StudentCourse,
                  as: 'studentCourses',
                  attributes: [] // No necesitamos atributos de StudentCourse
              }
          ],
          group: ['Course.id', 'Course.professor_id', 'Course.name', 'Course.price']
      });

      return res.status(200).json(earnings);
  } catch (error) {
      console.error('Error al obtener ingresos para el profesor:', error);
      return res.status(500).json({ message: 'Error al obtener ingresos para el profesor', error });
  }
};


