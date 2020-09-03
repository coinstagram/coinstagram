const express = require('express');
const pool = require('../config/database');
const router = express.Router();

/**
 * all user data
 * /users
 * {}
 */
router.get('/users', async (req, res) => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      let sql = 'select * from users limit 20';
      let [usersData] = await connection.query(sql);
      res.send(usersData);
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
 * user data
 * /user/:id
 */
router.get('/user', async (req, res) => {
  const { user_id } = req.body;
  let sql = '';

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select * from users where user_id = ?`;
      const [userData] = await connection.query(sql, user_id);
      if (userData[0] === undefined) {
        throw Error('데이터 없음');
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

/**
 * user posts
 * {
 *  user_id
 * }
 * /user/posts
 */
router.get('/user/posts', async (req, res) => {
  const { user_id } = req.body;
  let sql = '';

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select * from posts where user_id = (select id from users where user_id = ?);`;
      const [userData] = await connection.query(sql, user_id);
      if (userData[0] === undefined) {
        throw Error('데이터 없음');
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

/**
 * posts data (20)
 * /posts
 * {}
 */
router.get('/posts', async (req, res) => {
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'select * from posts limit 20';
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

/**
 * post data(title)
 * /post/title
 * {
 *  post_title
 * }
 */
router.get('/post/title', async (req, res) => {
  let sql = '';
  const { post_title } = req.body;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'select * from posts where post_title = ? limit 20';
      const [check] = await connection.query(sql, post_title);
      res.send(check[0]);
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
 * post data(title)
 * /post/title
 * {
 *  post_title
 * }
 */
router.get('/post/title', async (req, res) => {
  let sql = '';
  const { post_title } = req.body;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'select * from posts where post_title = ? limit 20';
      const [check] = await connection.query(sql, post_title);
      res.send(check[0]);
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
 * post data(title)
 * /post/detail
 * {
 *  post_id
 * }
 */
router.get('/post/detail', async (req, res) => {
  let sql = '';
  const { post_id } = req.body;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `SELECT distinct a.id, a.post_title, a.created_at, GROUP_CONCAT(c.name) as hashtag, d.user_name, (SELECT COUNT(*) FROM post_like where post_id = ?) "like" FROM 
      (SELECT * FROM posts ORDER BY id DESC LIMIT 1) a left outer join post_tags b on a.id = b.post_id
      inner join tag c on b.tag_id = c.id
      inner join users d on a.user_id = d.user_id;`;

      const [check] = await connection.query(sql, post_id);
      res.send(check[0]);
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
 *  followee info
 * /followee
 * {
 *  follower_id
 * }
 */
router.get('/relationship/followee', async (req, res) => {
  let sql = '';
  const { follower_id } = req.body;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select user_id, user_name from users where user_id in(select followee_id from users_relationship where follower_id = ?);`;
      const [check] = await connection.query(sql, follower_id);
      res.send(check[0]);
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
 *  follower info
 * /follower
 * {
 *  followee_id
 * }
 */
router.get('/relationship/follower', async (req, res) => {
  let sql = '';
  const { followee_id } = req.body;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select user_id, user_name from users where user_id in(select follower_id from users_relationship where followee_id = ?);`;
      const [check] = await connection.query(sql, followee_id);
      res.send(check[0]);
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
 * {
 *
 * }
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
