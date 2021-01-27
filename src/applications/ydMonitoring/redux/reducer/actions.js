import { types } from "./types";

/**
 * @description Get states
 */
export const getStates = () => ({
    type: types.GET_STATES_REQUEST
});

/**
 * @description Get questionnaire
 */
export const getQuestionnaire = () => ({
    type: types.GET_QUESTIONNAIRE_REQUEST
});

/**
 * @description Get questionnaire
 * @param {orgId: String} payload
 */
export const getOrgResponses = (payload) => ({
    type: types.GET_ORG_RESPONSES_REQUEST,
    payload
});


/**
 * @description Select state
 */
export const selectState = (payload) => ({
    type: types.SET_STATE_REQUEST,
    payload
});

/**
 * @description Select organisation
 */
export const selectOrgType = (payload) => ({
    type: types.SET_ORG_REQUEST,
    payload
});
