'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`

      CREATE TRIGGER update_average_teacher AFTER INSERT ON professor_rating
 FOR EACH ROW BEGIN
    IF EXISTS (SELECT 1 FROM avg_teacher WHERE professorId = NEW.professorId) THEN
        UPDATE avg_teacher
        SET avg = (
            SELECT AVG(rating_teacher)
            FROM professor_rating
            WHERE professorId = NEW.professorId
        )
        WHERE professorId = NEW.professorId;
    ELSE
        INSERT INTO avg_teacher (professorId, avg)
        VALUES (
            NEW.professorId,
            (SELECT AVG(rating_teacher) FROM professor_rating WHERE professorId = NEW.professorId)
        );
    END IF;
END;

`
)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
         DROP TRIGGER IF EXISTS update_average_teacher;
      `)
  }
};
