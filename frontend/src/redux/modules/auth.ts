// import { call, put } from 'redux-saga/effects';
// // 로그인 관련 reducer file
// import { AuthState } from '../../type';
// import { AxiosError } from 'axios';
// import { takeLatest } from 'redux-saga/effects';

// // action type
// const SIGNIN_START = 'coinstagram/auth/SIGNIN_START' as const;
// const SIGNIN_SUCCESS = 'coinstagram/auth/SIGNIN_SUCCESS' as const;
// const SIGNIN_FAIL = 'coinstagram/auth/SIGNIN_FAIL' as const;

// // // action creator
// export const signinStart = (credentials: string) => ({
//   type: SIGNIN_START,
//   payload: credentials,
// });
// const signinSuccess = (user: string) => ({
//   type: SIGNIN_SUCCESS,
//   payload: user,
// });
// const signinFail = (error: AxiosError) => ({
//   type: SIGNIN_FAIL,
//   payload: error,
// });

// type AuthActions =
//   | ReturnType<typeof signinStart>
//   | ReturnType<typeof signinSuccess>
//   | ReturnType<typeof signinFail>;

// // reducer
// function authReducer(
//   state: AuthState = initialState,
//   action: AuthActions,
// ): AuthState {
//   switch (action.type) {
//     case SIGNIN_START:
//       return {
//         ...state,
//         loading: true,
//       };
//     case SIGNIN_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         token: action.payload,
//       };
//     case SIGNIN_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//         token: null,
//       };
//     default:
//       return state;
//   }
// }

// export default authReducer;

// // saga action type
// // const SIGNIN_REQUEST_SAGA = 'SIGNIN_REQUEST_SAGA' as const;

// const START_COOKIE_CHECK_SAGA = 'START_COOKIE_CHECK_SAGA';
// const START_LOGIN_SAGA = 'START_LOGIN_SAGA';
// const START_LOGOUT_SAGA = 'START_LOGOUT_SAGA';

// // saga action creator
// // export const signinRequestSaga = (token: string) => ({
// //   type: SIGNIN_REQUEST_SAGA,
// //   payload: token,
// // });
// export const cookieCheckSagaActionCreator = () => ({
//   type: START_COOKIE_CHECK_SAGA,
// });
// export const signInSagaActionCreator = ({ user_email, user_password }) => ({
//   type: START_LOGIN_SAGA,
//   payload: {
//     user_email,
//     user_password,
//   },
// });
// export const logoutSagaActionCreator = () => ({
//   type: START_LOGOUT_SAGA,
// });

// type SagaActions = ReturnType<typeof signinRequestSaga>;

// // saga function
// // function* signinSaga({ payload: { user_id, user_password } }) {
// //   // yield put(signinStart(user_id, user_password));
// //   try {
// //     const user = yield login(user_id, user_password)
// //     yield put(signinSuccess(user));
// //   } catch (e) {
// //     yield put(signinFail(e));
// //   }
// // }
// function* cookieCheckSaga() {
//   try {
//     yield put(signinStart());
//     yield delay(300);
//     const { isAuth, user } = yield call(UserService.authenticate);
//     if (!isAuth) throw new Error();
//     yield put(signinSuccess(user));
//   } catch (error) {
//     yield put(signinFail(error));
//   }
// }
// function* signinSaga(action) {
//   yield put(signinStart());
//   try {
//     const { user } = yield call(UserService.login, action.payload);
//     if (!user) throw new Error();
//     yield put(signinSuccess(user));
//   } catch (e) {
//     yield put(signinFail(e));
//   }
// }
// // saga function register
// export function* authSaga() {
//   // yield takeEvery(SIGNIN_REQUEST_SAGA, signinSaga);
//   yield takeLatest(SIGNIN_START, signinSaga);
// }

// const initialState: AuthState = {
//   loading: false,
//   error: null,
//   token: null,
//   authData: {
//     user_id: null,
//     user_password: null,
//   },
// };
// 로그인 관련 reducer file
import { AuthState } from '../../type';
import { AxiosError } from 'axios';
import { takeEvery } from 'redux-saga/effects';

// action type
const SIGNIN_START = 'coinstagram/auth/SIGNIN_START' as const;
const SIGNIN_SUCCESS = 'coinstagram/auth/SIGNIN_SUCCESS' as const;
const SIGNIN_FAIL = 'coinstagram/auth/SIGNIN_FAIL' as const;

// action creator
const signinStart = () => ({
  type: SIGNIN_START,
});
const signinSuccess = (token: string) => ({
  type: SIGNIN_SUCCESS,
  payload: token,
});
const signinFail = (error: AxiosError) => ({
  type: SIGNIN_FAIL,
  payload: error,
});

type AuthActions =
  | ReturnType<typeof signinStart>
  | ReturnType<typeof signinSuccess>
  | ReturnType<typeof signinFail>;

// saga action type
const SIGNIN_REQUEST_SAGA = 'SIGNIN_REQUEST_SAGA' as const;

// saga action creator
export const signinRequestSaga = (token: string) => ({
  type: SIGNIN_REQUEST_SAGA,
  payload: token,
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
  error: null,
  token: null,
  authData: {
    user_id: null,
    user_password: null,
  },
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
        error: null,
        token: action.payload,
      };
    case SIGNIN_FAIL:
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

export default authReducer;
