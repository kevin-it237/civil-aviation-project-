import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Typography, Divider } from 'antd';
import Loader from '../../../../app/components/loader/loader'
import './articleContent.scss'
const { Title } = Typography;

/**
 * @description content
 */

const ArticleContent = ({instruments, loading, provisions}) => {

    return (
        <>
        <div className="article-content">
            <div className="title">
                <Divider><Title level={3}>YD INSTRUMENTS/ REGULATIONS</Title></Divider>
            </div>
            <div><Divider><b>Provisions</b></Divider></div>
            {loading ? <div className='loader--wrapper'><Loader /></div>:
            <div className="article-items">
                {
                    provisions.map(provision => (
                        <div key={provision.provision_id} className="article--item">
                            <Title level={5}><b>{provision.provision_number}</b>: {provision.text_content}</Title>
                        </div>
                    ))
                }
            </div>
            }
        </div>
        </>
    )
}

const mapStateToProps = ({ ELibraryReducer }) => ({
    instruments: ELibraryReducer.instruments,
})

export default connect(mapStateToProps)(ArticleContent);

