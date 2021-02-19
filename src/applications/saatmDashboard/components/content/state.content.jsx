import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getKPIsData, selectKPI, getKPIs, getStates} from '../../redux/reducer/actions'
import { Alert } from 'antd';
import Loader from '../../../../app/components/loader/loader'
import Empty from '../../../../app/components/empty/empty'
import AfricaMap from '../africaMap/africaMap'
import PieChart, {PIE_DATA} from '../pieChart/pieChart'
import BarChart from '../barChart/barChart'
import {types} from '../../redux/reducer/types'
import './content.scss'

/**
 * @description content
 */

const Content = ({kpisData, loading, kpis, kpi, selectedOrg, loadingKPIs, loadingStates, states}) => {
    
    const dispatch = useDispatch()
    const [MAPDATA, setMAPDATA] = useState([])
    const [RAWDATA, setRAWDATA] = useState(["", "", "0"])
    const [PIECHART_DATA, setPIECHARTDATA] = useState(PIE_DATA)

    const [KPI4DATA, setKPI4DATA] = useState([])

    const [DATACLASSES, setDATACLASSES] = useState([]) // Map coloration

    useEffect(() => {
        if(!states.length) {
            dispatch(getStates())
        }
    }, [])

    useEffect(() => {
        // Get the first kpi
        if(kpis.length) {
            dispatch(getKPIsData({kpiId: "all", orgType: selectedOrg})) // get the initial kpi
            dispatch(selectKPI({
                KPIs_label: "Summary",
                KPIs_org_type: "state",
                KPIs_text: "Summary",
                YDMS_KPIs_id: "all",
                id: 0   
            })) // init the first kpi
        }
    }, [kpis])

    useEffect(() => {
        if(kpisData.length) {
            generateMapData()
            generateRawData()
        }
    }, [kpisData])

    const generateMapData = () => {
        let data = []

        if(kpi?.YDMS_KPIs_id === 'kpi_12') { // The kpi_12 use the custom_weight attribute
            data = kpisData.map(kpi => {
                return [kpi.country_code.toLowerCase(), parseInt(kpi.custom_weight)]
            })      
        } else if(kpi?.YDMS_KPIs_id === 'kpi_4') {
            data = generateSAATMDatas()
        }else {
            data = kpisData.map(kpi => {
                return [kpi.country_code.toLowerCase(), parseInt(kpi.weight)/parseInt(kpi.totalweight)*100]
            })
        }
        setMAPDATA(data)
        setKPI4DATA([])

        if(kpi?.YDMS_KPIs_id === 'kpi_2' || kpi?.YDMS_KPIs_id === 'kpi_12') {
            setDATACLASSES([{
                from: 0,
                to: 59,
                color: 'red',
                name: '0 to 60%'
            }, {
                from: 60,
                to: 74,
                color: '#fdd835',
                name: '60 to 75%'
            }, {
                from: 75,
                to: 100,
                color: '#2e7d32',
                name: '75 to 100%'
            }])
        } else if(kpi?.YDMS_KPIs_id === 'kpi_4') {
            setDATACLASSES([{
                from: 0,
                to: 200,
                color: '#1890ff',
                name: 'SAATM members'
            }])
        } else {
            setDATACLASSES([{
                from: 0,
                to: 50,
                color: '#aaa',
                name: 'No'
            }, {
                from: 50,
                to: 100,
                color: '#2e7d32',
                name: 'Yes'
            }])
        }
    }

    const generateRawData = () => {
        let yes = 0;let no = 0;
        kpisData.forEach(kpi => {
            if(!!parseInt(kpi.weight)) {
                yes +=1
            } else {
                no +=1
            }
        });
        setRAWDATA([yes, no])
        PIE_DATA[0].value = yes
        PIE_DATA[1].value = no
        setPIECHARTDATA(PIE_DATA)
    }

    /**
     * Destinations for kpi_4 for a selected country
     * @param {String} country_code
     */
    const generateDestinations = (country_code) => {
        const stateDatas = kpisData.filter(data => data.country_code.toLowerCase() === country_code.toLowerCase())

        const condition1 = (data, state) => new RegExp("\\b" + state.full_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase())
        
        const condition2 =  (data, state) =>  new RegExp("\\b" +state.full_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase()) || 
        new RegExp("\\b" + state.short_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase())

        let RAW_ARR = []
        stateDatas.forEach(data => {
            let state = states.find(state => {
                const stateShortName = state.short_name
                if(stateShortName === 'Congo') {
                    return condition1(data, state)
                } else if (stateShortName === 'Guinea') {
                    
                } else {
                    return condition2(data, state)
                }
            })

            if(state) {
                data.dest_country_code = state.country_code
                data.dest_country_name = state.short_name
                RAW_ARR.push(data)
            }
        });

        const RAW_OBJ = groupDataByProperty(RAW_ARR)

        const finalData = []

        for (const key in RAW_OBJ) {
            if (Object.hasOwnProperty.call(RAW_OBJ, key)) {
                const questions = RAW_OBJ[key];
                // If response for question 2 is 0, dont display that state on the map
                const question2 = RAW_OBJ[key][1]
                if(question2.questionnaire_response == 1) {
                    let total = 0
                    questions.forEach(q => {
                        total = total + q.weight_response * q.questionnaire_response
                    });
                    finalData.push([key.toLowerCase(), total/35*100])
                }
            }
        }

        // Add the current selected state 
        finalData.push([country_code, 200])

        // console.log(RAW_OBJ);
        // console.log(Object.keys(RAW_OBJ).length);

        setMAPDATA(finalData)
        setKPI4DATA(RAW_OBJ)

        setDATACLASSES([{
            from: 0,
            to: 59,
            color: 'red',
            name: '0 to 60%'
        }, {
            from: 60,
            to: 74,
            color: '#fdd835',
            name: '60 to 75%'
        }, {
            from: 75,
            to: 100,
            color: '#2e7d32',
            name: '75 to 100%'
        }])
    }

    /**
     * Destinations for kpi_4 for a selected country
     * @returns {Array}
     */
    const generateSAATMDatas = () => {
        return states.filter(state => state.SAATM_membership == 1).map(state => {
            return [state.country_code.toLowerCase(), 200]
        })
    }

    /**
     * Reshape array
     * @param {array} array 
     */
    const groupDataByProperty = (array) => {
        const result = array.reduce(function (r, a) {
            r[a.dest_country_code] = r[a.dest_country_code] || [];
            r[a.dest_country_code].push(a);
            return r;
        }, Object.create(null));
        return result
    }

    const refresh= () => {
        if(kpi) {
            dispatch(getKPIsData({kpiId: kpi?.YDMS_KPIs_id, orgType: selectedOrg}))
        } else {
            dispatch(getKPIs('state'))
        }
    }

    if(loading || loadingKPIs || loadingStates) {
        return <Loader />
    }

    if(kpisData.length === 0 && !loading) {
        return (
            <div style={{height: '80%'}}>
                {
                    kpi?.YDMS_KPIs_id!=="all"&&
                    <div className="kpi-infos-box">
                        <Alert message={`${kpi?.KPIs_text}`} type="success" />
                    </div>
                }
                <Empty fetch={refresh} />
            </div>
        )
    }

    let BARDATA = []
    let keys = []
    if(kpi) {
        if(kpi.YDMS_KPIs_id === 'kpi_2') {
            BARDATA =  kpisData.map(kpi => {
                return {
                    "country": kpi.short_name,
                    "Total weighted score (%)": parseFloat((parseInt(kpi.weight)/parseInt(kpi.totalweight)*100).toFixed(1)),
                    "Total weighted score (%)Color": "#000000",
                    "Indicators reported (%)": parseFloat((parseInt(kpi.response)/kpi.totalSP*100).toFixed(1)),
                    "Indicators reported (%)Color": "hsl(210, 96%, 40%)",
                }
            })
            keys = ["Total weighted score (%)", "Indicators reported (%)"]
        } else if(kpi.YDMS_KPIs_id === 'kpi_12') {
            BARDATA = kpisData.filter(kpi => kpi.response == 1).map(kpi => {
                const value = parseFloat((parseFloat(kpi.custom_weight)).toFixed(1))
                let color = '#43a047'
                if(parseFloat(value) < 50) {
                    color = '#f44336'
                } else if(parseFloat(value) < 75) {
                    color = '#fdd835'
                }
                return {
                    "country": kpi.short_name,
                    "Total weighted score (%)": value,
                    "Total weighted score (%)Color": color,
                }
            })
            keys = ["Total weighted score (%)"]
        } else if(kpi.YDMS_KPIs_id === 'kpi_4') {
            for (const key in KPI4DATA) {
                if (Object.hasOwnProperty.call(KPI4DATA, key)) {
                    const questions = KPI4DATA[key];
                    // If response for question 2 is 0, dont display that state on the map
                    // const question2 = KPI4DATA[key][1]
                    // if(question2.questionnaire_response == 1) {
                        let total = 0
                        questions.forEach(q => {
                            total = total + q.weight_response * q.questionnaire_response
                        });
                        let color = '#43a047'
                        if(parseFloat(total/35*100) < 50) {
                            color = '#f44336'
                        } else if(parseFloat(total/35*100) < 75) {
                            color = '#fdd835'
                        }
                        const state = states.find(st => st.country_code === key)
                        BARDATA.push({
                            "country": state.short_name,
                            "Implementation Level (%)": parseFloat(total/35*100),
                            "Implementation Level (%)Color": color,
                        })
                    // }
                }
            }
            keys = ["Implementation Level (%)"]
        }
    }

    return (
        <> 
            <div className="kpi-infos-box">
                <Alert message={`${kpi?.KPIs_text}`} type="success" />
            </div>
            <div className="saatm-content">
                <div className="section africa-chart">
                    <AfricaMap 
                        kpiId={kpi?.YDMS_KPIs_id}
                        mapData={MAPDATA} 
                        dataClasses={DATACLASSES} 
                        generateDestinations={generateDestinations}
                        resetMap={generateMapData} />
                </div>
                <div className="section charts">
                    {!['kpi_2', 'kpi_12', 'kpi_4'].includes(kpi.YDMS_KPIs_id) ? 
                    <div id="div-for-piechart" className="div-for-piechart">
                        <PieChart data={PIECHART_DATA} />
                    </div>:
                    <div id={`${kpi.YDMS_KPIs_id==='kpi_12'?'big-chart':'div-for-barchart'}`} className={'div-for-barchart'}>
                        <BarChart data={BARDATA} keys={keys} legend={['kpi_4'].includes(kpi.YDMS_KPIs_id) ? false:true} />
                    </div>}
                </div>
                {
                    (!['kpi_2', 'kpi_12', 'kpi_4'].includes(kpi?.YDMS_KPIs_id))&&
                    <div className="section raw-datas">
                        <div className="raw raw--1">
                            <h2>Total Compliant</h2>
                            <h3>{RAWDATA[0]} <span> / {`${(RAWDATA[0]/kpisData.length*100).toFixed(2)}%`}</span></h3>
                        </div>
                        <div className="raw raw--2">
                            <h2>Not Compliant</h2>
                            <h3>{RAWDATA[1]} <span>/ {`${(RAWDATA[1]/kpisData.length*100).toFixed(2)}%`}</span></h3>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}



const mapStateToProps = ({ SAATMDashboardReducer}) => ({
    kpis: SAATMDashboardReducer.kpis,
    kpi: SAATMDashboardReducer.kpi,
    kpisData: SAATMDashboardReducer.kpisData,
    selectedOrg: SAATMDashboardReducer.selectedOrg,
    states: SAATMDashboardReducer.states,
    loading: checkIfLoader(SAATMDashboardReducer, types.GET_KPI_DATA_REQUEST),
    loadingKPIs: checkIfLoader(SAATMDashboardReducer, types.GET_KPIS_REQUEST),
    loadingStates: checkIfLoader(SAATMDashboardReducer, types.GET_STATES_REQUEST),
})

export default connect(mapStateToProps)(Content);

