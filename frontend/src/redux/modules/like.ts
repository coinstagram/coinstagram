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

const START_GET_COMMENT_LIKES = 'coinstagram/like/START_GET_COMMENT_LIKES' as const;
const SUCCESS_GET_COMMENT_LIKES = 'coinstagram/like/SUCCESS_GET_COMMENT_LIKES' as const;
const FAIL_GET_COMMENT_LIKES = 'coinstagram/like/FAIL_GET_COMMENT_LIKES' as const;

const START_ADD_COMMENT_LIKE = 'coinstagram/like/START_ADD_COMMENT_LIKE' as const;
const SUCCESS_ADD_COMMENT_LIKE = 'coinstagram/like/SUCCESS_ADD_COMMENT_LIKE' as const;
const FAIL_ADD_COMMENT_LIKE = 'coinstagram/like/FAIL_ADD_COMMENT_LIKE' as const;

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

const startGetCommentLikes = () => ({
  type: START_GET_COMMENT_LIKES,
});

const successGetCommentLikes = () => ({
  type: SUCCESS_GET_COMMENT_LIKES,
});

const failGetCommentLikes = () => ({
  type: FAIL_GET_COMMENT_LIKES,
});

const startAddCommentLikes = () => ({
  type: START_ADD_COMMENT_LIKE,
});

const successAddCommentLikes = () => ({
  type: SUCCESS_ADD_COMMENT_LIKE,
});

const failAddCommentLikes = () => ({
  type: FAIL_ADD_COMMENT_LIKE,
});

type likeActios =
  | ReturnType<typeof startGetPostLikes>
  | ReturnType<typeof successGetPostLikes>
  | ReturnType<typeof failGetPostLikes>
  | ReturnType<typeof startAddPostLike>
  | ReturnType<typeof successAddPostLike>
  | ReturnType<typeof failAddPostLike>;

// saga action
const GET_POST_LIKES_SAGA = 'GET_POST_LIKES_SAGA' as const;
const ADD_POST_LIKE_SAGA = 'ADD_POST_LIKE_SAGA' as const;
const GET_COMMENT_LIKES_SAGA = 'GET_COMMENT_LIKES_SAGA' as const;
const ADD_COMMENT_LIKE_SAGA = 'ADD_COMMENT_LIKE_SAGA' as const;

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

export const getCommentLikesSaga = () => ({
  type: GET_COMMENT_LIKES_SAGA,
});

export const addCommentLikeSaga = () => ({
  type: ADD_COMMENT_LIKE_SAGA,
});

type getLikesSagaAction = ReturnType<typeof getPostLikesSaga>;
type postLikeSagaAction = ReturnType<typeof addPostLikeSaga>;

// saga function
function* getPostLikes(action: getLikesSagaAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetPostLikes());
    const userLikes = yield call(
      LikeService.getLikesPost,
      token,
      action.payload.post_id,
    );
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

function* getCommentLikes() {}

function* addCommentLike() {}

// saga register
export function* likeSaga() {
  yield takeEvery(GET_POST_LIKES_SAGA, getPostLikes);
  yield takeLeading(ADD_POST_LIKE_SAGA, addPostLike);
}

// initialstate
const initialState: likeState = {
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
};

function likeReducer(state: likeState = initialState, action: likeActios) {
  switch (action.type) {
    case START_GET_POST_LIKES:
      return {
        postLikes: {
          loading: true,
          error: null,
          userLikes: [],
        },
        commentLikes: state.commentLikes,
      };
    case SUCCESS_GET_POST_LIKES:
      return {
        postLikes: {
          loading: false,
          error: null,
          userLikes: [
            ...state.postLikes.userLikes,
            ...action.payload.postLikes,
          ],
        },
        commentLikes: state.commentLikes,
      };
    case FAIL_GET_POST_LIKES:
      return {
        postLikes: {
          loading: false,
          error: action.payload,
          userLikes: [],
        },
        commentLikes: state.commentLikes,
      };
    case START_ADD_POST_LIKE:
      return {
        postLikes: {
          loading: true,
          error: null,
          userLikes: state.postLikes.userLikes,
        },
        commentLikes: state.commentLikes,
      };
    case SUCCESS_ADD_POST_LIKE:
      return {
        postLikes: {
          loading: false,
          error: null,
          userLikes: state.postLikes.userLikes.map(like =>
            +like.post_id === action.payload.post_id
              ? {
                  post_id: like.post_id,
                  user_id: [...like.user_id, action.payload.user_id],
                }
              : like,
          ),
        },
        commentLikes: state.commentLikes,
      };
    case FAIL_ADD_POST_LIKE:
      return {
        postLikes: {
          loading: false,
          error: action.payload,
          userLikes: state.postLikes.userLikes,
        },
        commentLikes: state.commentLikes,
      };
    default:
      return state;
  }
}

export default likeReducer;
