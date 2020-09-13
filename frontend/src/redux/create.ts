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
      authData: {
        user_id: null,
        user_password: null,
      },
    },
    // signUpInfo: {
    //   loading: false,
    //   token,
    //   error: null,
    //   userData: {
    //     user_email: null,
    //     user_name: null,
    //     user_id: null,
    //     user_password: null,
    //   },
    // },
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
      randomUsers: {
        loading: false,
        error: null,
        users: [],
      },
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
      selectedPost: {
        loading: false,
        error: null,
        post: null,
      },
    },
    comments: {
      loading: false,
      error: null,
      postComments: [],
      myComments: [],
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
