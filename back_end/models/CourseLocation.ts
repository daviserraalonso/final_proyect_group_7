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
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'lat',
    },
    lang: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'lang',
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'address',
    },
    onlineLink: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'onlineLink',
    },
  },
  {
    sequelize,
    modelName: 'CourseLocation',
    tableName: 'course_location',
    timestamps: true,
  }
);

export default CourseLocation;
