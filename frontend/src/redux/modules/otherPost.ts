import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import RootState, { CountResponseState, EachPostState, OtherPostState } from '../../type';
import PostService from '../services/postService';

// action type
const START_GET_OTHER_POSTS = 'coinstagram/otherPost/START_GET_OTHER_POSTS' as const;
const SUCCESS_GET_OTHER_POSTS = 'coinstagram/otherPost/SUCCESS_GET_OTHER_POSTS' as const;
const FAIL_GET_OTHER_POSTS = 'coinstagram/otherPost/FAIL_GET_OTHER_POSTS' as const;

const START_GET_POST_COUNTS = 'coinstagram/otherPost/START_GET_POST_COUNTS' as const;
const SUCCESS_GET_POST_COUNTS = 'coinstagram/otherPost/SUCCESS_GET_POST_COUNTS' as const;
const FAIL_GET_POST_COUNTS = 'coinstagram/otherPost/FAIL_GET_POST_COUNTS' as const;

// action creator
const startGetOtherPosts = () => ({
  type: START_GET_OTHER_POSTS,
});

const successGetOtherPosts = (otherPosts: EachPostState[]) => ({
  type: SUCCESS_GET_OTHER_POSTS,
  payload: {
    otherPosts,
  },
});

const failGetOtherPosts = (error: Error) => ({
  type: FAIL_GET_OTHER_POSTS,
  payload: error,
});

const startGetPostCounts = () => ({
  type: START_GET_POST_COUNTS,
});

const successGetPostCounts = (post_id: number, counts: CountResponseState) => ({
  type: SUCCESS_GET_POST_COUNTS,
  payload: {
    post_id,
    ...counts,
  },
});

const failGetPostCounts = (error: Error) => ({
  type: FAIL_GET_POST_COUNTS,
  payload: error,
});

type OtherPostActions =
  | ReturnType<typeof startGetOtherPosts>
  | ReturnType<typeof successGetOtherPosts>
  | ReturnType<typeof failGetOtherPosts>
  | ReturnType<typeof startGetPostCounts>
  | ReturnType<typeof successGetPostCounts>
  | ReturnType<typeof failGetPostCounts>;

// saga action
const GET_OTEHR_POSTS_SAGA = 'GET_OTEHR_POSTS_SAGA' as const;
const GET_POST_COUNTS_SAGA = 'GET_POST_COUNTS_SAGA' as const;

// saga action creator
export const getOtherPostsSaga = (user_id: string) => ({
  type: GET_OTEHR_POSTS_SAGA,
  payload: {
    user_id,
  },
});

export const getPostCountsSaga = (post_id: number) => ({
  type: GET_POST_COUNTS_SAGA,
  payload: {
    post_id,
  },
});

type OtherPostSagaAction = ReturnType<typeof getOtherPostsSaga>;
type GetPostCountsSagaAction = ReturnType<typeof getPostCountsSaga>;

// saga function
function* getOtherPosts(action: OtherPostSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetOtherPosts());
    const otherPosts = yield call(PostService.getUserPosts, token, action.payload.user_id);
    yield put(successGetOtherPosts(otherPosts));
  } catch (error) {
    yield put(failGetOtherPosts(error));
  }
}

function* getPostCounts(action: GetPostCountsSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetPostCounts());
    const countObj = yield call(PostService.getCountPost, token, action.payload.post_id);
    yield put(successGetPostCounts(action.payload.post_id, countObj));
  } catch (error) {
    yield put(failGetPostCounts(error));
  }
}

// saga register
export function* otherPostsSaga() {
  yield takeLatest(GET_OTEHR_POSTS_SAGA, getOtherPosts);
  yield takeEvery(GET_POST_COUNTS_SAGA, getPostCounts);
}

// initial state
const initialState: OtherPostState = {
  loading: false,
  error: null,
  otherPosts: [],
  counts: {
    loading: false,
    error: null,
    counts: [],
  },
};

// reducer
function otherPostReducer(state: OtherPostState = initialState, action: OtherPostActions) {
  switch (action.type) {
    case START_GET_OTHER_POSTS:
      return {
        loading: true,
        error: null,
        otherPosts: [],
        counts: state.counts,
      };
    case SUCCESS_GET_OTHER_POSTS:
      return {
        loading: false,
        error: null,
        otherPosts: action.payload.otherPosts,
        counts: state.counts,
      };
    case FAIL_GET_OTHER_POSTS:
      return {
        loading: false,
        error: action.payload,
        otherPosts: [],
        counts: state.counts,
      };
    case START_GET_POST_COUNTS:
      return {
        loading: false,
        error: null,
        otherPosts: state.otherPosts,
        counts: {
          loading: true,
          error: null,
          counts: state.counts.counts,
        },
      };
    case SUCCESS_GET_POST_COUNTS:
      return {
        loading: false,
        error: null,
        otherPosts: state.otherPosts,
        counts: {
          loading: false,
          error: null,
          counts: state.counts.counts.some(info => info.post_id === action.payload.post_id)
            ? state.counts.counts.map(info => (info.post_id === action.payload.post_id ? action.payload : info))
            : [...state.counts.counts, action.payload],
        },
      };
    case FAIL_GET_POST_COUNTS:
      return {
        loading: false,
        error: null,
        otherPosts: state.otherPosts,
        counts: {
          loading: true,
          error: null,
          counts: state.counts.counts,
        },
      };
    default:
      return state;
  }
}

export default otherPostReducer;
