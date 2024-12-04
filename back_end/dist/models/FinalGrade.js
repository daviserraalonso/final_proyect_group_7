"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/FinalGrade.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class FinalGrade extends sequelize_1.Model {
    id;
    courseId;
    studentId;
    finalGrade;
    comments;
    creationDate;
}
FinalGrade.init({
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
    studentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'studentId',
    },
    finalGrade: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        field: 'finalGrade',
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'comments',
    },
    creationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'creationDate',
    },
}, {
    sequelize: database_1.default,
    modelName: 'FinalGrade',
    tableName: 'final_grades',
    timestamps: true,
});
exports.default = FinalGrade;
