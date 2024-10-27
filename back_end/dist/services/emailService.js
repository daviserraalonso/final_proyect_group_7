"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Tu correo de Gmail
        pass: process.env.GMAIL_PASS, // Tu contraseña de aplicación
    },
});
const sendConfirmationEmail = async (to, subject, html) => {
    console.log(to);
    const mailOptions = {
        from: `"Teacher App" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        html,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: %s', info.messageId);
    }
    catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
};
exports.sendConfirmationEmail = sendConfirmationEmail;
