// models/chat.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Chat extends Model {
    public id!: number;
    public courseId!: number;
    public professorId!: number;
    public studentId!: number;
}

Chat.init(
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
  },
  {
    sequelize,
    modelName: 'Chat',
    tableName: 'chat',
    timestamps: true,
  }
);

export default Chat;
