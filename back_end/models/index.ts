import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.json';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];
const db: any = {};

let sequelize: Sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable]!, dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    // Verifica que solo se carguen archivos `.ts` y no el archivo `index.ts`
    return file.indexOf('.') !== 0 && file !== 'index.ts' && file.slice(-3) === '.ts';
  })
  .forEach((file) => {
    // Usa `require` para cargar el modelo
    const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
    db[model.name] = model; // Asegúrate de que `model.name` es el nombre correcto
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Configura las asociaciones
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
