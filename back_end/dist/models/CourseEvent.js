"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/CourseEvent.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class CourseEvent extends sequelize_1.Model {
    id;
    courseId;
    professorId;
    studentId;
}
CourseEvent.init({
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
    subjectId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'subjectId',
    },
    eventType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'eventType',
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'title',
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'description',
    },
    startDateTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'startDateTime',
    },
    endDateTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'endDateTime',
    },
    locationType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'locationType',
    },
    locationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'locationId',
    },
    onlineLink: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'onlineLink',
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'deadline',
    },
    isRead: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        field: 'isRead',
    },
    studentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'studentId',
    },
}, {
    sequelize: database_1.default,
    modelName: 'CourseEvent',
    tableName: 'course_event',
    timestamps: true,
});
exports.default = CourseEvent;
