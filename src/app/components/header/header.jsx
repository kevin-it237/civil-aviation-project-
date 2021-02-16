import React, {useEffect} from 'react'
import { PageHeader } from "antd";
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

    return (
        <div className="header">
            {
                page === 'yd' ?
                <>
                    {/* <p className="state-label">State:</p> */}
                    <PageHeader
                        title={selectedOrg==='state'?`State: ${selectedState?selectedState.full_name.toUpperCase():'No selected state'}`:'EA'}
                        >
                    </PageHeader>
                </>
                :
                <PageHeader
                    title={`${'Executing Agency'.toUpperCase()} / ${kpi?.KPIs_label}`}
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

