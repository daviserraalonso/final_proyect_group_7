"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class StudentCourse extends sequelize_1.Model {
    // relation
    course;
    // Métodos de Sequelize
    getCourse;
}
StudentCourse.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    studentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    enrollmentDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'StudentCourse',
    tableName: 'student_course',
    timestamps: true,
});
exports.default = StudentCourse;
