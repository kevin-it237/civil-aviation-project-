import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect, useDispatch} from 'react-redux'
import Organisations from '../components/organisations/organisations'
import StateList from '../components/states.list/states.list'
import Header from '../../../app/components/header/header'
import Questionnaire from '../components/questionnaire/questionnaire'
import MainHeader from '../../../app/components/mainHeader/mainHeader'
import {selectOrgType, selectState, getStates} from '../redux/reducer/actions'
import './ydMonitoringDashboard.scss'


/**
 * @description YD monitoring screen
 */

const YDMonitoringDashboard = ({user, organisations, states}) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        if(!states.length) {
            dispatch(getStates())
        }
    }, [])

    useEffect(() => {
        if(user) {
            if(user.role === 'ea') {
                dispatch(selectOrgType('afcac'))
            } else {
                dispatch(selectOrgType('state'))
            }
        }
    }, [user, organisations, dispatch])

    useEffect(() => {
        if(states.length) {
            if(user && (user.role === 'state' || user.role === 'admin')) {
                const state = states.find(st => st.short_name === user.short_name)
                dispatch(selectState(state))
            }
        }
    }, [states, user, dispatch])

    return (
        <div id="yd-monitoring-container">
            <MainHeader />
            <div className="yd-monitoring-content-wrapper">
                {
                    user.role === 'admin' ?
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
                    </div>:
                     <div className="yd-left-panel left-panel-single-column">
                        <div className="org-states-content">
                            <div className="states-listing">
                                <StateList />
                            </div>
                        </div>
                    </div>
                }
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

const mapStateToProps = ({ AuthReducer, YDMonitoringReducer }) => ({
    user: AuthReducer.user,
    organisations: YDMonitoringReducer.organisations,
    states: YDMonitoringReducer.states,
})

export default connect(mapStateToProps)(YDMonitoringDashboard);

