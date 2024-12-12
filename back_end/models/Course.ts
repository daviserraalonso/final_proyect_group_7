import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Course extends Model {
  // No declares propiedades públicas aquí

  // Si necesitas métodos o propiedades adicionales, puedes agregarlos aquí
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
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modality_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'modality', // Asegúrate de que este nombre coincida con la tabla en la base de datos
        key: 'id',
      },
    },
    professor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
