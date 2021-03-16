import React, {useEffect, useState} from 'react'
import BarChart from '../barChart/barChart'
import AfricaMap from '../africaMap/africaMap'
import {connect} from 'react-redux'
import { Statistic, Row, Col, Typography, Card } from 'antd';
import './kpi.summary.scss'

/**
 * @description content
 */

const StateGlobalSummary = ({SUMMARY_DATAS, totalStates, states, user}) => {

    const [KPI_SCORE, setKPI_SCORE] = useState(0)
    const [MAPDATA, setMAPDATA] = useState([])
    const [BARDATA, setBARDATA] = useState([])
    const [DATACLASSES, setDATACLASSES] = useState([]) // Map coloration

    useEffect(() => {
        if(SUMMARY_DATAS.length) {
            calculateKPIsValues()
        }
    }, [SUMMARY_DATAS])

    const calculateKPIsValues = () => {

        const scores = SUMMARY_DATAS.map(data => {
            const SPs = data.survey_protocols
            const sortedData = groupDataByProperty(SPs, 'YDMSKPIYDMSKPIsId')

            // Calculate KPI_1 value
            let kpi1Value = sortedData['kpi_1']
            if(kpi1Value) {
                kpi1Value = kpi1Value[0].sp_response.questionnaire_response?100:0
            }
            
            // Calculate KPI_2 value
            let kpi2ValueTemp = 0; 
            let kpi2TotalWeight = 0;
            let kpi2Value = 0;
            if(sortedData['kpi_2']) {
                sortedData['kpi_2'].forEach(SP => {
                    const response = SP.sp_response.questionnaire_response?1:0
                    kpi2ValueTemp += response*SP.weight
                    kpi2TotalWeight += SP.weight
                });
                kpi2Value = parseFloat(((kpi2ValueTemp/kpi2TotalWeight)*100).toFixed(2))
            }
            
            // Calculate KPI_3 value
            let kpi3ValueTemp = 0; 
            let kpi3TotalWeight = 0;
            let kpi3Value = 0;
            if(sortedData['kpi_3']) {
                sortedData['kpi_3'].forEach(SP => {
                    const response = SP.sp_response.questionnaire_response?1:0
                    kpi3ValueTemp += response*SP.weight
                    kpi3TotalWeight += SP.weight
                });
                kpi3Value = parseFloat(((kpi3ValueTemp/kpi3TotalWeight)*100).toFixed(2))
            }
            
            // Calculate kpi10 value
            let kpi12Value = 0;
            if(sortedData['kpi_12']) {
                kpi12Value = parseFloat((sortedData['kpi_12'][0].sp_response.weight_response).toFixed(2))
            }
            
            // Calculate KPI_20 value
            let kpi20ValueTemp = 0; 
            let kpi20TotalWeight = 0;
            let kpi20Value = 0;
            if(sortedData['kpi_20']) {
                sortedData['kpi_20'].forEach(SP => {
                    const response = SP.sp_response.questionnaire_response?1:0
                    kpi20ValueTemp += response*SP.weight
                    kpi20TotalWeight += SP.weight
                });
                kpi20Value = parseFloat(((kpi20ValueTemp/kpi20TotalWeight)*100).toFixed(2))
            }
            
            // Calculate KPI_4 value
            let kpi4ValueTemp = 0; 
            let kpi4TotalWeight = 35;
            let kpi4Value = 0
            if(sortedData['kpi_4']) {
                sortedData['kpi_4'].forEach(SP => {
                    const response = SP.sp_response.questionnaire_response?1:0
                    kpi4ValueTemp += response*SP.sp_response.weight_response
                });
                kpi4ValueTemp = kpi4ValueTemp/kpi4TotalWeight
                kpi4Value = parseFloat(((kpi4ValueTemp/totalStates)*100).toFixed(2))
            }

            let STATE_KPI_SCORE = parseFloat(((kpi1Value + kpi2Value + kpi3Value + kpi4Value + kpi12Value + kpi20Value)/6).toFixed(2))

            return {
                id: data.YDMS_Org_id,
                short_name: data.short_name,
                score: STATE_KPI_SCORE
            }
        })
        generateMapData(scores);
        generateBarData(scores);
        calculateGlobalScore(scores);
    }

     /**
     * Reshape array
     * @param {array} array 
     */
    const groupDataByProperty = (array, key) => {
        const result = array.reduce(function (r, a) {
            r[a[key]] = r[a[key]] || [];
            r[a[key]].push(a);
            return r;
        }, Object.create(null));
        return result
    }

    /**
     * 
     * @param {array} data 
     */
    const generateMapData = (data) => {
        let mapData= data.map(st => {
            let state = states.find(state => state.YDMS_AU_id === st.id)
            
            if(state) {
                return [state.country_code.toLowerCase(), parseInt(st.score)]
            }
        })  

        setMAPDATA(mapData)

        setDATACLASSES([{
            from: 0,
            to: 50,
            color: 'red',
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
    }

    const generateBarData = (data) => {
        const res = data.map(st => {
            const value = st.score;
            let color = '#43a047'
            if(value < 50) {
                color = '#f44336'
            } else if(value < 75) {
                color = '#fdd835'
            }
            return {
                "country": `${st.short_name}`,
                "Percentage implementation": value,
                "Percentage implementationColor": color,
                "Not implemented": 100-value,
                "Not implementedColor": "#ddd"
            }
        })

        const compare = (a, b) => {
            if ( a["Percentage implementation"] < b["Percentage implementation"] ){
              return -1;
            }
            if ( a["Percentage implementation"] > b["Percentage implementation"] ){
              return 1;
            }
            return 0;
        }
        // Order data
        res.sort(compare);
        
        setBARDATA(res)
    }

    const calculateGlobalScore = (data) => {
        let score = 0
        data.map(st => {
            score += st.score
        })
        score = (score/totalStates).toFixed(2)
        setKPI_SCORE(score)
    }
    
    let keys = ["Percentage implementation", "Not implemented"]
    
    return (
        <div className="summary-item single-kpi-row global-states">
            {
                user.role === 'admin' &&
                <Row gutter={16} style={{marginBottom: 20}}>
                    <Col span={24}>
                        <Card>
                            <Statistic title="Overall Score" value={`${KPI_SCORE}%`} />
                        </Card>
                    </Col>
                </Row>
            }
            <div className="graphics">
                <div className="map-global global-charts">
                    <AfricaMap mapData={MAPDATA} dataClasses={DATACLASSES} />
                </div>
                <div className="bar-global global-charts" id={`${user.role !== 'admin'?'small-bar':''}`}>
                    <p className="ranking_text"><b>States Ranking</b></p>
                    {BARDATA.length&&
                    <BarChart groupMode={"stacked"} legend={false} data={BARDATA} keys={keys} />}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ AuthReducer }) => ({
    user: AuthReducer.user,
})

export default connect(mapStateToProps)(StateGlobalSummary);

