import { call, put, delay } from 'redux-saga/effects';
// 로그인 관련 reducer file
import { AxiosError } from 'axios';
import { takeEvery } from 'redux-saga/effects';
import { AuthState, AuthInfoState } from '../../type';
import authService from '../services/authService';
import { push } from 'connected-react-router';

// action type
const SIGNIN_START = 'coinstagram/auth/SIGNIN_START' as const;
const SIGNIN_SUCCESS = 'coinstagram/auth/SIGNIN_SUCCESS' as const;
const SIGNIN_FAIL = 'coinstagram/auth/SIGNIN_FAIL' as const;

// action creator
export const signinStart = () => ({
  type: SIGNIN_START,
});
const signinSuccess = (token: string) => ({
  type: SIGNIN_SUCCESS,
  payload: token,
});
const signinFail = (error: AxiosError) => ({
  type: SIGNIN_FAIL,
  error,
});

type AuthActions =
  | ReturnType<typeof signinStart>
  | ReturnType<typeof signinSuccess>
  | ReturnType<typeof signinFail>;

const initialState: AuthState = {
  loading: false,
  error: null,
  token: null,
};

// reducer
function authReducer(
  state: AuthState = initialState,
  action: AuthActions,
): AuthState {
  switch (action.type) {
    case SIGNIN_START:
      return {
        ...state,
        loading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        token: null,
      };
    default:
      return state;
  }
}
export default authReducer;

// saga action type
const START_SIGNIN_SAGA = 'START_SIGNIN_SAGA' as const;

// saga action creator
export const signInSagaActionCreator = (
  user_id: string,
  user_password: string,
) => ({
  type: START_SIGNIN_SAGA,
  payload: { user_id, user_password },
});

type SagaActions = ReturnType<typeof signInSagaActionCreator>;

function* signinRequestSaga(action: SagaActions) {
  const payload = action.payload;
  yield put(signinStart());
  try {
    const result = yield call(
      authService.signin,
      payload.user_id,
      payload.user_password,
    );
    yield put(signinSuccess(result));
    if (result) yield put(push('/'));
  } catch (e) {
    yield console.log(e.message);

    yield put(signinFail(e));
  }
}

// saga function register
export function* authSaga() {
  yield takeEvery(START_SIGNIN_SAGA, signinRequestSaga);
}
