import { combineReducers } from 'redux';
import AuthReducer from '../applications/auth/redux/reducer/reducer';
import SAATMDashboardReducer from '../applications/saatmDashboard/redux/reducer/reducer'
import YDMonitoringReducer from '../applications/ydMonitoring/redux/reducer/reducer'

const reducerCombination = combineReducers({
	AuthReducer,
	SAATMDashboardReducer,
	YDMonitoringReducer
});

export default reducerCombination;
