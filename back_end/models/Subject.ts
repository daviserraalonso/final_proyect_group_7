// models/Subject.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

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
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'courseId',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'description',
    },
    finalGrade: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'finalGrade',
    },
  },
  {
    sequelize,
    modelName: 'Subject',
    tableName: 'subjects',
    timestamps: true,
  }
);

export default Subject;
