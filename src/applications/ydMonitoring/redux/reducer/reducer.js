import { types } from "./types";

/**
 * @param {array} states
 * @param {array} kpisData
 * @param {array} kpis
 * @param {boolean} loader
 */
const INITIAL_STATE = {
    states: [], 
    kpisData: [], 
    kpis: [], 
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

        case types.GET_STATES_SUCCESS:console.log(action.payload)
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
            return {
                ...state,
                kpis: action.payload,
            };

        default:
            return state;
    }
}

export default YDMonitoringReducer;