'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tasks = [
      {
        subjectId: 1, // Álgebra
        userId: 4, // Estudiante Goten
        comments: 'Resolver los ejercicios de la página 45.',
        punctuation: 9.5,
        submission: 'https://submission-url-goten.com',
        feedback: 'Buen trabajo, revisa los errores en el ejercicio 3.',
        creationDate: new Date(),
        deadline: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 días desde hoy
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subjectId: 1, // Álgebra
        userId: 5, // Estudiante Pan
        comments: 'Resolver los ejercicios de la página 45.',
        punctuation: 8.7,
        submission: 'https://submission-url-pan.com',
        feedback: 'Intenta mejorar la claridad en las explicaciones.',
        creationDate: new Date(),
        deadline: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 días desde hoy
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subjectId: 3, // Programación I
        userId: 6, // Estudiante Bra
        comments: 'Subir el código del proyecto final.',
        punctuation: 9.8,
        submission: 'https://github.com/bra/project-final',
        feedback: 'Excelente trabajo, muy bien documentado.',
        creationDate: new Date(),
        deadline: new Date(new Date().setDate(new Date().getDate() + 14)), // 14 días desde hoy
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('tasks', tasks, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
