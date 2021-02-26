import React, {useEffect} from 'react'
import {connect, useDispatch} from 'react-redux'
import {getKPIsDataSummary, getStates} from '../../redux/reducer/actions'
import {types} from '../../redux/reducer/types'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import StateSummaryItem from './state.summary.item'
import StateGlobalSummary from './state.global.summary';
import { Tabs } from 'antd';
import Loader from '../../../../app/components/loader/loader'
import Empty from '../../../../app/components/empty/empty'
import './kpi.summary.scss'
const { TabPane } = Tabs;

/**
 * @description content
 */

const StateKPISummary = ({loading, kpis, kpisSummaryData, selectedOrg, states, loadingStates}) => {

    const dispatch = useDispatch()
    

    useEffect(() => {
        if(!states.length) {
            dispatch(getStates())
        }
    }, [])

    useEffect(() => {
        dispatch(getKPIsDataSummary(selectedOrg))
    }, [])

    const refresh = () => {
        dispatch(getKPIsDataSummary(selectedOrg))
    }

    /**
     *@description Generates SAATM countries id
     * @returns {Array}
     */
    const generateSAATMDatas = () => {
        const saatmStates = states.filter(state => state.SAATM_membership == 1).map(state => state.YDMS_AU_id)
        return kpisSummaryData.filter(data => saatmStates.includes(data.YDMS_Org_id))
    }

    if(loading || loadingStates) {
        return <Loader />
    }

    if(kpisSummaryData.length === 0 && !loading) {
        return (
            <div style={{height: '80%'}}>
                <Empty fetch={refresh} />
            </div>
        )
    }

    const SUMMARY_DATAS = generateSAATMDatas()
    
    return (
        <div className="kpisSummary-content">
            <div className="state-summary-header">
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="GLOBAL SUMMARY" key="1">
                    <StateGlobalSummary 
                        states={states}
                        SUMMARY_DATAS={SUMMARY_DATAS} 
                        totalStates={SUMMARY_DATAS.length} />
                </TabPane>
                <TabPane tab="SUMMARY BY STATES" key="2">
                    <div className="summary-table">
                        {
                            SUMMARY_DATAS.map(data => {
                                return <StateSummaryItem key={data.YDMS_Org_id} data={data} totalStates={SUMMARY_DATAS.length} />
                            })
                        }
                    </div>
                </TabPane>
            </Tabs>
            </div>
        </div>
    )
}

const mapStateToProps = ({ SAATMDashboardReducer }) => ({
    kpis: SAATMDashboardReducer.kpis,
    kpisSummaryData: SAATMDashboardReducer.kpisSummaryData,
    loading: checkIfLoader(SAATMDashboardReducer, types.GET_KPI_DATA_SUMMARY_REQUEST),
    loadingStates: checkIfLoader(SAATMDashboardReducer, types.GET_STATES_REQUEST),
    selectedOrg: SAATMDashboardReducer.selectedOrg,
    states: SAATMDashboardReducer.states,
})

export default connect(mapStateToProps)(StateKPISummary);

