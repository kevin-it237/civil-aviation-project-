import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import useError from '../../hooks/useError';
import {useHistory} from 'react-router-dom'
import { authSignIn, authRegister} from '../../redux/reducer/actions';
import { ReactComponent as Eye } from '../../../../assets/icons/eye.svg';
import { ReactComponent as Uneye } from '../../../../assets/icons/uneye.svg';
import Button from '../../../../app/components/buttons/button/button';
import { Select } from 'antd';
import './profile.screen.scss'

const { Option } = Select;


const UserProfile = ({ error, redirect, user }) => {
    const history = useHistory()
    const dispatch= useDispatch()

    const [showPassword, setPassword] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [registerForm, setRegisterForm] = useState({username: "", email: "", password: "", confirmation: ""})
    const [formError, setformError] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault();
        if (submited) { return }
        if(validateForm() ) {
            dispatch(authRegister({...registerForm, redirect: history.location.state?.pathname || '/'}))
            setformError(null)
        } else {
            return;
        }
        setSubmited(true);
    }

    const validateForm = () => {
        const {username, password} = registerForm
        if(username.trim().length < 5) {
            setformError('Username min length is 5 caracters')
            return false
        }
        if(password.trim().length < 6) {
            setformError('Password min length is 6 caracters')
            return false
        }
        if(registerForm.password !== registerForm.confirmation) {
            setformError('Passwords dont match')
            return false
        }
        return true
    }
    
    // Change form input values. 
    const onChange = (e) => {
        setRegisterForm({...registerForm,  [e.target.name]: e.target.value })
        setformError(null)
    }

    useError(error, [() => setSubmited(false)]); 

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit} className="auth-container__card" >
                {Object.keys(registerForm).map((input, index) => {
                    if(input === 'orgType') {
                        return  <div>
                            <label key={index} className='label' htmlFor="">You are:</label>
                            <Select 
                                defaultValue="User" 
                                style={{width: '100%'}}
                                onChange={(value) => setRegisterForm({...registerForm, orgType: value})}>
                                <Option value="State/CAA">State/CAA</Option>
                                <Option value="AFCAC">AFCAC</Option>
                                <Option value="User">User</Option>
                            </Select>
                        </div>
                    }
                    if(input === 'state') return null
                    return (
                        <div key={index} className="auth-container__input-container">
                            <input
                                name={input}
                                onChange={onChange}
                                value={registerForm[input]}
                                placeholder={`${input}`}
                                type={(input === 'password'||input ==='confirmation'||input==='username') ? (showPassword||input==='username') ? 'text' : 'password' : 'email'}
                                autoComplete={"off"}
                                required
                                className={`auth-container__input ${(input === 'password' || input === 'confirmation') ? 'password' : ''}`}
                            />
                            {(input === 'password' || input === 'confirmation') ? showPassword ? <Uneye onClick={() => setPassword(!showPassword)} /> : <Eye onClick={() => setPassword(!showPassword)} /> : ''}
                        </div>
                    )
                })}
                {error&&<div className="error-box"><p className="error-text">{error.message}</p></div>}
                {formError&&<div className="error-box"><p className="error-text">{formError}</p></div>}

                <Button 
                    variant="primary" 
                    type="submit" 
                    loading={submited}
                    size="xl"
                    className="auth-container__button-primary" 
                    disabled={submited}>
                    Create Account
                </Button>

            </form>
        </div>)
}

const mapStateToProps = ({ AuthReducer }) => ({
    redirect: AuthReducer.redirect,
    error: AuthReducer.error,
    user: AuthReducer.user
})
export default connect(mapStateToProps)(UserProfile);