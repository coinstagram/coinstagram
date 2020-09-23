import RootState, { UserInfoState, AuthState, UserResponseState, AnotherUserState } from '../../type';
import { put, call, takeEvery, select, delay } from 'redux-saga/effects';
import UserService from '../services/userService';

// action type
const START_GET_USERINFO = 'coinstagram/user/START_GET_USERINFO' as const;
const SUCCESS_GET_USERINFO = 'coinstagram/user/SUCCESS_GET_USERINFO' as const;
const FAIL_GET_USER_INFO = 'coinstagram/user/FAIL_GET_USER_INFO' as const;

const START_GET_RANDOM_USER = 'coinstagram/user/START_GET_RANDOM_USER' as const;
const SUCCESS_GET_RANDOM_USER = 'coinstagram/user/SUCCESS_GET_RANDOM_USER' as const;
const FAIL_GET_RANDOM_USER = 'coinstagram/user/FAIL_GET_RANDOM_USER' as const;

const START_FOLLOW_USER = '/coinstagram/user/START_FOLLOW_USER' as const;
const FOLLOW_USER = '/coinstagram/user/FOLLOW_USER' as const;
const CANCEL_FOLLOW_USER = '/coinstagram/user/CANCEL_FOLLOW_USER' as const;
const FAIL_FOLLOW_USER = '/coinstagram/user/FAIL_FOLLOW_USER' as const;

// action creator
const startGetUserInfo = () => ({
  type: START_GET_USERINFO,
});

const successGetUserInfo = (userData: UserResponseState) => ({
  type: SUCCESS_GET_USERINFO,
  payload: {
    userData,
  },
});

const failUserInfo = (error: Error) => ({
  type: FAIL_GET_USER_INFO,
  payload: error,
});

const startGetRandomUser = () => ({
  type: START_GET_RANDOM_USER,
});

const successGetRandomUser = (randomUsers: AnotherUserState[]) => ({
  type: SUCCESS_GET_RANDOM_USER,
  payload: {
    randomUsers,
  },
});

const failGetRandomUser = (error: Error) => ({
  type: FAIL_GET_RANDOM_USER,
  payload: error,
});

const startFollowUser = () => ({
  type: START_FOLLOW_USER,
});

const followUser = (user_id: string, user_name: string, user_profile: null | string) => ({
  type: FOLLOW_USER,
  payload: {
    user_id,
    user_name,
    user_profile,
  },
});

const cancelFollowUser = (user_id: string) => ({
  type: CANCEL_FOLLOW_USER,
  payload: {
    user_id,
  },
});

const failFollowUser = (error: Error) => ({
  type: FAIL_FOLLOW_USER,
  payload: error,
});

//test -------------------------------------------------------------------
export const CHANGE_USER_PROFILE = '/constagram/userInfo/CHANGE_USER_PROFILE' as const;
export const changeUserProfile = (user_profile: string | null) => ({
  type: CHANGE_USER_PROFILE,
  payload: {
    user_profile,
  },
});
//testEnd -------------------------------------------------------------------

type UserActions =
  | ReturnType<typeof startGetUserInfo>
  | ReturnType<typeof successGetUserInfo>
  | ReturnType<typeof failUserInfo>
  | ReturnType<typeof startGetRandomUser>
  | ReturnType<typeof successGetRandomUser>
  | ReturnType<typeof failGetRandomUser>
  | ReturnType<typeof startFollowUser>
  | ReturnType<typeof followUser>
  | ReturnType<typeof cancelFollowUser>
  | ReturnType<typeof failFollowUser>
  | ReturnType<typeof changeUserProfile>;

// saga action type
const GET_USERINFO_SAGA = 'GET_USERINFO_SAGA' as const;
const GET_RANDOM_USER_SAGA = 'GET_RANDOM_USER_SAGA' as const;
const FOLLOW_USER_SAGA = 'FOLLOW_USER_SAGA' as const;
const CANCEL_FOLLOW_USER_SAGA = 'CANCEL_FOLLOW_USER_SAGA' as const;

// saga action creator
export const getUserInfoSaga = () => ({
  type: GET_USERINFO_SAGA,
});

export const getRandomUserInfoSaga = () => ({
  type: GET_RANDOM_USER_SAGA,
});

export const followUserSaga = (user_id: string, user_name: string, user_profile: null | string) => ({
  type: FOLLOW_USER_SAGA,
  payload: {
    user_id,
    user_name,
    user_profile,
  },
});

export const cancelFollowUserSaga = (user_id: string) => ({
  type: CANCEL_FOLLOW_USER_SAGA,
  payload: {
    user_id,
  },
});

type followSagaActions = ReturnType<typeof followUserSaga>;
// | ReturnType<typeof cancelFollowUserSaga>;

// saga function
function* getUserSaga() {
  try {
    const { token }: AuthState = yield select((state: RootState) => state.auth);
    yield put(startGetUserInfo());
    const getUserData: UserResponseState = yield call(UserService.getUserData, token);
    yield put(successGetUserInfo(getUserData));
  } catch (error) {
    yield put(failUserInfo(error));
  }
}

function* getRandomUserSaga() {
  try {
    const { token }: AuthState = yield select((state: RootState) => state.auth);
    yield put(startGetRandomUser());
    const randomUsers: AnotherUserState[] = yield call(UserService.getRandomUser, token);
    yield put(successGetRandomUser(randomUsers));
  } catch (error) {
    yield put(failGetRandomUser(error));
  }
}

function* followingUserSaga(action: followSagaActions) {
  try {
    const { token }: AuthState = yield select((state: RootState) => state.auth);
    yield put(startFollowUser());
    yield call(UserService.followUser, action.payload.user_id, token);
    yield delay(1000);
    yield put(followUser(action.payload.user_id, action.payload.user_name, action.payload.user_profile));
  } catch (error) {
    yield put(failFollowUser(error));
  }
}

function* followingCancelSaga(action: followSagaActions) {
  try {
    const { token }: AuthState = yield select((state: RootState) => state.auth);
    yield call(UserService.CancelFollowUser, action.payload.user_id, token);
    yield delay(1000);
    yield put(cancelFollowUser(action.payload.user_id));
  } catch (error) {
    yield put(failFollowUser(error));
  }
}

// saga function register
export function* userInfoSaga() {
  yield takeEvery(GET_USERINFO_SAGA, getUserSaga);
  yield takeEvery(GET_RANDOM_USER_SAGA, getRandomUserSaga);
  yield takeEvery(FOLLOW_USER_SAGA, followingUserSaga);
  yield takeEvery(CANCEL_FOLLOW_USER_SAGA, followingCancelSaga);
}

// initial state
const initialState: UserInfoState = {
  loading: false,
  error: null,
  user: null,
  followers: {
    loading: false,
    error: null,
    users: [],
  },
  followees: [],
  randomUsers: {
    loading: false,
    error: null,
    users: [],
  },
};

// reducer
function userInfoReducer(state: UserInfoState = initialState, action: UserActions): UserInfoState {
  switch (action.type) {
    case CHANGE_USER_PROFILE:
      console.log(action.payload);

      return {
        loading: false,
        error: null,
        user: {
          ...state.user,
          ...action.payload,
        },
        followers: state.followers,
        followees: state.followees,
        randomUsers: state.randomUsers,
      };
    case START_GET_USERINFO:
      return {
        loading: true,
        error: null,
        user: null,
        followers: {
          loading: true,
          error: null,
          users: [],
        },
        followees: [],
        randomUsers: state.randomUsers,
      };
    case SUCCESS_GET_USERINFO:
      return {
        loading: true,
        error: null,
        user: action.payload.userData.user,
        followers: {
          loading: false,
          error: null,
          users: action.payload.userData.follower,
        },
        followees: action.payload.userData.followee,
        randomUsers: state.randomUsers,
      };
    case START_GET_RANDOM_USER:
      return {
        loading: false,
        error: null,
        user: state.user,
        followers: state.followers,
        followees: state.followees,
        randomUsers: {
          loading: true,
          error: null,
          users: [],
        },
      };
    case SUCCESS_GET_RANDOM_USER:
      return {
        loading: false,
        error: null,
        user: state.user,
        followers: state.followers,
        followees: state.followees,
        randomUsers: {
          loading: false,
          error: null,
          users: action.payload.randomUsers,
        },
      };
    case FAIL_GET_RANDOM_USER:
      return {
        loading: false,
        error: null,
        user: state.user,
        followers: state.followers,
        followees: state.followees,
        randomUsers: {
          loading: false,
          error: action.payload,
          users: [],
        },
      };
    case START_FOLLOW_USER:
      return {
        loading: false,
        error: null,
        user: state.user,
        followers: {
          loading: true,
          error: null,
          users: state.followers.users,
        },
        followees: state.followees,
        randomUsers: state.randomUsers,
      };
    case FOLLOW_USER:
      return {
        loading: false,
        error: null,
        user: state.user,
        followers: {
          loading: false,
          error: null,
          users: [
            ...state.followers.users,
            {
              user_id: action.payload.user_id,
              user_name: action.payload.user_name,
              user_profile: action.payload.user_profile,
            },
          ],
        },
        followees: state.followees,
        randomUsers: state.randomUsers,
      };
    case CANCEL_FOLLOW_USER:
      return {
        loading: false,
        error: null,
        user: state.user,
        followers: {
          loading: false,
          error: null,
          users: state.followers.users.filter(follower => follower.user_id !== action.payload.user_id),
        },
        followees: state.followees,
        randomUsers: state.randomUsers,
      };
    case FAIL_GET_USER_INFO:
      return {
        loading: false,
        error: action.payload,
        user: state.user,
        followers: state.followers,
        followees: state.followees,
        randomUsers: state.randomUsers,
      };
    default:
      return state;
  }
}

export default userInfoReducer;
