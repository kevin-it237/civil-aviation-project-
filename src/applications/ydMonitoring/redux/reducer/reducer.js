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
    states: [], 
    questions: [], 
    orgResponses: [], 
    kpis: [], 
    kpi: null, 
    selectedState: null, 
    currentSection: null,  // questionnaire sections
    selectedOrg: "", 
    organisations: [],
    loader: {
        actions: []
    },
    error: null,
    success: false,
}

const YDMonitoringReducer = (state = INITIAL_STATE, action) => {
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

        case types.GET_STATES_SUCCESS:
            return {
                ...state,
                states: action.payload,
                error: null
            };

        case types.GET_QUESTIONNAIRE_SUCCESS:
            return {
                ...state,
                questions: action.payload,
                error: null
            };

        case types.GET_ORG_RESPONSES_SUCCESS:
            return {
                ...state,
                orgResponses: action.payload,
                error: null
            };

        case types.SAVE_RESPONSE_SUCCESS:
            return {
                ...state,
                success: true,
                error: null
            };

        case types.SAVE_RESPONSE_FAILURE:
            return {
                ...state,
                error: action.payload,
                success: false,
            };

        case types.GET_ORGANISATIONS_SUCCESS:
            return {
                ...state,
                organisations: action.payload,
                error: null
            };

        case types.GET_ORG_RESPONSES_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        case types.RESTORE_RESPONSE_STATUS:
            return {
                ...state,
                success: false,
            };

        case types.SET_STATE_REQUEST:
            return {
                ...state,
                selectedState: action.payload,
            };

        case types.SET_ORG_REQUEST:
            return {
                ...state,
                selectedOrg: action.payload,
                selectedState: null
            };

        case types.SET_CURRENT_SECTION:
            return {
                ...state,
                currentSection: action.payload,
            };

        default:
            return state;
    }
}

export default YDMonitoringReducer;