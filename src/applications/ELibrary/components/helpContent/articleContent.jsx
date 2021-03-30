import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { Typography, Divider, Input, Space } from 'antd';
import Loader from '../../../../app/components/loader/loader'
import './articleContent.scss'
const { Title } = Typography;
const { Search } = Input;

/**
 * @description content
 */

const ArticleContent = ({instruments, loading, instrument, article}) => {

    const [selectedArticle, setSelectedArticle] = useState(article)
    const [selectedInstrument, setSelectedInstrument] = useState(instrument)
    const [searchResult, setSearchResult] = useState([])
    const [searching, setSearching] = useState(false)
    const [fakeLoading, setFakeLoading] = useState(false)

    useEffect(() => {
        if(article) {
            setSelectedArticle(article)
        }
    }, [article])

    useEffect(() => {
        if(instrument) {
            setSelectedInstrument(instrument)
        }
    }, [instrument])

    const filterList = (value) => {
        setSearching(true)
        setFakeLoading(true)
        setTimeout(() => {
            setFakeLoading(false)
        }, 1000);
        let results = []

        instruments.forEach(instrument => {
            const articles = instrument.articles
            articles.forEach(article => {
                if(article.article_number.startsWith(value)) {
                    results.push({article, instrument})
                }
            });
        });
        setSearchResult(results)
    }

    const onSearch = value => filterList(value);

    const showProvisions = ({article, instrument}) => {
        setSelectedArticle(article)
        setSelectedInstrument(instrument)
        setSearching(false)
    }

    return (
        <>
        <div className="article-content">
            <div className="title-box">
                <Divider><Title level={3}>YD INSTRUMENTS/ REGULATIONS</Title></Divider>
            </div>
            <div className="search--box">
                <Space direction="horizontal">
                    <Search 
                        onChange={(e) => filterList(e.target.value)}
                        placeholder="Search by article number" 
                        allowClear onSearch={onSearch} 
                        style={{ width: 250 }} />
                </Space>
            </div>
            {(loading) ? <div className='loader--wrapper'><Loader /></div>:
            !searching?
            <>
                {(selectedArticle && instrument)&&
                <div className="article--title">
                    <h3>{selectedInstrument?.instrument_name}</h3>
                    <p>{selectedInstrument?.description}</p>
                    <h4><u>Article</u>: {selectedArticle?.article_part !== 'nil' ? selectedArticle?.article_part: selectedArticle?.article_title}</h4>
                </div>}
                <div><Divider><b>Provisions</b></Divider></div>
                {(!selectedArticle && !selectedInstrument)&&<p style={{textAlign: 'center'}}>Please select an Article.</p>}
                <div className="article-items">
                    {
                        selectedArticle&&selectedArticle.provisions.map(provision => (
                            <div key={provision.provision_id} className="article--item">
                                <Title level={5}><b>{provision.provision_number}</b>: {provision.text_content}</Title>
                            </div>
                        ))
                    }
                </div>
            </>:
            <div className="search--result">
                {   
                    fakeLoading ? <div className='loader--wrapper'><Loader /></div>:
                    searchResult.length === 0 ? 
                    <p className="no--result">No article found.</p>:
                    <div className="results--list">
                        {
                            searchResult.map((res, i) => (
                                <div key={i} onClick={() => showProvisions(res)} className="result--item">
                                    <Title level={5}><b>{res.article.article_number}</b>: {res.article.article_title}</Title>
                                </div>
                            ))
                        }
                    </div>
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

