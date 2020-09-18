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
router.post('/login', async (req, res) => {
  const { user_id, user_password } = req.body;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'SELECT * FROM users where user_id = ?';

      // id 확인
      const [isuser] = await connection.query(sql, user_id);

      if (isuser[0] === undefined) {
        try {
          throw new Error(
            '사용자 정보와 일치하지 않습니다. 다시 입력해주세요.',
          );
        } catch (error) {
          await connection.rollback(); // ROLLBACK
          await connection.release();
          res.status(503).json({ error: error.toString() });
          return;
        }
      }
      // 비밀번호 확인
      const isPassword = await bcrypt.compare(
        user_password + '',
        isuser[0].user_password,
      );

      if (!isPassword) {
        try {
          throw new Error(
            '사용자 정보와 일치하지 않습니다. 다시 입력해주세요.',
          );
        } catch (error) {
          await connection.rollback(); // ROLLBACK
          await connection.release();
          res.status(503).json({ error: error.toString() });
          return;
        }
      }

      // 토큰 발급
      const token = jwt.sign(
        {
          user_id: isuser[0].user_id,
          user_name: isuser[0].user_name,
          user_gender: isuser[0].user_gender,
          user_introduce: isuser[0].user_introduce,
          user_phone: isuser[0].user_phone,
          user_email: isuser[0].user_email,
          user_profile: isuser[0].user_profile,
        },
        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );
      console.log(token);
      res.cookie('access_token', token, { httpOnly: true });
      connection.commit();
      await connection.release();
      res.send({ success: true, token });
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json(error);
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});
module.exports = router;
