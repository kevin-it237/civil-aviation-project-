import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Typography, Divider } from 'antd';
import Loader from '../../../../app/components/loader/loader'
import './articleContent.scss'
const { Title } = Typography;

/**
 * @description content
 */

const ArticleContent = ({instruments, loading, instrument, article}) => {

    return (
        <>
        <div className="article-content">
            <div className="title-box">
                <Divider><Title level={3}>YD INSTRUMENTS/ REGULATIONS</Title></Divider>
            </div>
            {loading ? <div className='loader--wrapper'><Loader /></div>:
            <>
                {(article && instrument)&&
                    <div className="article--title">
                    <h3>{instrument?.instrument_name}</h3>
                    <p>{instrument?.description}</p>
                    <h4><u>Article</u>: {article?.article_part}</h4>
                </div>}
                <div><Divider><b>Provisions</b></Divider></div>
                {(!article && !instrument)&&<p style={{textAlign: 'center'}}>Please select an Article.</p>}
                <div className="article-items">
                    {
                        article&&article.provisions.map(provision => (
                            <div key={provision.provision_id} className="article--item">
                                <Title level={5}><b>{provision.provision_number}</b>: {provision.text_content}</Title>
                            </div>
                        ))
                    }
                </div>
            </>
            }
        </div>
        </>
    )
}

const mapStateToProps = ({ ELibraryReducer }) => ({
    instruments: ELibraryReducer.instruments,
})

export default connect(mapStateToProps)(ArticleContent);

