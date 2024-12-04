// models/chat.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

// define attribute in model
interface ChatAttributes {
  id: number;
  studentId: number;
  professorId: number;
}

interface ChatCreationAttributes extends Optional<ChatAttributes, 'id'> {}

class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes {
  public id!: number;
  public studentId!: number;
  public professorId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
