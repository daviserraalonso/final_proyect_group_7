"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactEmail = exports.sendConfirmationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // gmail email
        pass: process.env.GMAIL_PASS, // application password
    },
});
// function to send email confirmation register
const sendConfirmationEmail = async (to, subject, html) => {
    console.log(to);
    const mailOptions = {
        from: `"Teacher App" <${process.env.GMAIL_USER}>`,
        to,
        cc: process.env.GMAIL_ADMIN,
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
// function to send email contact form
const sendContactEmail = async (name, email, message) => {
    const mailOptions = {
        from: `"Formulario de Contacto" <${process.env.GMAIL_USER}>`,
        to: 'grupo7unir@yahoo.com',
        replyTo: email,
        subject: `Nuevo mensaje de contacto de ${name}`,
        html: `
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: %s', info.messageId);
    }
    catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw error;
    }
};
exports.sendContactEmail = sendContactEmail;
