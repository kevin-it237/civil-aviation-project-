import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect, useDispatch} from 'react-redux'
import Organisations from '../components/organisations/organisations'
import StateList from '../components/states.list/states.list'
import Header from '../../../app/components/header/header'
import Questionnaire from '../components/questionnaire/questionnaire'
import MainHeader from '../../../app/components/mainHeader/mainHeader'
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
            <MainHeader />
            <div className="yd-monitoring-content-wrapper">
                <div className="yd-left-panel">
                <div className="org-states-content">
                    <div className="org-listing">
                        <Organisations />
                    </div>
                    <div className="line"></div>
                    <div className="states-listing">
                        <StateList />
                    </div>
                </div>
                </div>
                <div className="data-content">
                    <Header page="yd" />
                    <div className="content-container">
                        <Questionnaire />
                    </div>
                </div>
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

