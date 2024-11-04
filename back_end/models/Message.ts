// models/Message.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Message extends Model {
    public id!: number;
    public chatId!: number;
    public senderId!: number;
    public content!: string;
    public createdAt!: Date;
    public isRead?: boolean;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
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
    tableName: 'messages',
    timestamps: true,
  }
);

export default Message;
