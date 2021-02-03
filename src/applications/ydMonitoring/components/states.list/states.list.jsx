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

const SECTIONS = [
    {id: "kpi_1", name: "Section A", description: "Solemn Commitment to join the SAATM"},
    {id: "kpi_2", name: "Section B", description: "Implementation of the SAATM Concrete Measures"},
    {id: "kpi_3", name: "Section C", description: "Promulgation of YD essential national laws/regulations"},
    {id: "kpi_4", name: "Section D", description: "Market Access and availability of YD compliant BASA/MASA with each SAATM State"},
    {id: "kpi_12", name: "Section E", description: "Effective Implementation of the ICAO 8 critical elements and EI average score"},
    {id: "kpi_20", name: "Section F", description: "Collection of relevant data for YD and SAATM monitoring"}
]

/**
 * @description State listing
 */

const StateList = ({loading, selectedOrg, states, selectedState, currentSection}) => {
    
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('state')
    const [sections, setSections] = useState(SECTIONS)

    const handleClick = e => {
        setCurrent(e.key);
    };

    useEffect(() => {
        dispatch(getStates())
    }, [])

    useEffect(() => {
        if(selectedState) {
            if(!selectedState.YD_membership || !selectedState.SAATM_membership) {
                const data = sections.filter(section => !["kpi_2", "kpi_4"].includes(section.id))
                setSections(data)
            } else {
                setSections(SECTIONS)
            }
        }
    }, [selectedState, currentSection])

    useEffect(() => {
        dispatch(setCurrentSection({
            ...sections[0], i: 0
        }))
    }, [selectedState])

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
  
    if(STATES.length === 0 && !loading) {
        STATES = <Empty fetch={fetchStates} />
    }

    return (
        <div className="states-list">
            {
                selectedState ?
                <div className="state-infos-wrapper">
                    <div className="state-info">
                        <h5>{selectedState.short_name}</h5>
                        <p>Additional infomations about the state</p>
                    </div>
                    <Link to='#' onClick={() => unSelectedState()}><ArrowLeftOutlined />States List</Link>
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
                </div>:
                <Menu
                    onClick={handleClick}
                    defaultSelectedKeys={['']}
                    defaultOpenKeys={['sub1']}
                    mode="inline">
                    <SubMenu key="sub1" icon={<FlagFilled />} title="States">
                        {STATES}
                    </SubMenu>
                </Menu>
            }
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

