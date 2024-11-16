import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class UserDetails extends Model {
  public id!: number;
  public userId!: number;
  public phone?: string;
  public address?: string;
  public img_url?: string;
  public description?: string;
}

UserDetails.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'user_details',
  }
);


export default UserDetails;
