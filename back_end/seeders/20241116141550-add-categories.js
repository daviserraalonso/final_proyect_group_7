'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      { id: 1, category_name: 'Matemáticas', description: 'calculate', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, category_name: 'Informática', description: 'computer', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, category_name: 'Inglés', description: 'language', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, category_name: 'Programación', description: 'code', createdAt: new Date(), updatedAt: new Date() },
    ];

    console.log('Insertando categorías:', categories);

    await queryInterface.bulkInsert('category', categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('category', null, {});
  },
};
