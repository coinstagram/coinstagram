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
      feedPosts: {
        loading: false,
        error: null,
        feedPosts: [],
      },
      selectedPost: {
        loading: false,
        error: null,
        selectedPost: null,
      },
      randomPosts: {
        loading: false,
        error: null,
        randomPosts: [],
      },
    },
    comments: {
      loading: false,
      error: null,
      postComments: [],
      myComments: [],
    },
    likes: {
      postLikes: {
        loading: false,
        error: null,
        userLikes: [],
      },
      commentLikes: {
        loading: false,
        error: null,
        userLikes: [],
      },
    },
    bookmarks: {
      loading: false,
      error: null,
      bookmarks: [],
      bookmarkPosts: {
        loading: false,
        error: null,
        bookmarkPosts: [],
      },
    },
    otherPosts: {
      loading: false,
      error: null,
      otherPosts: [],
      counts: {
        loading: false,
        error: null,
        counts: [],
      },
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
