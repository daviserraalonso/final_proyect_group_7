'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const students = await queryInterface.sequelize.query(
      'SELECT id FROM user WHERE roleId = 3;', // get user with role student
      { type: Sequelize.QueryTypes.SELECT }
    );

    const courses = await queryInterface.sequelize.query(
      'SELECT id FROM course;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (students.length === 0 || courses.length === 0) {
      console.error('No hay estudiantes o cursos disponibles para asociar.');
      return;
    }

    // create relations
    const studentCourses = [
      {
        studentId: students[0]?.id,
        courseId: courses[0]?.id,
        enrollmentDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        studentId: students[1]?.id,
        courseId: courses[1]?.id,
        enrollmentDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        studentId: students[2]?.id,
        courseId: courses[2]?.id || courses[0]?.id,
        enrollmentDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // insert in studen couse
    await queryInterface.bulkInsert('student_course', studentCourses, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('student_course', null, {});
  },
};
