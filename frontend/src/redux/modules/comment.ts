import { select, put, call, takeLatest } from 'redux-saga/effects';
import RootState, { EachCommentState, commentsState } from '../../type';
import CommentService from '../services/commentService';

// action type
const START_GET_COMMENTS = 'coinstagram/comment/START_GET_COMMENTS' as const;
const SUCCESS_GET_COMMENTS = 'coinstagram/comment/SUCCESS_GET_COMMENTS' as const;
const SUCCESS_ADD_COMMENT = 'coinstagram/comment/SUCCESS_ADD_COMMENT' as const;
const FAIL_GET_COMMENTS = 'coinstagram/comment/FAIL_GET_COMMENTS' as const;

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

const successAddComment = () => ({
  type: SUCCESS_ADD_COMMENT,
});

const failGetComments = (error: Error) => ({
  type: FAIL_GET_COMMENTS,
  payload: error,
});

type commentActions =
  | ReturnType<typeof startGetComments>
  | ReturnType<typeof successGetComments>
  | ReturnType<typeof successAddComment>
  | ReturnType<typeof failGetComments>;

// saga action
const GET_POST_COMMENTS = 'GET_POST_COMMENTS' as const;
const ADD_POST_COMMENTS = 'ADD_POST_COMMENTS' as const;

// saga action creator
const getPostComments = (post_id: number) => ({
  type: GET_POST_COMMENTS,
  payload: {
    post_id,
  },
});

const addPostComment = (comment_text: string, post_id: number) => ({
  type: ADD_POST_COMMENTS,
  payload: {
    post_id,
    comment_text,
  },
});

type commentSagaActions =
  | ReturnType<typeof getPostComments>
  | ReturnType<typeof addPostComment>;

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
  } catch (error) {}
}

// saga function register
function* commentSaga() {
  yield takeLatest(GET_POST_COMMENTS, getComments);
  yield takeLatest(ADD_POST_COMMENTS, addComment);
}

// initial state
const initialState: commentsState = {
  loading: false,
  error: null,
  comments: [],
  // likes: [],
};

// reducer
function commentReducer(
  state: commentsState = initialState,
  action: commentActions,
) {
  switch (action.type) {
    default:
      return state;
  }
}

export default commentReducer;
