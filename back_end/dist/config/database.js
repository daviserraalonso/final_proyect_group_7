"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fs_1 = require("fs");
const path_1 = require("path");
// Leer configuración desde config.json
const configPath = (0, path_1.join)(process.cwd(), 'config', 'config.json');
const config = JSON.parse((0, fs_1.readFileSync)(configPath, 'utf-8'));
const env = process.env['NODE_ENV'] || 'development';
const dbConfig = config[env];
console.log('Configuración de la base de datos:', dbConfig);
// create sequealice instance
const sequelize = new sequelize_1.Sequelize(dbConfig.database, // database name
dbConfig.username, // user
dbConfig.password, // pass
{
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging || false, //show log queryes
});
// authenticate coneection
sequelize.authenticate()
    .then(() => {
    console.log('Conexión a la base de datos exitosa.');
})
    .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
});
// syncronyce db
sequelize.sync()
    .then(() => console.log('Base de datos sincronizada sin forzar.'))
    .catch((error) => console.error('Error al sincronizar la base de datos:', error));
exports.default = sequelize;
