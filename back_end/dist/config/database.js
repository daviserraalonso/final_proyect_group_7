"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fs_1 = require("fs");
const path_1 = require("path");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const env = process.env['NODE_ENV'] || 'development';
let dbConfig;
if (env === 'development') {
    // read config.json
    const configPath = (0, path_1.join)(process.cwd(), 'config', 'config.json');
    const config = JSON.parse((0, fs_1.readFileSync)(configPath, 'utf-8'));
    dbConfig = config[env];
}
else if (env === 'production') {
    // config environment variables
    dbConfig = {
        username: process.env.MYSQL_ADDON_USER || '',
        password: process.env.MYSQL_ADDON_PASSWORD || '',
        database: process.env.MYSQL_ADDON_DB || '',
        host: process.env.MYSQL_ADDON_HOST || '',
        port: Number(process.env.MYSQL_ADDON_PORT) || 3306,
        dialect: 'mysql',
        logging: false,
    };
}
else {
    throw new Error(`Entorno desconocido: ${env}`);
}
// create instance sequalize
const sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging || false, // show log queries
    pool: {
        max: 5, // pool max value
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
// show message conection database
sequelize.authenticate()
    .then(() => {
    console.log('Conexión a la base de datos exitosa.');
})
    .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
});
/*if (env === 'development') {
  // syncronize database
  sequelize.sync()
    .then(() => console.log('Base de datos sincronizada sin forzar.'))
    .catch((error) => console.error('Error al sincronizar la base de datos:', error));
}*/
exports.default = sequelize;
