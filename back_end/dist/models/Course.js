"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Course extends sequelize_1.Model {
}
Course.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    modality_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'modality', // Asegúrate de que este nombre coincida con la tabla en la base de datos
            key: 'id',
        },
    },
    professor_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Course',
    tableName: 'course',
    timestamps: true,
});
exports.default = Course;
