"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
async function findUserByEmail(email) {
    return await User_1.default.findOne({ where: { email } });
}
class LoginController {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await findUserByEmail(email);
            console.log('Usuario encontrado:', user?.get()); // Muestra los datos del usuario correctamente
            if (!user || !user.get('password')) {
                res.status(401).json({ message: 'Credenciales inválidas' });
                return;
            }
            if (bcrypt_1.default.compareSync(password, user.get('password'))) {
                const token = jsonwebtoken_1.default.sign({ id: user.get('id'), role: user.get('roleId') }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
                res.json({ user: { id: user.get('id'), role: user.get('roleId') }, token });
            }
            else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        }
        catch (error) {
            console.error('Error en el servidor:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
}
exports.default = new LoginController();
