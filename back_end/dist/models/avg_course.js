"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class AvgCourse extends sequelize_1.Model {
}
AvgCourse.init({
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
    avg: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        field: 'avg'
    }
}, {
    sequelize: database_1.default,
    modelName: 'AvgCourse',
    tableName: 'avg_course',
    timestamps: false,
});
exports.default = AvgCourse;
