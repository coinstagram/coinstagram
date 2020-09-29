const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
<<<<<<< HEAD
  password: 'mysql0909',
=======
  password: 'a70113',
>>>>>>> 16c9b2181fe3ea0d279a855d8c5243b6c6491ce6
  database: 'coinstagram',
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});
module.exports = pool;
