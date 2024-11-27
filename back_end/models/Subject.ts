// models/Subject.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Course from './Course'; // Importar el modelo relacionado si es necesario

class Subject extends Model {
  public id!: number;
  public name!: string;
  public courseId!: number;
  public description?: string;
  public finalGrade?: number;
}

Subject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    finalGrade: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'subject',
    timestamps: true,
  }
);

export default Subject;
