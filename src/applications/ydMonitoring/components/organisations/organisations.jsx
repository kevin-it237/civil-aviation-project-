import React, {useEffect, useState} from 'react'
import { Menu , Button } from "antd";
import {connect, useDispatch} from 'react-redux'
import { FlagFilled, GlobalOutlined } from '@ant-design/icons';
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import Loader from '../../../../app/components/loader/loader'
import {getStates, getKPIs, selectState} from '../../redux/reducer/actions'
import {types} from '../../redux/reducer/types'
import Empty from '../../../../app/components/empty/empty';
import './organisations.scss'

const { SubMenu } = Menu;


/**
 * @description YD monitoring screen
 */

const Organisations = ({states, loading}) => {
    
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('states')

    useEffect(() => {
        dispatch(getStates())
    }, [])

    useEffect(() => {
        if(states.length) {
            dispatch(getKPIs('state'))
        }
    }, [states])

    const handleClick = e => {
        setCurrent(e.key);
    };

    const selectCountry = (state) => {
        dispatch(selectState(state))
    }

    const fetchStates = () => {
        dispatch(getStates())
    }

    let STATES = [states.map((state, i) => (
        <Menu.Item key={(i+1)} onClick={() => selectCountry(state)}>{state.full_name}</Menu.Item>
    ))]

    if(STATES.length === 0 && !loading) {
        STATES = <Empty fetch={fetchStates} />
    }

    return (
        <div className="organisations">
             <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" icon={<FlagFilled />} title="States">
                    <Menu.Item key={0}>All States</Menu.Item>
                    {loading ? <Loader /> : STATES}
                    
                </SubMenu>
                <SubMenu key="sub2" icon={<GlobalOutlined />} title="Airlines">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<GlobalOutlined />} title="AFCAC">
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
}



const mapStateToProps = ({ YDMonitoringReducer }) => ({
    states: YDMonitoringReducer.states,
    loading: checkIfLoader(YDMonitoringReducer, types.GET_STATES_REQUEST),
})

export default connect(mapStateToProps)(Organisations);

