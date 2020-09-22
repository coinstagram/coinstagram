import { select, put, call, takeLeading, takeEvery } from 'redux-saga/effects';
import RootState, { EachCommentState, CommentsState } from '../../type';
import CommentService from '../services/commentService';

// action type
const START_GET_COMMENTS = 'coinstagram/comment/START_GET_COMMENTS' as const;
const SUCCESS_GET_COMMENTS = 'coinstagram/comment/SUCCESS_GET_COMMENTS' as const;
const FAIL_GET_COMMENTS = 'coinstagram/comment/FAIL_GET_COMMENTS' as const;

const START_GET_SELECTED_COMMENTS = 'coinstagram/comment/START_GET_SELECTED_COMMENTS' as const;
const SUCCESS_GET_SELECTED_COMMENTS = 'coinstagram/comment/SUCCESS_GET_SELECTED_COMMENTS' as const;
const FAIL_GET_SELECTED_COMMENTS = 'coinstagram/comment/FAIL_GET_SELECTED_COMMENTS' as const;

const START_ADD_COMMENT = 'coinstagram/comment/START_ADD_COMMENT' as const;
const SUCCESS_ADD_COMMENT = 'coinstagram/comment/SUCCESS_ADD_COMMENT' as const;
const FAIL_ADD_COMMENT = 'coinstagram/comment/FAIL_ADD_COMMENT' as const;
const RESET_COMMENT = 'coinstagram/comment/RESET_COMMENT' as const;

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

const startGetSelectedComments = () => ({
  type: START_GET_SELECTED_COMMENTS,
});

const successGetSelectedComments = (postComments: EachCommentState[]) => ({
  type: SUCCESS_GET_SELECTED_COMMENTS,
  paylaod: {
    postComments,
  },
});

const failGetSelectedComments = (error: Error) => ({
  type: FAIL_GET_SELECTED_COMMENTS,
  payload: error,
});

const startAddComment = () => ({
  type: START_ADD_COMMENT,
});

const successAddComment = (addComment: EachCommentState, myProfile: string) => ({
  type: SUCCESS_ADD_COMMENT,
  payload: {
    ...addComment,
    user_profile: myProfile,
  },
});

const failAddComment = (error: Error) => ({
  type: FAIL_ADD_COMMENT,
  payload: error,
});

export const resetComment = () => ({
  type: RESET_COMMENT,
});

type CommentActions =
  | ReturnType<typeof startGetComments>
  | ReturnType<typeof successGetComments>
  | ReturnType<typeof failGetComments>
  | ReturnType<typeof startGetSelectedComments>
  | ReturnType<typeof successGetSelectedComments>
  | ReturnType<typeof failGetSelectedComments>
  | ReturnType<typeof startAddComment>
  | ReturnType<typeof successAddComment>
  | ReturnType<typeof failAddComment>
  | ReturnType<typeof resetComment>;

// saga action
const GET_POST_COMMENTS = 'GET_POST_COMMENTS' as const;
const GET_SELECTED_COMMENTS = 'GET_SELECTED_COMMENTS' as const;
const ADD_POST_COMMENT = 'ADD_POST_COMMENT' as const;

// saga action creator
export const getPostComments = (post_id: number) => ({
  type: GET_POST_COMMENTS,
  payload: {
    post_id,
  },
});

export const addPostComment = (post_id: number, comment_text: string, myProfile: string) => ({
  type: ADD_POST_COMMENT,
  payload: {
    post_id,
    comment_text,
    myProfile,
  },
});

export const getSelectedComments = (post_id: number) => ({
  type: GET_SELECTED_COMMENTS,
  payload: {
    post_id,
  },
});

type commentSagaActions = ReturnType<typeof addPostComment>;
type getSelectedActions = ReturnType<typeof getSelectedComments>;

// saga function
function* getComments(action: commentSagaActions) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetComments());
    const postComments: EachCommentState[] = yield call(CommentService.getComment, token, action.payload.post_id);
    yield put(successGetComments(postComments));
  } catch (error) {
    yield put(failGetComments(error));
  }
}

function* getSelectedPostComments(action: getSelectedActions) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetSelectedComments());
    const postComments: EachCommentState[] = yield call(CommentService.getComment, token, action.payload.post_id);
    yield put(successGetSelectedComments(postComments));
  } catch (error) {
    yield put(failGetSelectedComments(error));
  }
}

function* addComment(action: commentSagaActions) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startAddComment());
    const addComment = yield call(CommentService.addComment, token, action.payload.post_id, action.payload.comment_text);
    yield put(successAddComment(addComment, action.payload.myProfile));
  } catch (error) {
    yield put(failAddComment(error));
  }
}

// saga function register
export function* commentSaga() {
  yield takeEvery(GET_POST_COMMENTS, getComments);
  yield takeEvery(GET_SELECTED_COMMENTS, getSelectedPostComments);
  yield takeLeading(ADD_POST_COMMENT, addComment);
}

// initial state
const initialState: CommentsState = {
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
};

// reducer
function commentReducer(state: CommentsState = initialState, action: CommentActions) {
  switch (action.type) {
    case START_GET_COMMENTS:
      return {
        ...state,
        feedPostComments: {
          ...state.feedPostComments,
          loading: true,
        },
        myComments: [],
      };
    case SUCCESS_GET_COMMENTS:
      return {
        ...state,
        feedPostComments: {
          ...state.feedPostComments,
          loading: false,
          comments: [...state.feedPostComments.comments, ...action.paylaod.postComments],
        },
        myComments: [],
      };
    case FAIL_GET_COMMENTS:
      return {
        ...state,
        feedPostComments: {
          ...state.feedPostComments,
          error: action.payload,
        },
        myComments: [],
      };
    case START_GET_SELECTED_COMMENTS:
      return {
        ...state,
        selectedPostComments: {
          ...state.selectedPostComments,
          loading: true,
        },
        myComments: [],
      };
    case SUCCESS_GET_SELECTED_COMMENTS:
      return {
        ...state,
        selectedPostComments: {
          ...state.selectedPostComments,
          loading: false,
          comments: action.paylaod.postComments,
        },
        myComments: [],
      };
    case FAIL_GET_SELECTED_COMMENTS:
      return {
        ...state,
        selectedPostComments: {
          ...state.selectedPostComments,
          error: action.payload,
        },
      };
    case START_ADD_COMMENT:
      return {
        ...state,
      };
    case SUCCESS_ADD_COMMENT:
      return {
        ...state,
        myComments: [...state.myComments, action.payload],
      };
    case FAIL_ADD_COMMENT:
      return {
        ...state,
      };
    case RESET_COMMENT:
      return {
        ...state,
        feedPostComments: {
          ...state.feedPostComments,
          comments: [...state.feedPostComments.comments, ...state.myComments],
        },
        myComments: [],
      };
    default:
      return state;
  }
}

export default commentReducer;
