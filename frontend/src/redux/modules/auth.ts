// 로그인 관련 reducer file
import { AuthState } from '../../type';
import { AxiosError } from 'axios';
import { takeEvery } from 'redux-saga/effects';

// action type
const SIGNIN_START = 'coinstagram/auth/SIGNIN_START' as const;
const SIGNIN_SUCCESS = 'coinstagram/auth/SIGNIN_SUCCESS' as const;
const SIGNIN_FAIL = 'coinstagram/auth/SIGNIN_FAIL' as const;

type AuthActions =
  | ReturnType<typeof signinStart>
  | ReturnType<typeof signinSuccess>
  | ReturnType<typeof signinFail>;

// action creator
const signinStart = () => ({
  type: SIGNIN_START,
});
const signinSuccess = (id: string) => ({
  type: SIGNIN_SUCCESS,
  payload: id,
});
const signinFail = (error: AxiosError) => ({
  type: SIGNIN_FAIL,
  payload: error,
});

// saga action type
const SIGNIN_REQUEST_SAGA = 'SIGNIN_REQUEST_SAGA' as const;

// saga action creator
export const signinRequestSaga = (id: string) => ({
  type: SIGNIN_REQUEST_SAGA,
  payload: id,
});

type SagaActions = ReturnType<typeof signinRequestSaga>;

// saga function
function* signinSaga(action: SagaActions) {
  try {
  } catch (e) {}
}

// saga function register
export function* authSaga() {
  yield takeEvery(SIGNIN_REQUEST_SAGA, signinSaga);
}

const initialState: AuthState = {
  loading: false,
  id: null,
  error: null,
};

function authReducer(
  state: AuthState = initialState,
  action: AuthActions,
): AuthState {
  switch (action.type) {
    case SIGNIN_START:
      return {
        loading: true,
        id: null,
        error: null,
      };
    case SIGNIN_SUCCESS:
      return {
        loading: false,
        id: action.payload,
        error: null,
      };
    case SIGNIN_FAIL:
      return {
        loading: false,
        id: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default authReducer;
