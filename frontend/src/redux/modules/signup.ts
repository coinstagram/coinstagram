import { call, put } from 'redux-saga/effects';

// 로그인 관련 reducer file
import { AxiosError } from 'axios';
import { takeEvery } from 'redux-saga/effects';
import { SignupState } from '../../type';

// action type
const SIGNUP_START = 'coinstagram/signup/SIGNUP_START' as const;
const SIGNUP_SUCCESS = 'coinstagram/signup/SIGNUP_SUCCESS' as const;
const SIGNUP_FAIL = 'coinstagram/signup/SIGNUP_FAIL' as const;

// action creator
const signupStart = (credentials: string) => ({
  type: SIGNUP_START,
  payload: credentials,
});
const signupSuccess = (user: string) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
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
export const signupRequestSaga = (userData: string) => ({
  type: SIGNUP_REQUEST_SAGA,
  payload: userData,
});

type SagaActions = ReturnType<typeof signupRequestSaga>;

// saga function
function* SignupSaga(action: SagaActions) {
  yield put(signupStart());
  try {
    const payload = yield call(signupStart);
    yield put(signupSuccess(token));
  } catch (e) {
    yield put(signupFail(error));
  }
}

// saga function register
export function* signupSaga() {
  yield takeEvery(SIGNUP_REQUEST_SAGA, signupSaga);
}

const initialState: SignupState = {
  loading: false,
  token: null,
  error: null,
  userData: {
    user_email: null,
    user_name: null,
    user_id: null,
    user_password: null,
  },
};

// reducer

function SignupReducer(
  state: SignupState = initialState,
  action: SignupActions,
): SignupState {
  switch (action.type) {
    // case SIGNUP_START:
    //   return {
    //     loading: true,
    //     error: null,
    //     token: null,
    //   };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        token: null,
      };
    default:
      return state;
  }
}

export default SignupReducer;
