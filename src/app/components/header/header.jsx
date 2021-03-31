import React, {useEffect} from 'react'
import { PageHeader } from "antd";
import {connect, useDispatch} from 'react-redux'

import './header.scss'


/**
 * @description Header
 * @param {string} page yd or saatm
 */

const Header = ({selectedOrg, kpi, selectedState, page, user}) => {
    
    const dispatch = useDispatch()

    const logout = () => {
        dispatch()
    }

    useEffect(() => {
        
    }, [])

    let headerName = selectedOrg
    if(user.role !== 'admin') {
        headerName = user.short_name
    }
    if(selectedOrg==='afcac') {
        headerName = 'EXECUTING AGENCY'
    }

    return (
        <div className="header">
            {
                page === 'yd' ?
                <>
                {
                   user.role === 'admin' ? 
                    <PageHeader
                        title={selectedOrg==='state'?`Member state: ${selectedState?selectedState.full_name.toUpperCase():'No selected state'}`:'EA'}
                        >
                    </PageHeader>:
                    <PageHeader title={user.short_name}></PageHeader>
                }
                </>
                :
                <PageHeader
                    title={`${headerName.toUpperCase()} / ${kpi?.KPIs_label}`}
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