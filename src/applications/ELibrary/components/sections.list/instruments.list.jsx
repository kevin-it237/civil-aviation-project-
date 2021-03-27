import React, {useState} from 'react'
import { Menu  } from "antd";
import {connect, useDispatch} from 'react-redux'
import { QuestionCircleFilled} from '@ant-design/icons';
import './instruments.list.scss'

const { SubMenu } = Menu;


/**
 * @description Instrument content
 */

const INSTRUMENTS = [
    {
        id: 1,
        label: 'Instrument 1',
        code: 'inst_1',
        articles: [
            {
                id: 1,
                label: 'Article title'
            },
            {
                id: 2,
                label: 'Article title 2'
            },
        ]
    }
]

const Sections = ({}) => {
    
    const dispatch = useDispatch()

    const handleSelectArticle = (articleId) => {
        
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
                        INSTRUMENTS.map((inst, i) => (
                            <SubMenu key={`sub${i}`} icon={<QuestionCircleFilled />} title={inst.label}>
                                {
                                    inst.articles.map((article, i) => (
                                        <Menu.Item onClick={() => handleSelectArticle(article.id)} key={i}>{article.label}</Menu.Item>
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
   
})

export default connect(mapStateToProps)(Sections);

