'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      subjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subject',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      comments: {
        type: Sequelize.TEXT,
      },
      punctuation: {
        type: Sequelize.DECIMAL(3, 2),
        check: 'punctuation >= 1 AND punctuation <= 10',
      },
      submission: {
        type: Sequelize.TEXT, // Permitir almacenar texto o enlaces
        allowNull: true,
      },
      feedback: {
        type: Sequelize.TEXT, // Comentarios del profesor
        allowNull: true,
      },
      creationDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      deadline: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tasks');
  },
};