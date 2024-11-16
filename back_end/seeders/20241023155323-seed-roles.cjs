'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = [
      { id: 1, role_name: 'administrator' },
      { id: 2, role_name: 'teacher' },
      { id: 3, role_name: 'student' },
    ];

    console.log('Insertando roles:', roles);

    await queryInterface.bulkInsert('role', roles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role', null, {});
  },
};
