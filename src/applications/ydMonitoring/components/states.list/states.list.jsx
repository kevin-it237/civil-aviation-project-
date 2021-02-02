import React, {useEffect, useState} from 'react'
import { Menu, Typography  } from "antd";
import {connect, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { FlagFilled, ArrowLeftOutlined } from '@ant-design/icons';
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import Loader from '../../../../app/components/loader/loader'
import {getStates, selectState} from '../../redux/reducer/actions'
import {types} from '../../redux/reducer/types'
import Empty from '../../../../app/components/empty/empty';
import './states.list.scss'

const { SubMenu } = Menu;
const { Title } = Typography;

/**
 * @description State listing
 */

const StateList = ({loading, selectedOrg, states, selectedState}) => {
    
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('state')

    const handleClick = e => {
        setCurrent(e.key);
    };

    useEffect(() => {
        dispatch(getStates())
    }, [])

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
                </div>:
                <Menu
                    onClick={handleClick}
                    defaultSelectedKeys={['']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
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
})

export default connect(mapStateToProps)(StateList);

