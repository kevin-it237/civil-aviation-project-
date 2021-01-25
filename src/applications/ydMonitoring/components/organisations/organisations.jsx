import React, {useEffect, useState} from 'react'
import { Menu  } from "antd";
import {connect, useDispatch} from 'react-redux'
import { FlagFilled } from '@ant-design/icons';
import {getStates, getKPIs, selectOrg} from '../../redux/reducer/actions'
import './organisations.scss'

const { SubMenu } = Menu;


/**
 * @description YD monitoring screen
 */

const Organisations = ({states}) => {
    
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('states')

    const handleClick = e => {
        setCurrent(e.key);
    };

    // const selectCountry = (state) => {
    //     dispatch(selectState(state))
    // }

    const handleSelectOrg = (org) => {
        dispatch(getKPIs(org))
        dispatch(selectOrg(org))
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
                <SubMenu key="sub1" icon={<FlagFilled />} title="Organisations">
                    <Menu.Item onClick={() => handleSelectOrg('state')} key={0}>State/CAA KPIs</Menu.Item>
                    <Menu.Item onClick={() => handleSelectOrg('afcac')} key={1}>EA KPIs</Menu.Item>
                    <Menu.Item onClick={() => handleSelectOrg('airline')} key={2}>Airline KPIs</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
}



const mapStateToProps = ({ YDMonitoringReducer }) => ({
    states: YDMonitoringReducer.states,
})

export default connect(mapStateToProps)(Organisations);
