const mysql = require('mysql2/promise');

const database = 'teacherappdb';
const username = 'root';
const password = 'Lucas55'; // edit with your credential
const host = 'localhost';
const port = 3306; // edit with your configuration

mysql.createConnection({ host, port, user: username, password })
  .then(connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
      .then(() => {
        console.log(`Base de datos ${database} creada.`);
        connection.end();
      })
      .catch(err => {
        console.error('Error al crear la base de datos, es posible que ya exista:', err);
      });
  })
  .catch(err => {
    console.error('Error al conectarse a MySQL:', err);
  });