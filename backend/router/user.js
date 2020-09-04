const express = require('express');
const pool = require('../config/database');

const { verifyToken } = require('./jwtMiddleware');
const jwt = require('jsonwebtoken');

const router = express.Router();

/**
 * add users_relationship
 * /user/relationship
 * {
 *  followee_id
 * }
 */
router.post('/user/relationship', verifyToken, async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const { id } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { followee_id } = req.body;
  if (followee_id === id) {
    throw Error('나를 팔로워 할 수 없습니다.');
  }
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'insert into users_relationship values (?, ?)';
      await connection.query(sql, [id, followee_id]);
      //   sql =
      //     'select user_id, user_name from users where user_id in(select followee_id from users_relationship where id = ?);';

      res.send({ success: true });
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

/**
 * get login user
 * /user
 */
router.get('/user', verifyToken, async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  let data = {};
  const { id, name, gender, introduce, phone, email, profile } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const user = { id, name, gender, introduce, phone, email, profile };

  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select user_id from users where user_id in(select followee_id from users_relationship where follower_id = ?);`;
      const [followee_id] = await connection.query(sql, user.id);
      const follower = followee_id.map(({ user_id }) => user_id);

      sql = `select user_id from users where user_id in(select follower_id from users_relationship where followee_id = ?);`;
      const [follower_id] = await connection.query(sql, user.id);
      const folloee = follower_id.map((user_id) => user_id);

      data = { ...data, user, follower, folloee };
      console.log(data);

      res.send({ success: true });
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

/**
 *  random user
 * /users/random
 */
router.get('/users/random', async (req, res) => {
  let sql = '';

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select * from users ORDER BY RAND() LIMIT 5;`;
      const [check] = await connection.query(sql);
      res.send(check);
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
