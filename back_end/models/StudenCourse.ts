// models/StudentCourse.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class StudentCourse extends Model {
    public id!: number;
    public studentId!: number;
    public courseId!: number;
    public enrollmentDate!: Date;
}

StudentCourse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'studentId',
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'courseId',
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'enrollmentDate',
    },
  },
  {
    sequelize,
    modelName: 'StudentCourse',
    tableName: 'student_courses',
    timestamps: true,
  }
);

export default StudentCourse;
