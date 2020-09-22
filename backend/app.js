require('dotenv').config();
const express = require('express');
const path = require('path');
// eslint-disable-next-line no-undef
const { PORT } = process.env;
const signinRouter = require('./router/signin');
const loginRouter = require('./router/login');
const postRouter = require('./router/post');
const userRouter = require('./router/user');
const bodyParser = require('body-parser');
const app = express();
app.use(function (req, res, next) {
  const check = /\/api/g;
  req.url = req.url.replace(check, '');
  next();
});
// eslint-disable-next-line no-undef
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userRouter);
app.use(signinRouter);
app.use(loginRouter);
app.use(postRouter);
app.use('/uploads', express.static('uploads'));
app.listen(PORT, () => {
  console.log('서버 실행중');
});
