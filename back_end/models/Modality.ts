// models/Modality.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Modality extends Model { }

Modality.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'type',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'description',
    },
  },
  {
    sequelize,
    modelName: 'Modality',
    tableName: 'modality',
    timestamps: true,
  }
);

export default Modality;
