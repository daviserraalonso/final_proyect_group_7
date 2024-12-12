import { Sequelize } from 'sequelize';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

type Environments = 'development' | 'test' | 'production';
const env: Environments = (process.env['NODE_ENV'] as Environments) || 'development';

let dbConfig: {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mssql';
  logging?: boolean;
};

if (env === 'development') {
  // read config.json
  const configPath = join(process.cwd(), 'config', 'config.json');
  const config = JSON.parse(readFileSync(configPath, 'utf-8'));
  dbConfig = config[env];

  
} else if (env === 'production') {
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

} else {
  throw new Error(`Entorno desconocido: ${env}`);
}

// create instance sequalize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
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
  }
);

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

export default sequelize;
