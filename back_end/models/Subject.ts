// models/Subject.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Subject = sequelize.define(
  'Subject',
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
    tableName: 'subject',
    timestamps: true,
  }
);

module.exports = Subject;
