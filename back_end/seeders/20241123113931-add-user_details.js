'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


    const teachers = [
      {
        id: 1,
        userId: 2,
        address: 'Madrid',
        lat: 40.416705,
        lng: -3.703583
      },
      {
        id: 2,
        userId: 3,
        address: 'Barcelona',
        lat: 41.387397,
        lng: 2.168568
      },
      {
        id: 3,
        userId: 4,
        address: 'Reus',
        lat: 41.149826,
        lng: 1.105532
      },
    ];



    await queryInterface.bulkInsert('user_details', teachers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_details');
  },
};
