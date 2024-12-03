'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('message', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('message', 'updatedAt');
  },
};
