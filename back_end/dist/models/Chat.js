"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/chat.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Chat extends sequelize_1.Model {
    id;
    courseId;
    professorId;
    studentId;
}
Chat.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'courseId',
    },
    professorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'professorId',
    },
    studentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'studentId',
    },
}, {
    sequelize: database_1.default,
    modelName: 'Chat',
    tableName: 'chat',
    timestamps: true,
});
exports.default = Chat;
