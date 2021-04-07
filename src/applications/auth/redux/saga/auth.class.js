import { postUnauthRequest, putRequest, postRequest } from "../../../../helpers/api";

import {config} from '../../../../helpers/constants'

var _URL = `${config.API_URL}/api/auth`;
var _URL_BASE = `${config.API_URL}/api`;

/**
 * @description Authentication API calls. 
 */
class AuthClass {

    /**
     * @description sign in user.
     * @param {email, password} payload 
     * @returns Promise
     */
    authSignIn(payload) {   
        return postUnauthRequest(`${_URL}/signin`, payload);
    }

    /**
     * @description Register a user.
     * @param {username, email, password} payload 
     * @returns Promise
     */
    authRegister(payload) {   
        return postUnauthRequest(`${_URL}/register`, payload);
    }

    /**
     * @description Update user profile a user.
     * @param {{ password : string}} payload 
     * @returns Promise
     */
    updateUser(payload) {   
        return putRequest(`${_URL}/users`, payload);
    }

    /**
     * @description submit comment
     * @param {user, comment, date} payload 
     * @returns Promise
     */
    submitComment(payload) {   
        return postRequest(`${_URL_BASE}/comments`, payload);
    }

    /**
     * @description logout user.
     * @returns Promise
     */
    authLogout() {   
        return 
    }

    /**
     * @description api to get the status of user's profile
     */
    profileInfo() {
        // return postRequest(`${_URL}/profile`)
    }
}

export default new AuthClass();