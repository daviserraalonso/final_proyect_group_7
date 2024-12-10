"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class CourseEvent extends sequelize_1.Model {
    id;
    courseId;
    subjectId;
    professorId;
    eventType;
    title;
    description;
    startDateTime;
    endDateTime;
    locationType;
    locationId;
    onlineLink;
    deadline;
    isRead;
    createdAt;
    updatedAt;
}
CourseEvent.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    subjectId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    professorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false, // Este campo es obligatorio
    },
    eventType: {
        type: sequelize_1.DataTypes.ENUM('class', 'task'),
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    startDateTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    endDateTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    locationType: {
        type: sequelize_1.DataTypes.ENUM('Presential', 'Online'),
        allowNull: false,
    },
    locationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    onlineLink: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    isRead: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    modelName: 'CourseEvent',
    tableName: 'course_event',
    timestamps: true,
});
exports.default = CourseEvent;
