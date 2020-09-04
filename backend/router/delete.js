const express = require('express');
const pool = require('../config/database');
const router = express.Router();

/**
 * del user
 * /user
 * {
 *  user_id
 * }
 */
router.delete('/user', async (req, res) => {
  const { user_id } = req.body;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'select * from users where user_id = ?';
      const [userData] = await connection.query(sql, user_id);

      sql = 'SET foreign_key_checks = 0;';
      await connection.query(sql);
      sql = `delete from users where user_id = ?;`;
      const [result] = await connection.query(sql, user_id);
      sql = 'SET foreign_key_checks = 1;';
      await connection.query(sql);

      if (result.affectedRows === 0) {
        throw Error('지워지지 않음');
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
