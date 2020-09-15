const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
<<<<<<< HEAD
  password: 'a70113',
=======
  password: 'mysql0909',
>>>>>>> 933b68861b63ef86332f8250a37d7d96c568f807
  database: 'coinstagram',
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});
module.exports = pool;
