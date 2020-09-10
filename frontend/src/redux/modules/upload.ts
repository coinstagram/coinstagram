import { createReducer, createAction, ActionType } from 'typesafe-actions';

const prefix = 'coinstagram/upload';

// 타입설정
type postData = {
  user_id: String;
  post_context: String;
  post_anotheruser: String;
  post_location: String;
  tag: Array<String>;
};
type uploadState = {
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: Error;
  data: postData;
};

// 액션 타입
const ADD_POST_FAILURE = `${prefix}/ADD_POST_FAILURE`;
const ADD_POST_REQUEST = `${prefix}/ADD_POST_REQUEST`;
const ADD_POST_SUCCESS = `${prefix}/ADD_POST_SUCCESS`;
const ADD_POST = `coinstagram/upload/ADD_POST` as const;

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

// 액션의 객체 타입 만들기
const actions = {
  add_post_failure,
  add_post_request,
  add_post_success,
  add_post,
};
type PostActions = ActionType<typeof actions>;
type TestAction = ReturnType<typeof add_post>;

// 초기설정
const initialState: uploadState = {
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  data: {
    user_id: '',
    post_context: '',
    post_anotheruser: '',
    post_location: '',
    tag: [],
  },
};

// 리듀서 만들기
// const postReducer = createReducer<uploadState, PostActions>(initialState, {
//   [ADD_POST]: (state, action) => ({
//     ...initialState,
//     ...action.payload,
//   }),
// });

function testReducer(state = initialState, action: TestAction) {
  switch (action.type) {
    case ADD_POST:
      action.payload;
  }
}

export default postReducer;
