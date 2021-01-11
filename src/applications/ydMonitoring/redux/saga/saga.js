import {put, takeEvery} from 'redux-saga/effects'
import {getRequest, postRequest, putRequestFormData} from '../../../../helpers/api'
import { types } from "../reducer/types";
import {API_URL} from './saga.helper'

/**
 * @description get tasks
 */
function* getStates () {
    yield put({type: types.START_LOADING, payload: types.GET_STATES_REQUEST})
    try { 
        const {data} = yield getRequest(`${API_URL}/states`);
        yield put({type: types.GET_STATES_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.GET_STATES_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.GET_STATES_REQUEST})
    }
}


export default function* YDMonitoringSaga() {
    yield takeEvery(types.GET_STATES_REQUEST, getStates);
}