import RootState, { PostsState, EachPostState } from '../../type';
import { takeLatest, put, select, call, takeLeading } from 'redux-saga/effects';
import PostService from '../services/postService';

// action type
const START_GET_POSTS_FEED = 'coinstagram/post/START_GET_POSTS_FEED' as const;
const SUCCESS_GET_POSTS_FEED = 'coinstagram/post/SUCCESS_GET_POSTS_FEED' as const;
const FAIL_GET_POSTS_FEED = 'coinstagram/post/FAIL_GET_POSTS_FEED' as const;

const START_GET_POSTS_USER = 'coinstagram/post/START_GET_POSTS_USER' as const;
const SUCCESS_GET_POSTS_USER = 'coinstagram/post/SUCCESS_GET_POSTS_USER' as const;
const FAIL_GET_POSTS_USER = 'coinstagram/post/FAIL_GET_POSTS_USER' as const;

const START_GET_POST_SELECTED = 'coinstagram/post/START_GET_POST_SELECTED' as const;
const SUCCESS_GET_POST_SELECTED = 'coinstagram/post/SUCCESS_GET_POST_SELECTED' as const;
const FAIL_GET_POST_SELECTED = 'coinstagram/post/FAIL_GET_POST_SELECTED' as const;

const START_GET_POSTS_RANDOM = 'coinstagram/post/START_GET_POSTS_RANDOM' as const;
const SUCCESS_GET_POSTS_RANDOM = 'coinstagram/post/SUCCESS_GET_POSTS_RANDOM' as const;
const FAIL_GET_POSTS_RANDOM = 'coinstagram/post/FAIL_GET_POSTS_RANDOM' as const;

const START_GET_POSTS_TAGGED = 'coinstagram/post/START_GET_POSTS_TAGGED' as const;
const SUCCESS_GET_POSTS_TAGGED = 'coinstagram/post/SUCCESS_GET_POSTS_TAGGED' as const;
const FAIL_GET_POSTS_TAGGED = 'coinstagram/post/FAIL_GET_POSTS_TAGGED' as const;

const START_DELETE_POST = 'coinstagram/post/START_DELETE_POST' as const;
const SUCCESS_DELETE_POST = 'coinstagram/post/SUCCESS_DELETE_POST' as const;
const FAIL_DELETE_POST = 'coinstagram/post/FAIL_DELETE_POST' as const;

const RESET_RANDOM_POST = 'coinstagram/post/RESET_RANDOM_POST' as const;
const RESET_FEED_POST = 'coinstagram/post/RESET_FEED_POST' as const;

const LAST_RANDOM_POST = 'coinstagram/post/LAST_RANDOM_POST' as const;
const LAST_TAGGED_POST = 'coinstagram/post/LAST_TAGGED_POST' as const;
const LAST_FEED_POST = 'coinstagram/post/LAST_FEED_POST' as const;


// action creator
const startGetPostsFeed = () => ({
  type: START_GET_POSTS_FEED,
});

const successGetPostsFeed = (feedPosts: EachPostState[]) => ({
    type: SUCCESS_GET_POSTS_FEED,
    payload: {
      feedPosts,
    },
});
const failGetPostsFeed = (error: Error) => ({
  type: FAIL_GET_POSTS_FEED,
  payload: error,
});

const startGetPostsUser = () => ({
  type: START_GET_POSTS_USER,
});

const successGetPostsUser = (userPosts: EachPostState[]) => ({
  type: SUCCESS_GET_POSTS_USER,
  payload: {
    userPosts,
  },
});

const failGetPostsUser = (error: Error) => ({
  type: FAIL_GET_POSTS_USER,
  payload: error,
});

const startGetPostsRandom = () => ({
  type: START_GET_POSTS_RANDOM,
});

const successGetPostsRandom = (randomPosts: EachPostState[]) => ({
  type: SUCCESS_GET_POSTS_RANDOM,
  payload: {
    randomPosts,
  },
});

const failGetPostsRandom = (error: Error) => ({
  type: FAIL_GET_POSTS_RANDOM,
  payload: error,
});

const startGetPostsTagged = () => ({
  type: START_GET_POSTS_TAGGED,
});

const successGetPostsTagged = (taggedPosts: EachPostState[]) => ({
  type: SUCCESS_GET_POSTS_TAGGED,
  payload: {
    taggedPosts,
  },
});

const failGetPostsTagged = (error: Error) => ({
  type: FAIL_GET_POSTS_TAGGED,
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

export const resetRandomPost = () => ({
  type: RESET_RANDOM_POST,
});

export const resetFeedPost = () => ({
  type: RESET_FEED_POST,
});

const lastRandomPost = () => ({
  type: LAST_RANDOM_POST,
});

const lastTaggedPost = () => ({
  type: LAST_TAGGED_POST,
});


const lastFeedPost = () => ({
  type: LAST_FEED_POST,
});

type PostActions =
  | ReturnType<typeof startGetPostsFeed>
  | ReturnType<typeof successGetPostsFeed>
  | ReturnType<typeof failGetPostsFeed>
  | ReturnType<typeof startGetPostsTagged>
  | ReturnType<typeof successGetPostsTagged>
  | ReturnType<typeof startGetPostsTagged>
  | ReturnType<typeof failGetPostsTagged>
  | ReturnType<typeof successGetPostsUser>
  | ReturnType<typeof failGetPostsUser>
  | ReturnType<typeof startGetPostsRandom>
  | ReturnType<typeof successGetPostsRandom>
  | ReturnType<typeof failGetPostsRandom>
  | ReturnType<typeof startGetPostSelected>
  | ReturnType<typeof successGetPostSelected>
  | ReturnType<typeof failGetPostSelcted>
  | ReturnType<typeof startDeletePost>
  | ReturnType<typeof successDeletePost>
  | ReturnType<typeof failDeletePost>
  | ReturnType<typeof resetRandomPost>
  | ReturnType<typeof resetFeedPost>
  | ReturnType<typeof lastRandomPost>
  | ReturnType<typeof lastTaggedPost>
  | ReturnType<typeof lastFeedPost>;

// saga action type
const GET_RANDOM_POSTS_SAGA = 'GET_RANDOM_POSTS_SAGA' as const;
const GET_TAGGED_POSTS_SAGA = 'GET_TAGGED_POSTS_SAGA' as const;
const GET_FEED_POSTS_SAGA = 'GET_FEED_POSTS_SAGA' as const;
const GET_USER_POSTS_SAGA = 'GET_USER_POSTS_SAGA' as const;
const GET_SELECTED_POST_SAGA = 'GET_SELECTED_POST_SAGA' as const;
const DELETE_POST_SAGA = 'DELETE_POST_SAGA' as const;

// saga action creator
export const getRandomPostsSaga = (count: number) => ({
  type: GET_RANDOM_POSTS_SAGA,
  payload: {
    count,
  }
});

export const getTaggedPostsSaga = (tag: string, count: number) => ({
  type: GET_TAGGED_POSTS_SAGA,
  payload: {
    tag,
    count,
  }
});

export const getFeedPostsSaga = (count: number) => ({
  type: GET_FEED_POSTS_SAGA,
  payload: {
    count,
  },
});

export const getUserPostsSaga = (user_id: string, count: number) => ({
  type: GET_USER_POSTS_SAGA,
  payload: {
    user_id,
    count,
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

type randomPostSagaAction = ReturnType<typeof getRandomPostsSaga>;
type taggedPostSagaAction = ReturnType<typeof getTaggedPostsSaga>;
type feedPostSagaAction = ReturnType<typeof getFeedPostsSaga>;
type userPostSagaAction = ReturnType<typeof getUserPostsSaga>;
type onePostSagaAction = ReturnType<typeof getSelectedPostSaga> | ReturnType<typeof deletePostSaga>;

// saga function
function* getRandomPosts(action: randomPostSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetPostsRandom());
    const randomPosts: EachPostState[] = yield call(PostService.getRandomPosts, token, action.payload.count);
    yield randomPosts.length === 0 ? put(lastRandomPost()) : put(successGetPostsRandom(randomPosts));
  } catch (error) {
    yield put(failGetPostsRandom(error));
  }
}

function* getTaggedPosts(action: taggedPostSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetPostsTagged());
    const taggedPosts: EachPostState[] = yield call(PostService.getTaggedPost, token, action.payload.tag, action.payload.count);
    console.log(taggedPosts);
    yield taggedPosts.length === 0 ? put(lastTaggedPost()) : put(successGetPostsTagged(taggedPosts));
  } catch (error) {
    yield put(failGetPostsTagged(error));
  }
}

function* getFeedPosts(action: feedPostSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);

    yield put(startGetPostsFeed());
    const feedPosts: EachPostState[] = yield call(PostService.getFeedPosts, token, action.payload.count);
    yield feedPosts.length === 0 ? put(lastFeedPost()) : put(successGetPostsFeed(feedPosts));
  } catch (error) {
    yield put(failGetPostsFeed(error));
  }
}

function* getUserPosts(action: userPostSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetPostsUser());
    const CertainUserPosts: EachPostState[] = yield call(PostService.getUserPosts, token, action.payload.user_id, action.payload.count);
    yield put(successGetPostsUser(CertainUserPosts));
  } catch (error) {
    yield put(failGetPostsUser(error));
  }
}

function* getSelectedPost(action: onePostSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetPostSelected());
    const selectedPost = yield call(PostService.getSelectedPost, token, action.payload.post_id);
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
  yield takeLeading (GET_RANDOM_POSTS_SAGA, getRandomPosts);
  yield takeLeading (GET_TAGGED_POSTS_SAGA, getTaggedPosts);
  yield takeLeading(GET_FEED_POSTS_SAGA, getFeedPosts);
  yield takeLatest(GET_USER_POSTS_SAGA, getUserPosts);
  yield takeLatest(GET_SELECTED_POST_SAGA, getSelectedPost);
  yield takeLatest(DELETE_POST_SAGA, deletePost);
}

// initial state
const initialState: PostsState = {
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
};

// reducer
function postReducer(state: PostsState = initialState, action: PostActions): PostsState {
  switch (action.type) {
    case START_GET_POSTS_FEED:
      return {
        feedPosts: {
          loading: true,
          error: null,
          isLast: false,
          feedPosts: state.feedPosts.feedPosts,
        },
        selectedPost: state.selectedPost,
        randomPosts: state.randomPosts,
      };
    case START_GET_POSTS_RANDOM:
      return {
        feedPosts: state.feedPosts,
        selectedPost: state.selectedPost,
        randomPosts: {
          ...state.randomPosts,
          loading: true,
        },
      };
    case START_GET_POSTS_TAGGED:
      return {
        feedPosts: state.feedPosts,
        selectedPost: state.selectedPost,
        randomPosts: {
          ...state.randomPosts,
          loading: true,
        },
      };
    case START_GET_POST_SELECTED:
      return {
        feedPosts: state.feedPosts,
        selectedPost: {
          ...state.selectedPost,
          loading: true,
        },
        randomPosts: state.randomPosts,
      };
    case START_DELETE_POST:
      return {
        feedPosts: {
          loading: true,
          error: null,
          isLast: false,
          feedPosts: state.feedPosts.feedPosts,
        },
        selectedPost: state.selectedPost,
        randomPosts: state.randomPosts,
      };
    case SUCCESS_GET_POSTS_RANDOM:
      return {
        feedPosts: state.feedPosts,
        selectedPost: state.selectedPost,
        randomPosts: {
          ...state.randomPosts,
          loading: false,
          randomPosts: [...state.randomPosts.randomPosts, ...action.payload.randomPosts],
        },
      };
    case SUCCESS_GET_POSTS_TAGGED:
      return {
        feedPosts: state.feedPosts,
        selectedPost: state.selectedPost,
        randomPosts: {
          ...state.randomPosts,
          loading: false,
          randomPosts: [...state.randomPosts.randomPosts, ...action.payload.taggedPosts],
        },
      };
    case SUCCESS_GET_POSTS_FEED:
      return {
        feedPosts: {
          ...state.feedPosts,
          loading: false,
          feedPosts: [...state.feedPosts.feedPosts, ...action.payload.feedPosts],
        },
        selectedPost: state.selectedPost,
        randomPosts: state.randomPosts,
      };
    case SUCCESS_GET_POST_SELECTED:
      return {
        feedPosts: state.feedPosts,
        selectedPost: {
          ...state.selectedPost,
          loading: false,
          selectedPost: action.payload.selectedPost,
        },
        randomPosts: state.randomPosts,
      };
    case SUCCESS_DELETE_POST:
      return {
        feedPosts: {
          loading: false,
          error: null,
          isLast: state.feedPosts.isLast,
          feedPosts: state.feedPosts.feedPosts.filter(post => post.id !== action.payload.post_id),
        },
        selectedPost: state.selectedPost,
        randomPosts: state.randomPosts,
      };
    case FAIL_GET_POSTS_FEED:
      return {
        feedPosts: {
          loading: false,
          error: action.payload,
          isLast: state.feedPosts.isLast,
          feedPosts: [],
        },
        selectedPost: state.selectedPost,
        randomPosts: state.randomPosts,
      };
    case FAIL_GET_POST_SELECTED:
      return {
        feedPosts: state.feedPosts,
        selectedPost: {
          loading: false,
          error: action.payload,
          selectedPost: null,
        },
        randomPosts: state.randomPosts,
      };
    case FAIL_GET_POSTS_RANDOM:
      return {
        feedPosts: state.feedPosts,
        selectedPost: state.selectedPost,
        randomPosts: {
          ...state.randomPosts,
          loading: false,
          error: action.payload,
        },
      };
    case FAIL_GET_POSTS_TAGGED:
      return {
        feedPosts: state.feedPosts,
        selectedPost: state.selectedPost,
        randomPosts: {
          ...state.randomPosts,
          loading: false,
          error: action.payload,
        },
      };
    case FAIL_DELETE_POST:
      return {
        feedPosts: state.feedPosts,
        selectedPost: state.selectedPost,
        randomPosts: state.randomPosts,
      };
      case RESET_RANDOM_POST:
        return {
          ...state,
          randomPosts: {
            ...state.randomPosts,
            isLast: false,
            randomPosts: [],
          }
        };
      case RESET_FEED_POST:
        return {
          ...state,
          feedPosts: {
            ...state.feedPosts,
            isLast: false,
            feedPosts: [],
          }
        }
      case LAST_RANDOM_POST:
        return {
          ...state,
          randomPosts: {
            ...state.randomPosts,
            loading: false,
            isLast: true,
          }
        }
      case LAST_TAGGED_POST:
        return {
          ...state,
          randomPosts: {
            ...state.randomPosts,
            loading: false,
            isLast: true,
          }
        }
      case LAST_FEED_POST:
        return {
          ...state,
          feedPosts: {
            ...state.feedPosts,
            loading: false,
            isLast: true,
          }
        }
    default:
      return state;
  }
}

export default postReducer;
