// models/role.js
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'role_name',
    },
  },
  {
    sequelize,
    modelName: 'Role',
    tableName: 'role',
    timestamps: false,
  }
);

export default Role;
