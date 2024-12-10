import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Course from './Course';
import User from './User';
class StudentCourse extends Model {
  // Métodos de Sequelize
  public getCourse!: () => Promise<Course>;
  public getStudent!: () => Promise<User>;

  // Propiedades
  public readonly id!: number;
  public studentId!: number;
  public courseId!: number;
  public enrollmentDate!: Date;

  // Propiedades de asociación
  public readonly course?: Course;
  public readonly student?: User; // Propiedad de la asociación con User
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
