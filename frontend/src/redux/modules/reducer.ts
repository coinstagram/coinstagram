import { combineReducers } from 'redux';
import auth from './auth';
import userInfo from './userInfo';
import anotherUserInfo from './anotherUser';
import posts from './post';
import comments from './comment';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

const rootReducer = (history: History) =>
  combineReducers({
    auth,
    userInfo,
    anotherUserInfo,
    posts,
    comments,
    router: connectRouter(history),
  });

export default rootReducer;
