import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Typography  } from 'antd';
import './kpi.summary.scss'
const { Title } = Typography;

/**
 * @description content
 */

const AfcacKPISummary = ({kpis}) => {

    return (
        <div className="kpisSummary-content">
            <Title level={4}>EA KPIs Summary</Title>

            <div className="summary-table">
                {
                    kpis.map(kpi => {
                        return (
                        <div key={kpi.YDMS_KPIs_id} className="single-kpi-row">
                            <div className="kpi-label">
                                <p>{kpi.YDMS_KPIs_id}{kpi.KPIs_label}</p>
                            </div>
                            <div className="chart">

                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = ({ SAATMDashboardReducer }) => ({
    kpis: SAATMDashboardReducer.kpis,
})

export default connect(mapStateToProps)(AfcacKPISummary);

