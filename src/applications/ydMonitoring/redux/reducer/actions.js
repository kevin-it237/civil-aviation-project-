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
 * @description Get questionnaire and responses
 * @param {orgId: String} payload
 */
export const getOrgSPsAndResponses = (payload) => ({
    type: types.GET_SPS_AND_RESPONSES_REQUEST,
    payload
});

/**
 * @description Get organisations
 */
export const getOrganisations = () => ({
    type: types.GET_ORGANISATIONS_REQUEST
});

/**
 * @description Save a response
 * @param {array[Object]} payload Object{YDMS_SP_id: String, YDMS_Org_id, response: Boolean, weight?: Float}
 */
export const saveResponse = (payload) => ({
    type: types.SAVE_RESPONSE_REQUEST,
    payload
});

/**
 * @description set success to false
 */
export const resetResponseStatus = () => ({
    type: types.RESTORE_RESPONSE_STATUS
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

/**
 * @description Select organisation
 */
export const setCurrentSection = (payload) => ({
    type: types.SET_CURRENT_SECTION,
    payload
});

/**
 * @description get provision
 */
export const getProvision = (payload) => ({
    type: types.GET_PROVISION_REQUEST,
    payload
});
