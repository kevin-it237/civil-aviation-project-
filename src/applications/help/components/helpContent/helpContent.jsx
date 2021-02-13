import React, {useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import { Typography } from 'antd';
import './helpContent.scss'
const { Title } = Typography;

/**
 * @description content
 */

const HelpContent = ({page}) => {
    
    const dispatch = useDispatch()
console.log(page);
    return (
        <div className="help-content">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At illum fugit nam deserunt voluptatum adipisci minima quaerat accusantium quibusdam cumque id nobis dolore, ab aut eveniet est quisquam tenetur accusamus?</p>
        </div>
    )
}

const mapStateToProps = ({ HelpReducer }) => ({
    page: HelpReducer.page
})

export default connect(mapStateToProps)(HelpContent);

