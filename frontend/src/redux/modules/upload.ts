import { createReducer, createAction, ActionType } from 'typesafe-actions';
import { AuthState, imageState } from '../../type';
import { select, put, call, takeEvery, getContext } from 'redux-saga/effects';
import RootState from '../../type';
import axios from 'axios';
import uploadService from '../services/uploadService';
import { history } from '../create';
import { push } from 'connected-react-router';

// 타입설정
export type postData = {
  user_id: String;
  post_context: String;
  post_anotheruser: String;
  post_location: String;
  tag: Array<String>;
};

export type uploadImage = {
  image: Array<File>;
};

type uploadState = {
  Loading: boolean;
  Done: boolean;
  Error: Error;
  data: postData;
  image: uploadImage;
};
// 액션 타입
const ADD_POST_FAILURE = `coinstagram/upload/ADD_POST_FAILURE`;
const ADD_POST_REQUEST = `coinstagram/upload/ADD_POST_REQUEST`;
const ADD_POST_SUCCESS = `coinstagram/upload/ADD_POST_SUCCESS`;
const ADD_POST = `coinstagram/upload/ADD_POST` as const;

const ADD_IMAGE_FAILURE = `coinstagram/upload/ADD_IMAGE_FAILURE`;
const ADD_IMAGE_REQUEST = `coinstagram/upload/ADD_IMAGE_REQUEST`;
const ADD_IMAGE_SUCCESS = `coinstagram/upload/ADD_IMAGE_SUCCESS`;
const ADD_IMAGE = 'coinstagram/upload/ADD_IMAGE' as const;

// 액션 생성 함수
export const add_post_failure = createAction(ADD_POST_FAILURE)<Error>();
export const add_post_request = createAction(ADD_POST_REQUEST)();
export const add_post_success = createAction(ADD_POST_SUCCESS)();
export const add_post = (data: postData) => ({
  type: ADD_POST,
  payload: {
    user_id: data.user_id,
    post_context: data.post_context,
    post_anotheruser: data.post_anotheruser,
    post_location: data.post_location,
    tag: data.tag,
  },
});

export const add_image_failure = createAction(ADD_IMAGE_FAILURE)<Error>();
export const add_image_request = createAction(ADD_IMAGE_REQUEST)();
export const add_image_success = createAction(ADD_IMAGE_SUCCESS)();
export const add_image = (image: uploadImage) => ({
  type: ADD_IMAGE,
  payload: {
    image,
  },
});

// 액션의 객체 타입 만들기
const actions = {
  add_post_failure,
  add_post_request,
  add_post_success,
  add_post,
  add_image_failure,
  add_image_request,
  add_image_success,
  add_image,
};
type PostActions = ActionType<typeof actions>;

// 초기설정
const initialState: uploadState = {
  Loading: false,
  Done: false,
  Error: null,
  data: {
    user_id: '',
    post_context: '',
    post_anotheruser: '',
    post_location: '',
    tag: [],
  },
  image: {
    image: [],
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
  [ADD_IMAGE]: (state, action) => ({
    ...state,
    image: { ...action.payload.image },
  }),
});

// saga
// saga action
const ADD_POST_SAGA = `coinstagram/upload/ADD_POST_SAGA` as const;
const ADD_IMAGE_SAGA = `coinstagram/upload/ADD_POST_SAGA` as const;
// saga action creator
export const addPostSaga = createAction(ADD_POST_SAGA)();

// export const addImageSaga = (data: postData) => ({
//   type: ADD_POST_SAGA,
//   payload: {
//     ...data,
//   },
// });
// saga action type
type addPostSagaActions = ReturnType<typeof addPostSaga>;

// saga function

function* addPostSagafun() {
  try {
    yield put(add_post_request());
    const { token }: AuthState = yield select((state: RootState) => state.auth);
    // const { payload: post } = yield put(add_post(action.payload));
    const { postReducer } = yield select((state: uploadState) => state);
    const post_id = yield call(
      uploadService.uploadPost,
      postReducer.data,
      token,
    );

    console.log(postReducer.image);

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
