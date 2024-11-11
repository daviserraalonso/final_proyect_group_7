"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/UserDetails.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class UserDetails extends sequelize_1.Model {
    id;
    userId;
    phone;
    description;
    img_url;
    createdAt;
    updatedAt;
}
UserDetails.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'userId',
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'phone',
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'description',
    },
    img_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'img_url',
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'createdAt',
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'updatedAt',
    },
}, {
    sequelize: database_1.default,
    modelName: 'UserDetails',
    tableName: 'user_details',
    timestamps: true,
});
exports.default = UserDetails;
