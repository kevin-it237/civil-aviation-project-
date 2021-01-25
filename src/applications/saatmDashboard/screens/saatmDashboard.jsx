import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect, useDispatch} from 'react-redux'
import Organisations from '../components/organisations/organisations'
import KPIsList from '../components/kpis.list/kpis.list'
import Header from '../../../app/components/header/header'
import Content from '../components/content/content'
import './saatmDashboard.scss'


/**
 * @description SAATM Dashboard screen
 */

const SaatmDashboard = ({}) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

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
                <Content />
            </div>
        </div>
    )
}

SaatmDashboard.propTypes = {
    user: PropTypes.object,
}

const mapStateToProps = ({ AuthReducer }) => ({
    user: AuthReducer.user,
})

export default connect(mapStateToProps)(SaatmDashboard);

