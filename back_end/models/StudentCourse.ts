import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Course from './Course';
import User from './User';

class StudentCourse extends Model {
  // No declares propiedades públicas aquí

  // Métodos de Sequelize
  public getCourse!: () => Promise<Course>;

  // Propiedades de asociación
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
