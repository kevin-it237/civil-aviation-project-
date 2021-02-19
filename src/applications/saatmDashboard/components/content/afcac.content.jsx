import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getKPIsData, selectKPI, getKPIs, getStates} from '../../redux/reducer/actions'
import { Alert } from 'antd';
import Loader from '../../../../app/components/loader/loader'
import Empty from '../../../../app/components/empty/empty'
import AfricaMap from '../africaMap/africaMap'
import PieChart, {PIE_DATA} from '../pieChart/pieChart'
import BarChart from '../barChart/barChart'
import AFACSummary from '../summary/afcac.summary'
import {types} from '../../redux/reducer/types'
import './content.scss'

/**
 * @description content
 */

const Content = ({kpisData, states, loading, kpis, kpi, selectedOrg, loadingKPIs, loadingStates}) => {
    
    const dispatch = useDispatch()
    const [MAPDATA, setMAPDATA] = useState([])
    const [RAWDATA, setRAWDATA] = useState(["", "", "0"])
    const [PIECHART_DATA, setPIECHARTDATA] = useState(PIE_DATA)

    const [DATACLASSES, setDATACLASSES] = useState([]) // Map coloration

    useEffect(() => {
        dispatch(getStates())
    }, [])

    useEffect(() => {
        // Get the first kpi
        if(kpis.length) {
            dispatch(getKPIsData({kpiId: "all", orgType: selectedOrg})) // get the initial kpi
            dispatch(selectKPI(
                {
                    KPIs_label: "Summary",
                    KPIs_org_type: "state",
                    KPIs_text: "Summary",
                    YDMS_KPIs_id: "all",
                    id: 0   
                }
            )) // init the first kpi
        }
    }, [kpis])

    useEffect(() => {
        if(kpisData.length) {
            if(['kpi_22', 'kpi_23', 'kpi_24'].includes(kpi.YDMS_KPIs_id)) {
                generateMapData()
            } else {
                setMAPDATA([])
            }
            generateRawData()
        }
    }, [kpisData])

    const generateMapData = () => {
        // Process data
        // Match datas with states
        const statesList = states.filter(state => state.SAATM_membership)
        let data = kpisData.map(data => {
            const condition1 = (data, state) => new RegExp("\\b" + state.full_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase())
            const condition2 =  (data, state) =>  new RegExp("\\b" +state.full_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase()) || 
            new RegExp("\\b" + state.short_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase())
            
            let state = statesList.find(state => {
                const stateShortName = state.short_name
                if(stateShortName === 'Congo') {
                    return condition1(data, state)
                } else if (stateShortName === 'Guinea') {
                    
                } else {
                    return condition2(data, state)
                }
            })

            if(state) {
                data = {...data, ...state}
                return data
            }
        })

        data = data.filter(el => el != undefined).map(kpi => {
            return [kpi.country_code.toLowerCase(), kpi.questionnaire_response*100]
        })
        
        setMAPDATA(data)
        
        setDATACLASSES([{
            from: 0,
            to: 50,
            color: '#aaa',
            name: 'No'
        }, {
            from: 50,
            to: 100,
            color: '#2e7d32',
            name: 'Yes'
        }])
    }

    const generateRawData = () => {
        let yes = 0;let no = 0;
        kpisData.forEach(kpi => {
            if(!!parseInt(kpi.questionnaire_response)) {
                yes +=1
            } else {
                no +=1
            }
        });
        setRAWDATA([yes, no])
        PIE_DATA[0].value = yes
        PIE_DATA[0].label = "Implemented measures"
        PIE_DATA[1].value = no
        PIE_DATA[1].label = "Not Implemented"
        setPIECHARTDATA(PIE_DATA)
    }

    const refresh= () => {
        if(kpi) {
            dispatch(getKPIsData({kpiId: kpis[0].YDMS_KPIs_id, orgType: selectedOrg}))
        } else {
            dispatch(getKPIs('afcac'))
        }
    }

    if(loading || loadingKPIs || loadingStates) {
        return <Loader />
    }

    if(kpi?.YDMS_KPIs_id === "all") {
        if(selectedOrg === "afcac") {
            return <AFACSummary />
        }
    }

    if(kpisData.length === 0 && !loading) {
        return (
            <div style={{height: '80%'}}>
                {
                    kpi?.YDMS_KPIs_id!=="all"&&
                    <div className="kpi-infos-box">
                        <Alert message={`${kpi?.KPIs_text}`} type="success" />
                    </div>
                }
                <Empty fetch={refresh} />
            </div>
        )
    }

    let BARDATA = []
    let keys = []
    let PROGRESS = 0
    let TOTAL_INDICATORS = 0
    if(kpi) {
        let weight = 0;
        kpisData.forEach(data => {
            if(!!parseInt(data.questionnaire_response)) {
                weight +=1
            }
            TOTAL_INDICATORS++
        });

        PROGRESS = (weight/TOTAL_INDICATORS)*100
        keys = ["Percentage implementation", "Non Implemented"]

        let color = '#43a047'
        if(PROGRESS < 50) {
            color = '#f44336'
        } else if(PROGRESS < 75) {
            color = '#fdd835'
        }

        BARDATA = [{
            "country": `Percentage`,
            "Percentage implementation": PROGRESS,
            "Percentage implementationColor": color,
            "Non Implemented": (TOTAL_INDICATORS-weight)/TOTAL_INDICATORS*100,
            "Non ImplementedColor": "#eee",
        }]
    }

    return (
        <> 
            {
                kpi?.YDMS_KPIs_id!=="all"&&
                <div className="kpi-infos-box">
                    <Alert message={`${kpi?.KPIs_text}`} type="success" />
                </div>
            }
            <div className="saatm-content saatm-content-ea">
                {MAPDATA.length>0&&
                <div className="section africa-chart">
                    <AfricaMap mapData={MAPDATA} dataClasses={DATACLASSES} />
                </div>}
                {
                    ['kpi_30', 'kpi_33', 'kpi_34', 'kpi_35'].includes(kpi.YDMS_KPIs_id)&&
                    <div className="section bar-lines">
                        {BARDATA.length>0&&<div className="bar-wrapper">
                            <BarChart groupMode={"stacked"} data={BARDATA} keys={keys} legend={true} />
                        </div>}
                    </div>
                }
                <div className="section charts">
                    <div id="div-for-piechart" className="div-for-piechart">
                        <PieChart data={PIECHART_DATA} />
                    </div>
                </div>
                
                {
                    !['kpi_30', 'kpi_33', 'kpi_34', 'kpi_35'].includes(kpi.YDMS_KPIs_id)&&
                    <div className="section stacked-bar">
                        {BARDATA.length>0&&
                        <div className="stacked-bar-wrapper">
                            <BarChart groupMode={"stacked"} data={BARDATA} keys={keys} legend={true} />
                        </div>}
                    </div>
                }
            </div>
        </>
    )
}



const mapStateToProps = ({ SAATMDashboardReducer}) => ({
    kpis: SAATMDashboardReducer.kpis,
    kpi: SAATMDashboardReducer.kpi,
    kpisData: SAATMDashboardReducer.kpisData,
    selectedOrg: SAATMDashboardReducer.selectedOrg,
    states: SAATMDashboardReducer.states,
    loading: checkIfLoader(SAATMDashboardReducer, types.GET_KPI_DATA_REQUEST),
    loadingKPIs: checkIfLoader(SAATMDashboardReducer, types.GET_KPIS_REQUEST),
    loadingStates: checkIfLoader(SAATMDashboardReducer, types.GET_STATES_REQUEST),
})

export default connect(mapStateToProps)(Content);

