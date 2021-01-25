import { types } from "./types";

/**
 * @param {array} states
 * @param {array} kpisData
 * @param {array} kpis
 * @param {object} loader
 * @param {object} kpi
 * @param {object} selectedState
 * @param {object} selectedOrg
 */
const INITIAL_STATE = {
    states: [], 
    kpisData: [], 
    kpis: [], 
    kpi: null, 
    selectedState: null, 
    selectedOrg: "state", 
    loader: {
        actions: []
    },
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
            };

        case types.GET_KPI_DATA_SUCCESS:
            return {
                ...state,
                kpisData: action.payload,
            };

        case types.GET_KPIS_SUCCESS:
            let allKPIs = action.payload.map(kpi => {
                const id = kpi.YDMS_KPIs_id.split('_')[1]
                kpi.id = parseInt(id)
                return kpi
            })
            allKPIs.sort((a, b) => (a.id - b.id))
            return {
                ...state,
                kpis: allKPIs,
            };

        case types.SET_KPI_REQUEST:
            return {
                ...state,
                kpi: action.payload,
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
            };

        default:
            return state;
    }
}

export default YDMonitoringReducer;