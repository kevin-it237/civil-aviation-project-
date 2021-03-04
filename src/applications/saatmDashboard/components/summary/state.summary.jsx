import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {getKPIsDataSummary, getStates, selectState} from '../../redux/reducer/actions'
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
console.log(kpisSummaryData);
    const dispatch = useDispatch()
    const [selectedState, setSelectedState] = useState(null)
    const [SUMMARY_DATAS, setSUMMARY_DATAS] = useState([])

    useEffect(() => {
        if(!states.length) {
            dispatch(getStates())
        }
    }, [])

    useEffect(() => {
        dispatch(getKPIsDataSummary(selectedOrg))
    }, [])

    useEffect(() => {
        if(Object.keys(kpisSummaryData).length) {
            generateSAATMDatas()
        }
    }, [kpisSummaryData])

    useEffect(() => {
        if(SUMMARY_DATAS.length) {
            setSelectedState(SUMMARY_DATAS[0])
        }
    }, [SUMMARY_DATAS])

    const refresh = () => {
        dispatch(getKPIsDataSummary(selectedOrg))
    }

    /**
     *@description Generates SAATM countries id
     * @returns {Array}
     */
    const generateSAATMDatas = () => {
        const saatmStates = states.filter(state => state.SAATM_membership == 1).map(state => state.YDMS_AU_id)
        const data = kpisSummaryData.filter(data => saatmStates.includes(data.YDMS_Org_id))
        setSUMMARY_DATAS(data)
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
                <TabPane tab="SUMMARY BY STATES/ KPIs" key="2">
                    <div className="states-performances">
                        <div className="states-listing">
                            {SUMMARY_DATAS.length&&
                                SUMMARY_DATAS.map(data => {
                                    return <p 
                                    onClick={() => setSelectedState(data)} 
                                    className={`${selectedState?.YDMS_Org_id === data.YDMS_Org_id ? 'selected':''}`}
                                    key={data.YDMS_Org_id}>{data.short_name}</p>
                                })
                            }
                        </div>
                        <div className="summary-table">
                            {selectedState&&
                            <StateSummaryItem data={selectedState} totalStates={SUMMARY_DATAS.length} />}
                            
                            {/* {
                                SUMMARY_DATAS.map(data => {
                                    return <StateSummaryItem key={data.YDMS_Org_id} data={data} totalStates={SUMMARY_DATAS.length} />
                                })
                            } */}
                        </div>
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

