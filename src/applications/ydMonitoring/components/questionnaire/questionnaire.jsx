import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getKPIs} from '../../redux/reducer/actions'
import Loader from '../../../../app/components/loader/loader'
import QuestionItem from '../question.item/question.item'
import Empty from '../../../../app/components/empty/empty'
import {useHistory} from 'react-router-dom'
import { Button, Divider } from 'antd';
import {types} from '../../redux/reducer/types'
import './questionnaire.scss'

/**
 * @description content
 */

const Questionnaire = ({questions, loading, selectedOrg, loadingStates}) => {
    
    const dispatch = useDispatch()
    const history = useHistory()

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

    // if(questions.length === 0 && !loading) {
    //     return (
    //         <div style={{height: '80%', margin: '0 20px'}}>
    //             <Empty fetch={refresh} />
    //         </div>
    //     )
    // }
    
    return (
        <div className="yd-monitoring-content">
            <div className="divider-item">
                <Divider>Respond to questions and save to continue</Divider>
            </div>
            <div className="questions-list">
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
            </div>
            
            <div className="buttons">
                <Button type="secondary" size="large" onClick={(e) => console.log(e)}>
                    Clear
                </Button>
                <Button type="primary" size="large" loading={false} onClick={(e) => console.log(e)}>
                    Save/Next
                </Button>
                <Button danger size="large" onClick={(e) => history.push('/')}>
                    Exit
                </Button>
            </div>
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

