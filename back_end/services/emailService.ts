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

// function to send email confirmation register
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


// function to send email contact form
export const sendContactEmail = async (name: string, email: string, message: string): Promise<void> => {
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
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw error;
  }
};
