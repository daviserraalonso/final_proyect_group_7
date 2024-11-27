'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const professorCourses = [
      { professorId: 2, courseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { professorId: 2, courseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { professorId: 3, courseId: 3, createdAt: new Date(), updatedAt: new Date() },
      { professorId: 3, courseId: 4, createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('professor_course', professorCourses, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('professor_course', null, {});
  },
};
