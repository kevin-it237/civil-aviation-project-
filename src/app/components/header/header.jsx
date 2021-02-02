import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { PageHeader, Button } from "antd";
import {connect, useDispatch} from 'react-redux'

import './header.scss'


/**
 * @description Header
 * @param {string} page yd or saatm
 */

const Header = ({selectedOrg, kpi, selectedState, page}) => {
    
    const dispatch = useDispatch()

    const logout = () => {
        dispatch()
    }

    useEffect(() => {
        
    }, [])

console.log(kpi);


    return (
        <div className="header">
            <Link className="back" to='/'>Back to Home</Link>
            {
                page === 'yd' ?
                <>
                    {/* <p className="state-label">State:</p> */}
                    <PageHeader
                        title={`State: ${selectedState?selectedState.full_name.toUpperCase():'No selected state'}`}
                        extra={[
                            <Button key="2">My Account</Button>,
                            <Button onClick={logout} key="1" type="primary">Logout</Button>,
                        ]}
                        >
                    </PageHeader>
                </>
                :
                <PageHeader
                    title={`${selectedOrg.toUpperCase()} / ${kpi?.KPIs_label}`}
                    extra={[
                        <Button key="2">My Account</Button>,
                        <Button onClick={logout} key="1" type="primary">Logout</Button>,
                    ]}
                    >
                </PageHeader>
            }
        </div>
    )
}



const mapStateToProps = ({ AuthReducer, YDMonitoringReducer, SAATMDashboardReducer }) => ({
    user: AuthReducer.user,
    kpi: SAATMDashboardReducer.kpi,
    selectedOrg: YDMonitoringReducer.selectedOrg,
    selectedState: YDMonitoringReducer.selectedState,
})

export default connect(mapStateToProps)(Header);

