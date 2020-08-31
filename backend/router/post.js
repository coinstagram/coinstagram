const express = require("express");
const pool = require("../config/database");

const router = express.Router();

/**
 * sign up(email)
 * /user
 * {
 *  user_id
 *  user_password
 *  user_name
 *  user_email
 * }
 */
router.post("/user/email", async (req, res) => {
  const { user_id, user_password, user_name, user_email } = req.body;
  let sql = "";
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `insert into users(user_id, user_password, user_name, user_email)
  values(?, ?, ?, ?)`;
      await connection.query(sql, [
        user_id,
        user_password,
        user_name,
        user_email,
      ]);
      sql = "SELECT * FROM users ORDER BY id DESC LIMIT 1";
      const [rows] = await connection.query(sql);
      connection.commit();
      await connection.release();
      res.send(rows[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json("SQL ERROR");
    }
  } catch (error) {
    res.status(500).json("DB CONNECT ERROR");
  }
});

/**
 * sign up(phone)
 * /user
 * {
 *  user_id
 *  user_password
 *  user_name
 *  user_phone
 * }
 */
router.post("/user/phone", async (req, res) => {
  const { user_id, user_password, user_name, user_phone } = req.body;
  let sql = "";

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `insert into users(user_id, user_password, user_name, user_phone)
    values(?, ?, ?, ?)`;
      await connection.query(sql, [
        user_id,
        user_password,
        user_name,
        user_phone,
      ]);
      sql = "SELECT * FROM users ORDER BY id DESC LIMIT 1";
      const [rows] = await connection.query(sql);
      await connection.release();
      res.send(rows[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      res.status(500).json("SQL ERROR");
    }
  } catch (error) {
    res.status(500).json("DB CONNECT ERROR");
  }
});

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
router.post("/post", async (req, res) => {
  const {
    post_title,
    user_id,
    post_context = "",
    post_anotheruser = "",
    post_location = "",
    tag = "",
  } = req.body;
  let sql = "";

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

      if (tag !== "") {
        const tagPatten = /#[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣!@$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*/g;
        const tagarr = tag.match(tagPatten);
        let postId = "";

        sql = "SELECT id FROM posts ORDER BY id DESC LIMIT 1";
        const [id] = await connection.query(sql);
        postId = id[0];

        for (let a in tagarr) {
          sql = `select id from tag where name = ?`;
          let [tag_id] = await connection.query(sql, tagarr[a]);
          tag_id = tag_id[0];

          if (tag_id) {
            sql = "insert into post_tags(tag_id, post_id) values(?, ?);";
            await connection.query(sql, [+tag_id.id, +postId.id]);
          } else {
            sql = "insert into tag(name) value(?);";
            await connection.query(sql, tagarr[a]);
            sql = "SELECT id FROM tag ORDER BY id DESC LIMIT 1";
            const [rows] = await connection.query(sql);
            let new_tag_id = rows[0].id;
            sql = "insert into post_tags(tag_id, post_id) values(?, ?);";
            await connection.query(sql, [+new_tag_id, +postId.id]);
          }
        }
        sql = `SELECT distinct a.id, a.post_title, a.created_at, GROUP_CONCAT(c.name) as hashtag, d.user_name, (SELECT COUNT(*) FROM post_like where post_id = ?) "like" FROM 
        (SELECT * FROM posts ORDER BY id DESC LIMIT 1) a left outer join post_tags b on a.id = b.post_id
        inner join tag c on b.tag_id = c.id
        inner join users d on a.user_id = d.id;`;

        const [rows] = await connection.query(sql, +postId.id);
        res.send(rows[0]);
      }
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      res.status(500).json("SQL ERROR");
    }
  } catch (error) {
    res.status(500).json("DB CONNECT ERROR");
  }
});

/**
 * add comment
 * /comment
 * {
 *  post_id
 *  user_id
 *  comment_text
 * }
 */
router.post("/comment", async (req, res) => {
  const { post_id, user_id, comment_text } = req.body;
  let sql = "";
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql =
        "insert into comments(post_id, user_id, comment_text) values(?, ?, ?);";
      await connection.query(sql, [post_id, user_id, comment_text]);
      sql = "SELECT * FROM comments ORDER BY id DESC LIMIT 1";
      const [newComment] = await connection.query(sql);
      res.send(newComment[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      res.status(500).json("SQL ERROR");
    }
  } catch (error) {
    res.status(500).json("DB CONNECT ERROR");
  }
});

/**
 * add post like
 * /post/like
 * {
 *  post_id
 *  user_id
 * }
 */
router.post("/post/like", async (req, res) => {
  const { post_id, user_id } = req.body;
  let sql = "";
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = "insert into post_like values (?, ?)";
      await connection.query(sql, [post_id, user_id]);
      sql = "select count(*) as likeCount from post_like where post_id = ?";
      const [check] = await connection.query(sql, +post_id);
      res.send(check[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json("SQL ERROR");
    }
  } catch (error) {
    res.status(500).json("DB CONNECT ERROR");
  }
});

/**
 * add comment like
 * /comment/child
 * {
 *  post_id
 *  user_id
 *  post_id
 * }
 */
router.post("/comment/like", async (req, res) => {
  const { user_id, comment_id, post_id } = req.body;
  let sql = "";
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = "insert into comment_like values (?, ?, ?)";
      await connection.query(sql, [user_id, comment_id, post_id]);
      sql =
        "select count(*) as comment_like from comment_like where comment_id = ? and user_id = ? and post_id = ?";
      const [check] = await connection.query(sql, [
        user_id,
        comment_id,
        post_id,
      ]);
      res.send(check[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json("SQL ERROR");
    }
  } catch (error) {
    res.status(500).json("DB CONNECT ERROR");
  }
});

/**
 * add child comment
 * /like
 * {
 *  post_id
 *  user_id
 *  comment_text
 *  parent
 * }
 */
router.post("/comment/child", async (req, res) => {
  const { post_id, user_id, comment_text, parent } = req.body;
  let sql = "";
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      // 부모 댓글이 있나 확인
      sql = "select count(*) from comments where id = ?";
      const [isParent] = await connection.query(sql, parent);
      if (isParent === 0) {
        res.status(500).json("댓글이 없습니다.");
      }
      sql = "select * from comments where parent is null and id = ?;";
      const [isparent] = await connection.query(sql, parent);
      if (isparent.length === 0) {
        throw Error("부모 댓글이 아닙니다.");
      }

      sql =
        "insert into comments(post_id, user_id, comment_text, parent) values(?, ?, ?, ?);";
      await connection.query(sql, [post_id, user_id, comment_text, parent]);
      sql = "SELECT * FROM comments where id = ? or parent = ?";
      const [newComment] = await connection.query(sql, [parent, parent]);
      res.send(newComment);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json("SQL ERROR");
    }
  } catch (error) {
    res.status(500).json("DB CONNECT ERROR");
  }
});

/**
 * add bookmark
 * /bookmark
 * {
 *  user_id
 *  post_id
 * }
 */
router.post("/bookmark", async (req, res) => {
  const { user_id, post_id } = req.body;
  let sql = "";
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = "insert into bookmark values (?, ?)";
      await connection.query(sql, [user_id, post_id]);
      sql =
        "select b.post_title from bookmark as a inner join posts as b where a.post_id = ? and a.post_id = b.id;";
      const [check] = await connection.query(sql, post_id);
      res.send(check[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json("SQL ERROR");
    }
  } catch (error) {
    res.status(500).json("DB CONNECT ERROR");
  }
});

/**
 * add users_relationship
 * /relationship
 * {
 *  follower_id
 *  followee_id
 * }
 */
router.post("/relationship", async (req, res) => {
  const { follower_id, followee_id } = req.body;
  let sql = "";
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = "insert into users_relationship values (?, ?)";
      await connection.query(sql, [follower_id, followee_id]);
      sql =
        "select user_id, user_name from users where id in(select followee_id from users_relationship where follower_id = ?);";
      const [check] = await connection.query(sql, follower_id);
      res.send(check);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json("SQL ERROR");
    }
  } catch (error) {
    res.status(500).json("DB CONNECT ERROR");
  }
});

module.exports = router;
