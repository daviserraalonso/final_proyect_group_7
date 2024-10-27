"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmEmail = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const emailService_1 = require("../services/emailService");
const jwt = require('jsonwebtoken');
/**
 * Function to register user
 * @param req
 * @param res
 * @returns
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password, roleId, phone, isValidated, lat, lng } = req.body;
        // Verificar si el usuario ya existe
        const existingUser = await User_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'Este correo electrónico ya está registrado.' });
            return;
        }
        // hashing password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // Crear el nuevo usuario
        const user = await User_1.default.create({
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
        await (0, emailService_1.sendConfirmationEmail)(email, subject, htmlContent);
        res.status(201).json(userWithoutPassword);
    }
    catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.registerUser = registerUser;
/**
 * Confirmation email function
 *
 * @param req
 * @param res
 * @returns
 */
const confirmEmail = async (req, res) => {
    try {
        // Extraer el token de los parámetros de la URL
        const token = req.params.token;
        // Verificar y decodificar el token para obtener el userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        // Actualizar isValidated directamente en la base de datos solo si el token es válido
        const [updatedRows] = await User_1.default.update({ isValidated: 1 }, { where: { id: userId, isValidated: 0 } } // Solo actualizar si el usuario no está validado aún
        );
        // Verificar si se ha actualizado alguna fila
        if (updatedRows > 0) {
            res.status(200).json({ message: 'Correo electrónico confirmado exitosamente' });
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado o ya confirmado' });
        }
    }
    catch (error) {
        console.error('Error al confirmar el correo electrónico:', error);
        res.status(400).json({ message: 'Token inválido o expirado' });
    }
};
exports.confirmEmail = confirmEmail;
