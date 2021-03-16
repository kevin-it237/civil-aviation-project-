import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import useError from '../../hooks/useError';
import {createUserAccount} from '../../redux/reducer/actions';
import {types} from '../../redux/reducer/types';
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import { Divider, Table, Tag, message } from 'antd';
import './online.users.scss';
const { Column } = Table;


const EAccounts = ({ error, user, users }) => {
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
                },
                {
                    key: '3',
                    name: 'Benin',
                    fullName: 'Republic of Benin',
                    username: 'Benin',
                    role: 'state',
                },
            ])
        }
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
                    dataSource={EAList}>
                    <Column title="Short Name" dataIndex="name" key="1" />
                    <Column title="Full Name" dataIndex="fullName" key="2" />
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
    user: AuthReducer.user,
    users: AdminReducer.users,
})
export default connect(mapStateToProps)(EAccounts);