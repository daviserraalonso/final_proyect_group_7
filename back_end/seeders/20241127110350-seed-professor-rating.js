'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ratings = [
      {
        professorId: 3, // Profesor del curso 1
        studentId: 4, // Estudiante Goten
        courseId: 1, // Curso 1
        rating_teacher: 3,
        rating_course: 4,
        comments: 'El profesor es muy claro al explicar.',
        ratingDate: new Date(),
      },
      {
        professorId: 2, // Profesor del curso 2 
        studentId: 5, // Estudiante Pan
        courseId: 2, // Curso 2
        rating_teacher: 4,
        rating_course: 3,
        comments: 'Excelente profesor, muy paciente.',
        ratingDate: new Date(),
      },
      {
        professorId: 2, // Profesor del curso 4 
        studentId: 6, // Estudiante Bra
        courseId: 4, // Curso 4
        rating_teacher: 5,
        rating_course: 5,
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
