'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('course_location', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      idCourse: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: 'id'
        }
      },
      lat: {
        type: Sequelize.DECIMAL(9, 6)
      },
      lng: {
        type: Sequelize.DECIMAL(9, 6)
      },
      address: {
        type: Sequelize.STRING(255)
      },
      onlineLink: {
        type: Sequelize.STRING(255)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('course_location');
  }
};