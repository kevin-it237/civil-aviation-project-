import React, {useEffect, useState} from 'react'
import { Menu  } from "antd";
import {connect, useDispatch} from 'react-redux'
import { BulbFilled } from '@ant-design/icons';
import './kpis.list.scss'

const { SubMenu } = Menu;


/**
 * @description YD monitoring screen
 */

const KPIsList = ({}) => {
    
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('mail')

    useEffect(() => {
        
    }, [])

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };


    return (
        <div className="kpis">
             <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" icon={<BulbFilled />} title="All KPIs">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 2</Menu.Item>
                    <Menu.Item key="5">Option 2</Menu.Item>
                    <Menu.Item key="6">Option 2</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
}



const mapStateToProps = ({ AuthReducer }) => ({
    user: AuthReducer.user,
})

export default connect(mapStateToProps)(KPIsList);

