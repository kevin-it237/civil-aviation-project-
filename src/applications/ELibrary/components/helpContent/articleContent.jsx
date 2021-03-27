import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Typography, Divider, Input, Space, Modal } from 'antd';
import './articleContent.scss'
const { Title } = Typography;
const { Search } = Input;

/**
 * @description content
 */

const ArticleContent = () => {

    // const onSearch = value => console.log(value);

    return (
        <>
        <div className="article-content">
            <div className="title">
                <Divider><Title level={3}>YD INSTRUMENTS/ REGULATIONS</Title></Divider>
            </div>
            {/* <div className="search--box">
                <Space direction="horizontal">
                    <Search placeholder="Search article" allowClear onSearch={onSearch} style={{ width: 250 }} />
                </Space>
            </div> */}
            <div><Divider><b>Provisions</b></Divider></div>
            
            <div className="article-items">
                <div className="article--item">
                    <Title level={5}>In the various types of information modal dialog, only one button to close dialog is provided.</Title>
                </div>
                <div className="article--item">
                    <Title level={5}>In the various types of information modal dialog, only one button to close dialog is provided.. In the various types of information modal dialog, only one button to close dialog is provided.</Title>
                </div>
                <div className="article--item">
                    <Title level={5}>In the various types of information modal dialog, only one button to close dialog is provided.</Title>
                </div>
                <div className="article--item">
                    <Title level={5}>In the various types of information modal dialog, only one button to close dialog is provided.</Title>
                </div>
            </div>
        </div>
        </>
    )
}

const mapStateToProps = ({ ELibraryReducer }) => ({
   
})

export default connect(mapStateToProps)(ArticleContent);

