import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { sendConfirmationEmail } from '../services/emailService';
const jwt = require('jsonwebtoken');

/**
 * Function to register user
 * @param req 
 * @param res 
 * @returns 
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, roleId, phone, isValidated, lat, lng } = req.body;

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
      phone,
      isValidated,
      lat,
      lng,
    });

    // not return password in response
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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

  }catch(error){

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

  }catch(error){

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

  }catch(error){

  }
};