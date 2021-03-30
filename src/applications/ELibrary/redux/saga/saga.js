import {put, takeEvery} from 'redux-saga/effects'
import {getRequest} from '../../../../helpers/api'
import { types } from "../reducer/types";
import {config} from '../../../../helpers/constants'

const API_URL = `${config.API_URL}/api`

/**
 * @description get definitions
 */
 function* getDefinitions () {
    yield put({type: types.START_LOADING, payload: types.GET_DEFINITIONS_REQUEST})
    try { 
        const {data} = yield getRequest(`${API_URL}/libraries/definitions`);
        yield put({type: types.GET_DEFINITIONS_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.GET_DEFINITIONS_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.GET_DEFINITIONS_REQUEST})
    }
}

/**
 * @description get Instruments
 */
function* getInstruments () {
    yield put({type: types.START_LOADING, payload: types.GET_INSTRUMENTS_REQUEST})
    try { 
        const {data} = yield getRequest(`${API_URL}/libraries/instruments`);
        yield put({type: types.GET_INSTRUMENTS_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.GET_INSTRUMENTS_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.GET_INSTRUMENTS_REQUEST})
    }
}

/**
 * @description get articles and provisions
 */
function* getArticles ({payload}) {
    yield put({type: types.START_LOADING, payload: types.GET_ARTICLE_PROVISIONS_REQUEST})
    try { 
        const {data} = yield getRequest(`${API_URL}/libraries/instruments/${payload.articleId}`);
        yield put({type: types.GET_ARTICLE_PROVISIONS_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.GET_ARTICLE_PROVISIONS_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.GET_ARTICLE_PROVISIONS_REQUEST})
    }
}




export default function* ELibrarySaga() {
    yield takeEvery(types.GET_DEFINITIONS_REQUEST, getDefinitions);
    yield takeEvery(types.GET_INSTRUMENTS_REQUEST, getInstruments);
    yield takeEvery(types.GET_ARTICLE_PROVISIONS_REQUEST, getArticles);
}