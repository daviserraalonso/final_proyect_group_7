"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class User extends sequelize_1.Model {
    id;
    name;
    email;
    password;
    roleId;
    phone;
    isValidated;
    lat;
    lng;
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    isValidated: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    lat: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
        allowNull: true,
    },
    lng: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
        allowNull: true,
    },
}, {
    tableName: 'user',
    sequelize: database_1.default, // instancia de sequelize
    timestamps: true,
});
exports.default = User;
