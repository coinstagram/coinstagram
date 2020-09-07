import { UserState, AnotehrUserInfoState } from '../../type';
import { put, call, takeLeading } from 'redux-saga/effects';
import UserService from '../services/userService';

// action type
const START_GET_ANOTHER_USERINFO = 'coinstagram/anotherUser/START_GET_ANOTHER_USERINFO' as const;
const SUCCESS_GET_ANOTHER_USERINFO = 'coinstagram/anotherUser/SUCCESS_GET_ANOTHER_USERINFO' as const;
const FAIL_GET_ANOTHER_USERINFO = 'coinstagram/anotherUser/FAIL_GET_ANOTHER_USERINFO' as const;

// action creator
const startGetAnotehrUserInfo = () => ({
  type: START_GET_ANOTHER_USERINFO,
});

const successGetAnotherUserInfo = (userData: UserState) => ({
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
export const getAnouterUserSaga = (userId: string) => ({
  type: GET_ANOTHER_USER_SAGA,
  payload: {
    userId,
  },
});

type anotherUserSagaActions = ReturnType<typeof getAnouterUserSaga>;

// saga function
function* getAnotherUserInfoSaga(action: anotherUserSagaActions) {
  try {
    yield put(startGetAnotehrUserInfo());
    yield call(UserService.getAnotherUserData, action.payload.userId);
  } catch (error) {
    yield put(failGetAnotherUserInfo(error));
  }
}

// saga function register
export function* anotherUserSaga() {
  yield takeLeading(GET_ANOTHER_USER_SAGA, getAnotherUserInfoSaga);
}

// initial state
const anotherUserState: AnotehrUserInfoState = {
  loading: false,
  error: null,
  user: null,
};

// reducer
function anotherUserReducer(
  state: AnotehrUserInfoState = anotherUserState,
  action: anotherUserActions,
): AnotehrUserInfoState {
  switch (action.type) {
    case START_GET_ANOTHER_USERINFO:
      return {
        loading: true,
        error: null,
        user: null,
      };
    case SUCCESS_GET_ANOTHER_USERINFO:
      return {
        loading: false,
        error: null,
        user: action.payload.userData,
      };
    case FAIL_GET_ANOTHER_USERINFO:
      return {
        loading: false,
        error: action.payload,
        user: null,
      };
    default:
      return state;
  }
}

export default anotherUserReducer;
