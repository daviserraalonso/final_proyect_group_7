"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Task extends sequelize_1.Model {
    id;
    subjectId;
    userId;
    comments;
    punctuation;
    submission; // Nuevo: Respuesta del estudiante
    feedback; // Nuevo: Comentarios del profesor
    creationDate;
    deadline;
}
Task.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    subjectId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    comments: {
        type: sequelize_1.DataTypes.TEXT, // Permitir comentarios largos
        allowNull: true,
    },
    punctuation: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: 1.0,
            max: 10.0,
        },
    },
    submission: {
        type: sequelize_1.DataTypes.TEXT, // Permitir almacenar texto o enlaces
        allowNull: true,
    },
    feedback: {
        type: sequelize_1.DataTypes.TEXT, // Comentarios del profesor
        allowNull: true,
    },
    creationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true, // Agrega `createdAt` y `updatedAt` automáticamente
});
exports.default = Task;
