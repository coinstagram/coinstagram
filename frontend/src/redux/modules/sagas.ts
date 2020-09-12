import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { userInfoSaga } from './userInfo';
import { anotherUserSaga } from './anotherUser';
import { postsSaga } from './post';
import { commentSaga } from './comment';
import { uploadSaga } from './upload';

function* rootSaga() {
  yield all([
    authSaga(),
    userInfoSaga(),
    anotherUserSaga(),
    postsSaga(),
    commentSaga(),
    uploadSaga(),
  ]);
}

export default rootSaga;
