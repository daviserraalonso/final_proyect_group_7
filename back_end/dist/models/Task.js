"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Task.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Task extends sequelize_1.Model {
    id;
    subjectId;
    userId;
    comments;
    punctuation;
    creationDate;
    deadline;
}
Task.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    subjectId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'subjectId',
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'userId',
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'comments',
    },
    punctuation: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        field: 'punctuation',
    },
    creationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'creationDate',
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'deadline',
    },
}, {
    sequelize: database_1.default,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
});
exports.default = Task;
