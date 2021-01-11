import React, {useEffect, useState} from 'react'
import { PageHeader, Button, Descriptions } from "antd";
import {connect, useDispatch} from 'react-redux'
import { FlagFilled, GlobalOutlined, SettingOutlined } from '@ant-design/icons';

import './header.scss'


/**
 * @description Header
 */

const Header = ({}) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])



    return (
        <div className="header">
            <PageHeader
                title="Civil Aviation Data"
                extra={[
                    <Button key="2">My Account</Button>,
                    <Button key="1" type="primary">Logout</Button>,
                ]}
                >
            </PageHeader>
        </div>
    )
}



const mapStateToProps = ({ AuthReducer }) => ({
    user: AuthReducer.user,
})

export default connect(mapStateToProps)(Header);

