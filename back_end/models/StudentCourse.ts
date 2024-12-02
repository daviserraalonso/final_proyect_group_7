import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Course from './Course';

class StudentCourse extends Model {
  
  // method sequalize
  public getCourse!: () => Promise<Course>;

  // associations properties
  public readonly course?: Course;
}

StudentCourse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'StudentCourse',
    tableName: 'student_course',
    timestamps: true,
  }
);

export default StudentCourse;
