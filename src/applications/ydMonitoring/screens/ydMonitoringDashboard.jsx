import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect, useDispatch} from 'react-redux'
import Organisations from '../components/organisations/organisations'
import KPIsList from '../components/kpis.list/kpis.list'
import Header from '../../../app/components/header/header'
import Questionnaire from '../components/questionnaire/questionnaire'
import './ydMonitoringDashboard.scss'


/**
 * @description YD monitoring screen
 */

const YDMonitoringDashboard = ({}) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

    return (
        <div id="yd-monitoring-container">
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
                <Questionnaire />
            </div>
        </div>
    )
}

YDMonitoringDashboard.propTypes = {
    user: PropTypes.object,
}

const mapStateToProps = ({ AuthReducer }) => ({
    user: AuthReducer.user,
})

export default connect(mapStateToProps)(YDMonitoringDashboard);

