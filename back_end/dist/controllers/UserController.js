"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityCords = exports.cities = exports.names = exports.searchTeachers = exports.getTeachers = exports.deleteUser = exports.modifyUser = exports.getUserDetails = exports.getAllUsers = exports.createUser = exports.confirmEmail = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const emailService_1 = require("../services/emailService");
const user_1 = __importDefault(require("../models/user"));
const UserDetails_1 = __importDefault(require("../models/UserDetails"));
const Course_1 = __importDefault(require("../models/Course"));
const sequelize_1 = require("sequelize");
const jwt = require('jsonwebtoken');
/**
 * Function to register user
 * @param req
 * @param res
 * @returns
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password, roleId, isValidated, lat, lng, phone, address } = req.body;
        // Verificar si el usuario ya existe
        const existingUser = await user_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'Este correo electrónico ya está registrado.' });
            return;
        }
        // hashing password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // Crear el nuevo usuario
        const user = await user_1.default.create({
            name,
            email,
            password: hashedPassword,
            roleId,
            isValidated,
        });
        const userId = user.id;
        await UserDetails_1.default.create({
            userId,
            phone,
            address,
            lat,
            lng
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
        // extrack from URL token
        const token = req.params.token;
        // check and verify userID from token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        // update user to validated a 1 if token is valid
        const [updatedRows] = await user_1.default.update({ isValidated: 1 }, { where: { id: userId, isValidated: 0 } } // only if user is not validated
        );
        // check if email it´s validated
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
/**
 * create new user from dashboard function
 * @param req
 * @param res
 * @returns
 */
const createUser = async (req, res) => {
    try {
    }
    catch (error) {
    }
};
exports.createUser = createUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await user_1.default.findAll({
            attributes: ['id', 'name', 'email', 'isValidated', 'roleId'],
        });
        res.json(users); // Envía los usuarios
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
};
exports.getAllUsers = getAllUsers;
const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await user_1.default.findOne({
            where: { id: userId },
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: UserDetails_1.default,
                    as: 'details',
                    attributes: ['phone', 'address', 'img_url', 'description'],
                },
            ],
        });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' }); // Envía la respuesta
            return; // Finaliza la ejecución del método
        }
        res.json(user); // Envía los detalles del usuario si existe
    }
    catch (error) {
        console.error('Error al obtener detalles del usuario:', error);
        res.status(500).json({ error: 'Error al obtener detalles del usuario' });
    }
};
exports.getUserDetails = getUserDetails;
/**
 * modify user from dashboard function
 * @param req
 * @param res
 * @returns
 */
const modifyUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password, roleId, phone, address, description, img_url, lat, lng } = req.body;
        // Hash password if provided
        const hashedPassword = password ? await bcrypt_1.default.hash(password, 10) : undefined;
        // Actualizar datos del usuario
        const userUpdateData = {
            name,
            email,
            roleId,
            ...(hashedPassword && { password: hashedPassword }), // Solo actualizar si se proporciona la contraseña
        };
        await user_1.default.update(userUpdateData, { where: { id: userId } });
        // Manejar UserDetails
        const existingDetails = await UserDetails_1.default.findOne({ where: { userId } });
        if (existingDetails) {
            // Actualizar si existen detalles
            await existingDetails.update({
                phone,
                address,
                description,
                img_url,
                lat,
                lng,
            });
        }
        else if (phone || address || description || img_url || lat || lng) {
            // Crear si no existen detalles y se proporcionan datos
            await UserDetails_1.default.create({
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
    }
    catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};
exports.modifyUser = modifyUser;
/**
 * delete user from dashboard function
 * @param req
 * @param res
 * @returns
 */
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleted = await user_1.default.destroy({
            where: { id: userId }
        });
        if (deleted) {
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};
exports.deleteUser = deleteUser;
/**
 * FUNCTION TO GETT ALL TEACHERS
 * @param req
 * @param res
 */
const getTeachers = async (req, res) => {
    try {
        const teachers = await user_1.default.findAll({
            where: { roleId: 2 },
        });
        res.status(200).json(teachers);
    }
    catch (error) {
        console.error('Error al obtener profesores:', error);
    }
};
exports.getTeachers = getTeachers;
const searchTeachers = async (req, res) => {
    console.log(req.query);
    const { inputName, inputCity, selectedCategory, minPrice, maxPrice, score, southWestLat, southWestLng, northEastLat, northEastLng, type } = req.query;
    const filters = {
        roleId: 2,
        isValidated: 1,
        ...(type && {
            '$course.modality_id$': type,
        }),
        ...(inputName && { name: inputName }),
        ...(inputCity && {
            '$details.address$': inputCity
        }),
        ...(selectedCategory && {
            '$course.category_id$': selectedCategory,
        }),
        ...(minPrice && { [sequelize_1.Op.or]: [
                { '$course.price$': { [sequelize_1.Op.between]: [minPrice, maxPrice] } },
                { '$course.price$': null }
            ] }),
        ...(southWestLat && southWestLng && northEastLat && northEastLng && {
            '$details.lat$': { [sequelize_1.Op.between]: [southWestLat, northEastLat] },
            '$details.lng$': { [sequelize_1.Op.between]: [southWestLng, northEastLng] },
        })
    };
    try {
        console.log(filters);
        const teachers = await user_1.default.findAll({
            where: filters,
            include: [
                {
                    model: UserDetails_1.default,
                    as: 'details',
                    attributes: ['phone', 'address', 'img_url', 'description', 'lat', 'lng'],
                },
                {
                    model: Course_1.default,
                    as: 'course',
                    attributes: ['price', 'modality_id', 'category_id'],
                }
            ],
        });
        res.status(200).json(teachers);
    }
    catch (error) {
        console.error('Error al obtener profesores:', error);
    }
};
exports.searchTeachers = searchTeachers;
const names = async (req, res, next) => {
    try {
        const names = await user_1.default.findAll({
            where: { roleId: 2 },
            attributes: ['name']
        });
        res.status(200).json(names);
    }
    catch (error) {
        next(error);
    }
};
exports.names = names;
const cities = async (req, res, next) => {
    try {
        const names = await user_1.default.findAll({
            where: { roleId: 2 },
            attributes: [],
            include: [{
                    model: UserDetails_1.default,
                    as: 'details',
                    attributes: ['address']
                }]
        });
        res.status(200).json(names);
    }
    catch (error) {
        next(error);
    }
};
exports.cities = cities;
const cityCords = async (req, res, next) => {
    const { city } = req.params;
    console.log(city);
    try {
        const coords = await UserDetails_1.default.findOne({
            where: { address: city },
            attributes: ['lat', 'lng']
        });
        res.status(200).json(coords);
    }
    catch (error) {
        next(error);
    }
};
exports.cityCords = cityCords;
