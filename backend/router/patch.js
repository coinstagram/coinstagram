const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// update users set user_password = 'asd' where user_id="test7"
router.patch('/user', async (req, res) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const { user_id, user_password } = req.body;
  const sql = `update users set user_password = ? where user_id = ?`;
  connection.query(sql, [user_password, user_id], function (error, rows) {
    try {
      if (rows === undefined) {
        throw Error('수정되지 않았습니다.');
      }
      res.send(rows);
    } catch (error) {
      console.log('query error : ' + error);
    } finally {
      res.status(500).json('DB CONNECT ERROR');
    }
  });
});

module.exports = router;
