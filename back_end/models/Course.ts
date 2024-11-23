import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Modality from './Modality';


const Course = sequelize.define('Course', {
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
    references: {
      model: Modality,
      key: 'id',
    },
  },
  professor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, 
{
  tableName: 'Course',
});


export default Course;
