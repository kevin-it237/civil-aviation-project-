import {call, put, takeLatest, takeLeading} from 'redux-saga/effects';
import {getRequest, postRequest, putRequest} from '../../../../helpers/api'
import { types } from "../reducer/types";
import {config} from '../../../../helpers/constants'

const API_URL = `${config.API_URL}/api`

/**
 * @description get states
 */
function* getStates ({type}) {
    yield put({type: types.START_LOADING, payload: type})
    try { 
        const {data} = yield getRequest(`${API_URL}/states`);
        yield put({type: types.ADMIN_GET_STATES_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.ADMIN_GET_STATES_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: type})
    }
}

/**
 * @description get users
 */
function* getUsers ({type}) {
    yield put({type: types.START_LOADING, payload: type})
    try { 
        const {data} = yield getRequest(`${API_URL}/users`);
        yield put({type: types.ADMIN_GET_USERS_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.ADMIN_GET_USERS_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: type})
    }
}

/**
 * @description create user account.  
 */
function* createUserAccount ({payload, type}) 
{
    yield put({type: types.START_LOADING, payload: type})
    try {
        const {data} = yield postRequest(`${API_URL}/auth/register`, payload);
        yield put({ type: types.ADMIN_CREATE_USER_ACCOUNT_SUCCESS, payload: data });
    } 
    catch (error)
    {
        yield put({ type: types.ADMIN_CREATE_USER_ACCOUNT_FAILURE, payload: error.response.data });
    } finally {
        yield put({type: types.STOP_LOADING, payload: type})
    }
}

/**
 * @description reset account  
 */
function* resetUserAccount ({payload, type}) 
{
    yield put({type: types.START_LOADING, payload: type})
    try {
        const {data} = yield putRequest(`${API_URL}/auth/users`, payload);
        yield put({ type: types.ADMIN_RESET_USER_ACCOUNT_SUCCESS, payload: data });
    } 
    catch (error)
    {
        yield put({ type: types.ADMIN_RESET_USER_ACCOUNT_FAILURE, payload: error.response.data });
    } finally {
        yield put({type: types.STOP_LOADING, payload: type})
    }
}

/**
 * @description get comments
 */
function* listComments ({type}) {
    yield put({type: types.START_LOADING, payload: type})
    try { 
        const {data} = yield getRequest(`${API_URL}/comments`);
        yield put({type: types.ADMIN_LIST_COMMENTS_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.ADMIN_LIST_COMMENTS_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: type})
    }
}


export default function* AdminSaga() 
{
    yield takeLatest(types.ADMIN_GET_STATES_REQUEST, getStates);
    yield takeLatest(types.ADMIN_GET_USERS_REQUEST, getUsers);
    yield takeLatest(types.ADMIN_CREATE_USER_ACCOUNT_REQUEST, createUserAccount);
    yield takeLatest(types.ADMIN_RESET_USER_ACCOUNT_REQUEST, resetUserAccount);
    yield takeLatest(types.ADMIN_LIST_COMMENTS_REQUEST, listComments);
}