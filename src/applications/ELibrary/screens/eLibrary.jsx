import React, {useEffect} from 'react'
import {connect, useDispatch} from 'react-redux'
import Sections from '../components/sections.list/sections.list'
import HelpContent from '../components/helpContent/helpContent'
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
                        <Sections />
                    </div>
                </div>
                <div className="data-content">
                    <div className="content-container">
                        <HelpContent />
                    </div>
                </div>
            </div>
        </div>
    )
}



const mapStateToProps = ({ AuthReducer }) => ({
    
})

export default connect(mapStateToProps)(Help);

