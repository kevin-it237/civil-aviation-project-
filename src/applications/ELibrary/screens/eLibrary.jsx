import React, {useEffect} from 'react'
import {connect, useDispatch} from 'react-redux'
import InstumentsList from '../components/sections.list/instruments.list'
import ArticleContent from '../components/helpContent/articleContent'
import MainHeader from '../../../app/components/mainHeader/mainHeader'
import './eLibrary.scss'


/**
 * @description YD monitoring screen
 */

const Help = ({}) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

    return (
        <div id="elibrary-container">
            <MainHeader />
            <div className="elibrary-content-wrapper">
                <div className="elibrary-left-panel">
                    <div className="sections-listing">
                        <InstumentsList />
                    </div>
                </div>
                <div className="data-content">
                    <div className="content-container">
                        <ArticleContent />
                    </div>
                </div>
            </div>
        </div>
    )
}



const mapStateToProps = ({ ELibraryReducer }) => ({
    
})

export default connect(mapStateToProps)(Help);

