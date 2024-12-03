"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/role.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Role extends sequelize_1.Model {
    id;
    name;
}
Role.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'role_name',
    },
}, {
    sequelize: database_1.default,
    modelName: 'Role',
    tableName: 'role',
    timestamps: true,
});
exports.default = Role;
