'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('professor_rating', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      professorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      rating_teacher: {
        type: Sequelize.DECIMAL(2, 1),
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      rating_course: {
        type: Sequelize.DECIMAL(2, 1),
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comments: {
        type: Sequelize.TEXT,
      },
      ratingDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('professor_rating', {
      fields: ['professorId', 'studentId', 'courseId'],
      type: 'unique',
      name: 'unique_professor_student_course'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('professor_rating');
  },
};