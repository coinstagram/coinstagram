import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { userInfoSaga } from './userInfo';
import { anotherUserSaga } from './anotherUser';
import { postsSaga } from './post';

function* rootSaga() {
  yield all([authSaga(), userInfoSaga(), anotherUserSaga(), postsSaga()]);
}

export default rootSaga;
