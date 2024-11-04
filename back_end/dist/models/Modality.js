"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Modality.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Modality extends sequelize_1.Model {
    id;
    type;
    description;
}
Modality.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('in-person', 'online'),
        allowNull: false,
        field: 'type',
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'description',
    },
}, {
    sequelize: database_1.default,
    modelName: 'Modality',
    tableName: 'modalities',
    timestamps: true,
});
exports.default = Modality;
