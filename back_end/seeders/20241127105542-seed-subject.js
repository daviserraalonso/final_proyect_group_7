'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const subjects = [
      {
        name: 'Álgebra',
        courseId: 1,
        description: 'Curso básico de álgebra.',
        finalGrade: 9.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Geometría',
        courseId: 1,
        description: 'Curso avanzado de geometría.',
        finalGrade: 8.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Programación I',
        courseId: 4,
        description: 'Curso introductorio de programación.',
        finalGrade: 7.8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('subject', subjects, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subject', null, {});
  },
};
