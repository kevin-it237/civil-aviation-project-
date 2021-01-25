import { all } from 'redux-saga/effects';
import AuthSaga from '../applications/auth/redux/saga/saga';
import SAATMDashboardSaga from '../applications/saatmDashboard/redux/saga/saga'
import YDMonitoringSaga from '../applications/ydMonitoring/redux/saga/saga'

/**
 * @description combine sagas.
 */
export default function* Sagas() {
	yield all([
		AuthSaga(),
		SAATMDashboardSaga(),
		YDMonitoringSaga(),
	]);
}
