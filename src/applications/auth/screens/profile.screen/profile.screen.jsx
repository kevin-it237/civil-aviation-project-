import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import useError from '../../hooks/useError';
import useResponseSuccess from '../../hooks/useResponseSuccess';
import {useHistory} from 'react-router-dom'
import { updateUser} from '../../redux/reducer/actions';
import { ReactComponent as Eye } from '../../../../assets/icons/eye.svg';
import { ReactComponent as Uneye } from '../../../../assets/icons/uneye.svg';
import Button from '../../../../app/components/buttons/button/button';
import MainHeader from '../../../../app/components/mainHeader/mainHeader'
import { Select, Divider, message, Input } from 'antd';
import './profile.screen.scss'

const { Option } = Select;


const UserProfile = ({ error, redirect, user, success }) => {
    const history = useHistory()
    const dispatch= useDispatch()

    const [showPassword, setPassword] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [registerForm, setRegisterForm] = useState({username: "", password: "", confirmation: ""})
    const [formError, setformError] = useState(null)

    useEffect(() => {
        if(user) {
            setRegisterForm({
                ...registerForm,
                username: user.username
            })
        }
    }, [user])

    const onSubmit = (e) => {
        e.preventDefault();
        if (submited) { return }
        if(validateForm() ) {
            dispatch(updateUser(registerForm))
            setformError(null)
        } else {
            return;
        }
        setSubmited(true);
    }

    const validateForm = () => {
        const {username, password} = registerForm
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
    useResponseSuccess(success, [() => message.success('Password updated successfully.'), () => setSubmited(false)]); 

    return (
        <div id="profile-page">
            <MainHeader />
            <div className="profile-form">
                <Divider orientation="center">UPDATE YOUR PASSWORD</Divider>
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
                                <Input 
                                    size="large" 
                                    name={input}
                                    onChange={onChange}
                                    disabled={input === 'username'}
                                    value={registerForm[input]}
                                    placeholder={`${input}`}
                                    type={(input === 'password'||input ==='confirmation'||input==='username') ? (showPassword||input==='username') ? 'text' : 'password' : 'email'}
                                    autoComplete={"off"}
                                    required
                                    className={`auth-container__input ${(input === 'password' || input === 'confirmation') ? 'password' : ''}`}
                                    />
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
                        Update Password
                    </Button>

                </form>
            </div>
        </div>
    )
}

const mapStateToProps = ({ AuthReducer }) => ({
    redirect: AuthReducer.redirect,
    error: AuthReducer.error,
    user: AuthReducer.user,
    success: AuthReducer.success,
})
export default connect(mapStateToProps)(UserProfile);