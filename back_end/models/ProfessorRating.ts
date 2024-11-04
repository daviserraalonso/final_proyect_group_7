// models/ProfessorRating.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class ProfessorRating extends Model {
    public id!: number;
    public professorId!: number;
    public studentId!: number;
    public courseId!: number;
    public rating?: number;
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
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'rating',
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'comments',
    },
    ratingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'ratingDate',
    },
  },
  {
    sequelize,
    modelName: 'ProfessorRating',
    tableName: 'professor_ratings',
    timestamps: true,
  }
);

export default ProfessorRating;
