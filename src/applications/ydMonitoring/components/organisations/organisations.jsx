import React, {useEffect, useState} from 'react'
import { Menu  } from "antd";
import {connect, useDispatch} from 'react-redux'
import { FlagFilled } from '@ant-design/icons';
import {getStates, getKPIs, selectOrgType} from '../../redux/reducer/actions'
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

    const handleSelectOrg = (org) => {
        dispatch(selectOrgType(org))
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
                    <Menu.Item onClick={() => handleSelectOrg('state')} key={0}>States/CAA</Menu.Item>
                    {/* <Menu.Item onClick={() => handleSelectOrg('afcac')} key={1}>EA</Menu.Item>
                    <Menu.Item onClick={() => handleSelectOrg('airline')} key={2}>Airline</Menu.Item> */}
                </SubMenu>
            </Menu>
        </div>
    )
}



const mapStateToProps = ({ YDMonitoringReducer }) => ({
    states: YDMonitoringReducer.states,
})

export default connect(mapStateToProps)(Organisations);

