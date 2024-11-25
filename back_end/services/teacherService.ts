import { sequelize, ProfessorCourse, ProfessorRating } from '../models';
import Category from '../models/Category';

export async function getTopProfessors(limit: number = 3) {
  const results = await ProfessorRating.findAll({
    attributes: [
      'professorId',
      [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
      [sequelize.fn('COUNT', sequelize.col('rating')), 'ratingCount'],
    ],
    include: [
      {
        model: ProfessorCourse,
        attributes: ['professorId', 'courseId'],
      },
    ],
    group: ['professorId', 'ProfessorCourse.id'],
    order: [
      [sequelize.fn('AVG', sequelize.col('rating')), 'DESC'],
      [sequelize.fn('COUNT', sequelize.col('rating')), 'DESC'],
    ],
    limit,
  });

  return results.map((result: any) => ({
    professorId: result.get('professorId'),
    name: result.ProfessorCourse.name,
    Category: result.ProfessorCourse.category_name,
    img: result.ProfessorCourse.img,
    averageRating: parseFloat(result.get('averageRating')),
    ratingCount: parseInt(result.get('ratingCount'), 10),
  }));
}
