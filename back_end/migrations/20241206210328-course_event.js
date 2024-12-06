"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("course_event", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "course",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      professorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      subjectId: {
        type: Sequelize.INTEGER,
        references: {
          model: "subject",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      eventType: {
        type: Sequelize.ENUM("class", "task"),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      startDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      locationType: {
        type: Sequelize.ENUM("physical", "online"),
        allowNull: false,
      },
      locationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "course_location",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      onlineLink: {
        type: Sequelize.STRING,
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("course_event");
  },
};
