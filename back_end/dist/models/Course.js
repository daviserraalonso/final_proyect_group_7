"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Course.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Course extends sequelize_1.Model {
    id;
    name;
    price;
    category_id;
    modality_id;
    startDate;
    endDate;
    requirements;
    description;
    professor_id;
}
Course.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'name',
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        field: 'price',
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id',
    },
    modality_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'modality_id',
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'startDate',
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'endDate',
    },
    requirements: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'requirements',
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'description',
    },
    professor_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'professor_id',
    },
}, {
    sequelize: database_1.default,
    modelName: 'Course',
    tableName: 'course',
    timestamps: true,
});
exports.default = Course;
