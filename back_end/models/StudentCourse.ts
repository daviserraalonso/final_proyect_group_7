import { Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import Course from './Course';
import User from './user';

class StudentCourse extends Model { 

  // relation
  public course?: Course;

  // Métodos de Sequelize
  public getCourse!: BelongsToGetAssociationMixin<Course>;
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
