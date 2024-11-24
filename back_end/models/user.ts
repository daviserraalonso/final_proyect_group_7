import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import UserDetails from './UserDetails';
import Course from './Course';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public roleId!: number;
  public isValidated?: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isValidated: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'user',
  }
);

User.hasOne(UserDetails, {
  foreignKey: 'userId',
  as: 'details',
});

User.hasMany(Course, {
  foreignKey: 'professor_id',
  as: 'course'
})

export default User;
