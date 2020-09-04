import { UserState, FollowState, UserInfoState } from '../../type';
import { AxiosError } from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import userService from '../services/userService';

// action type
const START_GET_USERINFO = 'coinstagram/user/GET_USER_INFO' as const;
const SUCCESS_GET_USERINFO = 'coinstagram/user/SUCCESS_GET_USERINFO' as const;
const FAIL_GET_USER_INFO = 'coinstagram/user/FAIL_GET_USER_INFO' as const;

// action creator
const startGetUserinfo = () => ({
  type: START_GET_USERINFO,
});

const successGetUserinfo = (userInfo: UserInfoState) => ({
  type: SUCCESS_GET_USERINFO,
  payload: userInfo,
});

const failUserInfo = (error: AxiosError) => ({
  type: FAIL_GET_USER_INFO,
  payload: error,
});

type UserActions =
  | ReturnType<typeof startGetUserinfo>
  | ReturnType<typeof successGetUserinfo>
  | ReturnType<typeof failUserInfo>;

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
  try {
    yield put(startGetUserinfo());
    const userInfo: UserInfoState = yield call(
      userService.getUserinfo,
      action.payload,
    );
    yield put(successGetUserinfo(userInfo));
  } catch (error) {
    yield put(failUserInfo(error));
  }
}

// saga function register
export function* userSaga() {
  yield takeEvery(GET_USERINFO, getUserInfoSaga);
}

// initial state
const followState: FollowState = {
  id: null,
  name: null,
  profile: null,
};

const userInfoState: UserInfoState = {
  id: null,
  name: null,
  email: null,
  gender: null,
  introduce: null,
  phone: null,
  profile: null,
  followers: followState,
  followees: followState,
};

const initialState: UserState = {
  loading: false,
  error: null,
  userInfo: userInfoState,
};

// reducer
function userReducer(
  state: UserState = initialState,
  action: UserActions,
): UserState {
  switch (action.type) {
    case START_GET_USERINFO:
      return {
        loading: true,
        error: null,
        userInfo: userInfoState,
      };
    case SUCCESS_GET_USERINFO:
      return {
        loading: false,
        error: null,
        userInfo: action.payload,
      };
    case FAIL_GET_USER_INFO:
      return {
        loading: false,
        error: action.payload,
        userInfo: userInfoState,
      };
    default:
      return state;
  }
}

export default userReducer;
