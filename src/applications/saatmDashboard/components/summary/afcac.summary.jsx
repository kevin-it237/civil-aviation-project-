import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { Typography  } from 'antd';
import BarChart from '../barChart/barChart'
import './kpi.summary.scss'
const { Title } = Typography;

/**
 * @description content
 */

const AfcacKPISummary = ({kpis, kpisData=[]}) => {

    let BARDATA = []
    let keys = []
    let PROGRESS = 0
    let TOTAL_INDICATORS = 0
        
    let weight = 0;
    kpisData.forEach(data => {
        if(!!parseInt(data.questionnaire_response)) {
            weight +=1
        }
        TOTAL_INDICATORS++
    });

    PROGRESS = parseInt((weight/TOTAL_INDICATORS)*100)
    keys = ["Percentage of implementation"]

    // Generate datas
    BARDATA = kpis.map(kpi => {
        return {
            "country": `${kpi.YDMS_KPIs_id}`,
            "Percentage of implementation": parseInt(Math.random(1)*100),
            "Percentage of implementationColor": "hsl(210, 96%, 40%)"
        }
    })

    return (
        <div className="kpisSummary-content">
            <Title level={4}>EA KPIs Summary</Title>

            <div className="summary-table">
                <div className="single-kpi-row">
                    <div className="bar-wrapper"><BarChart groupMode={"stacked"} data={BARDATA} keys={keys} /></div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ SAATMDashboardReducer }) => ({
    kpis: SAATMDashboardReducer.kpis,
    kpisData: SAATMDashboardReducer.kpisData,
})

export default connect(mapStateToProps)(AfcacKPISummary);

