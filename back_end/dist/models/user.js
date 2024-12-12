"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class User extends sequelize_1.Model {
    get userId() {
        return this.getDataValue('id');
    }
    // Getter para name
    get userName() {
        return this.getDataValue('name');
    }
    // Getter para email
    get userEmail() {
        return this.getDataValue('email');
    }
    // Getter para password
    get userPassword() {
        return this.getDataValue('password');
    }
    // Getter para roleId
    get userRoleId() {
        return this.getDataValue('roleId');
    }
    // Getter para validated
    get userisValidated() {
        return this.getDataValue('isValidated');
    }
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
    isValidated: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize: database_1.default,
    modelName: 'User',
    tableName: 'user',
});
exports.default = User;
