"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_details", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      phone: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      img_url: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.DECIMAL(9, 6),
      },
      lng: {
        type: Sequelize.DECIMAL(9, 6),
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
    await queryInterface.dropTable("user_details");
  },
};
