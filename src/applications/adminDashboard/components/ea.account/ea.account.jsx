import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import useError from '../../hooks/useError';
import useResponseSuccess from '../../hooks/useResponseSuccess'
import {createUserAccount} from '../../redux/reducer/actions';
import {types} from '../../redux/reducer/types';
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import { Button, Divider, Table, Space, Tag, message } from 'antd';
import './ea.account.scss';
const { Column } = Table;


const EAccounts = ({ error, user, users, success }) => {
    const dispatch = useDispatch()
    const [EAList, setEAList] = useState([{
        key: '58',
        name: 'EA',
        fullName: 'Executing Agency',
        username: null,
        role: 'ea',
    }])

    useEffect(() => {
        processData()
    }, [users])

    const processData = () => {
        const EA = users.find(user => user.username.toLowerCase() === 'ea')
        if(EA) {
            setEAList([
                {
                    key: '58',
                    name: 'EA',
                    fullName: 'Executing Agency',
                    username: EA.username,
                    role: 'ea',
                }
            ])
        }
    }

    const createAccount = (ea) => {
        const user = {
            username: ea.name,
            email: "email@email.com",
            role: "ea",
            password: `${ea.name.toLowerCase()}2021`,
            orgId: ea.key
        }
        dispatch(createUserAccount(user))
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
        <div id="admin-ea">
            <Divider orientation="left">MANAGE EA ACCOUNT</Divider>
            <div className="table-container">
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    dataSource={EAList}>
                    <Column title="Short Name" dataIndex="name" key="1" />
                    <Column title="Full Name" dataIndex="fullName" key="2" />
                    <Column
                        title="Role"
                        dataIndex="role"
                        key="3"
                        render={role => (
                            <Tag>{'ea'}</Tag>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                {record.username ? 
                                    <Button 
                                        onClick={() => createAccount(record)} 
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
    success: AdminReducer.success,
})
export default connect(mapStateToProps)(EAccounts);