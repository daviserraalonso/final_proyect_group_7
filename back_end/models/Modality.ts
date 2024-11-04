// models/Modality.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Modality extends Model {
    public id!: number;
    public type!: 'in-person' | 'online';
    public description?: string;
}

Modality.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    type: {
      type: DataTypes.ENUM('in-person', 'online'),
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
    tableName: 'modalities',
    timestamps: true,
  }
);

export default Modality;
