"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/ProfessorCourse.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class ProfessorCourse extends sequelize_1.Model {
    id;
    professorId;
    courseId;
}
ProfessorCourse.init({
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
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'courseId',
    },
}, {
    sequelize: database_1.default,
    modelName: 'ProfessorCourse',
    tableName: 'professor_courses',
    timestamps: true,
});
exports.default = ProfessorCourse;
