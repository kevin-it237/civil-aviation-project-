import React, {useEffect, useState} from 'react'
import { Tag, Button } from 'antd';

const Highcharts = require('highcharts/highmaps');  
require('highcharts/modules/exporting')(Highcharts);  
const map = require('@highcharts/map-collection/custom/africa.geo.json');

/**
 * @description Africa Chart
 */

const AfricaMap = ({mapData, dataClasses, generateDestinations, resetMap, kpiId}) => {

    const [state, setState] = useState("")

    useEffect(() => {
        if(mapData.length) {
           
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
                    maxColor: '#388e3c',
                    dataClasses: dataClasses
                },
                series: [{
                    data: mapData,
                    name: '',
                    states: {
                        hover: {
                            color: '#388e3c'
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
                            click: function(){
                                if(generateDestinations) {
                                    setState(this.name)
                                    generateDestinations(this.options['hc-key'])
                                }
                            }
                        }
                    }
                }]
            });
        }
    }, [mapData, dataClasses])

    const handleResetMap = () => {
        resetMap()
        setState("")
    }
    
    return (
        <>
            {state.length ? 
            <div className="map-header">
                <p>Selected state: <Tag color="#108ee9"><b>{state}</b></Tag></p>
                <Button size="small" onClick={handleResetMap}>Reset map</Button>
            </div>:
            kpiId==='kpi_4'?<p style={{fontSize: '13px', textAlign: 'center'}}>Click on a country to display his relationships with others.</p>:null}
            <div id="africa-map" className="africa-map"></div>
        </>
    )
}

export default AfricaMap

