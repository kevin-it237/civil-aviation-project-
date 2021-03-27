import React, {useState} from 'react'
import { Menu  } from "antd";
import {connect, useDispatch} from 'react-redux'
import { FlagFilled } from '@ant-design/icons';
import {selectOrg, getKPIs} from '../../redux/reducer/actions'
import './organisations.scss'

const { SubMenu } = Menu;


/**
 * @description YD monitoring screen
 */

const Organisations = ({states, user}) => {
    
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('states')

    const handleClick = e => {
        setCurrent(e.key);
    };

    // const selectCountry = (state) => {
    //     dispatch(selectState(state))
    // }

    const handleSelectOrg = (org) => {
        dispatch(selectOrg(org))
        dispatch(getKPIs(org))
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
                    {
                        user.role === 'admin'&&
                        <>
                            <Menu.Item onClick={() => handleSelectOrg('state')} key={0}>State/CAA KPIs</Menu.Item>
                            <Menu.Item onClick={() => handleSelectOrg('afcac')} key={1}>EA KPIs</Menu.Item>
                            <Menu.Item onClick={() => handleSelectOrg('airline')} key={2}>Airline KPIs</Menu.Item>
                        </>
                    }
                    {user.role==='ea'&&
                    <Menu.Item onClick={() => handleSelectOrg('afcac')} key={1}>EA KPIs</Menu.Item>
                    }
                    {user.role==='state'&&
                    <Menu.Item onClick={() => handleSelectOrg('state')} key={0}>State/CAA KPIs</Menu.Item>
                    }
                    {user.role==='airline'&&
                    <Menu.Item onClick={() => handleSelectOrg('airline')} key={2}>Airline KPIs</Menu.Item>
                    }
                </SubMenu>
            </Menu>
        </div>
    )
}



const mapStateToProps = ({ SAATMDashboardReducer, AuthReducer }) => ({
    states: SAATMDashboardReducer.states,
    user: AuthReducer.user
})

export default connect(mapStateToProps)(Organisations);

