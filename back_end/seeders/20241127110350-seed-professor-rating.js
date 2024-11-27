'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ratings = [
      {
        professorId: 2, // Profesor asignado al curso 1 (Álgebra)
        studentId: 4, // Estudiante Goten
        courseId: 1, // Álgebra
        rating: 4.5,
        comments: 'El profesor es muy claro al explicar.',
        ratingDate: new Date(),
      },
      {
        professorId: 2, // Profesor asignado al curso 1 (Álgebra)
        studentId: 5, // Estudiante Pan
        courseId: 1, // Álgebra
        rating: 4.8,
        comments: 'Excelente profesor, muy paciente.',
        ratingDate: new Date(),
      },
      {
        professorId: 3, // Profesor asignado al curso 4 (Programación)
        studentId: 6, // Estudiante Bra
        courseId: 4, // Programación
        rating: 4.2,
        comments: 'Explica bien, pero podría responder más rápido a preguntas.',
        ratingDate: new Date(),
      },
    ];

    await queryInterface.bulkInsert('professor_rating', ratings, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('professor_rating', null, {});
  },
};
