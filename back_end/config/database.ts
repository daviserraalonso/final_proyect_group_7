import { Sequelize } from 'sequelize';
import { readFileSync } from 'fs';
import { join } from 'path';

// Leer configuración desde config.json
const configPath = join(process.cwd(), 'config', 'config.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

type Environments = 'development' | 'test' | 'production';
const env: Environments = (process.env['NODE_ENV'] as Environments) || 'development';
const dbConfig = config[env];

console.log('Configuración de la base de datos:', dbConfig);

// create sequealice instance
const sequelize = new Sequelize(
  dbConfig.database, // database name
  dbConfig.username, // user
  dbConfig.password, // pass
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging || false, //show log queryes
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
sequelize.sync()
  .then(() => console.log('Base de datos sincronizada sin forzar.'))
  .catch((error) => console.error('Error al sincronizar la base de datos:', error));


export default sequelize;
