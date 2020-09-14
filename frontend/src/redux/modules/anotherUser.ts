import RootState, {
  AnotherUserInfoState,
  AuthState,
  UserResponseState,
} from '../../type';
import { put, call, takeLeading, select } from 'redux-saga/effects';
import UserService from '../services/userService';

// action type
const START_GET_ANOTHER_USERINFO = 'coinstagram/anotherUser/START_GET_ANOTHER_USERINFO' as const;
const SUCCESS_GET_ANOTHER_USERINFO = 'coinstagram/anotherUser/SUCCESS_GET_ANOTHER_USERINFO' as const;
const FAIL_GET_ANOTHER_USERINFO = 'coinstagram/anotherUser/FAIL_GET_ANOTHER_USERINFO' as const;

// action creator
const startGetAnotehrUserInfo = () => ({
  type: START_GET_ANOTHER_USERINFO,
});

const successGetAnotherUserInfo = (userData: UserResponseState) => ({
  type: SUCCESS_GET_ANOTHER_USERINFO,
  payload: {
    userData,
  },
});

const failGetAnotherUserInfo = (error: Error) => ({
  type: FAIL_GET_ANOTHER_USERINFO,
  payload: error,
});

type anotherUserActions =
  | ReturnType<typeof startGetAnotehrUserInfo>
  | ReturnType<typeof successGetAnotherUserInfo>
  | ReturnType<typeof failGetAnotherUserInfo>;

// saga action
const GET_ANOTHER_USER_SAGA = 'GET_ANOTHER_USER_SAGA' as const;

// saga action creator
export const getAnotherUserSaga = (user_Id: string) => ({
  type: GET_ANOTHER_USER_SAGA,
  payload: {
    user_Id,
  },
});

type anotherUserSagaActions = ReturnType<typeof getAnotherUserSaga>;

// saga function
function* getAnotherUserInfoSaga(action: anotherUserSagaActions) {
  try {
    const { token }: AuthState = yield select((state: RootState) => state.auth);
    yield put(startGetAnotehrUserInfo());
    const userData: UserResponseState = yield call(
      UserService.getAnotherUserData,
      action.payload.user_Id,
      token,
    );
    yield put(successGetAnotherUserInfo(userData));
  } catch (error) {
    yield put(failGetAnotherUserInfo(error));
  }
}

// saga function register
export function* anotherUserSaga() {
  yield takeLeading(GET_ANOTHER_USER_SAGA, getAnotherUserInfoSaga);
}

// initial state
const anotherUserState: AnotherUserInfoState = {
  loading: false,
  error: null,
  user: null,
  followers: [],
  followees: [],
};

// reducer
function anotherUserReducer(
  state: AnotherUserInfoState = anotherUserState,
  action: anotherUserActions,
): AnotherUserInfoState {
  switch (action.type) {
    case START_GET_ANOTHER_USERINFO:
      return {
        loading: true,
        error: null,
        user: null,
        followers: [],
        followees: [],
      };
    case SUCCESS_GET_ANOTHER_USERINFO:
      return {
        loading: false,
        error: null,
        user: action.payload.userData.user,
        followers: action.payload.userData.follower,
        followees: action.payload.userData.followee,
      };
    case FAIL_GET_ANOTHER_USERINFO:
      return {
        loading: false,
        error: action.payload,
        user: null,
        followers: [],
        followees: [],
      };
    default:
      return state;
  }
}

export default anotherUserReducer;
