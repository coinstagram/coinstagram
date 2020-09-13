import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import auth from './auth';
import userInfo from './userInfo';
import anotherUserInfo from './anotherUser';
import posts from './post';
import comments from './comment';
import postReducer from './upload';
import likes from './like';
import bookmarks from './bookmark';

const rootReducer = (history: History) =>
  combineReducers({
    auth,
    userInfo,
    anotherUserInfo,
    posts,
    postReducer,
    comments,
    likes,
    bookmarks,
    router: connectRouter(history),
  });

export default rootReducer;
