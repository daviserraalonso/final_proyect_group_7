// models/FinalGrade.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class FinalGrade extends Model {
    public id!: number;
    public courseId!: number;
    public studentId!: number;
    public finalGrade?: number;
    public comments?: string;
    public creationDate!: Date;
}

FinalGrade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'courseId',
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'studentId',
    },
    finalGrade: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'finalGrade',
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'comments',
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'creationDate',
    },
  },
  {
    sequelize,
    modelName: 'FinalGrade',
    tableName: 'final_grades',
    timestamps: true,
  }
);

export default FinalGrade;
