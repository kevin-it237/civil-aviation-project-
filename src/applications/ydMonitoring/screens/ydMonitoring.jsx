import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect, useDispatch} from 'react-redux'
import './ydMonitoring.scss'


/**
 * @description YD monitoring screen
 */

const YDMonitoring = ({}) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])


    return (
        <div id="yd-monitoring-container">
           <h1>YDMonitoring</h1>
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

