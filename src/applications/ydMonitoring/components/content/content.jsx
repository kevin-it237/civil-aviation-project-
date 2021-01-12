import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getKPIsData, selectKPI} from '../../redux/reducer/actions'
import { Alert } from 'antd';
import Loader from '../../../../app/components/loader/loader'
import Empty from '../../../../app/components/empty/empty'
import {types} from '../../redux/reducer/types'
import './content.scss'

const Highcharts = require('highcharts/highmaps');  
require('highcharts/modules/exporting')(Highcharts);  
const map = require('@highcharts/map-collection/custom/africa.geo.json');


const data = [
    ['ug', 0],
    ['ng', 1],
    ['st', 2],
    ['tz', 3],
    ['sl', 4],
    ['gw', 5],
    ['cv', 6],
    ['sc', 7],
    ['tn', 8],
    ['mg', 9],
    ['ke', 10],
    ['cd', 11],
    ['fr', 12],
    ['mr', 13],
    ['dz', 14],
    ['er', 15],
    ['gq', 16],
    ['mu', 17],
    ['sn', 18],
    ['km', 19],
    ['et', 20],
    ['ci', 21],
    ['gh', 22],
    ['zm', 23],
    ['na', 24],
    ['rw', 25],
    ['sx', 26],
    ['so', 27],
    ['cm', 28],
    ['cg', 29],
    ['eh', 30],
    ['bj', 31],
    ['bf', 32],
    ['tg', 33],
    ['ne', 34],
    ['ly', 35],
    ['lr', 36],
    ['mw', 37],
    ['gm', 38],
    ['td', 39],
    ['ga', 40],
    ['dj', 41],
    ['bi', 42],
    ['ao', 43],
    ['gn', 44],
    ['zw', 45],
    ['za', 46],
    ['mz', 47],
    ['sz', 48],
    ['ml', 49],
    ['bw', 50],
    ['sd', 51],
    ['ma', 52],
    ['eg', 53],
    ['ls', 54],
    ['ss', 55],
    ['cf', 56]
];


/**
 * @description content
 */

const Content = ({kpisData, states, loading, kpis, kpi, selectedState}) => {
    
    const dispatch = useDispatch()
    const [MAPDATA, setMAPDATA] = useState([])
    const [RAWDATA, setRAWDATA] = useState(["", "", "0"])

    useEffect(() => {
        // Get the first kpi
        if(kpis.length) {
            dispatch(getKPIsData('kpi_0')) // get the initial kpi
            dispatch(selectKPI(kpis[0])) // init the first kpi
        }
    }, [kpis])

    useEffect(() => {
        // Get the first kpi
        if(kpisData.length) {
            generateMapData()
            generateRawData()
        }
    }, [kpisData])

    useEffect(() => {
        if(kpisData.length && !loading && kpi) {
           
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
                        format: '{point.name}'
                    }
                }]
            });
        }
    }, [kpisData, loading, kpi])

    useEffect(() => {
        if(kpisData.length && !loading && kpi) {
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
    }, [kpisData, loading, kpi])

    const generateMapData = () => {
        const orgs = kpisData[0].organisations

        const ORGS = orgs.map(org => {
            const state = states.find(st => st.short_name === org.short_name)
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

    if(loading) {
        return <Loader />
    }

    if(kpisData.length === 0 && !loading) {
        return <Empty />
    }
    
    return (
        <> 
            <div className="kpi-infos-box">
            <Alert message={`Survey Protocol: ${kpisData[0].questionnaire_text}`} type="warning" />
            <Alert message={`KPI: ${kpi?.KPIs_text}`} type="success" />
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
                        <h2>Total Accepted</h2>
                        <h3>{RAWDATA[0]}</h3>
                    </div>
                    <div className="raw raw--2">
                        <h2>Total not Accepted</h2>
                        <h3>{RAWDATA[1]}</h3>
                    </div>
                    <div className="raw raw--3">
                        <h2>Not Concerned</h2>
                        <h3>{RAWDATA[2]}</h3>
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
    selectedState: YDMonitoringReducer.selectedState,
    loading: checkIfLoader(YDMonitoringReducer, types.GET_KPI_DATA_REQUEST),
})

export default connect(mapStateToProps)(Content);

