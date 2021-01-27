import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getQuestionnaire, getOrgResponses} from '../../redux/reducer/actions'
import Loader from '../../../../app/components/loader/loader'
import QuestionItem from '../question.item/question.item'
import Empty from '../../../../app/components/empty/empty'
import {useHistory} from 'react-router-dom'
import { Button, Divider } from 'antd';
import {types} from '../../redux/reducer/types'
import './questionnaire.scss'
import { LoginOutlined } from '@ant-design/icons'

/**
 * @description content
 */

const Questionnaire = ({questions, loading, selectedOrg, loadingStates, selectedState, orgResponses, loadingOrgResponses}) => {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [questionsToDisplay, setQuestionsToDisplay] = useState([]) // filtered questions

    useEffect(() => {
        if(!questions.length) {
            dispatch(getQuestionnaire())
        }
    }, [])

    useEffect(() => {
        if(questions.length) {
            cookNotAnsweredQuestions()
        }
    }, [questions, orgResponses])
    
    useEffect(() => {
        if(selectedState) {
            dispatch(getOrgResponses(selectedState.YDMS_AU_id))
        }
    }, [selectedState])

    const cookNotAnsweredQuestions = () => {
        // Remove questions that user has already anwsered
        const data = questions.filter(question => {
            const response = orgResponses.find(res => res.surveyProtocolYDMSSPId === question.YDMS_SP_id)
            return !!!response
        })

        // Remove questions related to the give state
        const finalData = data.filter(q => {
            return !q.questionnaire_text.includes(selectedState.short_name)
        })

        setQuestionsToDisplay(finalData)
    }

    const refresh= () => {
        if(selectedState) {
            if(!questions.length) dispatch(getQuestionnaire()) // Fetch questions
            dispatch(getOrgResponses(selectedState.YDMS_AU_id)) // Fetch questions
        }
    }

    if(loading || loadingOrgResponses) {
        return <Loader />
    }

    if(questionsToDisplay.length === 0 && !loading && !loadingOrgResponses) {
        return (
            <div style={{height: '80%', margin: '0 20px'}}>
                <Empty fetch={refresh} />
                <p style={{textAlign: 'center'}}>You answered all the questions.</p>
            </div>
        )
    }
    
    return (
        <div className="yd-monitoring-content">
            <div className="divider-item">
                <Divider>Respond to questions and save to continue</Divider>
            </div>
            <div className="questions-list">
                {
                    questionsToDisplay.slice(0, 4).map(question => 
                    <QuestionItem key={question.YDMS_SP_id} question={question} />)
                }
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
    selectedState: YDMonitoringReducer.selectedState,
    orgResponses: YDMonitoringReducer.orgResponses,
    loadingStates: checkIfLoader(YDMonitoringReducer, types.GET_STATES_REQUEST),
    loading: checkIfLoader(YDMonitoringReducer, types.GET_QUESTIONNAIRE_REQUEST),
    loadingOrgResponses: checkIfLoader(YDMonitoringReducer, types.GET_ORG_RESPONSES_REQUEST),
})

export default connect(mapStateToProps)(Questionnaire);

