const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/database');

const router = express.Router();

/**
 * signin(email)
 * /user
 * {
 *  user_id
 *  user_password
 *  user_name
 *  user_email
 * }
 * return : body{success:boolean}
 */
router.post('/signin/email', async (req, res) => {
  const { user_id, user_password, user_name, user_email } = req.body;
  const hashedPassword = await bcrypt.hash(user_password + '', 2);
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `insert into users(user_id, user_password, user_name, user_email)
  values(?, ?, ?, ?)`;
      await connection.query(sql, [
        user_id,
        hashedPassword,
        user_name,
        user_email,
      ]);
      connection.commit();
      await connection.release();
      res.send({ success: true });
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json({ error: error.toString() });
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

/**
 * signin(phone)
 * /user
 * {
 *  user_id
 *  user_password
 *  user_name
 *  user_phone
 * }
 * return : body{success:boolean}
 */
router.post('/signin/phone', async (req, res) => {
  const { user_id, user_password, user_name, user_phone } = req.body;
  let sql = '';
  const hashedPassword = await bcrypt.hash(user_password + '', 2);

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `insert into users(user_id, user_password, user_name, user_phone)
    values(?, ?, ?, ?)`;
      await connection.query(sql, [
        user_id,
        hashedPassword,
        user_name,
        user_phone,
      ]);
      connection.commit();
      await connection.release();
      res.send({ success: true });
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json({ error: error.toString() });
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

module.exports = router;
