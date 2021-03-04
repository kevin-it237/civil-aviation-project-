import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect, useDispatch} from 'react-redux'
import Organisations from '../components/organisations/organisations'
import KPIsList from '../components/kpis.list/kpis.list'
import Header from '../../../app/components/header/header'
import StateContent from '../components/content/state.content'
import AfcacContent from '../components/content/afcac.content'
import MainHeader from '../../../app/components/mainHeader/mainHeader'
import './saatmDashboard.scss'


/**
 * @description SAATM Dashboard screen
 */

const SaatmDashboard = ({selectedOrg, user}) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

    let content = null
    if(selectedOrg === 'state') {
        content = <StateContent />
    } else if(selectedOrg === "afcac") {
        content = <AfcacContent />
    }

    return (
        <div id="saatm-monitoring-container">
            <MainHeader />
            <div className="saatm-monitoring-content-wrapper" id={`${user.role === 'admin'?'':'saatm-monitoring-content-wrapper'}`}>
                <div className="left-panel">
                    {
                        user.role === 'admin' ?
                        <div className="org-kpis-content">
                            <div className="org-listing">
                                <Organisations />
                            </div>
                            <div className="line"></div>
                            <div className="kpis-listing">
                                <KPIsList />
                            </div>
                            </div>:
                        <div className="kpis-listing">
                            <KPIsList />
                        </div>
                    }
                </div>
                <div className="data-content">
                    <Header />
                    <div className="content-container">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ AuthReducer, SAATMDashboardReducer }) => ({
    user: AuthReducer.user,
    selectedOrg: SAATMDashboardReducer.selectedOrg,
})

export default connect(mapStateToProps)(SaatmDashboard);

