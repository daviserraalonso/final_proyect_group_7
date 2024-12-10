module.exports = (sequelize, DataTypes) => {
  const AvgCourse = sequelize.define("AvgCourse", {
    // ...existing code...
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ProfessorRating", // Nombre del modelo al que hace referencia
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    // ...existing code...
  });

  AvgCourse.associate = function (models) {
    AvgCourse.belongsTo(models.ProfessorRating, {
      foreignKey: "courseId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return AvgCourse;
};
