'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('course_event', {
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
      idSubject: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subject',
          key: 'id'
        }
      },
      eventType: {
        type: Sequelize.ENUM('class', 'task'),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      startDateTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endDateTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      locationType: {
        type: Sequelize.ENUM('physical', 'online'),
        allowNull: false
      },
      locationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'course_location',
          key: 'id'
        }
      },
      onlineLink: {
        type: Sequelize.STRING(255)
      },
      deadline: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('course_event');
  }
};