import {put, takeEvery} from 'redux-saga/effects'
import {getRequest, postRequest} from '../../../../helpers/api'
import { types } from "../reducer/types";
import {API_URL} from './saga.helper'

/**
 * @description get states
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

/**
 * @description get questionnaire
 */
function* getQuestionnaire () {
    yield put({type: types.START_LOADING, payload: types.GET_QUESTIONNAIRE_REQUEST})
    try { 
        const {data} = yield getRequest(`${API_URL}/questionnaire`);
        yield put({type: types.GET_QUESTIONNAIRE_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.GET_QUESTIONNAIRE_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.GET_QUESTIONNAIRE_REQUEST})
    }
}

/**
 * @description get organisation responses
 */
function* getOrgResponses ({payload}) {
    yield put({type: types.START_LOADING, payload: types.GET_ORG_RESPONSES_REQUEST})
    try { 
        const {data} = yield getRequest(`${API_URL}/response/${payload}`);
        yield put({type: types.GET_ORG_RESPONSES_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.GET_ORG_RESPONSES_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.GET_ORG_RESPONSES_REQUEST})
    }
}



export default function* YDMonitoringSaga() {
    yield takeEvery(types.GET_STATES_REQUEST, getStates);
    yield takeEvery(types.GET_QUESTIONNAIRE_REQUEST, getQuestionnaire);
    yield takeEvery(types.GET_ORG_RESPONSES_REQUEST, getOrgResponses);
}