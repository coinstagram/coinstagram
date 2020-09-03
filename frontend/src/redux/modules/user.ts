import { UserState } from '../../type';
import { AxiosError } from 'axios';
import { put, call } from 'redux-saga/effects';
import userService from '../services/userService';

// action type
const START_GET_USERINFO = 'coinstagram/user/GET_USER_INFO' as const;
const SUCCESS_GET_USERINFO = 'coinstagram/user/GET_USER_INFO' as const;
const FAIL_GET_USER_INFO = 'coinstagram/user/GET_USER_INFO' as const;

type UserActions =
  | ReturnType<typeof startGetUserinfo>
  | ReturnType<typeof successGetUserinfo>
  | ReturnType<typeof failUserInfo>;

// action creator
const startGetUserinfo = () => ({
  type: START_GET_USERINFO,
});

const successGetUserinfo = (userId: string) => ({
  type: SUCCESS_GET_USERINFO,
  payload: userId,
});

const failUserInfo = (error: AxiosError) => ({
  type: FAIL_GET_USER_INFO,
  payload: error,
});

// saga action type
const GET_USERINFO = 'coinstagram/user/GET_USERINFO' as const;

type sagaActions = ReturnType<typeof getUserinfo>;

// saga action creator
export const getUserinfo = (userId: string) => ({
  type: GET_USERINFO,
  payload: userId,
});

// saga function
function* getUserInfoSaga(action: sagaActions) {
  yield put(startGetUserinfo());
  const userInfo = yield call(userService.getUserinfo, action.payload);
}

// saga register
const initialState: UserState = {
  loading: false,
  error: null,
  id: null,
  user_email: null,
  user_gender: null,
  user_id: null,
  user_introduce: null,
  user_name: null,
  user_password: null,
  user_phone: null,
  user_profile: null,
};
