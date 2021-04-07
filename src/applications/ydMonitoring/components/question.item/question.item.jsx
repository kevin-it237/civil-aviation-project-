import React, {useEffect, useState} from 'react'
import {useDispatch, connect} from 'react-redux'
import {getProvision} from '../../redux/reducer/actions'
import {types} from '../../redux/reducer/types'
import Loader from '../../../../app/components/loader/loader'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import { Radio, InputNumber, Modal, Typography  } from 'antd';
import { QuestionCircleFilled} from '@ant-design/icons';
import './question.item.scss'
const { Title } = Typography;

/**
 * @description content
 * @param {string} hardQuestion for displaying responded questions
 */

const QuestionItem = ({
    question, 
    onSelect, 
    selectedState, 
    kpiId, 
    className, 
    hardQuestion, 
    loadingProvision,
    provision}) => {
    const {questionnaire_text} = question
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [isChecked, setIsChecked] = useState(false)
    const [weightRes, setWeightRes] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isModalVisible) {
            dispatch(getProvision({instId: question?.YDMS_Inst_id, provisionNumber: question?.provision_id.trim()}))
        }
    }, [isModalVisible, dispatch])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
        <>
        <div className={`question-item ${className ? className: ''}`}>
            <div className="help--button"><QuestionCircleFilled onClick={showModal} /></div>
            <p className="question-label"><b>{question.YDMS_SP_id!=='YDMS_SP_01'&&`Q-${question.number}:`}</b> {questionText}</p>
            {
                question.YDMS_SP_id !== 'YDMS_SP_01'&&
                <div className="checkboxes">
                    {
                        question.ydmsKpiYDMSKPIsId === 'kpi_12' ?
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
        <Modal title="Article Appliance" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            {
                loadingProvision ? <Loader />:
                provision ? (
                    <div id="provision-content">
                        <h3>{provision?.article?.instrument?.instrument_name}</h3>
                        <p>{provision?.article?.instrument?.description}</p>
                        <h4><u><b>Article {provision?.article?.article_number}</b></u>: {provision?.article?.article_part !== 'nil' ? provision?.article?.article_part: provision?.article?.article_title}</h4>
                        <Title level={5}><b>{provision.provision_number}</b>: {provision.text_content}</Title>
                    </div>
                ): <span>No provision found</span>
            }
        </Modal>
        </>
    )
}

const mapStateToProps = ({ YDMonitoringReducer }) => ({
    provision: YDMonitoringReducer.provision,
    loadingProvision: checkIfLoader(YDMonitoringReducer, types.GET_PROVISION_REQUEST),
})

export default connect(mapStateToProps)(QuestionItem);

