<<<<<<< HEAD
import { deprecated, ActionType, createReducer } from 'typesafe-actions';
=======
import axios from 'axios';
import {
  createAction,
  ActionType,
  // createStandardAction,
} from 'typesafe-actions';
// import { type } from 'os';
// import { enableES5, produce } from 'immer';

// const pro = (...args: any) => {
//   enableES5();
//   return produce(...args);
// };
>>>>>>> 70089e29dc981738bc876c077411ead89c8c3f8d

const { createStandardAction } = deprecated;
const prefix = 'coinstagram/upload';

<<<<<<< HEAD
// 타입설정
type upload = {
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: Error;
=======
const UPLOAD_IMAGES_FAILURE = `${prefix}/UPLOAD_IMAGES_FAILURE`;
const UPLOAD_IMAGES_REQUEST = `${prefix}/UPLOAD_IMAGES_REQUEST`;
const UPLOAD_IMAGES_SUCCESS = `${prefix}/UPLOAD_IMAGES_SUCCESS`;

const ADD_POST_FAILURE = `${prefix}/UPLOAD_IMAGES_FAILURE`;
const ADD_POST_REQUEST = `${prefix}/UPLOAD_IMAGES_REQUEST`;
const ADD_POST_SUCCESS = `${prefix}/UPLOAD_IMAGES_SUCCESS`;

export const upload_image_failure = createAction(UPLOAD_IMAGES_FAILURE)();
export const upload_image_request = createAction(UPLOAD_IMAGES_REQUEST)();
export const upload_image_success = createAction(UPLOAD_IMAGES_SUCCESS)();

function uploadImagesAPI(data: Array<File>) {
  return axios.post('/post/images', data);
}
type ImageUploadState = {
  uploadImagesLoading: Boolean;
  uploadImagesDone: Boolean;
  uploadImagesError: Error;
>>>>>>> 70089e29dc981738bc876c077411ead89c8c3f8d
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
<<<<<<< HEAD
type PostActions = ActionType<typeof post_actions>;

// 리듀서 만들기
const postReducer = createReducer<uploadState | postData, PostActions>(
  initialState,
  {
    [ADD_POST]: (state, action) => ({ ...state, ...action.payload }),
  },
);
=======

type UploadAction = ActionType<typeof actions>;

// function reducer(
// state: ImageUploadState = initialState,
// action: UploadAction,
// ): ImageUploadState {
// switch (action.type) {
//   case UPLOAD_IMAGES_FAILURE:
//     // return {uploadImagesLoading: };
//   case UPLOAD_IMAGES_REQUEST:
//     return {};
//   case UPLOAD_IMAGES_SUCCESS:
//     return {};
//   default:
//     return initialState;
// }
// }

// export default reducer;
>>>>>>> 70089e29dc981738bc876c077411ead89c8c3f8d
