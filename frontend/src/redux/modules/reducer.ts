import { combineReducers } from 'redux';
import auth from './auth';
import userInfo from './userInfo';
import anotherUserInfo from './anotherUser';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

const rootReducer = (history: History) =>
  combineReducers({
    auth,
    userInfo,
    anotherUserInfo,
    router: connectRouter(history),
  });

export default rootReducer;
