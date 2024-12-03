import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class AvgTeacher extends Model {}

AvgTeacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    professorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    avg: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'AvgTeacher',
    tableName: 'avg_teacher',
    timestamps: false
  }
);

export default AvgTeacher;
