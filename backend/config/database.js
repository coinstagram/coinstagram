const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'g1560318',
  database: 'coinstagram',
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = pool;
