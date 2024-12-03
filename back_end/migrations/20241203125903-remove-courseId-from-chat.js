'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('chat', 'courseId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('chat', 'courseId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
