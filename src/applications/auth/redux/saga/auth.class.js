import { postRequest } from "../../../../helpers/api";

var _URL = `${process.env.REACT_APP_API_URL}/auth`;

/**
 * @description Authentication API calls. 
 */
class AuthClass {

    /**
     * @description sign in user.
     * @param {object} payload 
     * @returns Promise
     */
    authSignIn({email, password}) {   
        // return Auth.signIn(email, password);
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