import { call, put, select, takeEvery, takeLeading } from 'redux-saga/effects';
import RootState, { likeState, userLikesState } from '../../type';
import LikeService from '../services/likeService';

// action type
const START_GET_POST_LIKES = 'coinstagram/like/START_GET_POST_LIKES' as const;
const SUCCESS_GET_POST_LIKES = 'coinstagram/like/SUCCESS_GET_POST_LIKES' as const;
const FAIL_GET_POST_LIKES = 'coinstagram/like/FAIL_GET_POST_LIKES' as const;

const START_ADD_POST_LIKE = 'coinstagram/like/START_ADD_POST_LIKE' as const;
const SUCCESS_ADD_POST_LIKE = 'coinstagram/like/SUCCESS_ADD_POST_LIKE' as const;
const FAIL_ADD_POST_LIKE = 'coinstagram/like/FAIL_ADD_POST_LIKE' as const;

const START_DELETE_POST_LIKE = 'coinstagram/like/START_DELETE_POST_LIKE' as const;
const SUCCESS_DELETE_POST_LIKE = 'coinstagram/like/SUCCESS_DELETE_POST_LIKE' as const;
const FAIL_DELETE_POST_LIKE = 'coinstagram/like/FAIL_DELETE_POST_LIKE' as const;

const START_GET_SELECTEDPOST_LIKES = 'coinstagram/like/START_GET_SELECTEDPOST_LIKES' as const;
const SUCCESS_GET_SELECTEDPOST_LIKES = 'coinstagram/like/SUCCESS_GET_SELECTEDPOST_LIKES' as const;
const FAIL_GET_SELECTEDPOST_LIKES = 'coinstagram/like/FAIL_GET_POST_LIKES' as const;

const RESET_POST_LIKES = 'coinstagram/like/RESET_POST_LIKES' as const;

// const START_GET_COMMENT_LIKES = 'coinstagram/like/START_GET_COMMENT_LIKES' as const;
// const SUCCESS_GET_COMMENT_LIKES = 'coinstagram/like/SUCCESS_GET_COMMENT_LIKES' as const;
// const FAIL_GET_COMMENT_LIKES = 'coinstagram/like/FAIL_GET_COMMENT_LIKES' as const;

// const START_ADD_COMMENT_LIKE = 'coinstagram/like/START_ADD_COMMENT_LIKE' as const;
// const SUCCESS_ADD_COMMENT_LIKE = 'coinstagram/like/SUCCESS_ADD_COMMENT_LIKE' as const;
// // const FAIL_ADD_COMMENT_LIKE = 'coinstagram/like/FAIL_ADD_COMMENT_LIKE' as const;

// action creator
const startGetPostLikes = () => ({
  type: START_GET_POST_LIKES,
});

const successGetPostLikes = (postLikes: userLikesState[]) => ({
  type: SUCCESS_GET_POST_LIKES,
  payload: {
    postLikes,
  },
});

const failGetPostLikes = (error: Error) => ({
  type: FAIL_GET_POST_LIKES,
  payload: error,
});

const startAddPostLike = () => ({
  type: START_ADD_POST_LIKE,
});

const successAddPostLike = (user_id: string, post_id: number) => ({
  type: SUCCESS_ADD_POST_LIKE,
  payload: {
    user_id,
    post_id,
  },
});

const failAddPostLike = (error: Error) => ({
  type: FAIL_ADD_POST_LIKE,
  payload: error,
});

const startDeletePostLike = () => ({
  type: START_DELETE_POST_LIKE,
});

const successDeletePostLike = (user_id: string, post_id: number) => ({
  type: SUCCESS_DELETE_POST_LIKE,
  payload: {
    user_id,
    post_id,
  },
});

const failDeletePostLike = (error: Error) => ({
  type: FAIL_DELETE_POST_LIKE,
  payload: error,
});

const startGetSelectedPostLikes = () => ({
  type: START_GET_SELECTEDPOST_LIKES,
});

const successGetSelectedPostLikes = (postLikes: userLikesState[]) => ({
  type: SUCCESS_GET_SELECTEDPOST_LIKES,
  payload: {
    postLikes,
  },
});

const failGetSelectedPostLikes = (error: Error) => ({
  type: FAIL_GET_SELECTEDPOST_LIKES,
  payload: error,
});

export const resetPostLikes = () => ({
  type: RESET_POST_LIKES,
});

type likeActios =
  | ReturnType<typeof startGetPostLikes>
  | ReturnType<typeof successGetPostLikes>
  | ReturnType<typeof failGetPostLikes>
  | ReturnType<typeof startAddPostLike>
  | ReturnType<typeof successAddPostLike>
  | ReturnType<typeof failAddPostLike>
  | ReturnType<typeof startDeletePostLike>
  | ReturnType<typeof successDeletePostLike>
  | ReturnType<typeof failDeletePostLike>
  | ReturnType<typeof startGetSelectedPostLikes>
  | ReturnType<typeof successGetSelectedPostLikes>
  | ReturnType<typeof failGetSelectedPostLikes>
  | ReturnType<typeof resetPostLikes>;

// saga action
const GET_POST_LIKES_SAGA = 'GET_POST_LIKES_SAGA' as const;
const ADD_POST_LIKE_SAGA = 'ADD_POST_LIKE_SAGA' as const;
const DELETE_POST_LIKE_SAGA = 'DELETE_POST_LIKE_SAGA' as const;
const GET_SELECTEDPOST_LIKES_SAGA = 'GET_SELECTEDPOST_LIKES_SAGA' as const;

// saga action creator
export const getPostLikesSaga = (post_id: number) => ({
  type: GET_POST_LIKES_SAGA,
  payload: {
    post_id,
  },
});

export const addPostLikeSaga = (post_id: number) => ({
  type: ADD_POST_LIKE_SAGA,
  payload: {
    post_id,
  },
});

export const deletePostLikeSaga = (post_id: number) => ({
  type: DELETE_POST_LIKE_SAGA,
  payload: {
    post_id,
  },
});

export const getSelectedPostLikesSaga = (post_id: number) => ({
  type: GET_SELECTEDPOST_LIKES_SAGA,
  payload: {
    post_id,
  },
});

type getLikesSagaAction = ReturnType<typeof getPostLikesSaga>;
type postLikeSagaAction = ReturnType<typeof addPostLikeSaga>;
type deletePostLikeSagaAction = ReturnType<typeof deletePostLikeSaga>;

// saga function
function* getPostLikes(action: getLikesSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);

    yield put(startGetPostLikes());
    const userLikes = yield call(LikeService.getLikesPost, token, action.payload.post_id);
    yield put(successGetPostLikes(userLikes));
  } catch (error) {
    yield put(failGetPostLikes(error));
  }
}

function* addPostLike(action: postLikeSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    const { user_id } = yield select((state: RootState) => state.userInfo.user);
    yield put(startAddPostLike());
    yield call(LikeService.addLikePost, token, action.payload.post_id);
    yield put(successAddPostLike(user_id, action.payload.post_id));
  } catch (error) {
    yield put(failAddPostLike(error));
  }
}

function* deletePostLike(action: deletePostLikeSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    const { user_id } = yield select((state: RootState) => state.userInfo.user);
    yield put(startDeletePostLike());
    yield call(LikeService.deleteLikePost, token, action.payload.post_id);
    yield put(successDeletePostLike(user_id, action.payload.post_id));
  } catch (error) {
    yield put(failDeletePostLike(error));
  }
}

function* getSelectedPostLikes(action: getLikesSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetSelectedPostLikes());
    const userLikes = yield call(LikeService.getLikesPost, token, action.payload.post_id);
    yield put(successGetSelectedPostLikes(userLikes));
  } catch (error) {
    yield put(failGetSelectedPostLikes(error));
  }
}

// saga register
export function* likeSaga() {
  yield takeEvery(GET_POST_LIKES_SAGA, getPostLikes);
  yield takeLeading(ADD_POST_LIKE_SAGA, addPostLike);
  yield takeLeading(DELETE_POST_LIKE_SAGA, deletePostLike);
  yield takeEvery(GET_SELECTEDPOST_LIKES_SAGA, getSelectedPostLikes);
}

// initialstate
const initialState: likeState = {
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
};

function likeReducer(state: likeState = initialState, action: likeActios) {
  switch (action.type) {
    case START_GET_POST_LIKES:
      return {
        ...state,
        feedPostLikes: {
          loading: true,
          error: null,
          userLikes: state.feedPostLikes.userLikes,
        },
      };
    case SUCCESS_GET_POST_LIKES:
      return {
        ...state,
        feedPostLikes: {
          loading: false,
          error: null,
          userLikes: [...state.feedPostLikes.userLikes, ...action.payload.postLikes],
        },
      };
    case FAIL_GET_POST_LIKES:
      return {
        ...state,
        feedPostLikes: {
          loading: false,
          error: action.payload,
          userLikes: [],
        },
      };
    case START_ADD_POST_LIKE:
      return {
        feedPostLikes: {
          ...state.feedPostLikes,
          loading: true,
        },
        selectedPostLikes: {
          ...state.selectedPostLikes,
          loading: true,
        },
      };
    case SUCCESS_ADD_POST_LIKE:
      return {
        feedPostLikes: {
          loading: false,
          error: null,
          userLikes: state.feedPostLikes.userLikes.map(like =>
            +like.post_id === action.payload.post_id
              ? {
                  post_id: like.post_id,
                  user_id: [...like.user_id, action.payload.user_id],
                }
              : like,
          ),
        },
        selectedPostLikes: {
          loading: false,
          error: null,
          userLikes: state.selectedPostLikes.userLikes.map(like =>
            +like.post_id === action.payload.post_id
              ? {
                  post_id: like.post_id,
                  user_id: [...like.user_id, action.payload.user_id],
                }
              : like,
          ),
        },
      };
    case FAIL_ADD_POST_LIKE:
      return {
        feedPostLikes: {
          loading: false,
          error: action.payload,
          userLikes: state.feedPostLikes.userLikes,
        },
        selectedPostLikes: {
          loading: false,
          error: action.payload,
          userLikes: state.selectedPostLikes.userLikes,
        },
      };
    case START_DELETE_POST_LIKE:
      return {
        ...state,
        feedPostLikes: {
          loading: true,
          error: null,
          userLikes: state.feedPostLikes.userLikes,
        },
        selectedPostLikes: {
          loading: true,
          error: null,
          userLikes: state.selectedPostLikes.userLikes,
        },
      };
    case SUCCESS_DELETE_POST_LIKE:
      return {
        ...state,
        feedPostLikes: {
          loading: false,
          error: null,
          userLikes: state.feedPostLikes.userLikes.map(like =>
            +like.post_id === action.payload.post_id
              ? {
                  post_id: like.post_id,
                  user_id: like.user_id.filter(id => id !== action.payload.user_id),
                }
              : like,
          ),
        },
        selectedPostLikes: {
          loading: false,
          error: null,
          userLikes: state.selectedPostLikes.userLikes.map(like =>
            +like.post_id === action.payload.post_id
              ? {
                  post_id: like.post_id,
                  user_id: like.user_id.filter(id => id !== action.payload.user_id),
                }
              : like,
          ),
        },
      };
    case FAIL_DELETE_POST_LIKE:
      return {
        feedPostLikes: {
          ...state.feedPostLikes,
          error: action.payload,
        },
        selectedPostLikes: {
          ...state.selectedPostLikes,
          error: action.payload,
        },
      };
    case START_GET_SELECTEDPOST_LIKES:
      return {
        ...state,
        selectedPostLikes: {
          loading: true,
          error: null,
          userLikes: [],
        },
      };
    case SUCCESS_GET_SELECTEDPOST_LIKES:
      return {
        ...state,
        selectedPostLikes: {
          loading: false,
          error: null,
          userLikes: action.payload.postLikes,
        },
      };
    case FAIL_GET_SELECTEDPOST_LIKES:
      return {
        ...state,
        selectedPostLikes: {
          loading: false,
          error: action.payload,
          userLikes: [],
        },
      };
    case RESET_POST_LIKES:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default likeReducer;
