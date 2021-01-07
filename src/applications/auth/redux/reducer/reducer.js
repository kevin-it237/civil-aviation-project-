import { types } from './types';

/**
 * @param {object} user logged in.
 * @param {object} form when creating an account.
 * @param {boolean} loading_current_user check if there is an account logged when the application loads.
 * @param {string} redirect path to redirect user to.
 * @param {object} error errors that may happen in authetication.
 */
const INITIAL_STATE = {
	user: null,
	loading_current_user: true,
	redirect: null,
	error: null,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.CURRENT_AUTHENTICATED_USER_SUCCESS:
			return {
				...state,
				// user: action.payload,
				error: null,
			};

		case types.CURRENT_AUTHENTICATED_USER_FAILURE:
			return {
				...state,
				user: null,
				error: action.payload,
				loading_current_user: false,
			};

			
		case types.PROFILE_INFO_SUCCESS:
			const user = action.payload.data.userInfo;
			return {
				...state,
				user: {
					...user,
					fullName: `${user.firstName} ${user.lastName}`,
					status: 'Available', // this will be changed to get from database.
				},
				error: null,
				loading_current_user: false,
			};

		case types.PROFILE_INFO_FAILURE:
			return {
				...state,
				user: null,
				error: action.payload,
				loading_current_user: false,
			};

		case types.CURRENT_USER_POOL_SUCCESS:
			return {
				...state,
				// user: action.payload,
				error: null,
			};

		case types.CURRENT_USER_POOL_FAILURE:
			return {
				...state,
				user: null,
				error: action.payload,
				loading_current_user: false,
			};

		case types.FEDERATED_SIGN_IN_SUCCESS:
			return {
				...state,
				error: null,
			};

		case types.FEDERATED_SIGN_IN_FAILURE:
			return {
				...state,
				error: action.payload,
			};

		case types.SIGN_IN_USER_SUCCESS:
			return {
				...state,
				error: null,
			};

		case types.SIGN_IN_USER_FAILURE:
			return {
				...state,
				error: action.payload,
				loading_current_user: false,
			};

		case types.LOGOUT_USER_SUCCESS:
			return {
				...state,
				user: null,
			};

		case types.LOGOUT_USER_FAILURE:
			return {
				...state,
				error: action.payload,
			};

		case types.REDIRECT_REQUEST:
			return {
				...state,
				redirect: action.payload,
				error: null,
			};

		default:
			return state;
	}
};

export default AuthReducer;
