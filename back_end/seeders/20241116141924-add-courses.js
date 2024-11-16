'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const courses = [
      {
        id: 1,
        name: 'Curso de Matemáticas Básicas',
        price: 300,
        description: 'Un curso introductorio a las matemáticas.',
        category_id: 1,
        modality_id: 1,
        startDate: new Date(),
        endDate: new Date(),
        requirements: 'nothing',
        professor_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Programación en Python',
        price: 350,
        description: 'Aprende a programar en Python desde cero.',
        category_id: 4,
        modality_id: 2,
        startDate: new Date(),
        endDate: new Date(),
        requirements: 'nothing',
        professor_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    console.log('Insertando cursos:', courses);

    await queryInterface.bulkInsert('course', courses, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('course', null, {});
  },
};
