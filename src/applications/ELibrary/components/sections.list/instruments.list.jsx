import React, {useState} from 'react'
import { Menu, Divider } from "antd";
import {connect, useDispatch} from 'react-redux'
import { QuestionCircleFilled} from '@ant-design/icons';
import './instruments.list.scss'

const { SubMenu } = Menu;


/**
 * @description Instrument content
 */

const Sections = ({instruments, setInstrument, setArticle}) => {
    
    const dispatch = useDispatch()

    const handleSelectArticle = (inst, article) => {
        setInstrument(inst)
        setArticle(article)
    }

    return (
        <div className="sections">
             <Menu
                style={{ width: '100%' }}
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['sub0']}
                mode="inline"
            >
                {
                    instruments.map((inst, i) => (
                        <SubMenu key={`sub${i}`} icon={<QuestionCircleFilled />} title={inst.instrument_name}>
                            <Divider>Articles</Divider>
                            {
                                inst.articles.map((article, i) => (
                                    <Menu.Item onClick={() => handleSelectArticle(inst, article)} key={i}>
                                        {article.article_number}: {article.article_title}
                                    </Menu.Item>
                                ))
                            }
                        </SubMenu>      
                    ))
                }
            </Menu>
        </div>
    )
}

const mapStateToProps = ({ ELibraryReducer }) => ({
    instruments: ELibraryReducer.instruments,
})

export default connect(mapStateToProps)(Sections);

