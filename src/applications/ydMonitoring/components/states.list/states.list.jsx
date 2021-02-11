import React, {useEffect, useState} from 'react'
import { Menu, Steps } from "antd";
import {connect, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { FlagFilled, ArrowLeftOutlined } from '@ant-design/icons';
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import Loader from '../../../../app/components/loader/loader'
import {getStates, selectState, setCurrentSection} from '../../redux/reducer/actions'
import {types} from '../../redux/reducer/types'
import Empty from '../../../../app/components/empty/empty';
import './states.list.scss'

const { SubMenu } = Menu;
const { Step } = Steps;

const STATE_SECTIONS = [
    {id: "kpi_1", name: "Section A", description: "Solemn Commitment to join the SAATM"},
    {id: "kpi_2", name: "Section B", description: "Implementation of the SAATM Concrete Measures"},
    {id: "kpi_3", name: "Section C", description: "Promulgation of YD essential national laws/regulations"},
    {id: "kpi_4", name: "Section D", description: "Market Access and availability of YD compliant BASA/MASA with each SAATM State"},
    {id: "kpi_12", name: "Section E", description: "Effective Implementation of the ICAO 8 critical elements and EI average score"},
    {id: "kpi_20", name: "Section F", description: "Collection of relevant data for YD and SAATM monitoring"}
]

const AFCAC_SECTIONS = [
    {id: "kpi_22", name: "Section A", description: "Description..."},
    {id: "kpi_23", name: "Section B", description: "Description..."},
    {id: "kpi_24", name: "Section C", description: "Description..."},
    {id: "kpi_30", name: "Section D", description: "Description..."},
    {id: "kpi_33", name: "Section E", description: "Description..."},
    {id: "kpi_34", name: "Section F", description: "Description..."},
    {id: "kpi_35", name: "Section G", description: "Description..."}
]

/**
 * @description State listing
 */

const StateList = ({loading, selectedOrg, states, selectedState, currentSection}) => {
    
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('state')
    const [sections, setSections] = useState([])

    const handleClick = e => {
        setCurrent(e.key);
    };

    useEffect(() => {
        dispatch(getStates())
    }, [])

    // MAnage questionnaire sections here
    useEffect(() => {
        if(selectedOrg==='afcac') {
            setSections(AFCAC_SECTIONS)
        } else if(selectedOrg==='state') {
            setSections(STATE_SECTIONS)
        }
    }, [selectedOrg])

    useEffect(() => {
        if(selectedState) {
            if(!selectedState.YD_membership || !selectedState.SAATM_membership) {
                const data = sections.filter(section => !["kpi_2", "kpi_4"].includes(section.id))
                setSections(data)
            } else {
                setSections(STATE_SECTIONS)
            }
        }
    }, [selectedState, currentSection])

    useEffect(() => {
        if(selectedOrg === 'afcac') {
            dispatch(setCurrentSection({
                ...AFCAC_SECTIONS[0], i: 0
            }))
        } else {
            dispatch(setCurrentSection({
                ...STATE_SECTIONS[0], i: 0
            }))
        }
    }, [selectedState, selectedOrg])

    const selectCountry = (state) => {
        dispatch(selectState(state))
    }

    const fetchStates = () => {
        dispatch(fetchStates())
    }

    const unSelectedState = () => {
        dispatch(selectState(null))
    }

    if(loading) {
        return <Loader />
    }

    let STATES = [states.map((state, i) => (
        <Menu.Item key={(i+1)} onClick={() => selectCountry(state)}>{`${state.short_name}`}</Menu.Item>
    ))]
  
    if(selectedOrg==='state') {
        if(STATES.length === 0 && !loading) {
            STATES = <Empty fetch={fetchStates} />
        }
    }

    let data = null
    if(selectedOrg === "afcac") {
        data = (
            <div className="state-infos-wrapper">
                <div className="questions-sections">
                    <Steps direction="vertical" current={currentSection?.i}>
                        {
                            sections.map((section, i) => {
                                section.i = i
                                return (
                                    <Step 
                                        key={i}
                                        title={section.name} 
                                        description={section.description}
                                        onClick={() => dispatch(setCurrentSection(section))} />
                                )
                            })
                        }
                    </Steps>
                </div>
            </div>
        )
    } else if(selectedOrg==='state') {
        if(selectedState) {
            data = (
                <div className="state-infos-wrapper">
                    <div className="state-info">
                        <h5>{selectedState.short_name}</h5>
                        <p>Additional infomations about the state</p>
                    </div>
                    <div className="link-wrapper">
                        <Link to='#' onClick={() => unSelectedState()}><ArrowLeftOutlined />States List</Link>
                    </div>
                    <div className="questions-sections">
                        <Steps direction="vertical" current={currentSection?.i}>
                            {
                                sections.map((section, i) => {
                                    section.i = i
                                    return (
                                        <Step 
                                            key={i}
                                            title={section.name} 
                                            description={section.description}
                                            onClick={() => dispatch(setCurrentSection(section))} />
                                    )
                                })
                            }
                        </Steps>
                    </div>
                </div>
            )
        } else {
            data = (
                <Menu
                    onClick={handleClick}
                    defaultSelectedKeys={['']}
                    defaultOpenKeys={['sub1']}
                    mode="inline">
                    <SubMenu key="sub1" icon={<FlagFilled />} title="States">
                        {STATES}
                    </SubMenu>
                </Menu>
            )
        }
    }

    return (
        <div className="states-list">
            {data}
        </div>
    )
}



const mapStateToProps = ({ YDMonitoringReducer }) => ({
    states: YDMonitoringReducer.states,
    loading: checkIfLoader(YDMonitoringReducer, types.GET_KPIS_REQUEST),
    selectedOrg: YDMonitoringReducer.selectedOrg,
    selectedState: YDMonitoringReducer.selectedState,
    currentSection: YDMonitoringReducer.currentSection,
})

export default connect(mapStateToProps)(StateList);

