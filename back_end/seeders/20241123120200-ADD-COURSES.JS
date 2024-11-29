'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const courses = [
      {
        name: 'Curso 1',
        price: 0.0,
        category_id: await queryInterface.rawSelect('category', { where: { category_name: 'Matemáticas' } }, ['id']),
        modality_id: 1,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        professor_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Curso 2',
        price: 0.0,
        category_id: await queryInterface.rawSelect('category', { where: { category_name: 'Informática' } }, ['id']),
        modality_id: 2,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        professor_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Curso 3',
        price: 0.0,
        category_id: await queryInterface.rawSelect('category', { where: { category_name: 'Inglés' } }, ['id']),
        modality_id: 1,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        professor_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Curso 4',
        price: 0.0,
        category_id: await queryInterface.rawSelect('category', { where: { category_name: 'Programación' } }, ['id']),
        modality_id: 1,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        professor_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('course', courses, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('course', null, {});
  },
};