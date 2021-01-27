import React, {useEffect, useState} from 'react'
import { Radio } from 'antd';
import './question.item.scss'

/**
 * @description content
 */

const QuestionItem = ({question}) => {

    const [isChecked, setIsChecked] = useState(false)

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setIsChecked(e.target.value)
    };

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    
    return (
        <div className="question-item">
            <p className="question-label">
                Has the State ensured that all national Laws, Regulations, Rules, Policies are in conformity with the express provisions of the Yamoussoukro Decision?
            </p>
            <div className="checkboxes">
                <Radio.Group onChange={onChange} value={isChecked}>
                    <Radio style={radioStyle} value={1}>
                        YES
                    </Radio>
                    <Radio style={radioStyle} value={0}>
                        NO
                    </Radio>
                </Radio.Group>
            </div>
        </div>
    )
}

export default QuestionItem;

