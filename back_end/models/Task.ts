// models/Task.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Task extends Model {
    public id!: number;
    public subjectId!: number;
    public userId!: number;
    public comments?: string;
    public punctuation?: number;
    public creationDate!: Date;
    public deadline?: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'subjectId',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userId',
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'comments',
    },
    punctuation: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'punctuation',
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'creationDate',
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deadline',
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
  }
);

export default Task;
