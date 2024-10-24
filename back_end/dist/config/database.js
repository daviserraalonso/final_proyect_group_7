import { Sequelize } from 'sequelize';
import { readFileSync } from 'fs';
import { join } from 'path';
// ajust to get config.json
const configPath = join(process.cwd(), 'config', 'config.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));
const env = process.env['NODE_ENV'] || 'development';
const dbConfig = config[env];
console.log('Configuración de la base de datos:', dbConfig);
const sequelize = new Sequelize(dbConfig.database, // database name
dbConfig.username, // unserName
dbConfig.password, // pass
{
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
});
sequelize.authenticate()
    .then(() => {
    console.log('Conexión a la base de datos exitosa.');
})
    .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
});
export default sequelize;
