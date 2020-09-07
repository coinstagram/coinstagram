// 로그인 관련 reducer file
import { AuthState } from '../../type';
import { AxiosError } from 'axios';
import { takeEvery } from 'redux-saga/effects';

// action type
const SIGNUP_START = 'coinstagram/signup/SIGNUP_START' as const;
const SIGNUP_SUCCESS = 'coinstagram/signup/SIGNUP_SUCCESS' as const;
const SIGNUP_FAIL = 'coinstagram/signup/SIGNUP_FAIL' as const;

// action creator
const signupStart = () => ({
  type: SIGNUP_START,
});
const signupSuccess = (token: string) => ({
  type: SIGNUP_SUCCESS,
  payload: token,
});
const signupFail = (error: AxiosError) => ({
  type: SIGNUP_FAIL,
  payload: error,
});

type SignupActions =
  | ReturnType<typeof signupStart>
  | ReturnType<typeof signupSuccess>
  | ReturnType<typeof signupFail>;

// saga action type
const SIGNUP_REQUEST_SAGA = 'SIGNUP_REQUEST_SAGA' as const;

// saga action creator
export const signupRequestSaga = (token: string) => ({
  type: SIGNUP_REQUEST_SAGA,
  payload: token,
});

type SagaActions = ReturnType<typeof signupRequestSaga>;

// saga function
function* signupSaga(action: SagaActions) {
  try {
  } catch (e) {}
}

// saga function register
export function* SignupSaga() {
  yield takeEvery(SIGNUP_REQUEST_SAGA, signupSaga);
}

const initialState: SignupState = {
  loading: false,
  error: null,
  token: null,
};

// reducer

function SignupReducer(
  state: SignupState = initialState,
  action: SignupActions,
): SignupState {
  switch (action.type) {
    case SIGNUP_START:
      return {
        loading: true,
        error: null,
        token: null,
      };
    case SIGNUP_SUCCESS:
      return {
        loading: false,
        error: null,
        token: action.payload,
      };
    case SIGNUP_FAIL:
      return {
        loading: false,
        error: action.payload,
        token: null,
      };
    default:
      return state;
  }
}

export default SignupReducer;
