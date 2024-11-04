// models/UserDetails.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class UserDetails extends Model {
    public id!: number;
    public userId!: number;
    public phone?: string;
    public description?: string;
    public img_url?: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

UserDetails.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userId',
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'phone',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'description',
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'img_url',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt',
    },
  },
  {
    sequelize,
    modelName: 'UserDetails',
    tableName: 'user_details',
    timestamps: true,
  }
);

export default UserDetails;
