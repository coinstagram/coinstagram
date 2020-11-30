const bcrypt = require('bcrypt');
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
  const { user_id } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { followee_id } = req.body;

  if (followee_id + '' === user_id + '') {
    throw Error('나를 팔로워 할 수 없습니다.');
  }
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'select followee_id from users_relationship where follower_id = ?';
      const [compareFollowee] = await connection.query(sql, user_id);
      const [isFollwee] = compareFollowee.filter(
        (id) => followee_id + '' === id.followee_id + '',
      );
      if (isFollwee !== undefined) {
        res.send({ success: false });
      } else {
        sql = 'insert into users_relationship values (?, ?)';
        await connection.query(sql, [user_id, followee_id]);
        res.send({ success: true });
      }
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

/**
 * delete users_relationship
 * /user/relationship
 * {
 *  followee_id
 * }
 */
router.delete('/user/relationship/:user', verifyToken, async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const { user_id } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { user } = req.params;
  if (user === user_id) {
    throw Error('나를 팔로우 취소 할 수 없습니다.');
  }
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'select followee_id from users_relationship where follower_id = ?';
      const [compareFollowee] = await connection.query(sql, user_id);
      const [isFollowee] = compareFollowee.filter((followee) => {
        return followee.followee_id === user;
      });
      if (!isFollowee) {
        res.send({ success: false });
      } else {
        sql =
          'delete from users_relationship where follower_id = ? and followee_id = ?';
        await connection.query(sql, [user_id, user]);
        res.send({ success: true });
      }
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

/**
 * get login user Data
 * /user
 */
router.get('/user', verifyToken, async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  let data = {};
  const { user_id, iat, exp } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );

  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select user_id, user_name, user_gender, user_introduce, user_phone, user_email, user_profile  from users where user_id = ?;`;
      const [user] = await connection.query(sql, user_id);
      const my = { ...user, iat, exp };
      sql = `select user_id, user_name, user_profile from users where user_id in(select followee_id from users_relationship where follower_id = ?);`;
      const [followee_id] = await connection.query(sql, user_id);
      const follower = followee_id.map((user) => user);

      sql = `select user_id, user_name, user_profile from users where user_id in(select follower_id from users_relationship where followee_id = ?);`;
      const [follower_id] = await connection.query(sql, user_id);
      const followee = follower_id.map((user) => user);

      data = { user: { ...my[0] }, follower, followee };
      console.log(data);
      res.send(data);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

/**
 *  random user
 * /users/random
 */
router.get('/users/random', verifyToken, async (req, res) => {
  let sql = '';
  const token = req.headers.authorization.split('Bearer ')[1];
  const { user_id } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select user_id from users where user_id in(select followee_id from users_relationship where follower_id = ?);`;
      const [followee_id] = await connection.query(sql, user_id);
      sql = `select user_id, user_name, user_profile from users where not user_id in(${[
        ...followee_id.map(({ user_id }) => `"${user_id}"`),
        `"${user_id}"`,
      ]}) ORDER BY RAND() LIMIT 5;`;
      const [check] = await connection.query(sql);
      res.send(check);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

/**
 * user_id Data
 * /user/id
 * {
 *  user_id
 * }
 */

router.get('/user/:user_id', verifyToken, async (req, res) => {
  let sql = '';
  let data = {};
  const { user_id } = req.params;
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select user_id, user_name, user_gender, user_introduce, user_phone
      , user_email, user_profile from users where user_id = ?`;
      const [userData] = await connection.query(sql, user_id);
      const user = userData[0];

      sql = `select user_id, user_name, user_profile from users where user_id in(select followee_id from users_relationship where follower_id = ?);`;
      const [followee_id] = await connection.query(sql, user_id);
      const follower = followee_id.map((user) => user);

      sql = `select user_id, user_name, user_profile from users where user_id in(select follower_id from users_relationship where followee_id = ?);`;
      const [follower_id] = await connection.query(sql, user_id);
      const followee = follower_id.map((user) => user);

      data = { user, follower, followee };
      res.json(data);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

router.patch('/user/image', verifyToken, async (req, res) => {
  console.log('/user/image', req.body);

  const token = req.headers.authorization.split('Bearer ')[1];
  const userData = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { user_id } = userData;
  let sql = ``;
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      console.log(req.body[0].image_path);
      sql = `update users set user_profile = ? where user_id = ?`;
      await connection.query(sql, [req.body[0].image_path, user_id]);
      res.json({ success: true });
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

/**
 * delete user_data
 * /user
 */
router.delete('/user', verifyToken, async (req, res) => {
  console.log('delete userData');
  const token = req.headers.authorization.split('Bearer ')[1];
  const { user_id } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  console.log(user_id);
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'SET foreign_key_checks = 0;';
      await connection.query(sql);
      sql = ' delete from users where user_id = ?';
      await connection.query(sql, user_id);
      sql = 'SET foreign_key_checks = 1;';
      await connection.query(sql);

      sql = 'SET foreign_key_checks = 0;';
      await connection.query(sql);
      sql = ' delete from posts where user_id = ?';
      await connection.query(sql, user_id);
      sql = 'SET foreign_key_checks = 1;';
      await connection.query(sql);

      sql = 'SET foreign_key_checks = 0;';
      await connection.query(sql);
      sql =
        ' delete from post_tags where post_id in (select id from posts where user_id = ?)';
      await connection.query(sql, user_id);
      sql = 'SET foreign_key_checks = 1;';
      await connection.query(sql);

      // select * from tag where id in (select tag_id from post_tags where post_id in (select id from posts where user_id = 111111));
      sql = 'SET foreign_key_checks = 0;';
      await connection.query(sql);
      sql =
        ' delete from tag where id in (select tag_id from post_tags where post_id in (select id from posts where user_id = ?))';
      await connection.query(sql, user_id);
      sql = 'SET foreign_key_checks = 1;';
      await connection.query(sql);

      res.send({ success: 'ture' });
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

router.patch('/user', verifyToken, async (req, res) => {
  console.log('/user patch');
  let sql = '';
  const {
    user_profile,
    user_name,
    user_id,
    user_introduce,
    user_email,
    user_phone,
    user_gender,
  } = req.body;
  console.log(
    user_profile,
    user_name,
    user_id,
    user_introduce,
    user_email,
    user_phone,
    user_gender,
  );
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `update users set user_profile=?, user_name = ?, user_id = ?, user_introduce = ?, user_email=?, user_phone = ?, user_gender=?`;
      await connection.query(sql, [
        user_profile,
        user_name,
        user_id,
        user_introduce,
        user_email,
        user_phone,
        user_gender,
      ]);

      res.json({ success: true });
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

router.patch('/user/password', verifyToken, async (req, res) => {
  console.log('user/password');
  const { user_password } = req.body;
  const token = req.headers.authorization.split('Bearer ')[1];
  const { user_id } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  let sql = '';

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const hashedPassword = await bcrypt.hash(user_password + '', 2);
      sql = `update users set user_password = ? where user_id = ?`;
      const [res] = await connection.query(sql, [hashedPassword, user_id]);
      console.log(res);
      res.json({ success: true });
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});
module.exports = router;
