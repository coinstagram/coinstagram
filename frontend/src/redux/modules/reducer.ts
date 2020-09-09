import { combineReducers } from 'redux';
import auth from './auth';
import userInfo from './userInfo';
import anotherUserInfo from './anotherUser';
import posts from './post';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import postReducer from './upload';

const rootReducer = (history: History) =>
  combineReducers({
    auth,
    userInfo,
    anotherUserInfo,
<<<<<<< HEAD
    postReducer,
=======
    posts,
>>>>>>> 70089e29dc981738bc876c077411ead89c8c3f8d
    router: connectRouter(history),
  });

export default rootReducer;
