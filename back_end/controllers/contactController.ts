import { Request, Response } from 'express';
import { sendContactEmail } from '../services/emailService';

// function to send email contact form
export const handleContactForm = async (req: Request, res: Response): Promise<void> => {
  const { name, email, message } = req.body;

  try {
    // call to service
    await sendContactEmail(name, email, message);

    res.status(200).json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};
