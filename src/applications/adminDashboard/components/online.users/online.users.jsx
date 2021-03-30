import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import useError from '../../hooks/useError';
import {types} from '../../redux/reducer/types';
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import { Divider, Table, Tag, message } from 'antd';
import './online.users.scss';
const { Column } = Table;


const EAccounts = ({ error, connectedUsers}) => {
    const dispatch = useDispatch()
    const [onlineUsers, setOnlineUsers] = useState([])
    console.log(connectedUsers)
    useEffect(() => {
        processData()
    }, [connectedUsers])

    const processData = () => {
        console.log(connectedUsers)
        const users = connectedUsers
        .filter(user => user.role !== 'admin')
        .map(user => ({
            key: user.id,
            name: user.short_name,
            role: user.role,
        }))
        setOnlineUsers(users)
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


    return (
        <div id="admin-ea">
            <Divider orientation="left">CONNECTED USERS</Divider>
            <div className="table-container">
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    dataSource={onlineUsers}>
                    <Column title="Short Name" dataIndex="name" key="1" />
                    <Column
                        title="Role"
                        dataIndex="role"
                        key="3"
                        render={role => (
                            <Tag>{role}</Tag>
                        )}
                    />
                </Table>
            </div>
        </div>
    )
}

const mapStateToProps = ({ AuthReducer, AdminReducer }) => ({
    error: AuthReducer.error,
    connectedUsers: AdminReducer.connectedUsers
})
export default connect(mapStateToProps)(EAccounts);