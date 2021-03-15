import React, {useEffect, useState} from 'react'
import { Radio, InputNumber  } from 'antd';
import './question.item.scss'

/**
 * @description content
 * @param {string} hardQuestion for displaying responded questions
 */

const QuestionItem = ({question, onSelect, selectedState, kpiId, className, hardQuestion}) => {
    const {questionnaire_text} = question

    const [isChecked, setIsChecked] = useState(false)
    const [weightRes, setWeightRes] = useState(0)

    const onChange = e => {
        const response = {
            YDMS_SP_id: question.YDMS_SP_id,
            response: e.target.value,
            weight: weightRes,
            kpi: kpiId
        }
        setIsChecked(e.target.value)
        onSelect(response)
    };

    // For kpi 12
    const respond = (value) => {
        const response = {
            YDMS_SP_id: question.YDMS_SP_id,
            response: 1,
            weight: value,
            kpi: kpiId
        }
        onSelect(response)
        setWeightRes(value)
    }

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    let questionText = questionnaire_text
    if(question.YDMS_SP_id === 'YDMS_SP_01') {
        if(selectedState.YD_membership) {
            questionText = `${selectedState.full_name} ${questionnaire_text}`
        } else {
            questionText = `${selectedState.full_name} is not ${questionnaire_text}`
        }
    }
    
    return (
        <div className={`question-item ${className ? className: ''}`}>
            <p className="question-label"><b>{question.YDMS_SP_id!=='YDMS_SP_01'&&`Q-${question.number}:`}</b> {questionText}</p>
            {
                question.YDMS_SP_id !== 'YDMS_SP_01'&&
                <div className="checkboxes">
                    {
                        question.YDMSKPIYDMSKPIsId === 'kpi_12' ?
                        <>
                            {hardQuestion ?
                            <h3>{question.sp_response.weight_response}</h3>:
                            <InputNumber min={0} max={100} defaultValue={0} onChange={(value) => respond(value)} />}
                        </>:
                        <>
                        {
                            hardQuestion ?
                            <Radio.Group onChange={onChange}>
                                <Radio style={radioStyle} checked={true}>
                                    {question.sp_response.questionnaire_response ? 'Yes': 'No'}
                                </Radio>
                            </Radio.Group>:
                            <Radio.Group onChange={onChange} value={isChecked}>
                                <Radio style={radioStyle} value={1}>
                                    YES
                                </Radio>
                                <Radio style={radioStyle} value={0}>
                                    NO
                                </Radio>
                            </Radio.Group>
                        }
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default QuestionItem;

