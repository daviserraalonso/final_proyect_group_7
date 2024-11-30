// models/ProfessorRating.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class ProfessorRating extends Model {
    public id!: number;
    public professorId!: number;
    public studentId!: number;
    public courseId!: number;
    public rating_teacher?: number;
    public rating_course?: number
    public comments?: string;
    public ratingDate!: Date;
}

ProfessorRating.init(
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
    rating_teacher: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'rating_teacher',
    },
    rating_course: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'rating_course'
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'comments',
    },
    ratingDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'ratingDate',
    },
  },
  {
    sequelize,
    modelName: 'ProfessorRating',
    tableName: 'professor_rating',
    timestamps: false,
  }
);

export default ProfessorRating;
