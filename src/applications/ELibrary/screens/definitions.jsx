import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import { Typography, Divider, Input, Space, Modal  } from 'antd';

import MainHeader from '../../../app/components/mainHeader/mainHeader'
import './eLibrary.scss'
const { Title } = Typography;
const { Search } = Input;


/**
 * @description YD monitoring screen
 */

const Help = ({}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [definitions, setDefinitions] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSearch = value => console.log(value);

    return (
        <>
        <div id="elibrary-container">
            <MainHeader />
           <div className="definitions-container">
                <div className="definitions-list">
                    <Divider><Title level={3}>DEFINITIONS</Title></Divider>
                    <div className="search--box">
                        <Space direction="horizontal">
                            <Search placeholder="Search definition" allowClear onSearch={onSearch} style={{ width: 250 }} />
                        </Space>
                    </div>
                    <div className="definition-items">
                        <div onClick={showModal} className="def--item">
                            <Title level={5}>Definition Item</Title>
                        </div>
                        <div onClick={showModal} className="def--item">
                            <Title level={5}>Definition Item</Title>
                        </div>
                        <div onClick={showModal} className="def--item">
                            <Title level={5}>Definition Item</Title>
                        </div>
                        <div onClick={showModal} className="def--item">
                            <Title level={5}>Definition Item</Title>
                        </div>
                    </div>
                </div>
           </div>
        </div>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
        </>
    )
}



const mapStateToProps = ({ AuthReducer }) => ({
    
})

export default connect(mapStateToProps)(Help);

