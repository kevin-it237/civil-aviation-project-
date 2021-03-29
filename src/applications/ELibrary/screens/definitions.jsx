import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import { Typography, Divider, Input, Space, Modal  } from 'antd';
import MainHeader from '../../../app/components/mainHeader/mainHeader'
import {getDefinitions} from '../redux/reducer/actions'
import Loader from '../../../app/components/loader/loader'
import {types} from '../redux/reducer/types'
import {checkIfLoader} from '../redux/reducer/reducer.helper'
import './eLibrary.scss'
const { Title } = Typography;
const { Search } = Input;


/**
 * @description YD monitoring screen
 */

const Definitions = ({definitions, loading}) => {
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [definitionsList, setDefinitions] = useState(definitions)
    const [selectedTerm, setSelectedTerm] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDefinitions())
    }, [])

    useEffect(() => {
        if(definitions.length) {
            setDefinitions(definitions)
        }
    }, [definitions])

    const showModal = (term) => {
        setIsModalVisible(true);
        setSelectedTerm(term)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const filterList = (value) => {
        const items = definitions.filter(def => def.term.toLowerCase().includes(value.toLowerCase()))
        setDefinitions(items)
    }

    const onSearch = value => filterList(value);

    return (
        <>
        <div id="elibrary-container">
            <MainHeader />
           <div className="definitions-container">
                <div className="definitions-list">
                    <Divider><Title level={3}>DEFINITIONS</Title></Divider>
                    <div className="search--box">
                        <Space direction="horizontal">
                            <Search 
                                onChange={(e) => filterList(e.target.value)}
                                placeholder="Search definition" 
                                allowClear onSearch={onSearch} 
                                style={{ width: 250 }} />
                        </Space>
                    </div>
                    {loading ? <div className='loader--wrapper'><Loader /></div>:
                    definitionsList&&definitionsList.length === 0? <div className='not-found'>No item found.</div>:
                    <div className="definition-items">
                        {
                            definitionsList.map(def => (
                                <div key={def.YDMS_Def_id} onClick={() => showModal(def)} className="def--item">
                                    <Title level={5}>{def.term}</Title>
                                </div>
                            ))
                        }
                    </div>
                    }
                </div>
           </div>
        </div>
        <Modal cancelText={false} cancelButtonProps={false} title="Definition" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            {selectedTerm&&
            <div>
                <h2 style={{fontWeight: 'bold', fontSize: '16px', marginBottom: '10px'}}>{selectedTerm.term}:</h2>
                <p>{selectedTerm.definition}</p>
            </div>}
        </Modal>
        </>
    )
}



const mapStateToProps = ({ ELibraryReducer }) => ({
    definitions: ELibraryReducer.definitions,
    loading: checkIfLoader(ELibraryReducer, types.GET_DEFINITIONS_REQUEST)
})

export default connect(mapStateToProps)(Definitions);

