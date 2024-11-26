'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userDetails = [
      {
        userId: await queryInterface.rawSelect('user', { where: { name: 'Goten' } }, ['id']),
        phone: '1234567890',
        description: 'Descripción de Goten',
        img_url: 'url_de_imagen_goten',
        address: 'Dirección de Goten',
        lat: 40.712776,
        lng: -74.005974,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: await queryInterface.rawSelect('user', { where: { name: 'Pan' } }, ['id']),
        phone: '1234567891',
        description: 'Descripción de Pan',
        img_url: 'url_de_imagen_pan',
        address: 'Dirección de Pan',
        lat: 34.052235,
        lng: -118.243683,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: await queryInterface.rawSelect('user', { where: { name: 'Bra' } }, ['id']),
        phone: '1234567892',
        description: 'Descripción de Bra',
        img_url: 'url_de_imagen_bra',
        address: 'Dirección de Bra',
        lat: 51.507351,
        lng: -0.127758,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('user_details', userDetails, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_details', null, {});
  },
};