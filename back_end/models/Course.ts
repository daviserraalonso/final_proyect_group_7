// models/Course.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Course extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public category_id!: number;
    public modality_id!: number;
    public startDate!: Date;
    public endDate!: Date;
    public requirements?: string;
    public description?: string;
    public professor_id!: number;
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'price',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id',
    },
    modality_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'modality_id',
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'startDate',
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'endDate',
    },
    requirements: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'requirements',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'description',
    },
    professor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'professor_id',
    },
  },
  {
    sequelize,
    modelName: 'Course',
    tableName: 'course',
    timestamps: true,
  }
);

export default Course;
