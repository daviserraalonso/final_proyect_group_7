'use strict';

const bcrypt = require('bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash admin password
    const hashedPassword = await bcrypt.hash('admin', 10);

    // Inserta un usuario admin
    await queryInterface.bulkInsert('user', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        roleId: 1, // this number it´s for role admin
        isValidated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', { email: 'admin@example.com' });
  },
};
