import React, {useEffect} from 'react'
import {connect, useDispatch} from 'react-redux'
import { Statistic, Row, Col, Typography, Card } from 'antd';
import {getKPIsDataSummary} from '../../redux/reducer/actions'
import {types} from '../../redux/reducer/types'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import BarChart from '../barChart/barChart'
import Loader from '../../../../app/components/loader/loader'
import Empty from '../../../../app/components/empty/empty'
import './kpi.summary.scss'
const { Title } = Typography;

/**
 * @description content
 */

const AfcacKPISummary = ({loading, kpis, kpisSummaryData, selectedOrg}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getKPIsDataSummary(selectedOrg))
    }, [])

    const refresh = () => {
        dispatch(getKPIsDataSummary(selectedOrg))
    }

    if(loading) {
        return <Loader />
    }

    if(kpisSummaryData.length === 0 && !loading) {
        return (
            <div style={{height: '80%'}}>
                <Empty fetch={refresh} />
            </div>
        )
    }

    let BARDATA = []
    let keys = []
    let SCORE = 0
    let TOTAL_INDICATORS = 0
        
    kpisSummaryData.forEach(data => {
        SCORE = SCORE + parseInt(data.response)
        TOTAL_INDICATORS = TOTAL_INDICATORS + data.totalSP
    });

    keys = ["Percentage implementation", "Not implemented"]

    // Generate datas
    BARDATA = kpisSummaryData.map(kpi => {
        let color = '#43a047'
        const weight = (parseInt(kpi.response))/kpi.totalSP*100
        if(weight < 50) {
            color = '#f44336'
        } else if(weight < 75) {
            color = '#fdd835'
        }
        return {
            "country": `${kpi.YDMS_KPIs_id}`,
            "Percentage implementation": (parseInt(kpi.response))/kpi.totalSP*100,
            "Percentage implementationColor": color,
            "Not implemented": (kpi.totalSP-parseInt(kpi.response))/kpi.totalSP*100,
            "Not implementedColor": "#ddd"
        }
    })
    BARDATA = BARDATA.reverse()

    let color = 'green'
    const weight = (SCORE/TOTAL_INDICATORS*100)
    if(weight < 50) {
        color = 'red'
    } else if(weight < 75) {
        color = 'yellow'
    }

    return (
        <div className="kpisSummary-content">
            <div className="summaries">
                {/* <Title level={4}>Summary</Title> */}
                <Row gutter={16} style={{marginBottom: 20}}>
                    <Col span={12}>
                        <Card>
                            <Statistic title="Overall Score" value={`${SCORE}/${TOTAL_INDICATORS}`} />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic className={color} title="Global Score In Percentage" value={`${(SCORE/TOTAL_INDICATORS*100).toFixed(2)}%`} precision={2} />
                        </Card>
                    </Col>
                </Row>
            </div>

            <div className="summary-table">
                <div className="single-kpi-row">
                    <div className="bar-wrapper">
                        <BarChart groupMode={"stacked"} legend={false} data={BARDATA} keys={keys} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ SAATMDashboardReducer }) => ({
    kpis: SAATMDashboardReducer.kpis,
    kpisSummaryData: SAATMDashboardReducer.kpisSummaryData,
    loading: checkIfLoader(SAATMDashboardReducer, types.GET_KPI_DATA_SUMMARY_REQUEST),
    selectedOrg: SAATMDashboardReducer.selectedOrg,
})

export default connect(mapStateToProps)(AfcacKPISummary);

