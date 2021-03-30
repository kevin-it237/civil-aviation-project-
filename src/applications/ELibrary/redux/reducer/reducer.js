import { types } from "./types";

/**
 * @param {array} states
 * @param {array} questions
 * @param {array} orgResponses
 * @param {array} kpis
 * @param {object} loader
 * @param {object} kpi
 * @param {object} selectedState
 * @param {object} selectedOrg
 */
const INITIAL_STATE = {
    definitions: [],
    instruments: [],
    article: null,
    loader: {
        actions: []
    },
    error: null,
}

const ELibraryReducer = (state = INITIAL_STATE, action) => {
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

        case types.GET_DEFINITIONS_SUCCESS:
            return {
                ...state,
                definitions: action.payload
            };

        case types.GET_ARTICLE_PROVISIONS_SUCCESS:
            return {
                ...state,
                article: action.payload
            };

        case types.GET_INSTRUMENTS_SUCCESS:
            return {
                ...state,
                instruments: action.payload
            };

        default:
            return state;
    }
}

export default ELibraryReducer;