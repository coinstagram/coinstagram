import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

const rootReducer = (history: History) =>
  combineReducers({
    auth,
    user,
    router: connectRouter(history),
  });

export default rootReducer;
