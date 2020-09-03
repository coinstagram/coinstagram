require('dotenv').config();
const express = require('express');
const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

/**
 * login
 * /login
 * {
 *  user_id,
 *  user_password
 * }
 * return : body{success:boolean}
 * success = true : cookie: token
 */
router.get('/login', async (req, res) => {
  const { user_id, user_password } = req.body;

  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'SELECT * FROM users where user_id = ?';
      const [isuser] = await connection.query(sql, user_id);

      // id 확인
      if (isuser[0] === undefined) {
        res.send({ user_id: '' });
        throw Error('유저가 없습니다.');
      }
      // 비밀번호 확인
      const isPassword = await bcrypt.compare(
        user_password + '',
        isuser[0].user_password,
      );
      if (!isPassword) {
        res.send({ user_password: '' });
        throw Error('비밀번호가 틀렸습니다.');
      }
      // 토큰 발급
      const token = jwt.sign(
        {
          id: isuser[0].user_id,
          username: isuser[0].user_name,
        },
        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );
      res.cookie('access_token', token);
      connection.commit();
      await connection.release();
      res.send({ success: true });
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
