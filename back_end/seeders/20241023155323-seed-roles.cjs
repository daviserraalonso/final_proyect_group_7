// seeders/YYYYMMDDHHMMSS-seed-roles.cjs
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = [
      { id: 1, role_name: 'administrador' },
      { id: 2, role_name: 'profesor' },
      { id: 3, role_name: 'estudiante' },
    ];

    console.log('Insertando roles:', roles);

    await queryInterface.bulkInsert('role', roles, {}); // Asegúrate de usar 'role' como nombre de la tabla
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role', null, {});
  },
};
