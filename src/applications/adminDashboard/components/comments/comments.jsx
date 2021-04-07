import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import useError from '../../hooks/useError';
import {types} from '../../redux/reducer/types';
import {listComments} from '../../redux/reducer/actions'
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import { Divider, Table, Tag, message } from 'antd';
import './comments.scss';
const { Column } = Table;


const EAccounts = ({ error, comments}) => {
    const dispatch = useDispatch()
    const [allcomments, setallcomments] = useState([])

    useEffect(() => {
        dispatch(listComments())
    }, [])

    useEffect(() => {
        if(comments.length) processData()
    }, [comments])

    const processData = () => {
        const cmmts = comments
        .map(comment => ({
            key: comment.id,
            name: comment.user,
            comment: comment.comment,
            date: `${new Date(comment.date).getFullYear()}-${new Date(comment.date).getMonth()+1}-${new Date(comment.date).getDate()}`,
        }))
        setallcomments(cmmts)
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
            <Divider orientation="left">ALL COMMENTS</Divider>
            <div className="table-container">
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    dataSource={allcomments}>
                    <Column title="User" dataIndex="name" key="1" />
                    <Column title="Comment" dataIndex="comment" key="2" />
                    {/* <Column title="Date" dataIndex="date" key="3" /> */}
                </Table>
            </div>
        </div>
    )
}

const mapStateToProps = ({ AuthReducer, AdminReducer }) => ({
    error: AuthReducer.error,
    comments: AdminReducer.comments,
})
export default connect(mapStateToProps)(EAccounts);