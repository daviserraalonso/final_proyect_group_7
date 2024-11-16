"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Subject.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Subject = database_1.default.define('Subject', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    finalGrade: {
        type: sequelize_1.DataTypes.DECIMAL(3, 2),
        allowNull: true,
    },
}, {
    tableName: 'subject',
    timestamps: true,
});
module.exports = Subject;
