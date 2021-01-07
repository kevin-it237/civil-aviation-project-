import { types } from './types';

/**
 * @description get the current autheticated user.
 */
export const authCurrentAuthenticatedUser = () => ({
	type: types.CURRENT_AUTHENTICATED_USER_REQUEST,
});

/**
 * @description get current user pool request.
 */
export const authCurrentUserPoolUser = () => ({
	type: types.CURRENT_USER_POOL_REQUEST,
});

/**
 * @description login user.
 */
export const authSignIn = (payload) => ({
	type: types.SIGN_IN_USER_REQUEST,
	payload,
});

/**
 * @description logout user.
 */
export const authLogout = () => ({
	type: types.LOGOUT_USER_REQUEST,
});

/**
 * @description login with google, facebook, apple etc...
 */
export const authFederatedSignIn = (payload) => ({
	type: types.FEDERATED_SIGN_IN_REQUEST,
	payload,
});

/**
 * @description clean redirect to prop.
 */
export const cleanRedirect = () => ({
	type: types.REDIRECT_REQUEST,
	payload: null,
});

/**
 * @description gets profile actual profile information. 
 */
export const authProfileInfo = () =>({
	type: types.PROFILE_INFO_REQUEST
});
