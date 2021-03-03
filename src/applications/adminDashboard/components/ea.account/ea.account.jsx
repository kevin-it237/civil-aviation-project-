import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import useError from '../../hooks/useError';
import {authRegister} from '../../redux/reducer/actions';
import { Button } from 'antd';
import './ea.account.scss';


const EAccounts = ({ error, user }) => {
    const dispatch = useDispatch()


    return (
        <div id="admin-ea">
            
        </div>
    )
}

const mapStateToProps = ({ AuthReducer, AdminReducer }) => ({
    error: AuthReducer.error,
    user: AuthReducer.user,
})
export default connect(mapStateToProps)(EAccounts);