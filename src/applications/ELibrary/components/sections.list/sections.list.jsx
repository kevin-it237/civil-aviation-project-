import React, {useState} from 'react'
import { Menu  } from "antd";
import {connect, useDispatch} from 'react-redux'
import { QuestionCircleFilled} from '@ant-design/icons';
import {PAGES} from '../pages'
import './sections.list.scss'

const { SubMenu } = Menu;


/**
 * @description YD monitoring screen
 */

const Sections = ({states}) => {
    
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('states')

    const handleClick = e => {
        setCurrent(e.key);
    };

    const handleSelectPage = (page) => {
        
    }

    return (
        <div className="sections">
             <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" icon={<QuestionCircleFilled />} title="Helpers Sections">
                    {
                        Object.keys(PAGES).map((key, i) => (
                            <Menu.Item onClick={() => handleSelectPage(PAGES[key])} key={i}>{PAGES[key]}</Menu.Item>
                        ))
                    }
                </SubMenu>
            </Menu>
        </div>
    )
}

const mapStateToProps = ({ HelpReducer }) => ({
    page: HelpReducer.page
})

export default connect(mapStateToProps)(Sections);

