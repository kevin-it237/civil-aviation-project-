import { combineReducers } from 'redux';
import AuthReducer from '../applications/auth/redux/reducer/reducer';
import TimeTrackerReducer from '../applications/ydMonitoring/redux/reducer/reducer'

const reducerCombination = combineReducers({
	AuthReducer,
	TimeTrackerReducer
});

export default reducerCombination;
