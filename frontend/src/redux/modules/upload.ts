import { createReducer, createAction, ActionType } from 'typesafe-actions';
import { AuthState } from '../../type';
import { select, put, call, takeEvery } from 'redux-saga/effects';
import RootState from '../../type';
import uploadService from '../services/uploadService';
import { push } from 'connected-react-router';

// 타입설정
export type postData = {
  id: String;
  user_id: String;
  post_context: String;
  post_anotheruser: String;
  post_location: String;
  created_at: String;
  tag: Array<String>;
  image_path: Array<Object>;
};
type uploadState = {
  Loading: boolean;
  Done: boolean;
  Error: Error;
  data: postData;
};
// 액션 타입
const ADD_POST_FAILURE = `coinstagram/upload/ADD_POST_FAILURE`;
const ADD_POST_REQUEST = `coinstagram/upload/ADD_POST_REQUEST`;
const ADD_POST_SUCCESS = `coinstagram/upload/ADD_POST_SUCCESS`;
const ADD_POST = `coinstagram/upload/ADD_POST` as const;

// 액션 생성 함수
export const add_post_failure = createAction(ADD_POST_FAILURE)<Error>();
export const add_post_request = createAction(ADD_POST_REQUEST)();
export const add_post_success = createAction(ADD_POST_SUCCESS)();
export const add_post = (data: postData) => ({
  type: ADD_POST,
  payload: {
    id: data.user_id,
    user_id: data.user_id,
    post_context: data.post_context,
    post_anotheruser: data.post_anotheruser,
    post_location: data.post_location,
    created_at: data.created_at,
    tag: data.tag,
    image_path: data.image_path,
  },
});

// 액션의 객체 타입 만들기
const actions = {
  add_post_failure,
  add_post_request,
  add_post_success,
  add_post,
};
type PostActions = ActionType<typeof actions>;

// 초기설정
const initialState: uploadState = {
  Loading: false,
  Done: false,
  Error: null,
  data: {
    id: '',
    user_id: '',
    post_context: '',
    post_anotheruser: '',
    post_location: '',
    created_at: '',
    tag: [],
    image_path: [],
  },
};

// 리듀서
const postReducer = createReducer<uploadState, PostActions>(initialState, {
  [ADD_POST]: (state, action) => ({
    ...state,
    data: {
      ...action.payload,
    },
  }),
  [ADD_POST_SUCCESS]: state => ({
    ...state,
    Loading: false,
    Done: true,
  }),
  [ADD_POST_REQUEST]: state => ({
    ...state,
    Loading: true,
  }),
  [ADD_POST_FAILURE]: (state, action) => ({
    ...state,
    Loading: false,
    Done: false,
    Error: action.payload,
  }),
});

// saga
// saga action
const ADD_POST_SAGA = `coinstagram/upload/ADD_POST_SAGA` as const;
// saga action creator
export const addPostSaga = createAction(ADD_POST_SAGA)();

// saga action type
type addPostSagaActions = ReturnType<typeof addPostSaga>;

// saga function

function* addPostSagafun() {
  try {
    yield put(add_post_request());
    const { token }: AuthState = yield select((state: RootState) => state.auth);
    const { postReducer } = yield select((state: uploadState) => state);

    yield call(uploadService.uploadPost, postReducer.data, token);
    const { id, user_id, created_at, image_path } = yield uploadService.uploadPost(postReducer.data, token);

    yield put(add_post({ ...postReducer.data, id, user_id, created_at, image_path: [...image_path] }));
    yield put(add_post_success());

    yield put(push('/'));
  } catch (error) {
    yield put(add_post_failure(error));
  }
}

export function* uploadSaga() {
  yield takeEvery(ADD_POST_SAGA, addPostSagafun);
}

export default postReducer;
