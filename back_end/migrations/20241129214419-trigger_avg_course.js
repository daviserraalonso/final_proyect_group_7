'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {`
    CREATE TRIGGER update_average_course 
AFTER INSERT ON professor_rating
FOR EACH ROW 
BEGIN
    IF EXISTS (SELECT 1 FROM avg_course WHERE courseId = NEW.courseId) THEN
        UPDATE avg_course
        SET avg = (
            SELECT AVG(rating_course)
            FROM professor_rating
            WHERE courseId = NEW.courseId
        )
        WHERE courseId = NEW.courseId;
    ELSE
        INSERT INTO avg_course (courseId, avg)
        VALUES (
            NEW.courseId,
            (SELECT AVG(rating_course) FROM professor_rating WHERE courseId = NEW.courseId)
        );
    END IF;
END;
`
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS update_average_teacher;
   `)
  }
};
