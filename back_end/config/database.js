"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var config = require("./config.json"); // Importar archivo JSON
var env = process.env['NODE_ENV'] || 'development';
var dbConfig = config[env]; // get config
// create sequelize instance
var sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});
exports.default = sequelize;
