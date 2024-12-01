"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class AvgTeacher extends sequelize_1.Model {
}
AvgTeacher.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    professorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'professorId',
    },
    avg: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        field: 'avg'
    }
}, {
    sequelize: database_1.default,
    modelName: 'AvgTeacher',
    tableName: 'avg_teacher',
    timestamps: false,
});
exports.default = AvgTeacher;
