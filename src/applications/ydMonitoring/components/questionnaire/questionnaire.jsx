import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {selectKPI, getKPIs} from '../../redux/reducer/actions'
import { Alert } from 'antd';
import Loader from '../../../../app/components/loader/loader'
import Empty from '../../../../app/components/empty/empty'
import {types} from '../../redux/reducer/types'
import './questionnaire.scss'

/**
 * @description content
 */

const Questionnaire = ({questions, loading, selectedOrg, loadingStates}) => {
    
    const dispatch = useDispatch()

    const refresh= () => {
        if(selectedOrg) {
            // Fetch questions
        } else {
            dispatch(getKPIs('state'))
        }
    }

    if(loading) {
        return <Loader />
    }

    if(questions.length === 0 && !loading) {
        return (
            <div style={{height: '80%', margin: '0 20px'}}>
                <Empty fetch={refresh} />
            </div>
        )
    }
    
    return (
        <div className="yd-monitoring-content">
            
        </div>
    )
}



const mapStateToProps = ({ YDMonitoringReducer}) => ({
    questions: YDMonitoringReducer.questions,
    selectedOrg: YDMonitoringReducer.selectedOrg,
    loading: checkIfLoader(YDMonitoringReducer, ''),
    loadingStates: checkIfLoader(YDMonitoringReducer, types.GET_STATES_REQUEST),
})

export default connect(mapStateToProps)(Questionnaire);

