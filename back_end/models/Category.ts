// models/category.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Category extends Model {
  public id!: number;
  public name!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'category_name',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'description',
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    timestamps: true,
  }
);

export default Category;
