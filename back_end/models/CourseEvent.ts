import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class CourseEvent extends Model {
  public id!: number;
  public courseId!: number;
  public subjectId!: number | null;
  public eventType!: 'class' | 'task';
  public title!: string;
  public description!: string | null;
  public startDateTime!: Date;
  public endDateTime!: Date;
  public locationType!: 'physical' | 'online';
  public locationId!: number | null;
  public onlineLink!: string | null;
  public deadline!: Date | null;
  public isRead!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

CourseEvent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    eventType: {
      type: DataTypes.ENUM('class', 'task'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    locationType: {
      type: DataTypes.ENUM('physical', 'online'),
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    onlineLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
