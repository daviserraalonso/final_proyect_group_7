"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContactForm = void 0;
const emailService_1 = require("../services/emailService");
// function to send email contact form
const handleContactForm = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // call to service
        await (0, emailService_1.sendContactEmail)(name, email, message);
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    }
    catch (error) {
        console.error('Error al enviar correo:', error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
};
exports.handleContactForm = handleContactForm;
