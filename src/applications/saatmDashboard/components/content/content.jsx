import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getKPIsData, selectKPI, selectOrg} from '../../redux/reducer/actions'
import { Alert } from 'antd';
import Loader from '../../../../app/components/loader/loader'
import Empty from '../../../../app/components/empty/empty'
import AfricaMap from '../africaMap/africaMap'
import PieChart, {PIE_DATA} from '../../components/pieChart/pieChart'
import BarChart from '../../components/barChart/barChart'
import {types} from '../../redux/reducer/types'
import './content.scss'

const Highcharts = require('highcharts/highmaps');  
require('highcharts/modules/exporting')(Highcharts);  
const map = require('@highcharts/map-collection/custom/africa.geo.json');

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
            dispatch(getKPIsData(kpis[0].YDMS_KPIs_id)) // get the initial kpi
            dispatch(selectKPI(kpis[0])) // init the first kpi
        }
    }, [kpis])

    useEffect(() => {
        if(kpisData.length) {
            generateMapData()
            generateRawData()
        }
    }, [kpisData])

    // useEffect(() => {
    //     if(kpisData.length && !loading && kpi && !loadingKPIs && !loadingStates) {
           
    //         Highcharts.mapChart('africa-map', {
    //             chart: {
    //                 map: map
    //             },
            
    //             title: {
    //                 text: ''
    //             },
            
    //             subtitle: {
    //                 text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/africa.js">Africa</a>'
    //             },
            
    //             mapNavigation: {
    //                 enabled: true,
    //                 buttonOptions: {
    //                     verticalAlign: 'bottom'
    //                 }
    //             },
            
    //             colorAxis: {
    //                 min: 0,
    //                 minColor: '#eee',
    //                 maxColor: '#388e3c',
    //                 dataClasses: [{
    //                     from: 0,
    //                     to: 0.5,
    //                     color: '#eee',
    //                     name: 'No'
    //                 }, {
    //                     from: 0.5,
    //                     to: 1,
    //                     color: '#2e7d32',
    //                     name: 'Yes'
    //                 }]
    //             },
    //             series: [{
    //                 data: MAPDATA,
    //                 name: '',
    //                 states: {
    //                     hover: {
    //                         color: '#388e3c'
    //                     }
    //                 },
    //                 dataLabels: {
    //                     enabled: true,
    //                     style: {
    //                         fontWeight: 'normal',
    //                         fontSize: '9px',
    //                         fontFamily: 'sans-serif'
    //                     },
    //                     formatter: function () {
    //                         if (this.point.value) {
    //                             return this.point.name;
    //                         }
    //                     }
    //                 },
    //                 tooltip: {
    //                     headerFormat: '',
    //                     pointFormat: '{point.name}'
    //                 },
    //                 point: {
    //                     events: {
    //                       click(e) {
    //                         console.log("Code : ", this.key)
    //                       }
    //                     }
    //                 }
    //             }]
    //         });
    //     }
    // }, [kpisData, loading, kpi, loadingKPIs, loadingStates])


    const generateMapData = () => {
        const data = kpisData.map(kpi => {
            return [kpi.country_code.toLowerCase(), parseInt(kpi.weight)/parseInt(kpi.totalweight)*100]
        })
        setMAPDATA(data)
        if(kpi?.YDMS_KPIs_id === 'kpi_2') {
            setDATACLASSES([{
                from: 0,
                to: 50,
                color: '#ffa000',
                name: '0 to 50%'
            }, {
                from: 50,
                to: 75,
                color: '#fdd835',
                name: '50 to 75%'
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
                color: '#eee',
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

    if(loading || loadingKPIs || loadingStates) {
        return <Loader />
    }

    if(kpisData.length === 0 && !loading) {
        return (
            <div style={{height: '80%', margin: '0 20px'}}>
                <Alert message={`KPI text: ${kpi?.KPIs_text}`} type="success" />
                <Empty />
            </div>
        )
    }

    let BARDATA = []
    if(kpi?.YDMS_KPIs_id === 'kpi_2') {
        BARDATA =  kpisData.map(kpi => {
            return {
                "country": kpi.short_name,
                "weight": parseInt(kpi.weight)/parseInt(kpi.totalweight)*100,
                "weightColor": "hsl(254, 70%, 50%)",
                // "totalWeight": parseInt(kpi.response)/parseInt(kpi.totalResponses)*100,
                "totalWeightColor": "hsl(24, 70%, 50%)",
            }
        })
    }
    
    return (
        <> 
            <div className="kpi-infos-box">
            <Alert message={`KPI text: ${kpi?.KPIs_text}`} type="success" />
            </div>
            <div className="yd-content">
                <div className="section africa-chart">
                    <AfricaMap mapData={MAPDATA} dataClasses={DATACLASSES} />
                </div>
                <div className="section charts">
                    <div id="div-for-piechart" className="div-for-piechart">
                    {kpi.YDMS_KPIs_id!=='kpi_2' ? <PieChart data={PIECHART_DATA} />: <BarChart data={BARDATA} keys={kpisData.map(state => state.short_name)} />}
                    </div>
                </div>
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

export default connect(mapStateToProps)(Content);

