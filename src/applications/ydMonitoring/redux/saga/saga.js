import {put, takeEvery} from 'redux-saga/effects'
import {getRequest, postRequest} from '../../../../helpers/api'
import { types } from "../reducer/types";
import {config} from '../../../../helpers/constants'

const API_URL = `${config.API_URL}/api`

/**
 * @description get states
 */
function* getStates () {
    yield put({type: types.START_LOADING, payload: types.GET_STATES_REQUEST})
    try { 
        const {data} = yield getRequest(`${API_URL}/states`);
        yield put({type: types.GET_STATES_SUCCESS, payload: data})
    } catch (error) {console.log({error})
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


/**
 * @description get questionnaire
 */
 function* getSPsAndResponses ({payload}) {
    yield put({type: types.START_LOADING, payload: types.GET_SPS_AND_RESPONSES_REQUEST})
    try { 
        const {data} = yield getRequest(`${API_URL}/response/questions/${payload}`);
        yield put({type: types.GET_SPS_AND_RESPONSES_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.GET_SPS_AND_RESPONSES_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.GET_SPS_AND_RESPONSES_REQUEST})
    }
}

/**
 * @description get organisations
 */
function* getOrganisations () {
    yield put({type: types.START_LOADING, payload: types.GET_ORGANISATIONS_REQUEST})
    try { 
        const {data} = yield getRequest(`${API_URL}/organisations`);
        yield put({type: types.GET_ORGANISATIONS_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.GET_ORGANISATIONS_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.GET_ORGANISATIONS_REQUEST})
    }
}

/**
 * @description save response
 */
function* saveResponse ({payload}) {
    yield put({type: types.START_LOADING, payload: types.SAVE_RESPONSE_REQUEST})
    try { 

        const promises = []
        payload.forEach(reponse => {
            promises.push(postRequest(`${API_URL}/response`, reponse))
        });
        if(promises.length) {
            const responses = yield Promise.all(promises);
            yield put({type: types.SAVE_RESPONSE_SUCCESS, payload: responses})
        } else {
            yield put({type: types.SAVE_RESPONSE_SUCCESS, payload: {}})
        }
    } catch (error) {console.log({error})
        yield put({type: types.SAVE_RESPONSE_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.SAVE_RESPONSE_REQUEST})
    }
}



export default function* YDMonitoringSaga() {
    yield takeEvery(types.GET_STATES_REQUEST, getStates);
    yield takeEvery(types.GET_QUESTIONNAIRE_REQUEST, getQuestionnaire);
    yield takeEvery(types.GET_ORG_RESPONSES_REQUEST, getOrgResponses);
    yield takeEvery(types.GET_SPS_AND_RESPONSES_REQUEST, getSPsAndResponses);
    yield takeEvery(types.SAVE_RESPONSE_REQUEST, saveResponse);
    yield takeEvery(types.GET_ORGANISATIONS_REQUEST, getOrganisations);
}