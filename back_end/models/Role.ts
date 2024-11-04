// models/role.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Role extends Model {
  public id!: number;
  public name!: string;
}

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
    timestamps: true,
  }
);

export default Role;
