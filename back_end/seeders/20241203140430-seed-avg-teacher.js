"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "avg_teacher",
      [
        { professorId: 2, avg: 6 },
        { professorId: 2, avg: 3.8 },
        { professorId: 3, avg: 3.8 },
        { professorId: 3, avg: 4.2 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("avg_teacher", null, {});
  },
};
