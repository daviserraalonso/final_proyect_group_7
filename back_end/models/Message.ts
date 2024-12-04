// models/Message.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'chatId',
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'senderId',
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'content',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'isRead',
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Message',
    tableName: 'message',
    timestamps: true,
  }
);

export default Message;
