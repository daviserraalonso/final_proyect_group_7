module.exports = (sequelize, DataTypes) => {
  const ProfessorRating = sequelize.define("ProfessorRating", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // ...existing code...
  });

  ProfessorRating.associate = function (models) {
    ProfessorRating.hasMany(models.AvgCourse, {
      foreignKey: "courseId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return ProfessorRating;
};
