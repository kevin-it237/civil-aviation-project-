import { types } from './types';

/**
 * @description get the current autheticated user.
 */
export const authCurrentAuthenticatedUser = () => ({
	type: types.CURRENT_AUTHENTICATED_USER_REQUEST,
});

/**
 * @description login user.
 */
export const authSignIn = (payload) => ({
	type: types.SIGN_IN_USER_REQUEST,
	payload,
});

/**
 * @description login user.
 */
export const authRegister = (payload) => ({
	type: types.REGISTER_USER_REQUEST,
	payload,
});

/**
 * @description logout user.
 */
export const authLogout = () => ({
	type: types.LOGOUT_USER_REQUEST,
});

/**
 * @description update user
 */
export const updateUser= (payload) => ({
	type: types.UPDATE_USER_REQUEST,
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

/**
 * @description reset response status
 */
export const resetResponseStatus = () =>({
	type: types.RESET_RESPONSE_STATUS
});


/**
 * @description Submit comment
 */
export const submitComment = (payload) =>({
	type: types.SUBMIT_COMMENT_REQUEST,
	payload
});
