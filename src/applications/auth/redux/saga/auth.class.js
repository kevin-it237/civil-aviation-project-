import { postRequest } from "../../../../helpers/api";

var _URL = `${process.env.REACT_APP_API_URL}/auth`;

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
        return postRequest(`${_URL}/signin`, payload);
    }

    /**
     * @description Register a user.
     * @param {username, email, password} payload 
     * @returns Promise
     */
    authRegister(payload) {   
        return postRequest(`${_URL}/register`, payload);
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