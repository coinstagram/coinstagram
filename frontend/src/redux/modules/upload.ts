import axios from 'axios';
import { createAction, ActionType, createStandardAction  } from 'typesafe-actions';
import { type } from 'os';
import { enableES5, produce } from 'immer';

const pro =  (...args : any) => {
  enableES5();
  return produce(...args);
};

const prefix = 'coinstagram/upload';

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
};

const initialState: ImageUploadState = {
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
};

const actions = {
  upload_image_failure,
  upload_image_request,
  upload_image_success,
};

type UploadAction = ActionType<typeof actions>;

function reducer(
  state: ImageUploadState = initialState,
  action: UploadAction,
): ImageUploadState {
  switch (action.type) {
    case UPLOAD_IMAGES_FAILURE:
      return {uploadImagesLoading: };
    case UPLOAD_IMAGES_REQUEST:
      return {};
    case UPLOAD_IMAGES_SUCCESS:
      return {};
    default:
      return initialState;
  }
}
