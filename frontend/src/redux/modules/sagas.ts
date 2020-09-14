import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { signupSaga } from './signup';
import { userInfoSaga } from './userInfo';
import { anotherUserSaga } from './anotherUser';
import { postsSaga } from './post';
import { uploadSaga } from './upload';
import { commentSaga } from './comment';
import { likeSaga } from './like';
import { bookmarkSaga } from './bookmark';

function* rootSaga() {
  yield all([
    authSaga(),
    signupSaga(),
    userInfoSaga(),
    anotherUserSaga(),
    postsSaga(),
    uploadSaga(),
    commentSaga(),
    likeSaga(),
    bookmarkSaga(),
  ]);
}

export default rootSaga;
