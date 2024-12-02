'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('avg_teacher', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      professorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'professor_rating',
          key: 'professorId',
        },
        onDelete: 'CASCADE'
      },
      avg: {
        type: Sequelize.DECIMAL(2,1),
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('avg_techer')
  }
};
