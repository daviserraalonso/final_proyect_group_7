import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { sendConfirmationEmail } from '../services/emailService';
import UserDetails from '../models/UserDetails';
import Course from '../models/Course';
import { Op, Sequelize, where } from 'sequelize';
import StudentCourse from '../models/StudentCourse';
import AvgTeacher from '../models/avg_teacher';
import User from '../models/User';
import Category from '../models/Category';
import { isValidDate } from '@fullcalendar/core/internal';
import sequelize from '../config/database';
const jwt = require('jsonwebtoken');


/**
 * Function to register user
 * @param req 
 * @param res 
 * @returns 
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, roleId, isValidated, lat, lng, phone, address, isEnrollment, courseId } = req.body;

    console.log('Datos recibidos:', req.body);


    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Este correo electrónico ya está registrado.' });
      return;
    }

    // hashing password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el nuevo usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId,
      isValidated,
    });

    const userId = user.userId

    await UserDetails.create({
      userId,
      phone,
      address,
      lat,
      lng
    })

    // check if it´s inscription to course
    if (isEnrollment) {
      if (!courseId) {
        res.status(400).json({ message: 'El ID del curso es obligatorio para la inscripción.' });
        return;
      }

      // Insert in student_course
      const enrollmentDate = new Date();
      await StudentCourse.create({
        studentId: userId,
        courseId,
        enrollmentDate,
      });
    }

    // not return password in response
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const confirmationLink = `http://localhost:${process.env.PORT}/api/users/confirm/${token}`;
    const subject = 'Confirma tu correo electrónico';
    const htmlContent = `
      <h1>Bienvenido, ${name}!</h1>
      <p>Gracias por registrarte. Por favor, confirma tu correo electrónico haciendo clic en el siguiente enlace:</p>
      <a href="${confirmationLink}">Confirmar correo electrónico</a>
    `;

    await sendConfirmationEmail(email, subject, htmlContent);



    res.status(201).json(userWithoutPassword);

  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }


};


/**
 * Confirmation email function
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const confirmEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    // extrack from URL token
    const token = req.params.token;

    // check and verify userID from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    const userId = decoded.userId;

    // update user to validated a 1 if token is valid
    const [updatedRows] = await User.update(
      { isValidated: 1 },
      { where: { id: userId, isValidated: 0 } } // only if user is not validated
    );

    // check if email it´s validated
    if (updatedRows > 0) {
      res.status(200).json({ message: 'Correo electrónico confirmado exitosamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado o ya confirmado' });
    }
  } catch (error) {
    console.error('Error al confirmar el correo electrónico:', error);
    res.status(400).json({ message: 'Token inválido o expirado' });
  }
};

/**
 * create new user from dashboard function
 * @param req 
 * @param res 
 * @returns 
 */

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {

  } catch (error) {
  } catch (error) {

  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'isValidated', 'roleId'],
    });

    res.json(users); // Envía los usuarios
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: UserDetails,
          as: 'details',
          attributes: ['phone', 'address', 'img_url', 'description', 'lat', 'lng'],
        },
      ],
    });

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' }); // Envía la respuesta
      return; // Finaliza la ejecución del método
    }

    res.json(user); // Envía los detalles del usuario si existe
  } catch (error) {
    console.error('Error al obtener detalles del usuario:', error);
    res.status(500).json({ error: 'Error al obtener detalles del usuario' });
  }
};


/**
 * modify user from dashboard function
 * @param req 
 * @param res 
 * @returns 
 */

export const modifyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const {
      name,
      email,
      password,
      roleId,
      phone,
      address,
      description,
      img_url,
      lat,
      lng,
    } = req.body;

    // Hash password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    // Actualizar datos del usuario: incluir solo campos no nulos o definidos
    const userUpdateData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(roleId && { roleId }), // Si no se proporciona roleId, no lo incluye
      ...(hashedPassword && { password: hashedPassword }),
    };

    if (Object.keys(userUpdateData).length > 0) {
      await User.update(userUpdateData, { where: { id: userId } });
    }

    // Manejar UserDetails
    const existingDetails = await UserDetails.findOne({ where: { userId } });

    if (existingDetails) {
      // Actualizar si existen detalles
      await existingDetails.update({
        ...(phone && { phone }),
        ...(address && { address }),
        ...(description && { description }),
        ...(img_url && { img_url }),
        ...(lat && { lat }),
        ...(lng && { lng }),
      });
    } else if (phone || address || description || img_url || lat || lng) {
      // Crear si no existen detalles y se proporcionan datos
      await UserDetails.create({
        userId,
        phone,
        address,
        description,
        img_url,
        lat,
        lng,
      });
    }

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};




/**
 * delete user from dashboard function
 * @param req 
 * @param res 
 * @returns 
 */

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({
      where: { id: userId }
    });

    if (deleted) {
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

/**
 * FUNCTION TO GETT ALL TEACHERS
 * @param req 
 * @param res 
 */
export const getTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await User.findAll({
      where: { roleId: 2 },
    });

    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error al obtener profesores:', error);
  }
};

export const searchTeachers = async (req: Request, res: Response) => {
  console.log(req.query)
  const {
    userId,
    inputName,
    inputCity,
    selectedCategory,
    minPrice,
    maxPrice,
    score,
    southWestLat,
    southWestLng,
    northEastLat,
    northEastLng,
    type
  } = req.query

  const filters = {
    roleId: 2,
    isValidated: 1,
    ...(userId && { id: userId }),
    ...(userId && { id: userId }),
    ...(type && {
      '$coursesTaught.modality_id$': type,
    }),
    ...(inputName && { name: inputName }),
    ...(inputName && { name: inputName }),
    ...(inputCity && {
      '$details.address$': inputCity
    }),
      '$details.address$': inputCity
    }),
    ...(selectedCategory && {
      '$coursesTaught.category_id$': selectedCategory,
    }),
    ...(minPrice && {
      [Op.or]: [
        { '$coursesTaught.price$': { [Op.between]: [minPrice, maxPrice] } },
        { '$coursesTaught.price$': null }
      ]
    }),
    ...(minPrice && {
      [Op.or]: [
        { '$coursesTaught.price$': { [Op.between]: [minPrice, maxPrice] } },
        { '$coursesTaught.price$': null }
      ]
    }),
    ...(southWestLat && southWestLng && northEastLat && northEastLng && {
      '$details.lat$': { [Op.between]: [southWestLat, northEastLat] },
      '$details.lng$': { [Op.between]: [southWestLng, northEastLng] },
    }),
    ...(score && {
      [Op.or]: [
        { '$averageTeacher.avg$': { [Op.gte]: score } },
        { '$averageTeacher.avg$': null }
      ]
    }),

  }

  try {
    console.log(`filtro: ${userId}`)
    const teachers = await User.findAll({
      where: filters,
      attributes: ['id', 'name', 'email', 'roleId', 'isValidated' ],
      include: [
        {
          model: UserDetails,
          as: 'details',
          attributes: ['phone', 'address', 'img_url', 'description', 'lat', 'lng'],
        },
        {
          model: Course,
          as: 'coursesTaught',
          attributes: ['id', 'name', 'price', 'modality_id', 'category_id'],
          include: [
            {
              model: Category,
              as: 'category',
              attributes: ['category_name']
            }
          ]
        },
        {
          model: AvgTeacher,
          as: 'averageTeacher',
          attributes: ['avg'],

        },
      ],


    });

    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error al obtener profesores:', error);
  }
};

export const names = async (req: any, res: any, next: any) => {
export const names = async (req: any, res: any, next: any) => {
  try {
    const names = await User.findAll({
      where: { roleId: 2 },
      where: { roleId: 2 },
      attributes: ['name']
    }


    )
    res.status(200).json(names)
  } catch (error) {
    next(error)
  }


}

export const cities = async (req: Request, res: Response, next: any) => {
export const cities = async (req: Request, res: Response, next: any) => {
  try {
    const names = await User.findAll({
      where: { roleId: 2 },
      where: { roleId: 2 },
      attributes: [],
      include: [{
        model: UserDetails,
        as: 'details',
        attributes: ['address']
      }]
    }


    )
    res.status(200).json(names)


  } catch (error) {
    next(error)
  }
}

export const cityCords = async (req: Request, res: Response, next: any) => {
  const { city } = req.params
  const { city } = req.params
  console.log(city)
  try {
    const coords = await UserDetails.findOne({
      where: { address: city },
      where: { address: city },
      attributes: ['lat', 'lng']
    })
    res.status(200).json(coords)
  } catch (error) {
    next(error)
  }
}


/**
 * method to get all courses asociates to user
 */
export const getUserSubscribedCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.params.id;

    const subscribedCourses = await StudentCourse.findAll({
      where: { studentId },
      include: [
        {
          model: Course,
          as: 'course',
          include: [
            {
              model: User,
              as: 'professor',
              attributes: ['name', 'email'],
            },
          ],
        },
      ],
    });

    const courses = subscribedCourses.map((uc) => {
      const course = uc.get('course') as Course | null;
      if (course) {
        const professor = course.get('professor') as User | null;
        return {
          ...course.get(),
          professor: professor ? professor.get() : null,
        };
      }
      return null;
    }).filter((course) => course !== null);

    if (!courses || courses.length === 0) {
      res.status(404).json({ message: 'No estás suscrito a ningún curso.' });
      return;
    }

    res.status(200).json({ courses });
  } catch (error) {
    console.error('Error al obtener los cursos suscritos:', error);
    res.status(500).json({ error: 'Error al obtener los cursos suscritos' });
  }

};

export const validate = async (req: Request, res: Response, next: any) => {
  try {
    const { userId } = req.params
    const { userId } = req.params

    const userUpdateData = {
      isValidated: 1

      isValidated: 1

    };
    await User.update(userUpdateData, {
    await User.update(userUpdateData, {
      where: {
        id: userId
      }
    })
    res.status(200).json('Usuario Validado')
  } catch (error) {
    next(error)
    res.json('error')
  }
}


export const getFavoriteTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await AvgTeacher.findAll({
      where: {
        avg: { [Op.gte]: 6 } // avg >= 6
      },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'name'],
          include: [
            {
              model: UserDetails,
              as: 'details',
              attributes: ['description', 'img_url']
            }
          ]
        }
      ]
    });

    // Aquí enviamos directamente los resultados de la consulta
    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error al obtener profesores favoritos:', error);
    res.status(500).json({ message: 'Error al obtener profesores favoritos' });
  }
};


export const getTotalStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    // Realiza una consulta SQL para contar usuarios con el rol de estudiante (roleId = 3)
    const [results] = await sequelize.query(`
      SELECT COUNT(*) AS totalStudents
      FROM user
      WHERE roleId = 3;
    `);

    // Responde con el total de estudiantes
    const totalStudents = (results as any)[0].totalStudents;
    res.status(200).json({ totalStudents });
  } catch (error) {
    console.error('Error al obtener el número de estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener el número de estudiantes' });
  }
};

export const getTotalProfessors = async (req: Request, res: Response): Promise<void> => {
  try {
    // Realiza una consulta SQL para contar usuarios con el rol de "profesor"
    const [results] = await sequelize.query(`
      SELECT COUNT(*) AS totalProfessors
      FROM user
      WHERE roleId = 2; 
    `);

    // Responde con el total de profesores
    const totalProfessors = (results as any)[0].totalProfessors;
    res.status(200).json({ totalProfessors });
  } catch (error) {
    console.error('Error al obtener el número de profesores:', error);
    res.status(500).json({ error: 'Error al obtener el número de profesores' });
  }
};

