import { types } from "./types";

/**
 * @description Get states
 */
export const getStates = () => ({
    type: types.GET_STATES_REQUEST
});


/**
 * @description Get states
 */
export const getKPIsData = (payload) => ({
    type: types.GET_KPI_DATA_REQUEST,
    payload
});

/**
 * @description Get kpis
 */
export const getKPIs = (payload) => ({
    type: types.GET_KPIS_REQUEST,
    payload
});
