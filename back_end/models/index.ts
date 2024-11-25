import sequelize from '../config/database';
import ProfessorCourse from './ProfessorCourse';
import ProfessorRating from './ProfessorRating';

// Relaciones
ProfessorCourse.hasMany(ProfessorRating, { foreignKey: 'professorId' });
ProfessorRating.belongsTo(ProfessorCourse, { foreignKey: 'professorId' });

// Exportar modelos
export { sequelize, ProfessorCourse, ProfessorRating };
