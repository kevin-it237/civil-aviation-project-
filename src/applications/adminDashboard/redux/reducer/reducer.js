import { types } from './types';

/**
 * @param {array} states
 * @param {array} users
 * @param {object} loader
 */
const INITIAL_STATE = {
	states: [],
	users: [],
	success: null,
	loader: {
        actions: []
    },
};

const AdminReducer = (state = INITIAL_STATE, action) => {
	const { loader } = state;
    const { payload } = action;
	switch (action.type) {
		
		case types.START_LOADING:
            return {
                ...state,
                loader: {
                    ...loader,
                    actions: [...new Set([...loader.actions, payload])], 
                }
            };

        case types.STOP_LOADING:
            return {
                ...state,
                loader: {
                    ...loader,
                    actions: loader.actions.filter(action => action !== payload),
                }
            };

        case types.ADMIN_GET_STATES_SUCCESS:
            return {
                ...state,
                states: action.payload,
            };
        case types.ADMIN_GET_STATES_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        case types.ADMIN_GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
            };
        case types.ADMIN_GET_USERS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        case types.ADMIN_CREATE_USER_ACCOUNT_SUCCESS:
            return {
                ...state,
                users: [...state.users, action.payload],
				success: 'Action successfully executed.'
            };
        case types.ADMIN_CREATE_USER_ACCOUNT_FAILURE:
            return {
                ...state,
                error: action.payload,
				success: null
            };

		case types.RESTORE_RESPONSE_STATUS:
			return {
				...state,
				success: null,
			};

		default:
			return state;
	}
};

export default AdminReducer;
