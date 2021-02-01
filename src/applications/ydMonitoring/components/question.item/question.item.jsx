import React, {useEffect, useState} from 'react'
import { Radio, InputNumber  } from 'antd';
import './question.item.scss'

/**
 * @description content
 */

const QuestionItem = ({question, onSelect}) => {
    const {questionnaire_text} = question

    const [isChecked, setIsChecked] = useState(false)
    const [weightRes, setWeightRes] = useState(0)

    const onChange = e => {
        const response = {
            YDMS_SP_id: question.YDMS_SP_id,
            response: e.target.value,
            weight: weightRes
        }
        setIsChecked(e.target.value)
        onSelect(response)
    };

    // For kpi 12
    const respond = (value) => {
        const response = {
            YDMS_SP_id: question.YDMS_SP_id,
            response: 1,
            weight: value
        }
        onSelect(response)
        setWeightRes(value)
    }

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    
    return (
        <div className="question-item">
            <p className="question-label">{questionnaire_text}</p>
            <div className="checkboxes">
                {
                    question.YDMSKPIYDMSKPIsId === 'kpi_12' ?
                    <InputNumber min={0} max={100} defaultValue={0} onChange={(value) => respond(value)} />:
                    <Radio.Group onChange={onChange} value={isChecked}>
                        <Radio style={radioStyle} value={1}>
                            YES
                        </Radio>
                        <Radio style={radioStyle} value={0}>
                            NO
                        </Radio>
                    </Radio.Group>
                }
            </div>
        </div>
    )
}

export default QuestionItem;

