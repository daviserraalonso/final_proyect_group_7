'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // get examples id
    const subjectIds = await queryInterface.sequelize.query(
      'SELECT id FROM subject LIMIT 3;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const userIds = await queryInterface.sequelize.query(
      'SELECT id FROM user LIMIT 3;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (subjectIds.length === 0 || userIds.length === 0) {
      console.error('No se encontraron datos en las tablas subject o user.');
      return;
    }

    // create task
    const tasks = [
      {
        subjectId: subjectIds[0].id,
        userId: userIds[0].id,
        comments: 'Primera tarea sobre Álgebra.',
        punctuation: 8.5,
        submission: 'https://example.com/submissions/1',
        feedback: 'Buen trabajo, pero mejorar en los detalles.',
        creationDate: new Date(),
        deadline: '2024-12-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subjectId: subjectIds[1].id,
        userId: userIds[1].id,
        comments: 'Tarea sobre Geometría.',
        punctuation: 9.0,
        submission: 'https://example.com/submissions/2',
        feedback: 'Excelente trabajo.',
        creationDate: new Date(),
        deadline: '2024-12-10',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subjectId: subjectIds[2].id,
        userId: userIds[2].id,
        comments: 'Tarea final de Trigonometría.',
        punctuation: 7.0,
        submission: null,
        feedback: 'Falta entregar, pero tiene buenos fundamentos.',
        creationDate: new Date(),
        deadline: '2024-12-15',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // insert in db
    await queryInterface.bulkInsert('tasks', tasks, {});
  },

  down: async (queryInterface, Sequelize) => {
    // delete task
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
