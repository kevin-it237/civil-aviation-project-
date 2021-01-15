import { combineReducers } from 'redux';
import AuthReducer from '../applications/auth/redux/reducer/reducer';
import YDMonitoringReducer from '../applications/saatmDashboard/redux/reducer/reducer'

const reducerCombination = combineReducers({
	AuthReducer,
	YDMonitoringReducer
});

export default reducerCombination;
