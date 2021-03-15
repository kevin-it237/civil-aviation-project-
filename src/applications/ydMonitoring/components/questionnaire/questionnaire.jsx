import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import {getQuestionnaire, getOrgResponses, saveResponse, getOrganisations, getOrgSPsAndResponses} from '../../redux/reducer/actions'
import Loader from '../../../../app/components/loader/loader'
import QuestionItem from '../question.item/question.item'
import Empty from '../../../../app/components/empty/empty'
import {useHistory} from 'react-router-dom'
import { Button, Divider, Progress, message, Typography } from 'antd';
import useError from '../../hooks/useError'
import useResponseSuccess from '../../hooks//useResponseSuccess'
import {types} from '../../redux/reducer/types'
import { FlagOutlined } from '@ant-design/icons';
import './questionnaire.scss'
const { Title } = Typography;

/**
 * @description content
 */

const Questionnaire = ({
    questions, 
    loading, 
    selectedOrg, 
    loadingStates, 
    loadingOrgs,
    selectedState, 
    orgResponses, 
    currentSection, 
    loadingOrgResponses, 
    saving,
    error,
    success,
    organisations,
    user,
    spsAndResponses,
    loadingSPsAndResponses}) => {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [questionsToDisplay, setQuestionsToDisplay] = useState([]) // filtered questions
    const [startIndex, setStartIndex] = useState(0) // Starting index
    const [onScreenQuestions, setOnScreenQuestions] = useState([])
    const [continueQues, setContinueQues] = useState(false)

    const [totalQUestionsAnwserd, setTotalQUestionsAnwserd] = useState(0)

    const [userResponses, setUserResponses] = useState([])

    useEffect(() => {
        if(!questions.length) {
            dispatch(getQuestionnaire())
        }
    }, [])

    useEffect(() => {
        dispatch(getOrganisations())
    }, [])

    useEffect(() => {
        // For state
        if(Object.keys(spsAndResponses).length && questions.length && selectedState && currentSection) {
            cookNotAnsweredQuestions()
        }
        // For afcac
        if(Object.keys(spsAndResponses).length && questions.length && selectedOrg==="afcac" && currentSection) {
            cookNotAnsweredQuestions()
        }
        if(orgResponses) {
            setTotalQUestionsAnwserd(orgResponses.length)
        }
    }, [questions, orgResponses, currentSection, selectedOrg, spsAndResponses])
    
    // Fetch org responses
    useEffect(() => {
        if(selectedOrg === "state") {
            if(selectedState) {
                dispatch(getOrgResponses(selectedState.YDMS_AU_id))
                dispatch(getOrgSPsAndResponses(selectedState.YDMS_AU_id))
            }
        } else if(selectedOrg === "afcac") {
            if(organisations.length) {
                const afcac = organisations.find(org => org.short_name.toLowerCase() === 'ea')
                dispatch(getOrgResponses(afcac.YDMS_Org_id))
                dispatch(getOrgSPsAndResponses(afcac.YDMS_Org_id))
            }
        }
    }, [selectedState, organisations, selectedOrg, currentSection])

    useEffect(() => {
        displayFiveNextQuestions()
    }, [questionsToDisplay])

    useEffect(() => {
        displayFiveNextQuestions()
    }, [startIndex])

    useEffect(() => {
        if(onScreenQuestions.length === 0) {
            setStartIndex(0)
        }
    }, [onScreenQuestions])

    useEffect(() => {
        setStartIndex(0)
    }, [currentSection])

    useEffect(() => {
        setContinueQues(false)
        return () => {
            setContinueQues(false)
        }
    }, [selectedState, selectedOrg])

    const displayFiveNextQuestions = () => {
        const questions = questionsToDisplay.slice(startIndex, startIndex+5)
        setOnScreenQuestions(questions)
    }

    // const groupQuestionsByKPI = (questions) => {
    //     const result = questions.reduce(function (r, a) {
    //         r[a.YDMSKPIYDMSKPIsId] = r[a.YDMSKPIYDMSKPIsId] || [];
    //         r[a.YDMSKPIYDMSKPIsId].push(a);
    //         return r;
    //     }, Object.create(null));
    //     return result
    // }

    const cookNotAnsweredQuestions = () => {

        // Just keep questions related to the current section
        let data = questions.filter(q => q.YDMSKPIYDMSKPIsId === currentSection.id)

        // Remove questions that user has already anwsered
        data = data.filter(question => {
            const response = orgResponses.find(res => res.surveyProtocolYDMSSPId === question.YDMS_SP_id)
            return !!!response
        })

        if(selectedOrg === 'state') {
            // Non SAATM members cannot answer to KPI_4 SP
            if(!selectedState.SAATM_membership) {
                data = data.filter(question => question.YDMSKPIYDMSKPIsId !== 'kpi_4')
            }
    
            // Non SAATM members cannot answer to KPI_2 SP
            if(!selectedState.SAATM_membership) {
                data = data.filter(question => question.YDMSKPIYDMSKPIsId !== 'kpi_2')
            }
    
            // Remove SP for KPI_0
            data = data.filter(question => question.YDMSKPIYDMSKPIsId !== 'kpi_0')
    
            // Remove KPI_12 SP
            // data = data.filter(question => question.YDMSKPIYDMSKPIsId !== 'kpi_12')
    
            // Non YD_Membership members cannot answer to other questions
            // if(!selectedState.YD_membership) {
            //     data = data.filter(question => ['kpi_0',  'kpi_1'].includes(question.YDMSKPIYDMSKPIsId))
            // }
    
            // Non SAATM members members cannot answer to other questions 
            // if(!selectedState.SAATM_membership) {
            //     data = data.filter(question => ['kpi_0',  'kpi_1'].includes(question.YDMSKPIYDMSKPIsId))
            // }

            const condition1 = (data, state) => !new RegExp("\\b" + state.full_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase())
        
            const condition2 =  (data, state) =>  !new RegExp("\\b" +state.full_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase()) && 
            !new RegExp("\\b" + state.short_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase())

            const condition3 = (data, state) => !new RegExp("\\b" + state.full_name.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase()) || 
            new RegExp("\\b" + 'Guinea Bissau'.toLowerCase() + "\\b").test(data.questionnaire_text.toLowerCase())
    
            // Remove questions related to the given state
            data = data.filter(q => {
                const stateShortName = selectedState.short_name
                if(stateShortName === 'Congo') {
                    return condition1(q, selectedState)
                } else if (stateShortName === 'Guinea') {
                    return condition3(q, selectedState)
                } else {
                    return condition2(q, selectedState)
                }
            })
        }

        // Numbered datas
        let finalData = data.map(q => {
            let n = q['YDMS_SP_id'].split("_")[2]
            if(n) {n = parseInt(n)
            } else { n = "#"}
            q.number = n
            return q
        });


        // Group questions by KPIs
        // finalData = groupQuestionsByKPI(finalData)

        finalData.sort((a, b) => {
            return parseInt(a.number) - parseInt(b.number);
        });

        setQuestionsToDisplay(finalData)
    }

    const submit = () => {
        // Save responses
        dispatch(saveResponse(userResponses))
    }

    const onCheck = (response) => {
        let userRes = {
            ...response,
        }
        if(selectedOrg === 'afcac') {
            const afcac = organisations.find(org => org.short_name.toLowerCase() === 'ea')
            userRes['YDMS_Org_id'] = afcac.YDMS_Org_id
        } else if(selectedOrg === 'state') {
            userRes['YDMS_Org_id'] = selectedState.YDMS_AU_id
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
            dispatch(getOrgResponses(selectedState.YDMS_AU_id)) // Fetch anwsered responses
            dispatch(getOrgSPsAndResponses(selectedState.YDMS_AU_id)) // Fetch anwsered responses and questions
        } else if(selectedOrg === 'afcac') {
            if(!questions.length) dispatch(getQuestionnaire()) // Fetch questions
            const afcac = organisations.find(org => org.short_name.toLowerCase() === 'ea')
            dispatch(getOrgResponses(afcac.YDMS_Org_id)) // Fetch anwsered responses
            dispatch(getOrgSPsAndResponses(afcac.YDMS_Org_id)) // Fetch anwsered responses and questions
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

    if(loading || loadingOrgResponses || loadingOrgs || loadingSPsAndResponses) {
        return <Loader />
    }

    // When user start anwsering to questions for the first time
    if(selectedOrg === 'state') {
        if(!selectedState && !loading && !loadingOrgResponses) {
            return (
                <div className="select-wrapper">
                    <FlagOutlined size={5} />
                    <Title level={4}>Please select a state</Title>
                </div>
            )
        }
    }

    // When user anwser to all the questions 1 because of kpi_0
    if(selectedOrg==='afcac' || selectedState) {
        if(questionsToDisplay.length === 0 && !loading && !loadingOrgResponses && !loadingSPsAndResponses) {
            return (
                <div className="completed--res">
                    <div className="sps-listing">
                        <h4>Questions List & Responses</h4>
                        {
                            Object.keys(spsAndResponses).length&&spsAndResponses.survey_protocols
                            .filter(q => q.sp_response.kpi_id === currentSection.id)
                            .map((question, i) => {
                                question.number = i+1
                                return (
                                    <QuestionItem 
                                        className='sp-responded'
                                        onSelect={onCheck} 
                                        hardQuestion={true}
                                        kpiId={currentSection.id}
                                        selectedState={selectedState}
                                        key={question.YDMS_SP_id} 
                                        question={question} />
                                )
                            })
                        }
                    </div>
                    <div style={{height: '20px'}}></div>
                    <Progress
                        size='small'
                        type="circle"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        percent={100} />
                    <p style={{textAlign: 'center'}}>You answered all the questions of this section.</p>
                    <div className="yd-menu">
                        <div className="yd-menu-2 yd-menu">
                            <h2>Review</h2>
                            <p>Review your responses/Stats.</p>
                        </div>
                        <div className="yd-menu-3 yd-menu">
                            <h2>Update</h2>
                            <p>Update your answers here.</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    // When user come again on the system, display a menu
    if(selectedOrg==='afcac' || selectedState) {
        if(questionsToDisplay.length > 0 && orgResponses.length > 0 && !loading && !loadingOrgResponses  && !continueQues) {
            return (
                <div className="yd-menu-wrapper">
                    <Divider>Select an option</Divider>
                    <div className="yd-menu">
                        <div 
                            onClick={() => setContinueQues(true)}
                            className="yd-menu-1 yd-menu">
                            <h2>Continue</h2>
                            <p>Continue to answser questionnaire.</p>
                        </div>
                        <div className="yd-menu-2 yd-menu">
                            <h2>Review</h2>
                            <p>Review your responses/Stats.</p>
                        </div>
                        <div className="yd-menu-3 yd-menu">
                            <h2>Update</h2>
                            <p>Update your answers here.</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    // When there is an error
    if(questionsToDisplay.length === 0 && !loading && !loadingOrgResponses && error) {
        return (
            <div style={{height: '80%', margin: '0 20px'}}>
                <Empty text={"Connexion error, please refresh."} fetch={refresh} />
            </div>
        )
    }

    return (
        <div className="yd-monitoring-content">
            <div className="divider-item">
                {/* {totalQUestionsAnwserd} Questions answered. */}
                <Progress percent={parseInt(100*totalQUestionsAnwserd/(totalQUestionsAnwserd+questionsToDisplay.length))} 
                    size="small" status="active" />
                <Divider>Respond to questions and save to continue</Divider>
            </div>
            <div className="questions-list">
                {
                    onScreenQuestions.map(question => 
                    <QuestionItem 
                        onSelect={onCheck} 
                        kpiId={currentSection.id}
                        selectedState={selectedState}
                        key={question.YDMS_SP_id} 
                        question={question} />)
                }
            </div>
            {
                onScreenQuestions.length > 0&&
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
            }
        </div>
    )
}

const mapStateToProps = ({ YDMonitoringReducer, AuthReducer}) => ({
    questions: YDMonitoringReducer.questions,
    spsAndResponses: YDMonitoringReducer.spsAndResponses,
    selectedOrg: YDMonitoringReducer.selectedOrg,
    error: YDMonitoringReducer.error,
    success: YDMonitoringReducer.success,
    selectedState: YDMonitoringReducer.selectedState,
    organisations: YDMonitoringReducer.organisations,
    currentSection: YDMonitoringReducer.currentSection,
    orgResponses: YDMonitoringReducer.orgResponses,
    loadingStates: checkIfLoader(YDMonitoringReducer, types.GET_STATES_REQUEST),
    loading: checkIfLoader(YDMonitoringReducer, types.GET_QUESTIONNAIRE_REQUEST),
    loadingOrgResponses: checkIfLoader(YDMonitoringReducer, types.GET_ORG_RESPONSES_REQUEST),
    loadingOrgs: checkIfLoader(YDMonitoringReducer, types.GET_ORGANISATIONS_REQUEST),
    saving: checkIfLoader(YDMonitoringReducer, types.SAVE_RESPONSE_REQUEST),
    loadingSPsAndResponses: checkIfLoader(YDMonitoringReducer, types.GET_SPS_AND_RESPONSES_REQUEST),
    user: AuthReducer.user,
})

export default connect(mapStateToProps)(Questionnaire);

