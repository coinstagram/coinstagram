import { deprecated, ActionType, createReducer } from 'typesafe-actions';

const { createStandardAction } = deprecated;
const prefix = 'coinstagram/upload';

// 타입설정
type upload = {
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: Error;
};

type postData = {
  user_id: '';
  post_context: '';
  post_anotheruser: '';
  post_location: '';
  tag: [];
};

type uploadState = [upload, postData];

// 액션 타입
const ADD_POST_FAILURE = `${prefix}/ADD_POST_FAILURE`;
const ADD_POST_REQUEST = `${prefix}/ADD_POST_REQUEST`;
const ADD_POST_SUCCESS = `${prefix}/ADD_POST_SUCCESS`;
const ADD_POST = `coinstagram/upload/ADD_POST` as const;

const initialState: uploadState = [];

// 액션 생성 함수
export const add_post_failure = createStandardAction(ADD_POST_FAILURE)<Error>();
export const add_post_request = createStandardAction(ADD_POST_REQUEST)();
export const add_post_success = createStandardAction(ADD_POST_SUCCESS)();
export const add_post = (data: postData) => ({
  type: ADD_POST,
  payload: {
    ...data,
  },
});

// 액션의 객체 타입 만들기
const post_actions = {
  add_post_failure,
  add_post_request,
  add_post_success,
  add_post,
};
type PostActions = ActionType<typeof post_actions>;

// 리듀서 만들기
const postReducer = createReducer<uploadState | postData, PostActions>(
  initialState,
  {
    [ADD_POST]: (state, action) => ({ ...state, ...action.payload }),
  },
);
