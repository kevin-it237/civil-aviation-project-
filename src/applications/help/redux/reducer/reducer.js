import { types } from "./types";
import {PAGES} from '../../components/pages'

/**
 * @param {String} page
 */
const INITIAL_STATE = {
    page: PAGES.technologies
}

const HelpReducer = (state = INITIAL_STATE, action) => {
    
    switch (action.type) {

        case types.SELECT_PAGE:
            return {
                ...state,
                page: action.payload
            };

        default:
            return state;
    }
}

export default HelpReducer;