import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getKPIsData, selectKPI, getKPIs} from '../../redux/reducer/actions'
import { Alert } from 'antd';
import Loader from '../../../../app/components/loader/loader'
import Empty from '../../../../app/components/empty/empty'
import {types} from '../../redux/reducer/types'
import './questionnaire.scss'

/**
 * @description content
 */

const Questionnaire = ({kpisData, loading, kpis, kpi, selectedOrg, loadingKPIs, loadingStates}) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        // Get the first kpi
        if(kpis.length) {
            dispatch(getKPIsData(kpis[0].YDMS_KPIs_id)) // get the initial kpi
            dispatch(selectKPI(kpis[0])) // init the first kpi
        }
    }, [kpis])

    const refresh= () => {
        if(kpi) {
            dispatch(getKPIsData(kpi.YDMS_KPIs_id))
        } else {
            dispatch(getKPIs('state'))
        }
    }

    if(loading || loadingKPIs) {
        return <Loader />
    }

    if(kpisData.length === 0 && !loading) {
        return (
            <div style={{height: '80%', margin: '0 20px'}}>
                <Alert message={`KPI text: ${kpi?.KPIs_text}`} type="success" />
                <Empty fetch={refresh} />
            </div>
        )
    }
    
    return (
        <> 
            <div className="kpi-infos-box">
            <Alert message={`KPI text: ${kpi?.KPIs_text}`} type="success" />
            </div>
            <div className="yd-content">
               
            </div>
        </>
    )
}



const mapStateToProps = ({ YDMonitoringReducer}) => ({
    kpis: YDMonitoringReducer.kpis,
    kpi: YDMonitoringReducer.kpi,
    kpisData: YDMonitoringReducer.kpisData,
    selectedOrg: YDMonitoringReducer.selectedOrg,
    loading: checkIfLoader(YDMonitoringReducer, types.GET_KPI_DATA_REQUEST),
    loadingKPIs: checkIfLoader(YDMonitoringReducer, types.GET_KPIS_REQUEST),
    loadingStates: checkIfLoader(YDMonitoringReducer, types.GET_STATES_REQUEST),
})

export default connect(mapStateToProps)(Questionnaire);

