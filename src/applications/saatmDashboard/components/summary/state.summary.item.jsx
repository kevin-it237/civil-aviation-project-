import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import { Statistic, Row, Col, Typography, Card } from 'antd';
import BarChart from '../barChart/barChart'
import './kpi.summary.scss'
const { Title } = Typography;

/**
 * @description content
 */

const StateSummaryItem = ({data, totalStates}) => {
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        KPI_1: 0,
        KPI_2: 0,
        KPI_3: 0,
        KPI_4: 0,
        KPI_12: 0,
        KPI_20: 0,
    })
    const [KPI_SCORE, setKPI_SCORE] = useState(0)
    const [KPI5SCORE, setKPI5SCORE] = useState(0)

    useEffect(() => {
        if(Object.keys(data).length) {
            calculateKPIsValues()
        }
    }, [data])

    const calculateKPIsValues = () => {
        const SPs = data.survey_protocols
        const sortedData = groupDataByProperty(SPs, 'YDMSKPIYDMSKPIsId')

        // Calculate KPI_1 value
        const kpi1Value = sortedData['kpi_1'][0].sp_response.questionnaire_response?100:0

        // Calculate KPI_2 value
        let kpi2ValueTemp = 0; let kpi2TotalWeight = 0;
        sortedData['kpi_2'].forEach(SP => {
            const response = SP.sp_response.questionnaire_response?1:0
            kpi2ValueTemp += response*SP.weight
            kpi2TotalWeight += SP.weight
        });
        let kpi2Value = parseFloat(((kpi2ValueTemp/kpi2TotalWeight)*100).toFixed(2))

        // Calculate KPI_3 value
        let kpi3ValueTemp = 0; let kpi3TotalWeight = 0;
        sortedData['kpi_3'].forEach(SP => {
            const response = SP.sp_response.questionnaire_response?1:0
            kpi3ValueTemp += response*SP.weight
            kpi3TotalWeight += SP.weight
        });
        let kpi3Value = parseFloat(((kpi3ValueTemp/kpi3TotalWeight)*100).toFixed(2))

        // Calculate kpi10 value
        let kpi12Value = sortedData['kpi_12'][0].sp_response.weight_response

        // Calculate KPI_20 value
        let kpi20ValueTemp = 0; let kpi20TotalWeight = 0;
        sortedData['kpi_20'].forEach(SP => {
            const response = SP.sp_response.questionnaire_response?1:0
            kpi20ValueTemp += response*SP.weight
            kpi20TotalWeight += SP.weight
        });
        let kpi20Value = parseFloat(((kpi20ValueTemp/kpi20TotalWeight)*100).toFixed(2))

        // Calculate KPI_4 value
        let kpi4ValueTemp = 0; let kpi4TotalWeight = 35;
        sortedData['kpi_4'].forEach(SP => {
            const response = SP.sp_response.questionnaire_response?1:0
            kpi4ValueTemp += response*SP.sp_response.weight_response
        });
        kpi4ValueTemp = kpi4ValueTemp/kpi4TotalWeight
        let kpi4Value = parseFloat(((kpi4ValueTemp/totalStates)*100).toFixed(2))

        // Calculate KPI_5 score
        let kpi5ValueTemp = 0; let kpi5TotalSp = 0;
        const KPI5Data = sortedData['kpi_4'].filter(SP => new RegExp("\\b" + 'the right of the fifth freedom of the air' + "\\b").test(SP.questionnaire_text.toLowerCase()));
        KPI5Data.forEach(SP => {
            const response = SP.sp_response.questionnaire_response?1:0
            kpi5ValueTemp += response
            kpi5TotalSp++
        });
        let kpi5Value = parseFloat((kpi5ValueTemp/kpi5TotalSp*100).toFixed(2))
        setKPI5SCORE(kpi5Value)

        setValues({
            KPI_1: kpi1Value,
            KPI_2: kpi2Value,
            KPI_3: kpi3Value,
            KPI_4: kpi4Value,
            KPI_12: kpi12Value,
            KPI_20: kpi20Value,
        })

        let KPI_SCORE = parseFloat(((kpi1Value + kpi2Value + kpi3Value + kpi4Value + kpi12Value + kpi20Value)/6).toFixed(2))
        setKPI_SCORE(KPI_SCORE)
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

    let BARDATA = []
    let keys = []

    keys = ["Percentage implementation", "Not implemented"]

    // Generate bar datas
    for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
            const value = values[key];
            let color = '#43a047'
            if(value < 50) {
                color = '#f44336'
            } else if(value < 75) {
                color = '#fdd835'
            }
            BARDATA.push({
                "country": `${key}`,
                "Percentage implementation": value,
                "Percentage implementationColor": color,
                "Not implemented": 100-value,
                "Not implementedColor": "#ddd"
            })
        }
    }

    BARDATA = BARDATA.reverse()
    
    return (
        <div className="summary-item single-kpi-row">
           <Title level={5}>{data.full_name}</Title>
           <div className="stats-wrapper">
                <Row gutter={16} style={{marginBottom: 20}}>
                    <Col span={24}>
                        <Card>
                            <Statistic title="Overall Score" value={`${KPI_SCORE}%`} />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card>
                            <Statistic title="KPI 5 Score" value={`${KPI5SCORE}%`} precision={2} />
                        </Card>
                    </Col>
                </Row>
                <div className="summary-item-column">
                        {BARDATA.length&&
                        <BarChart groupMode={"stacked"} legend={false} data={BARDATA} keys={keys} />}
                </div>
           </div>
        </div>
    )
}


export default StateSummaryItem;

