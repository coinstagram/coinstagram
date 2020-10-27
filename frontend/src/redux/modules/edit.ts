import {select, call, put, takeEvery} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import editService from '../services/editService';
import RootState from '../../type';
import { UserState, EditState, AuthState } from '../../type';
import { push } from 'connected-react-router';
// 액션 타입
const EDIT_START = 'coinstagram/edit/EDIT_START' as const;
const EDIT_SUCCESS = 'coinstagram/edit/EDIT_SUCCESS' as const;
const EDIT_FAIL = 'coinstagram/edit/EDIT_FAIL' as const;

const DELETE_START = 'coinstagram/edit/DELETE_START' as const;
const DELETE_SUCCESS = 'coinstagram/edit/DELETE_SUCCESS' as const;
const DELETE_FAIL = 'coinstagram/edit/DELETE_FAIL' as const;


// 액션 생성 함수
export const editStart = () => ({
    type: EDIT_START
});
export const editSuccess = (user_profile:string,
    user_name:string,
    user_id:string,
    user_introduce:string,
    user_email:string,
    user_phone:string,
    user_gender:string) => ({
    type: EDIT_SUCCESS,
    payload:{user_profile,
        user_name,
        user_id,
        user_introduce,
        user_email,            
        user_phone,
        user_gender
    }
});
export const editFail = (error:AxiosError) => ({
    type: EDIT_FAIL,
    error
});
export const deleteStart = () => ({
    type: DELETE_START
});
export const deleteSuccess = (user_id:string) => ({
    type: DELETE_SUCCESS,
    payload:user_id
});
export const deleteFail = (error:AxiosError) => ({
    type: DELETE_FAIL,
    error
});


type editActions =
| ReturnType<typeof editStart>
| ReturnType<typeof editSuccess>
| ReturnType<typeof editFail>
| ReturnType<typeof deleteStart>
| ReturnType<typeof deleteSuccess>
| ReturnType<typeof deleteFail>

const initialState:EditState = {
    loading:false,
    error:null,
    user:null
    // user: {
    //     user_profile: '',
    //     user_name: '',
    //     user_id: '',
    //     user_introduce: '',
    //     user_email: '',
    //     user_phone: '',
    //     user_gender: ''
    // }
}

function editReducer (state: EditState=initialState,
    action:editActions):EditState {
    switch (action.type) {
        case EDIT_START:
        return {
        loading: true,
        error: null,
        user:null
        };
        case EDIT_SUCCESS:
        return {
        loading: false,
        error: null,
        user:action.payload
        };
        case EDIT_FAIL:
        return {
        loading: false,
        error: action.error,
        user:null
        };
        case DELETE_START:
            return {
                loading: true,
                error: null,
                user:null
                };
        case DELETE_SUCCESS:
            return {
                loading: false,
                error: null,
                user:null
                };
        case DELETE_FAIL:
        return {
            loading: false,
            error: action.error,
            user:null
            };
        default:
        return state;
        }
}
export default editReducer;

// 사가 액션 타입
const START_EDIT_SAGA = 'START_EDIT_SAGA' as const;
const START_DELETE_SAGA = 'START_DELETE_SAGA' as const;

// 사가 액션 생성 함수
export const editSagaActionCreator = (
    user_profile:string,
    user_name:string,
    user_id:string,
    user_introduce:string,
    user_email:string,
    user_phone:string,
    user_gender:string
    ) => ({
        type:START_EDIT_SAGA,
        payload: {user_profile,
            user_name,
            user_id,
            user_introduce,
            user_email,            
            user_phone,
            user_gender}            
});
export const deleteSagaActionCreator = (user_id:string) => ({
        type:START_DELETE_SAGA,
        payload: user_id
});

type editSagaActions = ReturnType<typeof editSagaActionCreator>;
type deleteSagaActions = ReturnType<typeof deleteSagaActionCreator>;

function* editRequestSaga(action:editSagaActions) {
    const payload = action.payload;
    console.log(payload);
    yield put(editStart());
    try {
        const { token }: AuthState = yield select((state: RootState) => state.auth);
        const result = yield call(
            editService.edit,
            payload.user_profile,
            payload.user_name,
            payload.user_id,
            payload.user_introduce,
            payload.user_email,
            payload.user_phone,
            payload.user_gender,
            token
        );
        yield put(editSuccess(payload.user_profile,
            payload.user_name,
            payload.user_id,
            payload.user_introduce,
            payload.user_email,
            payload.user_phone,
            payload.user_gender));
        alert('성공적으로 변경되었습니다');
        console.log('success');
        if(result) yield put(push('/edit/profile'));
    } catch(e) {
        yield put(editFail(e));
    }
}
function* deleteRequestSaga(action:deleteSagaActions) {
    const payload = action.payload;   
    console.log(payload);
    yield put(deleteStart());
    try {
        console.log('check')
        const { token }: AuthState = yield select((state: RootState) => state.auth);
        const result = yield call(
            editService.delete,
            payload,
            token            
        );
        yield put(deleteSuccess(payload));
        console.log(result);
        if(result) yield put(push('/join'));
    } catch(e) {
        yield put(deleteFail(e));
    }
}
export function* editSaga() {
    yield takeEvery(START_EDIT_SAGA, editRequestSaga);
    yield takeEvery(START_DELETE_SAGA, deleteRequestSaga);
}