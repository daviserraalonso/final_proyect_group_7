"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/ProfessorRating.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class ProfessorRating extends sequelize_1.Model {
    id;
    professorId;
    studentId;
    courseId;
    rating_teacher;
    rating_course;
    comments;
    ratingDate;
}
ProfessorRating.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    professorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'professorId',
    },
    studentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'studentId',
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'courseId',
    },
    rating_teacher: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        field: 'rating_teacher',
    },
    rating_course: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        field: 'rating_course'
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'comments',
    },
    ratingDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'ratingDate',
    },
}, {
    sequelize: database_1.default,
    modelName: 'ProfessorRating',
    tableName: 'professor_rating',
    timestamps: false,
});
exports.default = ProfessorRating;
