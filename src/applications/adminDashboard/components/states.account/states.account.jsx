import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import useError from '../../hooks/useError';
import useResponseSuccess from '../../hooks/useResponseSuccess'
import {createUserAccount, resetUserAccount} from '../../redux/reducer/actions';
import {types} from '../../redux/reducer/types';
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import { Button, Divider, Table, Space, Tag, message } from 'antd';
import './states.account.scss';
const { Column } = Table;

const StateAccounts = ({ error, user, states, users, success }) => {
    const dispatch = useDispatch()
    const [statesList, setStatesList] = useState([])

    useEffect(() => {
        displayStatesList()
    }, [users])

    const createAccount = (state) => {
        const user = {
            username: state.cc.toLowerCase(),
            email: "email@email.com",
            role: "state",
            short_name: state.name,
            password: `${state.cc.toLowerCase()}2021`,
            orgId: state.key
        }
        dispatch(createUserAccount(user))
    }

    const resetAccount = (state) => {
        const user = {
            username: state.cc.toLowerCase(),
            password: `${state.cc.toLowerCase()}2021`,
        }
        dispatch(resetUserAccount(user))
    }

    const displayStatesList = () => {
        const data = states.map(state => {
            const stateAccount = users.find(user => user.username.toLowerCase() === state.country_code.toLowerCase())
            if(stateAccount) {
                state = {...state, ...stateAccount}
            }
            return state
        })
        const arrayToDisplay = data.map((item, i) => {
            return {
                key: item.YDMS_AU_id,
                name: item.short_name,
                cc: item.country_code,
                username: item.username,
                role: 'state',
              }
        })
        setStatesList(arrayToDisplay)
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
    };

    useError(error, [() => message.error(error)])
    useResponseSuccess(success, [() => message.success(success)])

    return (
        <div id="admin-states">
            <Divider orientation="left">MANAGE STATE ACCOUNTS</Divider>
            <div className="table-container">
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    dataSource={statesList}>
                    <Column title="Short Name" dataIndex="name" key="1" />
                    <Column title="Country Code" dataIndex="cc" key="2" />
                    <Column
                        title="Role"
                        dataIndex="role"
                        key="3"
                        render={role => (
                            <Tag>{'state'}</Tag>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                {record.username ? 
                                    <Button 
                                        onClick={() => resetAccount(record)} 
                                        type="secondary" size="small" 
                                        loading={false}>Reset Account</Button>:
                                    <Button 
                                        onClick={() => createAccount(record)} 
                                        type="primary" size="small" 
                                        loading={false}>Create Account</Button>
                                }
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </div>
    )
}

const mapStateToProps = ({ AuthReducer, AdminReducer }) => ({
    error: AuthReducer.error,
    user: AuthReducer.user,
    users: AdminReducer.users,
    states: AdminReducer.states,
    success: AdminReducer.success,
    isCreating: checkIfLoader(AdminReducer, types.ADMIN_CREATE_USER_ACCOUNT_REQUEST)
})
export default connect(mapStateToProps)(StateAccounts);