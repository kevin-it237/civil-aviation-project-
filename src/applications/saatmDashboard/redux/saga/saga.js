import {put, takeEvery, takeLatest} from 'redux-saga/effects'
import {getRequest} from '../../../../helpers/api'
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
    } catch (error) {
        yield put({type: types.GET_STATES_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.GET_STATES_REQUEST})
    }
}

/**
 * @description kpis data for states
 * @param {{kpiId: String, orgType: String}} payload
 */
function* getKpisData ({payload}) {
    let url = `${API_URL}/kpis/${payload.kpiId}`
    if(payload.orgType === 'afcac') {
        url = `${API_URL}/kpis/afcac/${payload.kpiId}`
    }
    yield put({type: types.START_LOADING, payload: types.GET_KPI_DATA_REQUEST})
    try { 
        const {data} = yield getRequest(url);
        yield put({type: types.GET_KPI_DATA_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.GET_KPI_DATA_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.GET_KPI_DATA_REQUEST})
    }
}

/**
 * @description kpis data summary
 * @param {{orgType: String}} payload
 */
function* getKpisDataSummary ({payload}) {
    yield put({type: types.START_LOADING, payload: types.GET_KPI_DATA_SUMMARY_REQUEST})
    try { 
        const {data} = yield getRequest(`${API_URL}/kpis/summary/${payload}`);
        yield put({type: types.GET_KPI_DATA_SUMMARY_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.GET_KPI_DATA_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.GET_KPI_DATA_SUMMARY_REQUEST})
    }
}

/**
 * @description listkpis
 */
function* getKpis ({payload}) {
    yield put({type: types.START_LOADING, payload: types.GET_KPIS_REQUEST})
    try { 
        const {data} = yield getRequest(`${API_URL}/kpis/org/${payload}`);
        yield put({type: types.GET_KPIS_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.GET_KPIS_FAILURE, payload: error.response.data.message});
    } finally {
        yield put({type: types.STOP_LOADING, payload: types.GET_KPIS_REQUEST})
    }
}


export default function* SAATMDashboardSaga() {
    yield takeLatest(types.GET_STATES_REQUEST, getStates);
    yield takeEvery(types.GET_KPI_DATA_REQUEST, getKpisData);
    yield takeLatest(types.GET_KPIS_REQUEST, getKpis);
    yield takeEvery(types.GET_KPI_DATA_SUMMARY_REQUEST, getKpisDataSummary);
}