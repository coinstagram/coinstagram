const express = require('express');
const router = express.Router();
const { verifyToken } = require('./jwtMiddleware');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const pool = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
/**
 * add post
 * /post
 * {
 *  user_id,
 *  post_context = "",
 *  post_anotheruser = "",
 *  post_location = "",
 * }
 */
router.post('/post', verifyToken, async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const { user_id } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const {
    post_context = '',
    post_anotheruser = '',
    post_location = '',
  } = req.body;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `insert into posts(user_id, post_context, post_anotheruser, post_location)
    values( ?, ?, ?, ?)`;
      await connection.query(sql, [
        user_id,
        post_context,
        post_anotheruser,
        post_location,
      ]);
      sql = `select id from posts order by id desc limit 1; `;
      const [post_id] = await connection.query(sql);
      res.send({ post_id: post_id[0].id });
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
 * posts data (20)
 * /posts
 */
router.get('/posts', verifyToken, async (req, res) => {
  console.log('/posts');
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'select * from posts order by id desc limit 20 ;';
      const [check] = await connection.query(sql);
      const post_id = check.map(({ id }) => +id);
      let sqls = '';
      let params = [];
      sql = `select image_path from post_image where post_id = ?;`;

      post_id.map((id) => {
        params = [id];
        sqls += mysql.format(sql, params);
      });

      const [image] = await connection.query(sqls);
      for (let i = 0; i < image.length; i++) {
        let imageitem = image[i].map(({ image_path }) => image_path);
        check[i] = { ...check[i], image_path: imageitem };
      }
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
 * get post detail
 * /
 */
// router.get('/post/:post_id', verifyToken, async (req, res) => {
//   const { post_id } = req.params;
//   let sql = '';
//   try {
//     const connection = await pool.getConnection(async (conn) => conn);
//     try {
//       sql = `SELECT distinct a.id as id, a.user_id, a.post_context, a.post_anotheruser,a.created_at, a.post_location FROM
//       (SELECT * FROM posts where id = ?) a left outer join post_tags b on a.id = b.post_id
//       left outer join tag c on b.tag_id = c.id
//       left outer join users d on a.user_id = d.user_id;`;
//       const [check] = await connection.query(sql, [post_id, post_id, post_id]);
//       sql = `select image_path from post_image where post_id = ?`;
//       const [image] = await connection.query(sql, post_id);
//       sql = `select * from comments where post_id = ?`;
//       const [comment] = await connection.query(sql, post_id);
//       sql = `select * from post_like where post_id = ?`;

//       const [commentLike] = await connection.query(sql, post_id);
//       sql = `select * from comment_like where post_id = ?`;
//       const [postLike] = await connection.query(sql, post_id);
//       console.log(commentLike);

//       console.log({
//         ...check[0],
//         image: [...image.map(({ image_path }) => image_path)],
//         comment: [
//           ...comment.map(({ id, comment_text }) => ({ id, comment_text })),
//         ],
//         postLike: [...postLike.map(({ user_id }) => user_id)],
//       });
//       res.send(check[0]);
//     } catch (error) {
//       await connection.rollback(); // ROLLBACK
//       await connection.release();
//       console.log(error);
//       res.status(500).json('SQL ERROR');
//     } finally {
//       await connection.release();
//     }
//   } catch (error) {
//     res.status(500).json('DB CONNECT ERROR');
//   }
// });

router.get('/post/:post_id', verifyToken, async (req, res) => {
  console.log('/post/:post_id');
  const { post_id } = req.params;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `SELECT distinct a.id as id, a.user_id, a.post_context, a.post_anotheruser,a.created_at, a.post_location FROM 
      (SELECT * FROM posts where id = ?) a left outer join post_tags b on a.id = b.post_id
      left outer join tag c on b.tag_id = c.id
      left outer join users d on a.user_id = d.user_id;`;
      const [check] = await connection.query(sql, [post_id, post_id]);

      sql = `select image_path from post_image where post_id = ?`;
      const [image] = await connection.query(sql, post_id);

      const reqData = {
        ...check[0],
        image_path: [...image.map(({ image_path }) => image_path)],
      };
      res.send(reqData);
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
 * add comment
 * /comment
 * {
 *  post_id
 *  comment_text
 * }
 */
router.post('/comment', async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const { user_id } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { post_id, comment_text } = req.body;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql =
        'insert into comments(post_id, user_id, comment_text) values(?, ?, ?);';
      await connection.query(sql, [post_id, user_id, comment_text]);
      sql = 'SELECT * FROM comments ORDER BY id DESC LIMIT 1';
      const [newComment] = await connection.query(sql);
      res.send(newComment[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});
/**
 * add child comment
 * /comment/child
 * {
 *  post_id
 *  comment_text
 *  parent
 * }
 */
router.post('/comment/child', async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const { user_id } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { post_id, comment_text, parent } = req.body;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      // 부모 댓글이 있나 확인
      sql = 'select count(*) from comments where id = ?';
      const [isParent] = await connection.query(sql, parent);
      if (isParent === 0) {
        res.status(500).json('댓글이 없습니다.');
      }
      sql = 'select * from comments where parent is null and id = ?;';
      const [isparent] = await connection.query(sql, parent);
      if (isparent.length === 0) {
        throw Error('부모 댓글이 아닙니다.');
      }
      sql =
        'insert into comments(post_id, user_id, comment_text, parent) values(?, ?, ?, ?);';
      await connection.query(sql, [post_id, user_id, comment_text, parent]);
      sql = 'SELECT * FROM comments where id = ? or parent = ?';
      const [newComment] = await connection.query(sql, [parent, parent]);

      res.send(newComment);
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
 * get post comment
 * /comment/post/:id
 */
router.get('/comment/post/:post_id', verifyToken, async (req, res) => {
  console.log('/comment/post/:post_id');
  const { post_id } = req.params;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `SELECT * FROM comments where post_id = ?`;
      const [check] = await connection.query(sql, post_id);
      const user_id = check.map(({ user_id }) => user_id);
      sql = 'select user_profile from users where user_id = ?;';
      let sqls = '';
      let parmas = '';
      for (let i = 0; i < user_id.length; i++) {
        console.log(i);
        parmas = user_id[i];
        sqls += mysql.format(sql, parmas);
      }
      console.log('check', check);
      if (sqls === '') {
        return res.json(check);
      }
      const [profile] = await connection.query(sqls);
      let result;
      let imageData = [];
      if (checkMultArray(profile)) {
        imageData = profile.map((profileArray) =>
          !profileArray[0] ? '' : profileArray[0].user_profile,
        );
      } else {
        imageData = profile.map(({ user_profile }) =>
          !user_profile ? '' : user_profile,
        );
      }
      result = check.map((list, index) => ({
        ...list,
        user_profile: imageData[index],
      }));
      res.send(result);
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
 * get post detail
 * /user/post/:user_id
 */
router.get('/user/post/:user_id', verifyToken, async (req, res) => {
  console.log('/user/post/:user_id');
  const { user_id } = req.params;
  let sql = ``;
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select * from posts where user_id = ? order by id desc`;
      const [check] = await connection.query(sql, user_id);
      const post_id = check.map(({ id }) => id);
      let sqls = '';
      let params = [];
      sql = `select image_path from post_image where post_id = ?;`;
      post_id.map((id) => {
        params = [id];
        sqls += mysql.format(sql, params);
      });
      if (sqls.length !== 0) {
        const [image] = await connection.query(sqls);
        try {
          for (let i = 0; i < image.length; i++) {
            let imageitem = image[i].map(({ image_path }) => image_path);
            check[i] = { ...check[i], image_path: imageitem };
          }
        } catch (err) {
          let imageitem = image.map(({ image_path }) => image_path);
          check[0] = { ...check[0], image_path: imageitem };
        }
      }
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
 * login user friend post
 * /user/relationship/post
 */
router.get('/user/relationship/post', verifyToken, async (req, res) => {
  console.log('/user/relationship/post');
  const token = req.headers.authorization.split('Bearer ')[1];
  const userData = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const user = userData;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select user_id from users where user_id in(select followee_id from users_relationship where follower_id = ?);`;
      const [followee_id] = await connection.query(sql, user.user_id);

      sql = `select * from posts where user_id = ?;`;
      let sqls = '';
      let params = [];
      if (followee_id.length === 0) return res.json(followee_id);

      followee_id.map(({ user_id }) => {
        params = [user_id];
        sqls += mysql.format(sql, params);
      });

      const [post_list] = await connection.query(sqls);

      let post_id = post_list.map((foll) => {
        try {
          if (foll.length === 0) {
            return undefined;
          } else {
            return [...foll.map(({ id }) => id)];
          }
        } catch (err) {
          return [foll.id];
        }
      });

      post_id = post_id.map((id) => {
        if (id === undefined) {
          return [];
        }
        return id;
      });

      if (post_id.length === 0) {
        return res.json([]);
      } else {
        sql = `select image_path from post_image where post_id = ?;`;
        sqls = '';
        post_id.map((id) => {
          try {
            if (id.length === 0) {
              return [];
            } else {
              id.map((postId) => {
                sqls += mysql.format(sql, postId);
              });
            }
          } catch (err) {
            sqls += mysql.format(sql, id[0]);
          }
        });
        const [image] = await connection.query(sqls);

        const arr = post_list.map((list, index) => {
          if (post_list.length === 0 || image.length === 0) return [];
          try {
            if (list.length === undefined) {
              list = {
                ...list,
                image_path: image[index].map(({ image_path }) => image_path),
              };
            } else {
              for (let i = 0; i < list.length; i++) {
                list[i] = {
                  ...list[i],
                  image_path: image[index].map(({ image_path }) => image_path),
                };
              }
            }
          } catch (err) {
            list = {
              ...list,
              image_path: [image[0].image_path],
            };
            // list = [list];
          }

          return list;
        });
        let result = [];
        try {
          result = arr.reduce((acc, it) => [...acc, ...it], []);
        } catch (err) {
          result = arr;
        }
        res.json(result);
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
 * add image
 * /images
 */
try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('upload 폴더 생성');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자
      const basename = path.basename(file.originalname, ext); // 베이스 이름
      done(null, basename + '_' + new Date().getTime() + ext); // 베이스이름(시간).확장자
    },
  }),
  limits: { fileSize: 100 * 1027 * 1024 }, // 100MB
  // 단 이미지나 동영상은 백엔드를 거치지 않고
  // 프론트에서 바로 클라우드로 보내는게 좋다.
});
router.post('/images', verifyToken, upload.array('image'), async (req, res) => {
  console.log('images');
  const file = req.files.map(
    ({ path: image_path, mimetype: image_type, originalname: image_name }) => ({
      image_path,
      image_type,
      image_name,
    }),
  );
  res.json(file);
});

router.post(
  '/image',
  verifyToken,
  upload.single('user-profile'),
  async (req, res) => {
    console.log('image');
    const {
      path: image_path,
      mimetype: image_type,
      originalname: image_name,
    } = req.file;

    const file = { image_path, image_type, image_name };
    res.json(file);
  },
);

/**
 * {
 *  post_id,
 *  image_path,
 *  image_name,
 *  image_type
 * }
 */
router.post('/post/image', verifyToken, async (req, res) => {
  const { post_id, image } = req.body;
  let sql = ``;
  let sqls = [];
  let params = [];
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      if (image[0] === undefined) {
        console.log('no image');
        res.send({ success: false });
      } else {
        console.log('is image');
        for (let imageData of image) {
          sql = `insert into post_image(post_id, image_path, image_name, image_type) values(?, ?, ?, ?);`;
          params = [
            post_id,
            imageData.image_path,
            imageData.image_name,
            imageData.image_type,
          ];
          sqls += mysql.format(sql, params);
        }

        await connection.query(sqls);
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
 * add post like
 * /post/like
 * {
 *  post_id
 * }
 */
router.post('/post/like', verifyToken, async (req, res) => {
  console.log('post /post/like');
  const token = req.headers.authorization.split('Bearer ')[1];
  const userData = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { user_id } = userData;
  const { post_id } = req.body;

  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'insert into post_like values (?, ?)';

      await connection.query(sql, [post_id, user_id]);

      res.send({ success: true });
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

router.get('/post/like/:post_id', verifyToken, async (req, res) => {
  console.log('get /post/like/:post_id');
  const { post_id } = req.params;

  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql =
        'select user_id from users where user_id in (select user_id from post_like where post_id = ?)';
      const [data] = await connection.query(sql, post_id);
      console.log(data);
      res.send([{ user_id: data.map(({ user_id }) => user_id), post_id }]);
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
 * add comment like
 * /comment/like
 * {
 *  post_id
 *  comment_id
 * }
 */
router.post('/comment/like', verifyToken, async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const userData = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { user_id } = userData;
  const { comment_id, post_id } = req.body;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'insert into comment_like values (?, ?, ?)';
      await connection.query(sql, [user_id, comment_id, post_id]);
      sql = 'select * from comment_like where comment_id = ? and post_id = ?';
      const [check] = await connection.query(sql, [comment_id, post_id]);
      res.send(check[0]);
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

router.get('/comment/like/:post_id', verifyToken, async (req, res) => {
  const { post_id } = req.params;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql =
        'select user_id, comment_id from comment_like where post_id in(select post_id from comments where post_id = ?)';

      const [data] = await connection.query(sql, post_id);
      res.send({ post_id, comment: data.map((data) => data) });
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
 * add bookmark
 * /bookmark
 * {
 *  post_id
 * }
 */
router.post('/bookmark', verifyToken, async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const userData = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { user_id } = userData;
  const { post_id } = req.body;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'insert into bookmark values (?, ?)';
      await connection.query(sql, [user_id, post_id]);
      sql = `select post_id from bookmark where user_id = ?;`;
      const [check] = await connection.query(sql, user_id);
      res.send(check[0]);
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

router.get('/bookmark/:user_id', verifyToken, async (req, res) => {
  const { user_id } = req.params;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select post_id from bookmark where user_id = ?;`;
      const [check] = await connection.query(sql, user_id);
      res.send(check.map(({ post_id }) => post_id));
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

router.delete('/bookmark/:post_id', verifyToken, async (req, res) => {
  const { post_id } = req.params;
  let sql = '';
  let sqls = [];
  let params = [];
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'SET foreign_key_checks = 0;';
      sqls += mysql.format(sql);
      sql = 'delete from bookmark where post_id = ?;';
      params = [post_id];
      sqls += mysql.format(sql, params);
      sql = 'SET foreign_key_checks = 1;';
      sqls += mysql.format(sql);

      const [test] = await connection.query(sqls);

      if (test[1].affectedRows === 0) {
        res.send({ success: false });
      } else {
        res.send({ success: true });
      }
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

router.delete('/post/like/:post_id', verifyToken, async (req, res) => {
  console.log('del /post/like/:post_id');

  const { post_id } = req.params;
  const token = req.headers.authorization.split('Bearer ')[1];
  const userData = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { user_id } = userData;
  let sql = '';
  let sqls = [];
  let params = [];
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'SET foreign_key_checks = 0;';
      sqls += mysql.format(sql);
      sql = 'delete from post_like where post_id = ? and user_id = ?;';
      params = [post_id, user_id];
      sqls += mysql.format(sql, params);
      sql = 'SET foreign_key_checks = 1;';
      sqls += mysql.format(sql);

      const [test] = await connection.query(sqls);

      if (test[1].affectedRows === 0) {
        res.send({ success: false });
      } else {
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

router.delete('/post/:post_id', verifyToken, async (req, res) => {
  const { post_id } = req.params;
  let sql = '';
  let sqls = [];
  let params = [];
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'SET foreign_key_checks = 0;';
      sqls += mysql.format(sql);
      sql = 'delete from posts where id = ?;';
      params = [post_id];
      sqls += mysql.format(sql, params);
      sql = 'SET foreign_key_checks = 1;';
      sqls += mysql.format(sql);

      const [test] = await connection.query(sqls);

      if (test[1].affectedRows === 0) {
        res.send({ success: false });
      } else {
        res.send({ success: true });
      }
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

router.delete(
  '/post/comment/like/:comment_id',
  verifyToken,
  async (req, res) => {
    const { comment_id } = req.params;
    let sql = '';
    let sqls = [];
    let params = [];
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      try {
        sql = 'SET foreign_key_checks = 0;';
        sqls += mysql.format(sql);
        sql = 'delete from comments where id = ?;';
        params = [comment_id];
        sqls += mysql.format(sql, params);
        sql = 'SET foreign_key_checks = 1;';
        sqls += mysql.format(sql);

        const [test] = await connection.query(sqls);

        if (test[1].affectedRows === 0) {
          res.send({ success: false });
        } else {
          res.send({ success: true });
        }
      } catch (error) {
        await connection.rollback(); // ROLLBACK
        await connection.release();
        console.log(error);
        res.status(500).json('SQL ERROR');
      }
    } catch (error) {
      res.status(500).json('DB CONNECT ERROR');
    }
  },
);

router.get('/post/count/:post_id', verifyToken, async (req, res) => {
  const { post_id } = req.params;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `SELECT COUNT(*) "like" FROM post_like where post_id = ?;`;
      const [likeCount] = await connection.query(sql, +post_id);

      sql = `select COUNT(*) "comment"  from comments where post_id = ?;`;
      const [commentCount] = await connection.query(sql, +post_id);

      res.send({
        likeCount: likeCount[0].like,
        commentCount: commentCount[0].comment,
      });
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
