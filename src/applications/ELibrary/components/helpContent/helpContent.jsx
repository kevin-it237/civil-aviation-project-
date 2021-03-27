import React, {useState} from 'react'
import {connect} from 'react-redux'
import Technology from '../allcontents/technologies'
import {pages} from '../pages'
import './helpContent.scss'

/**
 * @description content
 */

const HelpContent = ({page}) => {

    return (
        <div className="help-content">
            <Technology page={page} />
        </div>
    )
}

const mapStateToProps = ({ HelpReducer }) => ({
    page: HelpReducer.page
})

export default connect(mapStateToProps)(HelpContent);

