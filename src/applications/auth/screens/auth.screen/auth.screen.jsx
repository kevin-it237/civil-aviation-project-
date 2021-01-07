import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import useError from '../../hooks/useError';
import useRedirect from '../../hooks/useRedirect';
import { authSignIn, authFederatedSignIn} from '../../redux/reducer/actions';
import { ReactComponent as Eye } from '../../../../assets/icons/eye.svg';
import { ReactComponent as Uneye } from '../../../../assets/icons/uneye.svg';
import Button from '../../../../app/components/buttons/button/button';
import './auth.screen.scss'


const Login = ({ error, redirect }) => {

    const dispatch= useDispatch()

    const [showPassword, setPassword] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [form, setForm] = useState({email: "gejojoj519@tibui.com", password: "Noelle@123"})
    const [password2, setPassword2] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(true);

    const onSubmit = (e) => {
        e.preventDefault();
        if (submited) { return }
        dispatch(authSignIn(form));
        setSubmited(true);
    }
    
    // Change form input values. 
    const onChange = (e) => setForm({...form,  [e.target.name]: e.target.value })
    
    // Login using google, facebook ... ?
    const onFederatedLogin = (provider) => {
        if (submited) { return }
        setSubmited(true);
        dispatch(authFederatedSignIn({ provider: provider }))
    }

    useError(error, [() => setSubmited(false)]);
    useRedirect(redirect);

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit} className="auth-container__card" >
                <h2 className="auth-container__title">{isLoginForm ? "Sign In": "Sign Up"}</h2>

                {Object.keys(form).map((input, index) => (
                    <div key={index} className="auth-container__input-container">
                        <input
                            name={input}
                            onChange={onChange}
                            value={form[input]}
                            placeholder={`${input}`}
                            type={input === 'password' ? showPassword ? 'text' : 'password' : 'email'}
                            autoComplete={"off"}
                            required
                            className={`auth-container__input ${input === 'password' ? 'password' : ''}`}
                        />
                        {input === 'password' ? showPassword ? <Uneye onClick={() => setPassword(!showPassword)} /> : <Eye onClick={() => setPassword(!showPassword)} /> : ''}
                    </div>
                ))}
                {
                    !isLoginForm&&
                    <div className="auth-container__input-container">
                        <input
                            name={'password2'}
                            onChange={onChange}
                            value={password2}
                            placeholder={`Confirm password`}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete={"off"}
                            required
                            className={`auth-container__input password`}
                        />
                        {showPassword ? <Uneye onClick={() => setPassword(!showPassword)} /> : <Eye onClick={() => setPassword(!showPassword)} />}
                    </div>
                }

                {error&&<div className="error-box"><p className="error-text">{error.message}</p></div>}

                <Button 
                    variant="primary" 
                    type="submit" 
                    loading={submited}
                    size="xl"
                    className="auth-container__button-primary" 
                    disabled={submited}>
                    {isLoginForm ? "Sign In": "Sign Up"}
                </Button>

                <div className="auth-container__line-element">
                    <hr className="auth-container__line" />
                    <span className="auth-container__line-text">or</span>
                    <p onClick={() => setIsLoginForm(!isLoginForm)} className="auth-text">{isLoginForm ? "Sign Up here": "Log In here"}</p>
                </div>

            </form>
        </div>)
}

const mapStateToProps = ({ AuthReducer }) => ({
    redirect: AuthReducer.redirect,
    error: AuthReducer.error,
})
export default connect(mapStateToProps)(Login);