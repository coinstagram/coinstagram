const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
<<<<<<< HEAD
  password: 'g1560318',
=======
  password: 'mysql0909',
>>>>>>> 8edda8e177ad65542db9c74857178585277c8274
  database: 'coinstagram',
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});
module.exports = pool;
