'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const courseLocations = [
      {
        courseId: 1,
        lat: 40.712776,
        lng: -74.005974,
        address: 'New York City',
        onlineLink: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 2,
        lat: 34.052235,
        lng: -118.243683,
        address: 'Los Angeles',
        onlineLink: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 3,
        lat: null,
        lng: null,
        address: null,
        onlineLink: 'https://online-course-3.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('course_location', courseLocations, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('course_location', null, {});
  },
};
