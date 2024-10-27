"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const registerUser = async (req, res) => {
    try {
        const { name, email, password, roleId, phone, isValidated, lat, lng } = req.body;
        // Verificar si el usuario ya existe
        const existingUser = await User_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'Este correo electrónico ya está registrado.' });
            return;
        }
        // Hashear la contraseña
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
        // No devolver la contraseña en la respuesta
        const { password: _, ...userWithoutPassword } = user.get({ plain: true });
        res.status(201).json(userWithoutPassword);
    }
    catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.registerUser = registerUser;
