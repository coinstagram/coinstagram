import RootState, { PostsState, EachPostState } from '../../type';
import { takeLatest, put, select, call, takeLeading } from 'redux-saga/effects';
import PostService from '../services/postService';

// action type
const START_GET_POSTS = 'coinstagram/post/START_GET_POSTS' as const;
const SUCCESS_GET_POSTS_USER = 'coinstagram/post/SUCCESS_GET_POSTS_USER' as const;
const SUCCESS_GET_POSTS_FEED = 'coinstagram/post/SUCCESS_GET_POSTS_FEED' as const;
const SUCCESS_GET_POSTS_RANDOM = 'coinstagram/post/SUCCESS_GET_POSTS_RANDOM' as const;
const FAIL_GET_POSTS = 'coinstagram/post/FAIL_GET_POSTS' as const;

const START_GET_POST_SELECTED = 'coinstagram/post/START_GET_POST_SELECTED' as const;
const SUCCESS_GET_POST_SELECTED = 'coinstagram/post/SUCCESS_GET_POST_SELECTED' as const;
const FAIL_GET_POST_SELECTED = 'coinstagram/post/FAIL_GET_POST_SELECTED' as const;

const START_DELETE_POST = '/coinstagram/post/START_DELETE_POST' as const;
const SUCCESS_DELETE_POST = '/coinstagram/post/SUCCESS_DELETE_POST' as const;
const FAIL_DELETE_POST = '/coinstagram/post/FAIL_DELETE_POST' as const;

// action creator
const startGetPosts = () => ({
  type: START_GET_POSTS,
});

const successGetPostsUser = (userPosts: EachPostState[]) => ({
  type: SUCCESS_GET_POSTS_USER,
  payload: userPosts,
});

const successGetPostsFeed = (
  followersPosts: EachPostState[],
  myPosts: EachPostState[],
) => {
  const mergedPosts = [...followersPosts, ...myPosts];
  mergedPosts.sort((a, b) => (a['id'] < b['id'] ? 1 : -1));

  return {
    type: SUCCESS_GET_POSTS_FEED,
    payload: mergedPosts,
  };
};

const successGetPostsRandom = (randomPosts: EachPostState[]) => ({
  type: SUCCESS_GET_POSTS_RANDOM,
  payload: randomPosts,
});

const failGetPosts = (error: Error) => ({
  type: FAIL_GET_POSTS,
  payload: error,
});

const startGetPostSelected = () => ({
  type: START_GET_POST_SELECTED,
});

const successGetPostSelected = (selectedPost: EachPostState) => ({
  type: SUCCESS_GET_POST_SELECTED,
  payload: {
    selectedPost,
  },
});

const failGetPostSelcted = (error: Error) => ({
  type: FAIL_GET_POST_SELECTED,
  payload: error,
});

const startDeletePost = () => ({
  type: START_DELETE_POST,
});

const successDeletePost = (post_id: number) => ({
  type: SUCCESS_DELETE_POST,
  payload: {
    post_id,
  },
});

const failDeletePost = (error: Error) => ({
  type: FAIL_DELETE_POST,
  payload: error,
});

type PostActions =
  | ReturnType<typeof startGetPosts>
  | ReturnType<typeof successGetPostsUser>
  | ReturnType<typeof successGetPostsFeed>
  | ReturnType<typeof successGetPostsRandom>
  | ReturnType<typeof failGetPosts>
  | ReturnType<typeof startGetPostSelected>
  | ReturnType<typeof successGetPostSelected>
  | ReturnType<typeof failGetPostSelcted>
  | ReturnType<typeof startDeletePost>
  | ReturnType<typeof successDeletePost>
  | ReturnType<typeof failDeletePost>;

// saga action type
const GET_RANDOM_POSTS_SAGA = 'GET_RANDOM_POSTS_SAGA' as const;
const GET_FEED_POSTS_SAGA = 'GET_FEED_POSTS_SAGA' as const;
const GET_USER_POSTS_SAGA = 'GET_USER_POSTS_SAGA' as const;
const GET_SELECTED_POST_SAGA = 'GET_SELECTED_POST_SAGA' as const;
const DELETE_POST_SAGA = 'DELETE_POST_SAGA' as const;

// saga action creator
export const getRandomPostsSaga = () => ({
  type: GET_RANDOM_POSTS_SAGA,
});

export const getFeedPostsSaga = (user_id: string) => ({
  type: GET_FEED_POSTS_SAGA,
  payload: {
    user_id,
  },
});

export const getUserPostsSaga = (user_id: string) => ({
  type: GET_USER_POSTS_SAGA,
  payload: {
    user_id,
  },
});

export const getSelectedPostSaga = (post_id: number) => ({
  type: GET_SELECTED_POST_SAGA,
  payload: {
    post_id,
  },
});

export const deletePostSaga = (post_id: number) => ({
  type: DELETE_POST_SAGA,
  payload: {
    post_id,
  },
});

type PostSagaActions =
  | ReturnType<typeof getUserPostsSaga>
  | ReturnType<typeof getFeedPostsSaga>;

type onePostSagaAction =
  | ReturnType<typeof getSelectedPostSaga>
  | ReturnType<typeof deletePostSaga>;

// saga function
function* getRandomPosts() {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetPosts());
    const randomPosts: EachPostState[] = yield call(
      PostService.getRandomPosts,
      token,
    );
    yield put(successGetPostsRandom(randomPosts));
  } catch (error) {
    yield put(failGetPosts(error));
  }
}

function* getFeedPosts(action: PostSagaActions) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetPosts());
    const followersPosts: EachPostState[] = yield call(
      PostService.getFollowersPosts,
      token,
    );
    const myPosts: EachPostState[] = yield call(
      PostService.getUserPosts,
      token,
      action.payload.user_id,
    );
    yield put(successGetPostsFeed(followersPosts, myPosts));
  } catch (error) {
    yield put(failGetPosts(error));
  }
}

function* getUserPosts(action: PostSagaActions) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetPosts());
    const CertainUserPosts: EachPostState[] = yield call(
      PostService.getUserPosts,
      token,
      action.payload.user_id,
    );
    yield put(successGetPostsUser(CertainUserPosts));
  } catch (error) {
    yield put(failGetPosts(error));
  }
}

function* getSelectedPost(action: onePostSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetPostSelected());
    const selectedPost = yield call(
      PostService.getSelectedPost,
      token,
      action.payload.post_id,
    );
    yield put(successGetPostSelected(selectedPost));
  } catch (error) {
    yield put(failGetPostSelcted(error));
  }
}

function* deletePost(action: onePostSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startDeletePost());
    yield call(PostService.deletePost, token, action.payload.post_id);
    yield put(successDeletePost(action.payload.post_id));
  } catch (error) {
    yield put(failDeletePost(error));
  }
}

// saga function register
export function* postsSaga() {
  yield takeLatest(GET_RANDOM_POSTS_SAGA, getRandomPosts);
  yield takeLeading(GET_FEED_POSTS_SAGA, getFeedPosts);
  yield takeLatest(GET_USER_POSTS_SAGA, getUserPosts);
  yield takeLatest(GET_SELECTED_POST_SAGA, getSelectedPost);
  yield takeLatest(DELETE_POST_SAGA, deletePost);
}

// initial state
const initialState: PostsState = {
  loading: false,
  error: null,
  FeedPosts: [],
  selectedPost: {
    loading: false,
    error: null,
    post: null,
  },
};

// reducer
function postReducer(
  state: PostsState = initialState,
  action: PostActions,
): PostsState {
  switch (action.type) {
    case START_GET_POSTS:
      return {
        loading: true,
        error: null,
        FeedPosts: [],
        selectedPost: state.selectedPost,
      };
    case START_GET_POST_SELECTED:
      return {
        loading: true,
        error: null,
        FeedPosts: state.FeedPosts,
        selectedPost: {
          loading: true,
          error: null,
          post: null,
        },
      };
    case START_DELETE_POST:
      return {
        loading: true,
        error: null,
        FeedPosts: state.FeedPosts,
        selectedPost: state.selectedPost,
      };
    case SUCCESS_GET_POSTS_RANDOM:
      return {
        loading: false,
        error: null,
        FeedPosts: action.payload,
        selectedPost: state.selectedPost,
      };
    case SUCCESS_GET_POSTS_USER:
      return {
        loading: false,
        error: null,
        FeedPosts: state.FeedPosts,
        selectedPost: state.selectedPost,
      };
    case SUCCESS_GET_POSTS_FEED:
      return {
        loading: false,
        error: null,
        FeedPosts: action.payload,
        selectedPost: state.selectedPost,
      };
    case SUCCESS_GET_POST_SELECTED:
      return {
        loading: false,
        error: null,
        FeedPosts: state.FeedPosts,
        selectedPost: {
          loading: false,
          error: null,
          post: action.payload.selectedPost,
        },
      };
    case SUCCESS_DELETE_POST:
      return {
        loading: false,
        error: null,
        FeedPosts: state.FeedPosts.filter(
          post => post.id !== action.payload.post_id,
        ),
        selectedPost: state.selectedPost,
      };
    case FAIL_GET_POSTS:
      return {
        loading: false,
        error: action.payload,
        FeedPosts: state.FeedPosts,
        selectedPost: state.selectedPost,
      };
    case FAIL_GET_POST_SELECTED:
      return {
        loading: false,
        error: null,
        FeedPosts: state.FeedPosts,
        selectedPost: {
          loading: true,
          error: action.payload,
          post: null,
        },
      };
    case FAIL_DELETE_POST:
      return {
        loading: false,
        error: null,
        FeedPosts: state.FeedPosts,
        selectedPost: state.selectedPost,
      };
    default:
      return state;
  }
}

export default postReducer;
