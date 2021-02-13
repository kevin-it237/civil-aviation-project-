import React, {useEffect} from 'react'
import {connect, useDispatch} from 'react-redux'
import Sections from '../components/sections.list/sections.list'
import HelpContent from '../components/helpContent/helpContent'
import MainHeader from '../../../app/components/mainHeader/mainHeader'
import './help.scss'


/**
 * @description YD monitoring screen
 */

const Help = ({}) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

    return (
        <div id="help-container">
            <MainHeader />
            <div className="help-content-wrapper">
                <div className="help-left-panel">
                    <div className="org-sections-content">
                        <div className="sections-listing">
                            <Sections />
                        </div>
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

