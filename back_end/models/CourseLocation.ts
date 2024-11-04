// models/CourseLocation.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class CourseLocation extends Model {
    public id!: number;
    public courseId!: number;
    public professorId!: number;
    public studentId!: number;
}

CourseLocation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'courseId',
    },
    lat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'lat',
    },
    lang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'lang',
    },
    
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'address',
    },
    onlineLink: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'onlineLink',
    },
  },
  {
    sequelize,
    modelName: 'CourseLocation',
    tableName: 'course_event',
    timestamps: true,
  }
);

export default CourseLocation;
