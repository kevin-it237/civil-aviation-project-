import {put, takeEvery} from 'redux-saga/effects'
import {getRequest, postRequest, putRequestFormData} from '../../../../helpers/api'
import { types } from "../reducer/types";
import {API_URL} from './tracker.class'

/**
 * @description get tasks
 */
function* getTasks () {
    try { 
        const {data} = yield getRequest(`${API_URL}/projects/tasks/personal`);
        let results
        if(data.data) results = data.data.items;
        if(data.status === 'error') results = []
        yield put({type: types.GET_TASKS_SUCCESS, payload: results})
    } catch (error) {
        yield put({type: types.GET_TASKS_FAILURE, payload: error.response.data.message});
    }
}

/**
 * @description create activity
 */
function* createActivity ({payload}) {
    try { 
        const {data} = yield postRequest(`${API_URL}/hrm/activities`, payload);
        localStorage.setItem('activity', JSON.stringify(payload))
        yield put({type: types.CREATE_ACTIVITY_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.CREATE_ACTIVITY_FAILURE, payload: error.response.data.message});
    }
}

/**
 * @description update activity
 * @param {{userId: string, formData: FormData}} payload
 */
function* updateActivity ({payload}) {
    const {userId, formData} = payload
    try { 
        const {data} = yield putRequestFormData(`${API_URL}/hrm/activities/${userId}`, formData);
        if(data) yield put({type: types.UPDATE_ACTIVITY_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.UPDATE_ACTIVITY_FAILURE, payload: error.response.data.message});
    }
}

/**
 * @description Get activity
 */
function* getActivity ({payload}) {
    try { 
        const {data} = yield getRequest(`${API_URL}/hrm/activities?date=${payload}`);
        yield put({type: types.GET_ACTIVITY_SUCCESS, payload: data})
    } catch (error) {
        yield put({type: types.GET_ACTIVITY_FAILURE, payload: error.response.data.message});
    }
}

export default function* TimeTrackerSaga() {
    yield takeEvery(types.GET_TASKS_REQUEST, getTasks);
    yield takeEvery(types.CREATE_ACTIVITY_REQUEST, createActivity);
    yield takeEvery(types.GET_ACTIVITY_REQUEST, getActivity);
    yield takeEvery(types.UPDATE_ACTIVITY_REQUEST, updateActivity);
}