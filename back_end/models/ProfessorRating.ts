// models/ProfessorRating.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class ProfessorRating extends Model {
  // Eliminar las declaraciones de campos públicos
}

ProfessorRating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Asegúrate de que autoIncrement esté configurado como true
    },
    professorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'professorId',
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'studentId',
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'courseId',
    },
    rating_teacher: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'rating_teacher',
    },
    rating_course: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'rating_course'
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'comments',
    },
    ratingDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'ratingDate',
    },
  },
  {
    sequelize,
    modelName: 'ProfessorRating',
    tableName: 'professor_rating',
    timestamps: false,
  }
);

// Eliminar la sincronización forzada
// sequelize.sync({ force: true }).then(() => {
//   console.log("La tabla 'professor_rating' ha sido recreada.");
// });

export default ProfessorRating;
