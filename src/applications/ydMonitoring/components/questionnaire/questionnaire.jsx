import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getQuestionnaire, getOrgResponses, saveResponse} from '../../redux/reducer/actions'
import Loader from '../../../../app/components/loader/loader'
import QuestionItem from '../question.item/question.item'
import Empty from '../../../../app/components/empty/empty'
import {useHistory} from 'react-router-dom'
import { Button, Divider, Progress, message } from 'antd';
import useError from '../../hooks/useError'
import useResponseSuccess from '../../hooks//useResponseSuccess'
import {types} from '../../redux/reducer/types'
import './questionnaire.scss'

/**
 * @description content
 */

const Questionnaire = ({
    questions, 
    loading, 
    selectedOrg, 
    loadingStates, 
    selectedState, 
    orgResponses, 
    loadingOrgResponses, 
    saving,
    error,
    success}) => {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [questionsToDisplay, setQuestionsToDisplay] = useState([]) // filtered questions
    const [startIndex, setStartIndex] = useState(0) // Starting index
    const [onScreenQuestions, setOnScreenQuestions] = useState([])

    const [totalQUestionsAnwserd, setTotalQUestionsAnwserd] = useState(0)

    const [userResponses, setUserResponses] = useState([])

    useEffect(() => {
        if(!questions.length) {
            dispatch(getQuestionnaire())
        }
    }, [])

    useEffect(() => {
        if(questions.length && selectedState) {
            cookNotAnsweredQuestions()
        }
        if(orgResponses) {
            setTotalQUestionsAnwserd(orgResponses.length)
        }
    }, [questions, orgResponses])
    
    useEffect(() => {
        if(selectedState) {
            dispatch(getOrgResponses(selectedState.YDMS_AU_id))
        }
    }, [selectedState])

    useEffect(() => {
        if(questionsToDisplay.length) {
            displayFiveNextQuestions()
        }
    }, [questionsToDisplay])

    useEffect(() => {
        displayFiveNextQuestions()
    }, [startIndex])

    useEffect(() => {
        if(onScreenQuestions.length === 0) {
            setStartIndex(0)
        }
    }, [onScreenQuestions])

    const displayFiveNextQuestions = () => {
        const questions = questionsToDisplay.slice(startIndex, startIndex+5)
        setOnScreenQuestions(questions)
    }

    const cookNotAnsweredQuestions = () => {
        // Remove questions that user has already anwsered
        let data = questions.filter(question => {
            const response = orgResponses.find(res => res.surveyProtocolYDMSSPId === question.YDMS_SP_id)
            return !!!response
        })

        // Non SAATM members cannot answer to KPI_4 SP
        if(!selectedState.SAATM_membership) {
            data = data.filter(question => question.YDMSKPIYDMSKPIsId !== 'kpi_4')
        }

        // Non SAATM members cannot answer to KPI_2 SP
        if(!selectedState.SAATM_membership) {
            data = data.filter(question => question.YDMSKPIYDMSKPIsId !== 'kpi_2')
        }

        // Remove questions related to the given state
        const finalData = data.filter(q => {
            return !q.questionnaire_text.toLowerCase().includes(selectedState.short_name.toLowerCase()) &&
            !q.questionnaire_text.toLowerCase().includes(selectedState.full_name.toLowerCase())
        })
        console.log(finalData.length)
        setQuestionsToDisplay(finalData)
    }

    const submit = () => {
        // Save responses
        dispatch(saveResponse(userResponses))
    }

    const onCheck = (response) => {
        const userRes = {
            ...response,
            YDMS_Org_id: selectedState.YDMS_AU_id
        }
        const exist = userResponses.find(res => res.YDMS_SP_id === userRes.YDMS_SP_id)

        if(exist) {
            // Update the response
            const responses = [...userResponses].map(res => {
                if(res.YDMS_SP_id === userRes.YDMS_SP_id) {
                    res = userRes
                }
                return res
            })
            setUserResponses([...responses])
        } else { // Add new response
            setUserResponses((userResponses) => [...userResponses, userRes])
        }
    }

    const refresh= () => {
        if(selectedState) {
            if(!questions.length) dispatch(getQuestionnaire()) // Fetch questions
            dispatch(getOrgResponses(selectedState.YDMS_AU_id)) // Fetch questions
        }
    }

    // const clearResponse = () => {
    //     // reload questions
    //     setUserResponses([])
    // }

    useError(error, [() => message.error('An error occured.')]); 

    useResponseSuccess(success, 
        [() => {
        message.success('Saved succesfully.');
        
        // Remove answered questions
        const remainingQuestions = questionsToDisplay.filter(q => {
            const question = userResponses.find(res => res.YDMS_SP_id === q.YDMS_SP_id)
            return !!!question
        })
        setQuestionsToDisplay(remainingQuestions)
    },
    () => {
        // Display next questions
        setStartIndex(startIndex + 5-userResponses.length)
        // displayFiveNextQuestions()
        setTotalQUestionsAnwserd(totalQUestionsAnwserd+userResponses.length)
        setUserResponses([])
    }]);

    if(loading || loadingOrgResponses) {
        return <Loader />
    }

    if(selectedState && questionsToDisplay.length === 0 && !loading && !loadingOrgResponses) {
        return (
            <div className="completed--res">
                <Progress
                    type="circle"
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={100} />
                <p style={{textAlign: 'center'}}>You answered all the questions.</p>
            </div>
        )
    }

    if(questionsToDisplay.length === 0 && !loading && !loadingOrgResponses) {
        return (
            <div style={{height: '80%', margin: '0 20px'}}>
                <Empty text={"Please select an organisation or"} fetch={refresh} />
                {/* <p style={{textAlign: 'center'}}>You answered all the questions.</p> */}
            </div>
        )
    }
    
    return (
        <div className="yd-monitoring-content">
            <div className="divider-item">
                {totalQUestionsAnwserd} Questions answered.
                <Progress percent={parseInt(100*totalQUestionsAnwserd/(totalQUestionsAnwserd+questionsToDisplay.length))} 
                    size="small" status="active" />
                <Divider>Respond to questions and save to continue</Divider>
            </div>
            <div className="questions-list">
                {
                    onScreenQuestions.map(question => 
                    <QuestionItem onSelect={onCheck} key={question.YDMS_SP_id} question={question} />)
                }
            </div>
            
            <div className="buttons">
                {/* <Button type="secondary" size="large" onClick={clearResponse}>
                    Clear
                </Button> */}
                <Button 
                    type="primary" 
                    size="large" 
                    loading={saving} 
                    disabled={saving}
                    onClick={submit}>
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
    error: YDMonitoringReducer.error,
    success: YDMonitoringReducer.success,
    selectedState: YDMonitoringReducer.selectedState,
    orgResponses: YDMonitoringReducer.orgResponses,
    loadingStates: checkIfLoader(YDMonitoringReducer, types.GET_STATES_REQUEST),
    loading: checkIfLoader(YDMonitoringReducer, types.GET_QUESTIONNAIRE_REQUEST),
    loadingOrgResponses: checkIfLoader(YDMonitoringReducer, types.GET_ORG_RESPONSES_REQUEST),
    saving: checkIfLoader(YDMonitoringReducer, types.SAVE_RESPONSE_REQUEST),
})

export default connect(mapStateToProps)(Questionnaire);

