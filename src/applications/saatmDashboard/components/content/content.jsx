import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getKPIsData, selectKPI, selectOrg} from '../../redux/reducer/actions'
import { Alert } from 'antd';
import Loader from '../../../../app/components/loader/loader'
import Empty from '../../../../app/components/empty/empty'
import {types} from '../../redux/reducer/types'
import './content.scss'

const Highcharts = require('highcharts/highmaps');  
require('highcharts/modules/exporting')(Highcharts);  
const map = require('@highcharts/map-collection/custom/africa.geo.json');

/**
 * @description content
 */

const Content = ({kpisData, states, loading, kpis, kpi, selectedOrg, loadingKPIs, loadingStates}) => {
    
    const dispatch = useDispatch()
    const [MAPDATA, setMAPDATA] = useState([])
    const [RAWDATA, setRAWDATA] = useState(["", "", "0"])

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

    useEffect(() => {
        if(kpisData.length && !loading && kpi && !loadingKPIs && !loadingStates) {
           
            Highcharts.mapChart('africa-map', {
                chart: {
                    map: map
                },
            
                title: {
                    text: ''
                },
            
                subtitle: {
                    text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/africa.js">Africa</a>'
                },
            
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
            
                colorAxis: {
                    min: 0,
                    minColor: '#eee',
                    maxColor: '#005645',
                    dataClasses: [{
                        from: 0,
                        to: 0.5,
                        color: '#eee',
                        name: 'No'
                    }, {
                        from: 0.5,
                        to: 1,
                        color: '#005645',
                        name: 'Yes'
                    }]
                },
                series: [{
                    data: MAPDATA,
                    name: '',
                    states: {
                        hover: {
                            color: '#a4edba'
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'normal',
                            fontSize: '9px',
                            fontFamily: 'sans-serif'
                        },
                        formatter: function () {
                            if (this.point.value) {
                                return this.point.name;
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '',
                        pointFormat: '{point.name}'
                    },
                    point: {
                        events: {
                          click(e) {
                            console.log("Code : ", this.key)
                          }
                        }
                    }
                }]
            });
        }
    }, [kpisData, loading, kpi, loadingKPIs, loadingStates])

    useEffect(() => {
        if(kpisData.length && !loading && kpi && !loadingKPIs && !loadingStates) {
            Highcharts.chart('div-for-chart', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: states.map(state => state.short_name),
                    title: {
                        text: ""
                    }
                },
                yAxis: {
                    title: {
                        text: 'weight'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    name: 'Yes',
                    data: kpisData[0].organisations.map(state => state.sp_response.questionnaire_response?100:0)
                }]
            });
        }
    }, [kpisData, loading, kpi, loadingKPIs, loadingStates])

    const generateMapData = () => {
        const orgs = kpisData[0].organisations

        const ORGS = orgs.map(org => {
            const state = states.find(st => st.YDMS_AU_id === org.YDMS_Org_id)
            if(state) {
                org.country_code = state.country_code.toLowerCase()
            }
            return org
        })

        const FINAL =  ORGS.map(org => {
            return [org.country_code, org.sp_response.questionnaire_response?1:0]
        })
        setMAPDATA(FINAL)
    }

    const generateRawData = () => {
        const orgs = kpisData[0].organisations
        let yes = 0;let no = 0;
        orgs.forEach(org => {
            if(!!org.sp_response.questionnaire_response) {
                yes +=1
            } else {
                no +=1
            }
        });
        setRAWDATA([yes, no, 0])
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
    
    return (
        <> 
            <div className="kpi-infos-box">
            <Alert message={`KPI text: ${kpi?.KPIs_text}`} type="success" />
            </div>
            <div className="yd-content">
                <div className="section africa-chart">
                    <div id="africa-map" className="africa-map"></div>
                </div>
                <div className="section charts">
                    <div id="div-for-chart" className="div-for-chart"></div>
                </div>
                <div className="section raw-datas">
                    <div className="raw raw--1">
                        <h2>Total Compliant</h2>
                        <h3>{RAWDATA[0]} <span> / {`${(RAWDATA[0]/states.length*100).toFixed(2)}%`}</span></h3>
                    </div>
                    <div className="raw raw--2">
                        <h2>Not Compliant</h2>
                        <h3>{RAWDATA[1]} <span>/ {`${(RAWDATA[1]/states.length*100).toFixed(2)}%`}</span></h3>
                    </div>
                </div>
            </div>
        </>
    )
}



const mapStateToProps = ({ YDMonitoringReducer}) => ({
    states: YDMonitoringReducer.states,
    kpis: YDMonitoringReducer.kpis,
    kpi: YDMonitoringReducer.kpi,
    kpisData: YDMonitoringReducer.kpisData,
    selectedOrg: YDMonitoringReducer.selectedOrg,
    loading: checkIfLoader(YDMonitoringReducer, types.GET_KPI_DATA_REQUEST),
    loadingKPIs: checkIfLoader(YDMonitoringReducer, types.GET_KPIS_REQUEST),
    loadingStates: checkIfLoader(YDMonitoringReducer, types.GET_STATES_REQUEST),
})

export default connect(mapStateToProps)(Content);

