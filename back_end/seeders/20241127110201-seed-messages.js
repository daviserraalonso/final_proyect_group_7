'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const messages = [
      {
        chatId: 1, // Asociado al primer chat
        senderId: 2, // Profesor en el chat
        content: 'Bienvenidos al curso de Álgebra. ¿Cómo están todos?',
        isRead: 1,
        createdAt: new Date(),
      },
      {
        chatId: 1, // Asociado al primer chat
        senderId: 4, // Estudiante en el chat
        content: 'Hola profesor, estoy emocionado por empezar.',
        isRead: 1,
        createdAt: new Date(),
      },
      {
        chatId: 2, // Otro chat con otro estudiante
        senderId: 5, // Estudiante en el chat
        content: 'Buenas tardes, profesor. ¿Cuándo será el próximo examen?',
        isRead: 0,
        createdAt: new Date(),
      },
      {
        chatId: 2,
        senderId: 2, // Profesor responde
        content: 'Hola Pan, el examen será en dos semanas.',
        isRead: 1,
        createdAt: new Date(),
      },
      {
        chatId: 3, // Chat asociado a otro curso
        senderId: 6, // Otro estudiante
        content: 'Profesor, tengo dudas sobre la práctica de programación.',
        isRead: 0,
        createdAt: new Date(),
      },
      {
        chatId: 3,
        senderId: 3, // Profesor responde
        content: 'Claro, envíame tus preguntas por este medio.',
        isRead: 0,
        createdAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('message', messages, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('message', null, {});
  },
};
