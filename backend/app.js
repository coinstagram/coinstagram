const express = require('express');
const getRouter = require('./router/get');
const postRouter = require('./router/post');
const deleteRouter = require('./router/delete');
const patcheRouter = require('./router/patch');

const signinRouter = require('./router/signin');
const loginRouter = require('./router/login');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(getRouter);
app.use(postRouter);
app.use(deleteRouter);
app.use(patcheRouter);

app.use(signinRouter);
app.use(loginRouter);

app.listen(4000, () => {
  console.log('서버 실행중');
});
