import { types } from './types';

/**
 * @description Get states
 */
export const getStates = () => ({
    type: types.ADMIN_GET_STATES_REQUEST
});

/**
 * @description Get all users
 */
export const getUsers = () => ({
    type: types.ADMIN_GET_USERS_REQUEST
});

/**
 * @description Create user acoount
 */
export const createUserAccount = (payload) => ({
    type: types.ADMIN_CREATE_USER_ACCOUNT_REQUEST,
    payload
});

/**
 * @description Reset user acoount
 */
export const resetUserAccount = (payload) => ({
    type: types.ADMIN_RESET_USER_ACCOUNT_REQUEST,
    payload
});

/**
 * @description set success to false
 */
export const resetResponseStatus = () => ({
    type: types.RESTORE_RESPONSE_STATUS
});

/**
 * @description set connected users
 */
export const setConnectedUsers = (payload) => ({
    type: types.SET_CONNECTED_USERS,
    payload
});