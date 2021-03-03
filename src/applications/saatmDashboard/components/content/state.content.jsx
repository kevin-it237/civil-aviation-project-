import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getKPIsData, selectKPI, getKPIs, getStates} from '../../redux/reducer/actions'
import {NavLink} from 'react-router-dom'
import { Alert,  Statistic, Card} from 'antd';
import StateSummary from '../summary/state.summary'
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

const Content = ({kpisData, loading, kpis, kpi, selectedOrg, loadingKPIs, loadingStates, states, user}) => {
    
    const dispatch = useDispatch()
    const [MAPDATA, setMAPDATA] = useState([])
    const [RAWDATA, setRAWDATA] = useState(["", "", "0"])
    const [PIECHART_DATA, setPIECHARTDATA] = useState([])

    const [KPI4DATA, setKPI4DATA] = useState([])
    const [activeStateKpi5, setActiveStateKpi5] = useState('')

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
        setActiveStateKpi5('')
    }, [kpisData])

    const generateMapData = () => {
        let data = []

        if(kpi?.YDMS_KPIs_id === 'kpi_12') { // The kpi_12 use the custom_weight attribute
            data = kpisData.map(kpi => {
                return [kpi.country_code.toLowerCase(), parseInt(kpi.custom_weight)]
            })      
        } else if(kpi?.YDMS_KPIs_id === 'kpi_4') {
            data = generateKPI4Data()
        } else if(kpi?.YDMS_KPIs_id === 'kpi_5') {
            data = [[]]
        }else {
            data = kpisData.map(kpi => {
                return [kpi.country_code.toLowerCase(), parseInt(kpi.weight)/parseInt(kpi.totalweight)*100]
            })
        }
        setMAPDATA(data)
        setKPI4DATA([])

        if(['kpi_2', 'kpi_4', 'kpi_12', 'kpi_3', 'kpi_20'].includes(kpi?.YDMS_KPIs_id)) {
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
        PIE_DATA[0].label = 'Compliant'
        PIE_DATA[1].value = no
        PIE_DATA[1].label = 'Not Compliant'

        if(kpi?.YDMS_KPIs_id !== 'kpi_5') {
            setPIECHARTDATA(PIE_DATA)
        }
    }

    /**
     * Destinations for kpi_4 for a selected country
     * @param {String} country_code
     */
    const generateKPI4Data = () => {

        const RAW_OBJ = groupDataByProperty(kpisData, 'country_code')

        const finalData = []

        for (const key in RAW_OBJ) {
            if (Object.hasOwnProperty.call(RAW_OBJ, key)) {
                const questions = RAW_OBJ[key];
                let total = 0
                let totalW = 0
                questions.forEach(q => {
                    total = total + q.weight_response * q.questionnaire_response
                    totalW = totalW + q.weight_response
                });
                finalData.push([key.toLowerCase(), total/1190*100])
            }
        }

        return finalData
    }

    const generateDestinations = (state) => {
        const country_code = state.country_code
        setActiveStateKpi5(state.short_name)
        
        const stateDatas = kpisData.filter(data => data.country_code.toLowerCase() === country_code.toLowerCase())

        const condition1 = (data, state) => new RegExp("\\b" + state.full_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase()) && 
            !new RegExp("\\b" + 'Bissau'.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase())
        
        const condition2 =  (data, state) =>  new RegExp("\\b" +state.full_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase()) || 
        new RegExp("\\b" + state.short_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase())
    
        let RAW_ARR = []
        stateDatas.forEach(data => {
            let state = states.find(state => {
                const stateShortName = state.short_name
                if(stateShortName === 'Congo') {
                    return condition1(data, state)
                } else if (stateShortName === 'Guinea') {
                    return condition1(data, state)
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
    
        const RAW_OBJ = groupDataByProperty(RAW_ARR, 'dest_country_code')
    
        const finalData = []

        let yes = 0; let total = 0;
        for (const key in RAW_OBJ) {
            total++
            const question2 = RAW_OBJ[key][1]
            if (parseInt(question2.questionnaire_response) === 1) {
                yes++
                finalData.push([key.toLowerCase(), parseInt(question2.questionnaire_response)*100])
            }
        }

        PIE_DATA[0].value = yes
        PIE_DATA[0].label = 'Yes'
        PIE_DATA[1].value = total-yes
        PIE_DATA[1].label = 'No'
        setPIECHARTDATA(PIE_DATA)

        // Add the current selected state 
        // finalData.push([country_code.toLowerCase(), 200])
    
        setMAPDATA(finalData)
        // setKPI4DATA(RAW_OBJ)
    
        setDATACLASSES([{
            from: 0,
            to: 100,
            color: '#1890ff',
            name: 'Yes'
        }])
    }

    /**
     * @description saatm countries
     * @returns {Array}
     */
    const generateSAATMDatas = () => {
        return states.filter(state => state.SAATM_membership == 1)
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

    const generateBarColor = (value) => {
        let color = '#43a047'
        if(parseFloat(value) < 50) {
            color = '#f44336'
        } else if(parseFloat(value) < 75) {
            color = '#fdd835'
        }
        return color
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

    if(kpi?.YDMS_KPIs_id === "all") {
        if(selectedOrg === "state") {
            return <StateSummary />
        }
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
        if(['kpi_2', 'kpi_3', 'kpi_20'].includes(kpi.YDMS_KPIs_id)) {
            if(kpi.YDMS_KPIs_id === 'kpi_2') {
                BARDATA =  kpisData.map(kpi => {
                    return {
                        "country": kpi.short_name,
                        "Total weighted score (%)": parseFloat((parseInt(kpi.weight)/parseInt(kpi.totalweight)*100).toFixed(2)),
                        "Total weighted score (%)Color": "#000000",
                        "Indicators reported (%)": parseFloat((parseInt(kpi.response)/kpi.totalSP*100).toFixed(2)),
                        "Indicators reported (%)Color": "hsl(210, 96%, 40%)",
                    }
                })
                keys = ["Total weighted score (%)", "Indicators reported (%)"]
            } else {
                BARDATA =  kpisData.map(kpi => {
                    const value = parseFloat((parseInt(kpi.weight)/parseInt(kpi.totalweight)*100).toFixed(2))
                    let color = generateBarColor(value)
                    return {
                        "country": kpi.short_name,
                        "Total weighted score (%)": value,
                        "Total weighted score (%)Color": color,
                        "Not implemented (%)": 100-value,
                        "Not implemented (%)Color": "#ddd",
                    }
                })
                keys = ["Total weighted score (%)", "Not implemented (%)"]
            }
        } else if(kpi.YDMS_KPIs_id === 'kpi_12') {
            BARDATA = kpisData.filter(kpi => kpi.response == 1).map(kpi => {
                const value = parseFloat((parseFloat(kpi.custom_weight)).toFixed(2))
                let color = generateBarColor(value)
                return {
                    "country": kpi.short_name,
                    "Total weighted score (%)": value,
                    "Total weighted score (%)Color": color,
                }
            })
            keys = ["Total weighted score (%)"]
        } else if(['kpi_4'].includes(kpi.YDMS_KPIs_id)) {

            MAPDATA.forEach(data => {
                const state = states.find(st => st.country_code.toLowerCase() === data[0])
                
                const value = data[1]
                let color = generateBarColor(value)
                BARDATA.push({
                    "country": state?.short_name,
                    "Implementation Level (%)": parseFloat(value.toFixed(2)),
                    "Implementation Level (%)Color": color,
                })
            });
            keys = ["Implementation Level (%)"]
        }
    }

    let SAATMDATAS = generateSAATMDatas()
    if(user.role !== "admin") {
        SAATMDATAS = generateSAATMDatas().filter(st => st.YDMS_AU_id === user.orgId)
    }

    return (
        <> 
            <div className="kpi-infos-box">
                <Alert message={`${kpi?.KPIs_text}`} type="success" />
            </div>
            <div className="saatm-content">
                <div className="section africa-chart">
                    {
                        kpi?.YDMS_KPIs_id === 'kpi_5' ?
                        <div className="kpi-5-block">
                            <div className="saatm-states">
                                {
                                    SAATMDATAS.map(state => (
                                        <NavLink
                                            exact={true}
                                            className={`${activeStateKpi5===state.short_name?'actived':''}`}
                                            onClick={() => generateDestinations(state)} 
                                            key={state.YDMS_AU_id} 
                                            to={`#/${state.country_code}`}>{state.short_name}</NavLink>
                                    ))
                                }
                            </div>
                            <div className="map-wrapper">
                                {activeStateKpi5.length>0&&<p className="state-text">{activeStateKpi5}</p>}
                                <AfricaMap 
                                    mapData={MAPDATA} 
                                    dataClasses={DATACLASSES} />
                            </div>
                        </div>:
                        <AfricaMap 
                            mapData={MAPDATA} 
                            dataClasses={DATACLASSES} />
                    }
                </div>
                <div className="section charts">
                    {!['kpi_2', 'kpi_12', 'kpi_4', 'kpi_3', 'kpi_20'].includes(kpi.YDMS_KPIs_id) ? 
                    <div id="div-for-piechart" className="div-for-piechart">
                         {(kpi?.YDMS_KPIs_id==='kpi_5'&&activeStateKpi5.length>0)&&
                         <>
                            <Card>
                                <Statistic
                                title="Score"
                                value={(PIE_DATA[0].value/(PIE_DATA[1].value+PIE_DATA[0].value)*100).toFixed(2)}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                suffix="%"
                                />
                            </Card>
                            <PieChart data={PIECHART_DATA} />
                        </>}

                        {kpi?.YDMS_KPIs_id!=='kpi_5'&&
                        <PieChart data={PIECHART_DATA} />}
                        
                    </div>:
                    <div id={`${kpi.YDMS_KPIs_id==='kpi_12'?'big-chart':'div-for-barchart'}`} className={'div-for-barchart'}>
                        <BarChart 
                            data={BARDATA} 
                            keys={keys} 
                            groupMode={['kpi_3', 'kpi_20'].includes(kpi.YDMS_KPIs_id)?true:false}
                            legend={['kpi_4', 'kpi_3', 'kpi_20', 'kpi_12'].includes(kpi.YDMS_KPIs_id) ? false:true} />
                    </div>}
                </div>
                {
                    (!['kpi_2', 'kpi_12', 'kpi_4', 'kpi_5', 'kpi_3', 'kpi_20'].includes(kpi?.YDMS_KPIs_id))&&
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



const mapStateToProps = ({ SAATMDashboardReducer, AuthReducer}) => ({
    kpis: SAATMDashboardReducer.kpis,
    kpi: SAATMDashboardReducer.kpi,
    kpisData: SAATMDashboardReducer.kpisData,
    selectedOrg: SAATMDashboardReducer.selectedOrg,
    states: SAATMDashboardReducer.states,
    user: AuthReducer.user,
    loading: checkIfLoader(SAATMDashboardReducer, types.GET_KPI_DATA_REQUEST),
    loadingKPIs: checkIfLoader(SAATMDashboardReducer, types.GET_KPIS_REQUEST),
    loadingStates: checkIfLoader(SAATMDashboardReducer, types.GET_STATES_REQUEST),
})

export default connect(mapStateToProps)(Content);

