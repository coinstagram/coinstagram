import rootReducer from './modules/reducer';
import RootState from '../type';
import rootSaga from './modules/sagas';
import { Store, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createNull } from 'typescript';

export const history = createBrowserHistory();
const sagaMiddleWare = createSagaMiddleware();

function preloadedState(token: string | null): RootState {
  return {
    //   edit : {
    //     editLoadingState : {
    //     loading : false,
    //     error: null,
    //   },
    //   user:null
    // },
    auth: {
      loading: false,
      error: null,
      token,
    },
    userInfo: {
      loading: false,
      error: null,
      user: null,
      editLoadingState: {
        loading: false,
        error: null,
      },
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
        isLast: false,
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
        isLast: false,
        randomPosts: [],
      },
    },
    upload: {
      Loading: false,
      Done: false,
      Error: null,
      data: {
        id: '',
        user_id: '',
        post_context: '',
        post_anotheruser: '',
        post_location: '',
        tag: [],
        image_path: [],
        created_at: '',
      },
    },
    comments: {
      feedPostComments: {
        loading: false,
        error: null,
        comments: [],
      },
      selectedPostComments: {
        loading: false,
        error: null,
        comments: [],
      },
      myComments: [],
    },
    likes: {
      feedPostLikes: {
        loading: false,
        error: null,
        userLikes: [],
      },
      selectedPostLikes: {
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
    composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleWare)),
  );

  sagaMiddleWare.run(rootSaga);

  return store;
}

export default create;
