import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { Button, DatePicker, Menu  } from "antd";
import {connect, useDispatch} from 'react-redux'
import Organisations from '../components/organisations/organisations'
import KPIsList from '../components/kpis.list/kpis.list'
import Header from '../../../app/components/header/header'
import Content from '../components/content/content'
import './ydMonitoring.scss'

const { SubMenu } = Menu;


/**
 * @description YD monitoring screen
 */

const YDMonitoring = ({}) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

    return (
        <div id="yd-monitoring-container">
            <div className="right-panel">
              <div className="content">
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

YDMonitoring.propTypes = {
    user: PropTypes.object,
}

const mapStateToProps = ({ AuthReducer }) => ({
    user: AuthReducer.user,
})

export default connect(mapStateToProps)(YDMonitoring);

