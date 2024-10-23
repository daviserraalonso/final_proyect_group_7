"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database_1 = require("../config/database"); // Aquí importas la instancia de Sequelize
var User = database_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.STRING
    },
    isValidated: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    lat: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6)
    },
    lng: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6)
    }
}, {
    tableName: 'user',
    timestamps: true
});
exports.default = User;
