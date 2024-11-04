import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // gmail email
    pass: process.env.GMAIL_PASS, // application password
  },
});

export const sendConfirmationEmail = async (to: string, subject: string, html: string) => {
    console.log(to)
  const mailOptions = {
    from: `"Teacher App" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: %s', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};
