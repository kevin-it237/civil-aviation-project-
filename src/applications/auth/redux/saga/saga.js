import {call, put, takeLatest, takeLeading} from 'redux-saga/effects';
import { types } from "../reducer/types";
import authClass from "./auth.class";

/**
 * @description user sign in.  
 */
function* authSignIn ({payload}) 
{
    try {
        const {data} = yield call(authClass.authSignIn, payload);
        yield put({ type: types.SIGN_IN_USER_SUCCESS, payload: data });
        localStorage.setItem('token', JSON.stringify(data.accessToken));
        localStorage.setItem('user', JSON.stringify(data));
        yield put({ type: types.REDIRECT_REQUEST, payload: payload.redirect });
    } 
    catch (error)
    {
        yield put({ type: types.SIGN_IN_USER_FAILURE, payload: error.response.data });
    }
}

/**
 * @description user sign in.  
 */
function* authRegister ({payload}) 
{
    try {
        const {data} = yield call(authClass.authRegister, payload);
        yield put({ type: types.SIGN_IN_USER_SUCCESS, payload: data });
        yield authSignIn({payload: {username: payload.username, password: payload.password, redirect: payload.redirect}})
    } 
    catch (error)
    {
        yield put({ type: types.SIGN_IN_USER_FAILURE, payload: error.response.data });
    }
}

/**
 * @description update user profile.  
 */
function* updateUser ({payload}) {
    try {
        const {data} = yield call(authClass.updateUser, payload);
        yield put({ type: types.UPDATE_USER_SUCCESS, payload: data });
    } 
    catch (error)
    {
        yield put({ type: types.UPDATE_USER_FAILURE, payload: error.response.data });
    }
}


/**
 * @description check the current autheticated user.   
 */
function* authCurrentAuthenticatedUser () 
{
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        yield put({ type: types.CURRENT_AUTHENTICATED_USER_SUCCESS, payload: user });
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
    yield takeLatest(types.SIGN_IN_USER_REQUEST, authSignIn);
    yield takeLatest(types.REGISTER_USER_REQUEST, authRegister);
    yield takeLatest(types.PROFILE_INFO_REQUEST, authProfileInfo);
    yield takeLeading(types.LOGOUT_USER_REQUEST, authLogout);
    yield takeLeading(types.UPDATE_USER_REQUEST, updateUser);
}