"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/StudentCourse.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class StudentCourse extends sequelize_1.Model {
    id;
    studentId;
    courseId;
    enrollmentDate;
}
StudentCourse.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
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
    enrollmentDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'enrollmentDate',
    },
}, {
    sequelize: database_1.default,
    modelName: 'StudentCourse',
    tableName: 'student_courses',
    timestamps: true,
});
exports.default = StudentCourse;
