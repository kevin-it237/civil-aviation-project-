import React, {useEffect, useState} from 'react'
import {connect, useDispatch, useStore} from 'react-redux'
import InstumentsList from '../components/sections.list/instruments.list'
import ArticleContent from '../components/helpContent/articleContent'
import MainHeader from '../../../app/components/mainHeader/mainHeader'
import {getInstruments} from '../redux/reducer/actions'
import {types} from '../redux/reducer/types'
import {checkIfLoader} from '../redux/reducer/reducer.helper'
import './eLibrary.scss'


/**
 * @description Instruments, articles, provisions
 */

const Instrument = ({instruments, loading}) => {
    
    const [provisions, setProvisions] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getInstruments())
    }, [])

    return (
        <div id="elibrary-container">
            <MainHeader />
            <div className="elibrary-content-wrapper">
                <div className="elibrary-left-panel">
                    <div className="sections-listing">
                        <InstumentsList setProvisions={setProvisions} />
                    </div>
                </div>
                <div className="data-content">
                    <div className="content-container">
                        <ArticleContent loading={loading} provisions={provisions} />
                    </div>
                </div>
            </div>
        </div>
    )
}



const mapStateToProps = ({ ELibraryReducer }) => ({
    instruments: ELibraryReducer.instruments,
    loading: checkIfLoader(ELibraryReducer, types.GET_DEFINITIONS_REQUEST)
})

export default connect(mapStateToProps)(Instrument);

