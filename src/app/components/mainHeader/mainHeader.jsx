import React, {useEffect} from 'react'
import {NavLink, Link} from 'react-router-dom'
import { PageHeader, Button } from "antd";
import {connect, useDispatch} from 'react-redux'

import './mainHeader.scss'


/**
 * @description Header
 * @param {string} page yd or saatm
 */

const MainHeader = ({user}) => {
    
    const dispatch = useDispatch()

    const logout = () => {
        dispatch()
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className="main-header">
            <Link to='/' className="logo">Home</Link>
            <div className="header-right">
                <NavLink exact={true} to='/yd-monitoring'>YD Monitoring System</NavLink>
                <NavLink exact={true} to='/saatm-dashboard'>SAATM Dashboard</NavLink>
                {user.role === 'admin'&&<NavLink exact={true} to='/administration'>Admin Dashboard</NavLink>}
                <NavLink exact={true} to='/help'>Help</NavLink>
                <NavLink exact={true} to='/logout'>Logout</NavLink>
            </div>
        </div>
    )
}



const mapStateToProps = ({ AuthReducer }) => ({
    user: AuthReducer.user,
})

export default connect(mapStateToProps)(MainHeader);

