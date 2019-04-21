import React, { useState, useContext } from 'react';
import './AuthPage.css'
import { login, signup } from '../services/AuthService';

import AuthContext from '../context/AuthContext';

const AuthPage = () => {
    const authContext = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [isError, setIsError] = useState(false);

    const email = useFormInput('', setIsError);
    const password = useFormInput('', setIsError);

    const toggleRequest = () => setIsLogin(!isLogin);

    const handleAuth = async (e) => {
        e.preventDefault();
        const credentials = {
            email: email.value.trim(),
            password: password.value.trim(),
        }
        if (!credentials.email || !credentials.password) return;

        if (isLogin) {
            const res = await login(credentials);
            if (res) authContext.login(res.data.login);
            else setIsError(true);
        } else {
            const res = await signup(credentials);
            if (res) setIsLogin(true);
            else setIsError(true);
        }
    }


    return (
        <section className="auth-page">
            <form onSubmit={handleAuth} className="auth-form">
                {(isError)? 'Wrong e-mail and/or password': null}
                <label>E-mail:</label>
                <input {...email} type="email" autoComplete="true" placeholder="Enter your E-mail address..." />
                <label>Password:</label>
                <input {...password} type="password" autoComplete="true" placeholder="Enter your password..." />
                <div className="btns-container">
                    <button type="submit">{(isLogin) ? 'Login' : 'Signup'}</button>
                    <button onClick={toggleRequest} type="button">Switch to {(isLogin) ? 'Sign up' : 'Login'}</button>
                </div>
            </form>
        </section>
    );
}


function useFormInput(initialValue, setIsError) {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e) => {
        setIsError(false);
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    };
}

export default AuthPage;