import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { userInfoSaga } from './userInfo';
import { anotherUserSaga } from './anotherUser';

function* rootSaga() {
  yield all([authSaga(), userInfoSaga(), anotherUserSaga()]);
}

export default rootSaga;
