import { call, put, select, takeLatest } from 'redux-saga/effects';
import RootState, { EachPostState, OtherPostState } from '../../type';
import PostService from '../services/postService';

// action type
const START_GET_OTHER_POSTS = 'coinstagram/otherPost/START_GET_OTHER_POSTS' as const;
const SUCCESS_GET_OTHER_POSTS = 'coinstagram/otherPost/SUCCESS_GET_OTHER_POSTS' as const;
const FAIL_GET_OTHER_POSTS = 'coinstagram/otherPost/FAIL_GET_OTHER_POSTS' as const;

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

type OtherPostActions =
  | ReturnType<typeof startGetOtherPosts>
  | ReturnType<typeof successGetOtherPosts>
  | ReturnType<typeof failGetOtherPosts>;

// saga action
const GET_OTEHR_POSTS_SAGA = 'GET_OTEHR_POSTS_SAGA' as const;

// saga action creator
export const getOtherPostsSaga = (user_id: string) => ({
  type: GET_OTEHR_POSTS_SAGA,
  payload: {
    user_id,
  },
});

type OtherPostSagaAction = ReturnType<typeof getOtherPostsSaga>;

// saga function
function* getOtherPosts(action: OtherPostSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetOtherPosts());
    const otherPosts = yield call(
      PostService.getUserPosts,
      token,
      action.payload.user_id,
    );
    yield put(successGetOtherPosts(otherPosts));
  } catch (error) {
    yield put(failGetOtherPosts(error));
  }
}

// saga register
export function* otherPostsSaga() {
  yield takeLatest(GET_OTEHR_POSTS_SAGA, getOtherPosts);
}

// initial state
const initialState: OtherPostState = {
  loading: false,
  error: null,
  otherPosts: [],
  commentsCount: 0,
  likesCount: 0,
};

// reducer
function otherPostReducer(
  state: OtherPostState = initialState,
  action: OtherPostActions,
) {
  switch (action.type) {
    case START_GET_OTHER_POSTS:
      return {
        loading: true,
        error: null,
        otherPosts: [],
        commentsCount: 0,
        likesCount: 0,
      };
    case SUCCESS_GET_OTHER_POSTS:
      return {
        loading: false,
        error: null,
        otherPosts: action.payload.otherPosts,
        commentsCount: state.commentsCount,
        likesCount: state.likesCount,
      };
    case FAIL_GET_OTHER_POSTS:
      return {
        loading: false,
        error: action.payload,
        otherPosts: [],
        commentsCount: 0,
        likesCount: 0,
      };
    default:
      return state;
  }
}

export default otherPostReducer;
