"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const courseEvents = [
      {
        courseId: 1,
        subjectId: 1,
        eventType: "class",
        title: "Clase introductoria de Álgebra",
        description: "Primer día del curso.",
        startDateTime: new Date(),
        endDateTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        locationType: "physical",
        locationId: 1,
        onlineLink: "enlace_prueba",
        deadline: null,
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 4,
        subjectId: 3,
        eventType: "task",
        title: "Entrega de práctica de Programación",
        description: "Subir el ejercicio en línea.",
        startDateTime: new Date(),
        endDateTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        locationType: "online",
        locationId: "enlace_2",
        onlineLink: "https://submit-task-programming.com",
        deadline: new Date(new Date().setDate(new Date().getDate() + 7)),
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("course_event", courseEvents, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("course_event", null, {});
  },
};
