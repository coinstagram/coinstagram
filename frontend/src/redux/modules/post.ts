import RootState, { PostsState, EachPostState } from '../../type';
import { takeLatest, put, select, call } from 'redux-saga/effects';
import PostService from '../services/postService';

// action type
const START_GET_POSTS = 'coinstagram/post/START_GET_POSTS' as const;
const SUCCESS_GET_POSTS_USER = 'coinstagram/post/SUCCESS_GET_POSTS_USER' as const;
const SUCCESS_GET_POSTS_FEED = 'coinstagram/post/SUCCESS_GET_POSTS_FEED' as const;
const SUCCESS_GET_POSTS_RANDOM = 'coinstagram/post/SUCCESS_GET_POSTS_RANDOM' as const;
const FAIL_GET_POSTS = 'coinstagram/post/FAIL_GET_POSTS' as const;

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

type PostActions =
  | ReturnType<typeof startGetPosts>
  | ReturnType<typeof successGetPostsUser>
  | ReturnType<typeof successGetPostsFeed>
  | ReturnType<typeof successGetPostsRandom>
  | ReturnType<typeof failGetPosts>;

// saga action type
const GET_RANDOM_POSTS_SAGA = 'GET_RANDOM_POSTS_SAGA' as const;
const GET_FEED_POSTS_SAGA = 'GET_FEED_POSTS_SAGA' as const;
const GET_USER_POSTS_SAGA = 'GET_USER_POSTS_SAGA' as const;

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

type postsActions =
  | ReturnType<typeof getUserPostsSaga>
  | ReturnType<typeof getFeedPostsSaga>;

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

function* getFeedPosts(action: postsActions) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetPosts());
    const followersPosts: EachPostState[] = yield call(
      PostService.getFollowersPosts,
      token,
    );
    console.log(action.payload.user_id);
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

function* getUserPosts(action: postsActions) {
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

// saga function register
export function* postsSaga() {
  yield takeLatest(GET_RANDOM_POSTS_SAGA, getRandomPosts);
  yield takeLatest(GET_FEED_POSTS_SAGA, getFeedPosts);
  yield takeLatest(GET_USER_POSTS_SAGA, getUserPosts);
}

// initial state
const initialState: PostsState = {
  loading: false,
  error: null,
  FeedPosts: [],
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
      };
    case SUCCESS_GET_POSTS_RANDOM:
      return {
        loading: false,
        error: null,
        FeedPosts: action.payload,
      };
    case SUCCESS_GET_POSTS_USER:
      return {
        loading: false,
        error: null,
        FeedPosts: action.payload,
      };
    case SUCCESS_GET_POSTS_FEED:
      return {
        loading: false,
        error: null,
        FeedPosts: action.payload,
      };
    case FAIL_GET_POSTS:
      return {
        loading: false,
        error: null,
        FeedPosts: [],
      };
    default:
      return state;
  }
}

export default postReducer;
