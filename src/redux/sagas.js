import { all } from 'redux-saga/effects';
import AuthSaga from '../applications/auth/redux/saga/saga';
import TimeTrackerSaga from '../applications/ydMonitoring/redux/saga/saga'

/**
 * @description combine sagas.
 */
export default function* Sagas() {
	yield all([
		AuthSaga(),
		TimeTrackerSaga()
	]);
}
