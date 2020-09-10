import rootReducer from './modules/reducer';
import RootState from '../type';
import rootSaga from './modules/sagas';
import { Store, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const sagaMiddleWare = createSagaMiddleware();

function preloadedState(token: string | null): RootState {
  return {
    auth: {
      loading: false,
      error: null,
      token,
    },
    userInfo: {
      loading: false,
      error: null,
      user: null,
      followers: {
        loading: false,
        error: null,
        users: [],
      },
      followees: [],
      randomUsers: [],
    },
    anotherUserInfo: {
      loading: false,
      error: null,
      user: null,
      followers: [],
      followees: [],
    },
    posts: {
      loading: false,
      error: null,
      FeedPosts: [],
    },
    comments: {
      loading: false,
      error: null,
      postComments: [],
    },
  };
}

function create(token: string | null): Store<RootState> {
  const store: Store<RootState> = createStore(
    rootReducer(history),
    preloadedState(token),
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleWare),
    ),
  );

  sagaMiddleWare.run(rootSaga);

  return store;
}

export default create;
