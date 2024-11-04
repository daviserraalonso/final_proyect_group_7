// models/ProfessorCourse.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class ProfessorCourse extends Model {
    public id!: number;
    public professorId!: number;
    public courseId!: number;
}

ProfessorCourse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    professorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'professorId',
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'courseId',
    },
  },
  {
    sequelize,
    modelName: 'ProfessorCourse',
    tableName: 'professor_courses',
    timestamps: true,
  }
);

export default ProfessorCourse;
