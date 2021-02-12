import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect, useDispatch} from 'react-redux'
import Organisations from '../components/organisations/organisations'
import KPIsList from '../components/kpis.list/kpis.list'
import Header from '../../../app/components/header/header'
import StateContent from '../components/content/state.content'
import AfcacContent from '../components/content/afcac.content'
import './saatmDashboard.scss'


/**
 * @description SAATM Dashboard screen
 */

const SaatmDashboard = ({selectedOrg}) => {
    
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
            <div className="left-panel">
              <div className="org-kpis-content">
                <div className="org-listing">
                    <Organisations />
                </div>
                <div className="line"></div>
                <div className="kpis-listing">
                    <KPIsList />
                </div>
              </div>
            </div>
            <div className="data-content">
                <Header />
                {content}
            </div>
        </div>
    )
}

SaatmDashboard.propTypes = {
    user: PropTypes.object,
}

const mapStateToProps = ({ AuthReducer, SAATMDashboardReducer }) => ({
    user: AuthReducer.user,
    selectedOrg: SAATMDashboardReducer.selectedOrg,
})

export default connect(mapStateToProps)(SaatmDashboard);

