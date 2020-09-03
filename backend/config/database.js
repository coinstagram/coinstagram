const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
<<<<<<< HEAD
  password: 'g1560318',
=======
  password: 'a70113',
>>>>>>> 8770b0e5e52fde1374ef6dfaf6f0569f50c3d5f0
  database: 'coinstagram',
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = pool;
