const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
<<<<<<< HEAD
  password: 'mysql0909',
=======
  password: 'a70113',
>>>>>>> 5a059f809e15bf4d9dd6170a46c89e98065ae5e4
  database: 'coinstagram',
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});
module.exports = pool;
