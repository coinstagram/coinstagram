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
import { otherPostsSaga } from './otherPost';
import {editSaga} from './edit';

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
    otherPostsSaga(),
    editSaga()
  ]);
}

export default rootSaga;
