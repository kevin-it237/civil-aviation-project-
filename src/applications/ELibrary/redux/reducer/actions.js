import { types } from "./types";

/**
 * @description Definitions
 */
export const getDefinitions = () => ({
    type: types.GET_DEFINITIONS_REQUEST
});

/**
 * @description Get Instruments datas
 */
export const getInstruments = () => ({
    type: types.GET_INSTRUMENTS_REQUEST
});

/**
 * @description Get provisions for article
 * @param {articleId: String} payload
 */
export const getOrgResponses = (payload) => ({
    type: types.GET_ARTICLE_PROVISIONS_REQUEST,
    payload
});
