import { types } from "./types";

/**
 * @description Get states
 */
export const getStates = () => ({
    type: types.GET_STATES_REQUEST
});


/**
 * @description Get states
 * @param {{kpiId: string}} payload
 */
export const getKPIsData = (payload) => ({
    type: types.GET_KPI_DATA_REQUEST,
    payload
});

/**
 * @description Get kpi data summary
 * @param {{orgType: string}} payload
 */
export const getKPIsDataSummary = (payload) => ({
    type: types.GET_KPI_DATA_SUMMARY_REQUEST,
    payload
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
 * @description Select kpi
 */
export const selectState = (payload) => ({
    type: types.SET_STATE_REQUEST,
    payload
});

/**
 * @description Select organisation
 */
export const selectOrg = (payload) => ({
    type: types.SET_ORG_REQUEST,
    payload
});
