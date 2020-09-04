const express = require('express');
const pool = require('../config/database');
const bcrypt = require('bcrypt');

const router = express.Router();

/**

 */
router.get('/login', async (req, res) => {
  const { user_id, user_password } = req.body;

  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'SELECT user_id, user_password FROM users where user_id = ?';
      const [isuser] = await connection.query(sql, user_id);
      console.log(isuser);
      if (isuser[0] === undefined) {
        res.send({ user_id: '' });
        throw Error('유저가 없습니다.');
      } else {
        const isPassword = await bcrypt.compare(
          user_password + '',
          isuser[0].user_password,
        );
        if (!isPassword) {
          res.send({ user_password: '' });
          throw Error('비밀번호가 틀렸습니다.');
        }
      }
      connection.commit();
      await connection.release();
      res.send(isuser[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

module.exports = router;
