import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getKPIsData, selectKPI, getKPIs, getStates} from '../../redux/reducer/actions'
import { Alert, Progress, Tooltip } from 'antd';
import Loader from '../../../../app/components/loader/loader'
import Empty from '../../../../app/components/empty/empty'
import AfricaMap from '../africaMap/africaMap'
import PieChart, {PIE_DATA} from '../pieChart/pieChart'
import BarChart from '../barChart/barChart'
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
            dispatch(getKPIsData({kpiId: kpis[0].YDMS_KPIs_id, orgType: selectedOrg})) // get the initial kpi
            dispatch(selectKPI(kpis[0])) // init the first kpi
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
            const condition = (state) => data.questionnaire_text.includes(state.short_name) || data.questionnaire_text.includes(state.full_name)
            const state = statesList.find(state => condition(state))
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

    if(kpisData.length === 0 && !loading) {
        return (
            <div style={{height: '80%'}}>
                <div className="kpi-infos-box">
                    <Alert message={`${kpi?.KPIs_text}`} type="success" />
                </div>
                <Empty fetch={refresh} />
            </div>
        )
    }

    let BARDATA = []
    let keys = []
    let PROGRESS = 0
    if(kpi) {
        if(['kpi_30', 'kpi_33', 'kpi_34', 'kpi_35'].includes(kpi.YDMS_KPIs_id)) {

            let weight = 0; let total = 0;
            kpisData.forEach(data => {
                if(!!parseInt(data.questionnaire_response)) {
                    weight +=1
                }
                total++
            });
            PROGRESS = (weight/total)*100

            BARDATA =  kpisData.map((data, i) => {
                return {
                    "country": `Indicator ${i+1}`,
                    "Percentage of implementation": data.questionnaire_response*100,
                    "Percentage of implementationColor": "hsl(210, 96%, 40%)",
                }
            })
            keys = ["Percentage of implementation"]
        }
    }

    return (
        <> 
            <div className="kpi-infos-box">
                <Alert message={`${kpi?.KPIs_text}`} type="success" />
            </div>
            <div className="yd-content">
                <div className="section africa-chart">
                    {MAPDATA.length>0&&<AfricaMap mapData={MAPDATA} dataClasses={DATACLASSES} />}
                    {BARDATA.length>0&&<BarChart data={BARDATA} keys={keys} />}
                    {/* {BARDATA.length>0&&
                    <Tooltip title="Percentage of implementation">
                        <Progress type="circle" percent={PROGRESS} />
                    </Tooltip>} */}
                </div>
                <div className="section charts">
                    <div id="div-for-piechart" className="div-for-piechart">
                        <PieChart data={PIECHART_DATA} />
                    </div>
                </div>
                
                {
                    !['kpi_30', 'kpi_33', 'kpi_34', 'kpi_35'].includes(kpi.YDMS_KPIs_id)&&
                    <div className="section raw-datas">
                        <div className="raw raw--1">
                            <h2>Total Compliant</h2>
                            <h3>{RAWDATA[0]} <span> / {`${(RAWDATA[0]/kpisData.length*100).toFixed(2)}%`}</span></h3>
                        </div>
                        <div className="raw raw--2">
                            <h2>Not Compliant</h2>
                            <h3>{RAWDATA[1]} <span>/ {`${(RAWDATA[1]/kpisData.length*100).toFixed(2)}%`}</span></h3>
                        </div>
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

