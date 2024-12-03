'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const chats = [
      {
        professorId: 2, // Profesor asignado al curso 1
        studentId: 4, // Estudiante Goten
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        professorId: 2,
        studentId: 5, // Estudiante Pan
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        professorId: 3, // Profesor asignado al curso 4
        studentId: 6, // Estudiante Bra
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('chat', chats, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('chat', null, {});
  },
};
