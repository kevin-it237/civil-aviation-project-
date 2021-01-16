import React, {useEffect} from 'react'

const Highcharts = require('highcharts/highmaps');  
require('highcharts/modules/exporting')(Highcharts);  
const map = require('@highcharts/map-collection/custom/africa.geo.json');

/**
 * @description Africa Chart
 */

const AfricaMap = ({mapData, dataClasses}) => {

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
                          click(e) {
                            console.log("Code : ", this.key)
                          }
                        }
                    }
                }]
            });
        }
    }, [mapData, dataClasses])
    
    return (
        <div id="africa-map" className="africa-map"></div>
    )
}

export default AfricaMap

