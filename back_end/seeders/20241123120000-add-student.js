'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const students = [
      {
        name: 'Goten',
        email: 'goten@example.com',
        password: await bcrypt.hash('password1', 10),
        roleId: 3, // Role de estudiante
        isValidated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pan',
        email: 'pan@example.com',
        password: await bcrypt.hash('password2', 10),
        roleId: 3, // Role de estudiante
        isValidated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bra',
        email: 'bra@example.com',
        password: await bcrypt.hash('password3', 10),
        roleId: 3, // Role de estudiante
        isValidated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('user', students, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  },
};