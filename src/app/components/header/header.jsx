import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { PageHeader, Button, Descriptions } from "antd";
import {connect, useDispatch} from 'react-redux'

import './header.scss'


/**
 * @description Header
 */

const Header = ({selectedOrg, kpi}) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])



    return (
        <div className="header">
            <Link className="back" to='/'>Back to Home</Link>
            <PageHeader
                title={`${selectedOrg.toUpperCase()} - ${kpi?.KPIs_label}`}
                extra={[
                    <Button key="2">My Account</Button>,
                    <Button key="1" type="primary">Logout</Button>,
                ]}
                >
            </PageHeader>
        </div>
    )
}



const mapStateToProps = ({ AuthReducer, YDMonitoringReducer }) => ({
    user: AuthReducer.user,
    kpi: YDMonitoringReducer.kpi,
    selectedOrg: YDMonitoringReducer.selectedOrg,
})

export default connect(mapStateToProps)(Header);

