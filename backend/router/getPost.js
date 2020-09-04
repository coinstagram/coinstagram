const express = require('express');
const router = express.Router();
const { verifyToken } = require('./jwtMiddleware');
const pool = require('../config/database');

/**
 * user data
 * /posts/:id
 */
router.get('/posts/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  let sql = '';
  let data = [];
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select * from users where user_id = ?`;
      const [userData] = await connection.query(sql, id);
      if (userData[0] === undefined) {
        res.send({
          result: 'no data',
        });
      }
      res.send(userData[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

module.exports = router;
