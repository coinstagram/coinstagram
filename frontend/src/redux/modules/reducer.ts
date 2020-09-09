import { combineReducers } from 'redux';
import auth from './auth';
import userInfo from './userInfo';
import anotherUserInfo from './anotherUser';
import posts from './post';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

const rootReducer = (history: History) =>
  combineReducers({
    auth,
    userInfo,
    anotherUserInfo,
    posts,
    router: connectRouter(history),
  });

export default rootReducer;
