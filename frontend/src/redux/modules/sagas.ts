import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { signupSaga } from './signup';
import { userInfoSaga } from './userInfo';
import { anotherUserSaga } from './anotherUser';
import { postsSaga } from './post';
import { commentSaga } from './comment';
import { uploadSaga } from './upload';

function* rootSaga() {
  yield all([
    authSaga(),
    signupSaga(),
    userInfoSaga(),
    anotherUserSaga(),
    postsSaga(),
    commentSaga(),
    uploadSaga(),
  ]);
}

export default rootSaga;
