import { select, put, call, takeLeading, takeEvery } from 'redux-saga/effects';
import RootState, { EachCommentState, CommentsState } from '../../type';
import CommentService from '../services/commentService';

// action type
const START_GET_COMMENTS = 'coinstagram/comment/START_GET_COMMENTS' as const;
const SUCCESS_GET_COMMENTS = 'coinstagram/comment/SUCCESS_GET_COMMENTS' as const;
const FAIL_GET_COMMENTS = 'coinstagram/comment/FAIL_GET_COMMENTS' as const;
const START_ADD_COMMENT = 'coinstagram/comment/START_ADD_COMMENT' as const;
const SUCCESS_ADD_COMMENT = 'coinstagram/comment/SUCCESS_ADD_COMMENT' as const;
const FAIL_ADD_COMMENT = 'coinstagram/comment/FAIL_ADD_COMMENT' as const;

// action creator
const startGetComments = () => ({
  type: START_GET_COMMENTS,
});

const successGetComments = (postComments: EachCommentState[]) => ({
  type: SUCCESS_GET_COMMENTS,
  paylaod: {
    postComments,
  },
});

const failGetComments = (error: Error) => ({
  type: FAIL_GET_COMMENTS,
  payload: error,
});

const startAddComment = () => ({
  type: START_ADD_COMMENT,
});

const successAddComment = (addComment: EachCommentState) => ({
  type: SUCCESS_ADD_COMMENT,
  payload: {
    addComment,
  },
});

const failAddComment = (error: Error) => ({
  type: FAIL_ADD_COMMENT,
  payload: error,
});

<<<<<<< HEAD
type commentActions =
  | ReturnType<typeof startGetComments>
  | ReturnType<typeof successGetComments>
  | ReturnType<typeof successAddComment>
  | ReturnType<typeof failGetComments>;
=======
type CommentActions =
  | ReturnType<typeof startGetComments>
  | ReturnType<typeof successGetComments>
  | ReturnType<typeof failGetComments>
  | ReturnType<typeof startAddComment>
  | ReturnType<typeof successAddComment>
  | ReturnType<typeof failAddComment>;
>>>>>>> 780690fe06ecf26898a7f1a20edfbe6f1f35c24e

// saga action
const GET_POST_COMMENTS = 'GET_POST_COMMENTS' as const;
const ADD_POST_COMMENT = 'ADD_POST_COMMENT' as const;

// saga action creator
export const getPostComments = (post_id: number) => ({
  type: GET_POST_COMMENTS,
  payload: {
    post_id,
  },
});

export const addPostComment = (post_id: number, comment_text: string) => ({
  type: ADD_POST_COMMENT,
  payload: {
    post_id,
    comment_text,
  },
});

type commentSagaActions =
  // | ReturnType<typeof getPostComments>
  ReturnType<typeof addPostComment>;

// saga function
function* getComments(action: commentSagaActions) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetComments());
    const postComments: EachCommentState[] = yield call(
      CommentService.getComment,
      token,
      action.payload.post_id,
    );
    yield put(successGetComments(postComments));
  } catch (error) {
    yield put(failGetComments(error));
  }
}

function* addComment(action: commentSagaActions) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetComments());
    const addComment = yield call(
      CommentService.addComment,
      token,
      action.payload.post_id,
      action.payload.comment_text,
    );
    yield put(successAddComment(addComment));
  } catch (error) {
    yield put(failAddComment(error));
  }
}

// saga function register
export function* commentSaga() {
  yield takeEvery(GET_POST_COMMENTS, getComments);
  yield takeLeading(ADD_POST_COMMENT, addComment);
}

// initial state
const initialState: CommentsState = {
  loading: false,
  error: null,
  postComments: [],
};

// reducer
function commentReducer(
  state: CommentsState = initialState,
  action: CommentActions,
) {
  switch (action.type) {
    case START_GET_COMMENTS:
      return {
        loading: true,
        error: null,
        postComments: [],
      };
    case SUCCESS_GET_COMMENTS:
      return {
        loading: false,
        error: null,
        postComments: [...state.postComments, ...action.paylaod.postComments],
      };
    case FAIL_GET_COMMENTS:
      return {
        loading: false,
        error: action.payload,
        postComments: [],
      };
    case START_ADD_COMMENT:
      return {
        loading: true,
        error: null,
        postComments: [],
      };
    case SUCCESS_ADD_COMMENT:
      return {
        loading: false,
        error: null,
        postComments: [...state.postComments, action.payload.addComment],
      };
    case FAIL_ADD_COMMENT:
      return {
        loading: false,
        error: action.payload,
        postComments: state.postComments,
      };
    default:
      return state;
  }
}

export default commentReducer;
