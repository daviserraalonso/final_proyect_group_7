import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import StudentCourse from './StudentCourse';

class Course extends Model {

}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modality_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    professor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Course',
    tableName: 'Course',
    timestamps: true, // Para incluir createdAt y updatedAt
  }
);


export default Course;
