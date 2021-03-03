import React, {useEffect} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {authLogout} from '../../../applications/auth/redux/reducer/actions'
import {connect, useDispatch} from 'react-redux'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './mainHeader.scss'


/**
 * @description Header
 * @param {string} page yd or saatm
 */

const MainHeader = ({user}) => {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        dispatch(authLogout())
        // setTimeout(() => {
        //     history.push('/')
        // }, 1000);
    }

    const menu = (
        <Menu>
          <Menu.Item>
            <NavLink exact={true} to='/profile'>Account</NavLink>
          </Menu.Item>
          <Menu.Item disabled>
            <NavLink exact={true} to='/'>other item</NavLink>
          </Menu.Item>
          <Menu.Item onClick={logout}>Logout</Menu.Item>
        </Menu>
    );

    return (
        <div className="main-header">
            <Link to='/' className="logo">Home</Link>
            <div className="header-right">
                <NavLink exact={true} to='/yd-monitoring'>YD Monitoring System</NavLink>
                <NavLink exact={true} to='/saatm-dashboard'>SAATM Dashboard</NavLink>
                {user.role === 'admin'&&<NavLink exact={true} to='/administration'>Admin Dashboard</NavLink>}
                <NavLink exact={true} to='/help'>Help</NavLink>
                <Dropdown overlay={menu}>
                    <NavLink 
                        className="ant-dropdown-link" 
                        onClick={e => e.preventDefault()}
                        exact={true} to='/logout'>{user.username.toUpperCase()} <DownOutlined /></NavLink>
                </Dropdown>
            </div>
        </div>
    )
}



const mapStateToProps = ({ AuthReducer }) => ({
    user: AuthReducer.user,
})

export default connect(mapStateToProps)(MainHeader);

