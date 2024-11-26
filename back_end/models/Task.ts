import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Task extends Model {
  public id!: number;
  public subjectId!: number;
  public userId!: number;
  public comments?: string;
  public punctuation?: number;
  public submission?: string; // Nuevo: Respuesta del estudiante
  public feedback?: string; // Nuevo: Comentarios del profesor
  public creationDate!: Date;
  public deadline?: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT, // Permitir comentarios largos
      allowNull: true,
    },
    punctuation: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 1.0,
        max: 10.0,
      },
    },
    submission: {
      type: DataTypes.TEXT, // Permitir almacenar texto o enlaces
      allowNull: true,
    },
    feedback: {
      type: DataTypes.TEXT, // Comentarios del profesor
      allowNull: true,
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true, // Agrega `createdAt` y `updatedAt` automáticamente
  }
);

module.exports = Task;
