const express = require('express');
const router = express.Router();
const { verifyToken } = require('./jwtMiddleware');
const pool = require('../config/database');

/**
 * add post
 * /post
 * {
 *  post_title,
 *  user_id,
 *  post_context = "",
 *  post_anotheruser = "",
 *  post_location = "",
 *  tag = "",
 * }
 */
router.post('/post', verifyToken, async (req, res) => {
  const {
    post_title,
    user_id,
    post_context = '',
    post_anotheruser = '',
    post_location = '',
  } = req.body;
  let sql = '';

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `insert into posts(post_title, user_id, post_context, post_anotheruser, post_location)
    values(?, ?, ?, ?, ?)`;

      await connection.query(sql, [
        post_title,
        user_id,
        post_context,
        post_anotheruser,
        post_location,
      ]);

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
 * posts data (20)
 * /posts
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
 * get post detail
 * /post/:post_id
 */
router.get('/post/:post_id', verifyToken, async (req, res) => {
  const { post_id } = req.params;
  let sql = '';

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `SELECT distinct a.id, a.post_title, a.created_at, GROUP_CONCAT(c.name) as hashtag, d.user_name, (SELECT COUNT(*) FROM post_like where post_id = ?) "like" FROM 
      (SELECT * FROM posts where id = ?) a left outer join post_tags b on a.id = b.post_id
      inner join tag c on b.tag_id = c.id
      inner join users d on a.user_id = d.user_id;`;
      const [check] = await connection.query(sql, [post_id, post_id]);

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
 * post detail(post_id)
 * /post/:post_id
 * {
 *  post_id
 * }
 */
router.get('/post/postId/:post_id', async (req, res) => {
  const { post_id } = req.params;
  let sql = '';

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `SELECT distinct a.id, a.post_title, a.created_at, GROUP_CONCAT(c.name) as hashtag, d.user_name, (SELECT COUNT(*) FROM post_like where post_id = ?) "like" FROM 
        (SELECT * FROM posts where id = ?) a left outer join post_tags b on a.id = b.post_id
        inner join tag c on b.tag_id = c.id
        inner join users d on a.user_id = d.user_id;`;
      const [check] = await connection.query(sql, [post_id, post_id]);

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
 * post detail(user_id)
 * /post/userId/:user_id
 * {
 *  post_title
 * }
 */
router.get('/post/userId/:user_id', async (req, res) => {
  let sql = '';
  const { user_id } = req.params;
  console.log(user_id);
  let data = [];
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'select * from posts where user_id = ? limit 15';
      const [check] = await connection.query(sql, +user_id);
      // eslint-disable-next-line no-unused-vars
      data = { post: check[0] };

      sql = `select * from users where user_id = ?`;
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
