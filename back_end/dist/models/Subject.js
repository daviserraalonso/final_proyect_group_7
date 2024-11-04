"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Subject.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Subject extends sequelize_1.Model {
    id;
    name;
    courseId;
    description;
    finalGrade;
}
Subject.init({
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
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'courseId',
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'description',
    },
    finalGrade: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        field: 'finalGrade',
    },
}, {
    sequelize: database_1.default,
    modelName: 'Subject',
    tableName: 'subjects',
    timestamps: true,
});
exports.default = Subject;
