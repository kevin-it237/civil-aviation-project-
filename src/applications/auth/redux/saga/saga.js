import {call, put, takeLatest, takeLeading} from 'redux-saga/effects';
import { types } from "../reducer/types";
import authClass from "./auth.class";

/**
 * @description check the current autheticated user.   
 */
function* authCurrentAuthenticatedUser () 
{
    try {
        const user = yield call(authClass.authCurrentAuthenticatedUser);
        localStorage.setItem('token', JSON.stringify(user.signInUserSession.accessToken.jwtToken));
        yield put({ type: types.CURRENT_AUTHENTICATED_USER_SUCCESS, payload: user });
        yield put({ type: types.PROFILE_INFO_REQUEST });
    } 
    catch (error)
    { 
        yield put({ type: types.CURRENT_AUTHENTICATED_USER_FAILURE, payload: error });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.clear();
    }
}

/**
 * @description check the current autheticated user.   
 */
function* authCurrentUserPoolUser () 
{
    try {
        const user = yield call(authClass.authCurrentUserPoolUser);
        localStorage.setItem('token', JSON.stringify(user.signInUserSession.accessToken.jwtToken));
        yield put({ type: types.CURRENT_USER_POOL_SUCCESS, payload: user });
        yield put({ type: types.PROFILE_INFO_REQUEST });
    } 
    catch (error)
    { 
        yield put({ type: types.CURRENT_USER_POOL_FAILURE, payload: null });
        localStorage.clear();
    }
}

/**
 * @description login with google, facebook, apple etc... 
 */
function* authFederatedSignIn ({payload}) 
{
    try {
        yield call(authClass.authFederatedSignIn, payload);
    } 
    catch (error)
    {
        yield put({ type: types.FEDERATED_SIGN_IN_FAILURE, payload: error });
    }
}

/**
 * @description user sign in.  
 */
function* authSignIn ({payload}) 
{
    try {
        const user = yield call(authClass.authSignIn, payload);
        yield put({ type: types.SIGN_IN_USER_SUCCESS, payload: user });
        localStorage.setItem('token', JSON.stringify(user.signInUserSession.accessToken.jwtToken));
        yield put({ type: types.PROFILE_INFO_REQUEST });
    } 
    catch (error)
    {
        yield put({ type: types.SIGN_IN_USER_FAILURE, payload: error });
    }
}

/**
 * @description user logout.  
 */
function* authLogout ({payload}) 
{
    try {
        yield call(authClass.authLogout, payload);
        yield put({type: types.LOGOUT_USER_SUCCESS});
        localStorage.clear();
    } 
    catch (error)
    {
        const {message} = error;
        yield put({ type: types.LOGOUT_USER_FAILURE, payload: error });
    }
}

/**
 * @description get the status of user's profile
 */
function* authProfileInfo () {
    try {
        const {data} = yield call(authClass.profileInfo);
        
        if(!localStorage.getItem('orgId')) localStorage.setItem('orgId', JSON.stringify(data.data.userInfo.orgId))
        localStorage.setItem('user', JSON.stringify(data.data.userInfo));
    
        yield put({ type: types.PROFILE_INFO_SUCCESS, payload: data });

        yield put({ type: types.REDIRECT_REQUEST, payload: "/time-tracker" });

    } 
    catch (error)
    { 
        const err = error.response ? error.response.data : error;
        yield put({ type: types.PROFILE_INFO_FAILURE, payload: err });
    }
}

export default function* AuthSaga() 
{
    yield takeLatest(types.CURRENT_AUTHENTICATED_USER_REQUEST, authCurrentAuthenticatedUser);
    yield takeLatest(types.CURRENT_USER_POOL_REQUEST, authCurrentUserPoolUser);
    yield takeLatest(types.SIGN_IN_USER_REQUEST, authSignIn);
    yield takeLatest(types.PROFILE_INFO_REQUEST, authProfileInfo);
    yield takeLatest(types.FEDERATED_SIGN_IN_REQUEST, authFederatedSignIn);
    yield takeLeading(types.LOGOUT_USER_REQUEST, authLogout);
}