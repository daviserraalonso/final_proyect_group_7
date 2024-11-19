'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('teacher123', 10);

    const teachers = [
      {
        id: 1,
        name: 'Professor John Doe',
        email: 'teacher@example.com',
        password: hashedPassword,
        roleId: 2, // Role de profesor
        isValidated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    console.log('Insertando profesores:', teachers);

    await queryInterface.bulkInsert('user', teachers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', { email: 'teacher@example.com' });
  },
};
