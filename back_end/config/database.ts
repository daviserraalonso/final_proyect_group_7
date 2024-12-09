import { Sequelize } from 'sequelize';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';


dotenv.config();

// Leer configuración desde config.json
const configPath = join(process.cwd(), 'config', 'config.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

type Environments = 'development' | 'test' | 'production';
const env: Environments = (process.env['NODE_ENV'] as Environments) || 'development';
const dbConfig = {
  username: process.env.MYSQL_ADDON_USER || config[env].username,
  password: process.env.MYSQL_ADDON_PASSWORD || config[env].password,
  database: process.env.MYSQL_ADDON_DB || config[env].database,
  host: process.env.MYSQL_ADDON_HOST || config[env].host,
  port: Number(process.env.MYSQL_ADDON_PORT) || config[env].port,
  dialect: config[env].dialect || 'mysql',
};

console.log('Configuración de la base de datos:', dbConfig);

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
      max: 5, // Número máximo de conexiones en el pool
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// authenticate coneection
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });


// syncronyce db
// sequelize.sync({ alter: true })
//   .then(() => console.log('Base de datos sincronizada sin forzar.'))
//   .catch((error) => console.error('Error al sincronizar la base de datos:', error));


export default sequelize;
