import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getKPIsData, selectKPI, getKPIs} from '../../redux/reducer/actions'
import { Alert } from 'antd';
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

const Content = ({kpisData, loading, kpis, kpi, selectedOrg, loadingKPIs, loadingStates}) => {
    
    const dispatch = useDispatch()
    const [MAPDATA, setMAPDATA] = useState([])
    const [RAWDATA, setRAWDATA] = useState(["", "", "0"])
    const [PIECHART_DATA, setPIECHARTDATA] = useState(PIE_DATA)

    const [DATACLASSES, setDATACLASSES] = useState([]) // Map coloration

    useEffect(() => {
        // Get the first kpi
        if(kpis.length) {
            dispatch(getKPIsData({kpiId: "all", orgType: selectedOrg})) // get the initial kpi
            dispatch(selectKPI({
                KPIs_label: "Summary",
                KPIs_org_type: "state",
                KPIs_text: "Summary",
                YDMS_KPIs_id: "all",
                id: 0   
            })) // init the first kpi
        }
    }, [kpis])

    useEffect(() => {
        if(kpisData.length) {
            generateMapData()
            generateRawData()
        }
    }, [kpisData])

    const generateMapData = () => {
        let data = []

        if(kpi?.YDMS_KPIs_id === 'kpi_12') { // The kpi_12 use the custom_weight attribute
            data = kpisData.map(kpi => {
                return [kpi.country_code.toLowerCase(), parseInt(kpi.custom_weight)]
            })      
        } else {
            data = kpisData.map(kpi => {
                return [kpi.country_code.toLowerCase(), parseInt(kpi.weight)/parseInt(kpi.totalweight)*100]
            })
        }
        setMAPDATA(data)
        
        if(kpi?.YDMS_KPIs_id === 'kpi_2' || kpi?.YDMS_KPIs_id === 'kpi_12') {
            setDATACLASSES([{
                from: 0,
                to: 59,
                color: 'red',
                name: '0 to 60%'
            }, {
                from: 60,
                to: 74,
                color: '#fdd835',
                name: '60 to 75%'
            }, {
                from: 75,
                to: 100,
                color: '#2e7d32',
                name: '75 to 100%'
            }])
        } else {
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
    }

    const generateRawData = () => {
        let yes = 0;let no = 0;
        kpisData.forEach(kpi => {
            if(!!parseInt(kpi.weight)) {
                yes +=1
            } else {
                no +=1
            }
        });
        setRAWDATA([yes, no])
        PIE_DATA[0].value = yes
        PIE_DATA[1].value = no
        setPIECHARTDATA(PIE_DATA)
    }

    const refresh= () => {
        if(kpi) {
            dispatch(getKPIsData({kpiId: kpi?.YDMS_KPIs_id, orgType: selectedOrg}))
        } else {
            dispatch(getKPIs('state'))
        }
    }

    if(loading || loadingKPIs) {
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
    if(kpi) {
        if(kpi.YDMS_KPIs_id === 'kpi_2') {
            BARDATA =  kpisData.map(kpi => {
                return {
                    "country": kpi.short_name,
                    "Total weighted percentage score": parseFloat((parseInt(kpi.weight)/parseInt(kpi.totalweight)*100).toFixed(1)),
                    "Total weighted percentage scoreColor": "#000000",
                    "Percentage of indicators reported": parseFloat((parseInt(kpi.response)/kpi.totalSP*100).toFixed(1)),
                    "Percentage of indicators reportedColor": "hsl(210, 96%, 40%)",
                }
            })
            keys = ["Total weighted percentage score", "Percentage of indicators reported"]
        } else if(kpi.YDMS_KPIs_id === 'kpi_12') {
            BARDATA = kpisData.filter(kpi => kpi.response == 1).map(kpi => {
                return {
                    "country": kpi.short_name,
                    "Total weighted percentage score": parseFloat((parseFloat(kpi.custom_weight)).toFixed(1)),
                    "Total weighted percentage scoreColor": "hsl(210, 96%, 40%)",
                }
            })
            keys = ["Total weighted percentage score"]
        }
    }
    
    return (
        <> 
            <div className="kpi-infos-box">
                <Alert message={`${kpi?.KPIs_text}`} type="success" />
            </div>
            <div className="saatm-content">
                <div className="section africa-chart">
                    <AfricaMap mapData={MAPDATA} dataClasses={DATACLASSES} />
                </div>
                <div className="section charts">
                    {(kpi.YDMS_KPIs_id!=='kpi_2'&&kpi.YDMS_KPIs_id!=='kpi_12') ? 
                    <div id="div-for-piechart" className="div-for-piechart">
                        <PieChart data={PIECHART_DATA} />
                    </div>:
                    <div id="div-for-barchart" className="div-for-barchart">
                        <BarChart data={BARDATA} keys={keys} legend={true} />
                    </div>}
                </div>
                {
                    (kpi?.YDMS_KPIs_id!=='kpi_2' && kpi?.YDMS_KPIs_id!=='kpi_12')&&
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
    loading: checkIfLoader(SAATMDashboardReducer, types.GET_KPI_DATA_REQUEST),
    loadingKPIs: checkIfLoader(SAATMDashboardReducer, types.GET_KPIS_REQUEST),
    loadingStates: checkIfLoader(SAATMDashboardReducer, types.GET_STATES_REQUEST),
})

export default connect(mapStateToProps)(Content);

