'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const finalGrades = [
      {
        courseId: 1,
        studentId: 4,
        finalGrade: 8.5,
        comments: 'Buen desempeño en álgebra.',
        creationDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 4,
        studentId: 5,
        finalGrade: 9.2,
        comments: 'Excelente trabajo en programación.',
        creationDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('final_grades', finalGrades, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('final_grades', null, {});
  },
};
