import { call, put } from 'redux-saga/effects';
// 로그인 관련 reducer file
import { AxiosError } from 'axios';
import { takeEvery } from 'redux-saga/effects';
import { SignupState } from '../../type';
import authService from '../services/authService';
import { push } from 'connected-react-router';

// action type
const SIGNUP_START = 'coinstagram/signup/SIGNUP_START' as const;
const SIGNUP_SUCCESS = 'coinstagram/signup/SIGNUP_SUCCESS' as const;
const SIGNUP_FAIL = 'coinstagram/signup/SIGNUP_FAIL' as const;

// action creator
export const signupStart = () => ({
  type: SIGNUP_START,
});
const signupSuccess = (data: string) => ({
  type: SIGNUP_SUCCESS,
  data,
});
const signupFail = (error: AxiosError) => ({
  type: SIGNUP_FAIL,
  error,
});

type SignupActions =
  | ReturnType<typeof signupStart>
  | ReturnType<typeof signupSuccess>
  | ReturnType<typeof signupFail>;

const initialState: SignupState = {
  loading: false,
  error: null,
};

// reducer
function signupReducer(
  state: SignupState = initialState,
  action: SignupActions,
): SignupState {
  switch (action.type) {
    case SIGNUP_START:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
export default signupReducer;

// saga action type
const START_SIGNUP_SAGA = 'START_SIGNUP_SAGA' as const;

// saga action creator
export const signupSagaActionCreator = (
  user_email: string,
  user_name: string,
  user_id: string,
  user_password: string,
) => ({
  type: START_SIGNUP_SAGA,
  payload: { user_email, user_name, user_id, user_password },
});

type SagaActions = ReturnType<typeof signupSagaActionCreator>;

function* signupRequestSaga(action: SagaActions) {
  const payload = action.payload;
  yield put(signupStart());
  try {
    const result = yield call(
      authService.signup,
      payload.user_email,
      payload.user_name,
      payload.user_id,
      payload.user_password,
    );
    yield put(signupSuccess(result));
    if (result) yield put(push('/login'));
  } catch (e) {
    yield put(signupFail(e));
    alert('기존에 있는 사용자ID입니다. 다른 ID를 입력해주세요');
  }
}

// saga function register
export function* signupSaga() {
  yield takeEvery(START_SIGNUP_SAGA, signupRequestSaga);
}
