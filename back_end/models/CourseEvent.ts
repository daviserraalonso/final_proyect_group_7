// models/CourseEvent.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class CourseEvent extends Model {
  public id!: number;
  public courseId!: number;
  public professorId!: number;
  public studentId!: number;
}

CourseEvent.init(
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
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'subjectId',
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'eventType',
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'title',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'description',
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'startDateTime',
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'endDateTime',
    },
    locationType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'locationType',
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'locationId',
    },
    onlineLink: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'onlineLink',
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'deadline',
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'isRead',
    },
  },
  {
    sequelize,
    modelName: 'CourseEvent',
    tableName: 'course_event',
    timestamps: true,
  }
);

export default CourseEvent;
