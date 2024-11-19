'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const modalities = [
      { id: 1, type: 'Presential', description: 'description', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, type: 'Online', description: 'description', createdAt: new Date(), updatedAt: new Date() },
    ];

    console.log('Insertando modalidades:', modalities);

    await queryInterface.bulkInsert('modality', modalities, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('modality', null, {});
  },
};
