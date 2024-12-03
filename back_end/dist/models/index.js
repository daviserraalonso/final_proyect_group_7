"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const config_json_1 = __importDefault(require("../config/config.json"));
const env = process.env.NODE_ENV || 'development';
const dbConfig = config_json_1.default[env];
const db = {};
let sequelize;
if (dbConfig.use_env_variable) {
    sequelize = new sequelize_1.Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
}
else {
    sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    // Verifica que solo se carguen archivos `.ts` y no el archivo `index.ts`
    return file.indexOf('.') !== 0 && file !== 'index.ts' && file.slice(-3) === '.ts';
})
    .forEach((file) => {
    // Usa `require` para cargar el modelo
    const model = require(path_1.default.join(__dirname, file)).default(sequelize, sequelize_1.DataTypes);
    db[model.name] = model; // Asegúrate de que `model.name` es el nombre correcto
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db); // Configura las asociaciones
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
