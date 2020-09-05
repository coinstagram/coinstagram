import { UserState, UserInfoState, AnotherUserState } from '../../type';
import { AxiosError } from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import UserService from '../services/userService';

// action type
const START_GET_USERINFO = 'coinstagram/user/GET_USER_INFO' as const;
const SUCCESS_GET_USERINFO = 'coinstagram/user/SUCCESS_GET_USERINFO' as const;
const SUCCESS_GET_RANDOM_USER = 'coinstagram/user/SUCCESS_GET_RANDOM_USER' as const;
const FAIL_GET_USER_INFO = 'coinstagram/user/FAIL_GET_USER_INFO' as const;

// action creator
const startGetUserInfo = () => ({
  type: START_GET_USERINFO,
});

const successGetUserInfo = (userInfo: UserInfoState) => ({
  type: SUCCESS_GET_USERINFO,
  payload: userInfo,
});

const successGetRandomUser = (randomUsers: any) => ({
  type: SUCCESS_GET_RANDOM_USER,
  payload: randomUsers,
});

const failUserInfo = (error: AxiosError) => ({
  type: FAIL_GET_USER_INFO,
  payload: error,
});

type UserActions =
  | ReturnType<typeof startGetUserInfo>
  | ReturnType<typeof successGetUserInfo>
  | ReturnType<typeof successGetRandomUser>
  | ReturnType<typeof failUserInfo>;

// saga action type
const GET_USERINFO = 'coinstagram/user/GET_USERINFO' as const;

type sagaActions = ReturnType<typeof getUserInfo>;

// saga action creator
export const getUserInfo = (token: string | null) => ({
  type: GET_USERINFO,
  payload: token,
});

// saga function
function* getUserInfoSaga(action: sagaActions) {
  try {
    yield put(startGetUserInfo());
    const userInfo: UserInfoState = yield call<
      (token: string | null) => Promise<UserInfoState>
    >(UserService.getUserInfo, action.payload);
    // const randomUsers: AnotherUserState[] = yield call<
    //   () => Promise<AnotherUserState>
    // >(UserService.getRandomUser);
    yield put(successGetUserInfo(userInfo));
    // yield put(successGetRandomUser(randomUsers));
  } catch (error) {
    yield put(failUserInfo(error));
  }
}

// saga function register
export function* userSaga() {
  yield takeEvery(GET_USERINFO, getUserInfoSaga);
}

// initial state
const anotherUserState: AnotherUserState = {
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
  followers: anotherUserState,
  followees: anotherUserState,
};

const initialState: UserState = {
  loading: false,
  error: null,
  userInfo: userInfoState,
  // randomUsers: anotherUserState,
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
        // randomUsers: null,
      };
    case SUCCESS_GET_USERINFO:
      return {
        loading: false,
        error: null,
        userInfo: action.payload,
        // randomUsers: null,
      };
    case SUCCESS_GET_RANDOM_USER:
      return {
        loading: false,
        error: null,
        userInfo: state.userInfo,
        // randomUsers: action.payload,
      };
    case FAIL_GET_USER_INFO:
      return {
        loading: false,
        error: action.payload,
        userInfo: userInfoState,
        // randomUsers: anotherUserState,
      };
    default:
      return state;
  }
}

export default userReducer;
