import { types } from "./types";

/**
 * @description Get states
 */
export const getStates = () => ({
    type: types.GET_STATES_REQUEST
});

/**
 * @description Get kpis
 */
export const getKPIs = (payload) => ({
    type: types.GET_KPIS_REQUEST,
    payload
});

/**
 * @description Select kpi
 */
export const selectKPI = (payload) => ({
    type: types.SET_KPI_REQUEST,
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
