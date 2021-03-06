import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import useError from '../../hooks/useError';
import Loader from '../../../../app/components/loader/loader'
import MainHeader from '../../../../app/components/mainHeader/mainHeader'
import {getStates, getUsers} from '../../redux/reducer/actions'
import {types} from '../../redux/reducer/types'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import { Menu, Divider } from 'antd';
import StateAccounts from '../../components/states.account/states.account'
import EAccounts from '../../components/ea.account/ea.account'
import OnlineUsers from '../../components/online.users/online.users'
import  Comments from '../../components/comments/comments'
import {
    UserOutlined,
    CommentOutlined
  } from '@ant-design/icons';
import './adminDashboard.scss'

const { SubMenu } = Menu;

const Login = ({ error, user, states, loadingStates, loadingUsers }) => {
    const dispatch = useDispatch()
    const [content, setContent] = useState("STATE_ACCOUNTS")

    useEffect(() => {
        dispatch(getStates())
        dispatch(getUsers())
    }, [])

    if(loadingStates || loadingUsers) {
        return <Loader />
    }

    let renderContent = <StateAccounts />
    if(content === 'STATE_ACCOUNTS') {
        renderContent = <StateAccounts />
    } else if(content === 'EA_ACCOUNTS') {
        renderContent = <EAccounts />
    } else if(content === 'ONLINE_USERS') {
        renderContent = <OnlineUsers />
    } else if(content === 'COMMENTS') {
        renderContent = <Comments />
    } else {
        renderContent = null
    }

    return (
        <div id="admin-dashboard">
            <MainHeader />
            <div className="admin-container">
                <div className="left-menu">
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="light"
                        inlineCollapsed={false}
                        >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Account Management">
                            <Menu.Item onClick={() => setContent('STATE_ACCOUNTS')} key="1">States Accounts</Menu.Item>
                            <Menu.Item onClick={() => setContent('EA_ACCOUNTS')} key="2">EA Account</Menu.Item>
                            <Menu.Item onClick={() => setContent('AIRLINE_ACCOUNTS')} key="3">Airline Accounts</Menu.Item>
                            <Menu.Item onClick={() => setContent('ONLINE_USERS')} key="4"><span id="online-circle"></span>Connected Users</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<CommentOutlined />} title="Comments">
                            <Menu.Item onClick={() => setContent('COMMENTS')} key="5">All comments</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>

                <div className="admin-content">
                    {renderContent}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ AuthReducer, AdminReducer }) => ({
    error: AuthReducer.error,
    user: AuthReducer.user,
    users: AdminReducer.users,
    states: AdminReducer.states,
    loadingStates: checkIfLoader(AdminReducer, types.ADMIN_GET_STATES_REQUEST),
    loadingUsers: checkIfLoader(AdminReducer, types.ADMIN_GET_USERS_REQUEST),
})
export default connect(mapStateToProps)(Login);