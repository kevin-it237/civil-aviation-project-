import { types } from "./types";

/**
 * @description Start the tracker
 */
export const startTracker = (payload) => ({
    type: types.START_TRACKER,
    payload
});

/**
 * @description Stop the tracker
 */
export const stopTracker = (payload) => ({
    type: types.STOP_TRACKER,
    payload
});

/**
 * @description Get tasks
 */
export const getTasks = () => ({
    type: types.GET_TASKS_REQUEST
});

/**
 * @description Init time
 */
export const initTime = (payload) => ({
    type: types.INIT_TIME,
    payload
});

/**
 * @description Increment time
 */
export const incrementTime = () => ({
    type: types.INCREMENT_TIME
});

/**
 * @description Create activity
 */
export const createActivity = (payload) => ({
    type: types.CREATE_ACTIVITY_REQUEST,
    payload
});

/**
 * @description update activity
 */
export const updateActivity = (payload) => ({
    type: types.UPDATE_ACTIVITY_REQUEST,
    payload
});

/**
 * @description Get activity
 */
export const getActivity = (payload) => ({
    type: types.GET_ACTIVITY_REQUEST,
    payload
});

/**
 * @description Set activity level
 */
export const setActivityLevel = (payload) => ({
    type: types.SET_ACTIVITY_LEVEL,
    payload
});