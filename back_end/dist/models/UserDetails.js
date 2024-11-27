"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class UserDetails extends sequelize_1.Model {
    id;
    userId;
    phone;
    address;
    img_url;
    description;
    lat;
    lng;
}
UserDetails.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    img_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
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
    sequelize: database_1.default,
    tableName: 'user_details',
});
exports.default = UserDetails;
