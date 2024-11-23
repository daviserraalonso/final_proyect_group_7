"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/category.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Course_1 = __importDefault(require("./Course"));
class Category extends sequelize_1.Model {
}
Category.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    category_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'category_name',
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'description',
    },
}, {
    sequelize: database_1.default,
    modelName: 'Category',
    tableName: 'category',
    timestamps: true,
});
Category.hasMany(Course_1.default, {
    foreignKey: 'category_id',
    as: 'course'
});
exports.default = Category;
