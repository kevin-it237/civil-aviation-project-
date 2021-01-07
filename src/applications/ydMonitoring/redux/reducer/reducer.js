import { types } from "./types";

/**
 * @param {array} tasks
 * @param {Object} selectedTask
 * @param {Object} time
 * @param {boolean} isTracking
 * @param {String} error
 * @param {Object} activity,
 * @param {number} activityLevel,
 */
const INITIAL_STATE = {
    tasks: [], 
    selectedTask: null,
    time: 0,
    error: "",
    isTracking: false,
    fetchingTasks: true,
    activity: null,
    activityLevel: 0,
}

const TimeTrackerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.START_TRACKER:
            return {
                ...state,
                selectedTask: action.payload,
                isTracking: true
            };

        case types.STOP_TRACKER:
            return {
                ...state,
                selectedTask: null,
                isTracking: false
            };

        case types.GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
                fetchingTasks: false
            };

        case types.GET_TASKS_FAILURE:
            return {
                ...state,
                fetchingTasks: false
            };

        case types.INIT_TIME:
            return {
                ...state,
                time: action.payload
            };

        case types.INCREMENT_TIME:
            return {
                ...state,
                time: state.time + 1
            };

        case types.CREATE_ACTIVITY_SUCCESS:
            return {
                ...state,
            };

        case types.UPDATE_ACTIVITY_SUCCESS:
            return {
                ...state,
            };

        case types.GET_ACTIVITY_SUCCESS:
            return {
                ...state,
                activity: action.payload.data
            };

        case types.SET_ACTIVITY_LEVEL:
            return {
                ...state,
                activityLevel: action.payload
            };

        default:
            return state;
    }
}

export default TimeTrackerReducer;