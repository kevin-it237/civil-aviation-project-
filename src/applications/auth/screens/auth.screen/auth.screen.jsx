import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import useError from '../../hooks/useError';
import {useHistory} from 'react-router-dom'
import useRedirect from '../../hooks/useRedirect';
import { authSignIn} from '../../redux/reducer/actions';
import { ReactComponent as Eye } from '../../../../assets/icons/eye.svg';
import { ReactComponent as Uneye } from '../../../../assets/icons/uneye.svg';
import Button from '../../../../app/components/buttons/button/button';
import { Select } from 'antd';
import './auth.screen.scss'

const { Option } = Select;


const Login = ({ error, redirect, user }) => {
    const history = useHistory()
    const dispatch= useDispatch()

    const [showPassword, setPassword] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [loginForm, setLoginForm] = useState({username: "", password: ""})

    useEffect(() => {
        if(user) {
            history.push('/')
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        if (submited) { return }
        dispatch(authSignIn({...loginForm, redirect: history.location.state?.pathname || '/'}));
        setSubmited(true);
    }
    
    // Change form input values. 
    const onChange = (e) => setLoginForm({...loginForm,  [e.target.name]: e.target.value })

    useError(error, [() => setSubmited(false)]); 
    useRedirect(redirect);

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit} className="auth-container__card" >
                <h2 className="auth-container__title">{"Login to access"}</h2>

                {
                    Object.keys(loginForm).map((input, index) => (
                        <div key={index} className="auth-container__input-container">
                            <input
                                name={input}
                                onChange={onChange}
                                value={loginForm[input]}
                                placeholder={`${input}`}
                                type={input === 'password' ? showPassword ? 'text' : 'password' : 'text'}
                                autoComplete={"off"}
                                required
                                className={`auth-container__input ${input === 'password' ? 'password' : ''}`}
                            />
                            {input === 'password' ? showPassword ? <Uneye onClick={() => setPassword(!showPassword)} /> : <Eye onClick={() => setPassword(!showPassword)} /> : ''}
                        </div>
                    ))
                }

                {error&&<div className="error-box"><p className="error-text">{error.message}</p></div>}

                <Button 
                    variant="primary" 
                    type="submit" 
                    loading={submited}
                    size="xl"
                    className="auth-container__button-primary" 
                    disabled={submited}>
                    Sign In
                </Button>

                <div className="auth-container__line-element">
                    <span onClick={() => history.push({pathname: '/', state: {isMounted: true}})} className="back-home-text">{'<'} Back to Home</span>
                </div>

            </form>
        </div>)
}

const mapStateToProps = ({ AuthReducer }) => ({
    redirect: AuthReducer.redirect,
    error: AuthReducer.error,
    user: AuthReducer.user
})
export default connect(mapStateToProps)(Login);