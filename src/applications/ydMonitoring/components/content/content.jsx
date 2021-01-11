import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getStates} from '../../redux/reducer/actions'
import {types} from '../../redux/reducer/types'
import './content.scss'

const Highcharts = require('highcharts/highmaps');  
require('highcharts/modules/exporting')(Highcharts);  
const map = require('@highcharts/map-collection/custom/africa.geo.json');


var data = [
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

const Content = ({}) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
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
                minColor: '#ffffff',
                maxColor: '#005645'
            },
            series: [{
                data: data,
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
    }, [])

    useEffect(() => {
        Highcharts.chart('div-for-chart', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Fruit Consumption'
            },
            xAxis: {
                categories: ['Apples', 'Bananas', 'Oranges']
            },
            yAxis: {
                title: {
                    text: 'Fruit eaten'
                }
            },
            series: [{
                name: 'Jane',
                data: [1, 0, 4]
            }, {
                name: 'John',
                data: [5, 7, 3]
            }]
        });
    }, [])



    return (
        <div className="yd-content">
            <div className="section africa-chart">
                <div id="africa-map" className="africa-map"></div>
            </div>
            <div className="section charts">
                <div id="div-for-chart" className="div-for-chart"></div>
            </div>
            <div className="section raw-datas">

            </div>
        </div>
    )
}



const mapStateToProps = ({ AuthReducer, YDMonitoringReducer}) => ({
    user: AuthReducer.user,
})

export default connect(mapStateToProps)(Content);

