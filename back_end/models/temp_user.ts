import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {

  get userId(): number {
    return this.getDataValue('id');
  }

  // Getter para name
  get userName(): string {
    return this.getDataValue('name');
  }

  // Getter para email
  get userEmail(): string {
    return this.getDataValue('email');
  }

  // Getter para password
  get userPassword(): string {
    return this.getDataValue('password');
  }

  // Getter para roleId
  get userRoleId(): number {
    return this.getDataValue('roleId');
  }

  // Getter para validated
  get userisValidated(): number {
    return this.getDataValue('isValidated');
  }
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
    modelName: 'User',
    tableName: 'user',
  }
);

export default User;
