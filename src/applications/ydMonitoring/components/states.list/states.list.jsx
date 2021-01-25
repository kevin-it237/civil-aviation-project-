import React, {useEffect, useState} from 'react'
import { Menu  } from "antd";
import {connect, useDispatch} from 'react-redux'
import { BulbFilled } from '@ant-design/icons';
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import Loader from '../../../../app/components/loader/loader'
import {getStates, selectState} from '../../redux/reducer/actions'
import {types} from '../../redux/reducer/types'
import Empty from '../../../../app/components/empty/empty';
import './states.list.scss'

const { SubMenu } = Menu;


/**
 * @description YD monitoring screen
 */

const KPIsList = ({loading, selectedOrg, states}) => {
    
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
             <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                defaultSelectedKeys={['']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" icon={<BulbFilled />} title="States">
                    {STATES}
                </SubMenu>
            </Menu>
        </div>
    )
}



const mapStateToProps = ({ YDMonitoringReducer }) => ({
    states: YDMonitoringReducer.states,
    loading: checkIfLoader(YDMonitoringReducer, types.GET_KPIS_REQUEST),
    selectedOrg: YDMonitoringReducer.selectedOrg,
})

export default connect(mapStateToProps)(KPIsList);

