"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/CourseLocation.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class CourseLocation extends sequelize_1.Model {
    id;
    courseId;
    professorId;
    studentId;
}
CourseLocation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'courseId',
    },
    lat: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        field: 'lat',
    },
    lang: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        field: 'lang',
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'address',
    },
    onlineLink: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'onlineLink',
    },
}, {
    sequelize: database_1.default,
    modelName: 'CourseLocation',
    tableName: 'course_location',
    timestamps: true,
});
exports.default = CourseLocation;
