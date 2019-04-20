import React, { useState, useContext } from 'react';
import { login, signup } from '../services/AuthService';

import AuthContext from '../context/AuthContext';

const AuthPage = (props) => {
    const authContext = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);

    const email = useFormInput('');
    const password = useFormInput('');

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
            authContext.login(res.data.login);
        } else {
            const res = await signup(credentials);
            console.log('signup successfuly?', res)
        }
    }
   

    return (
        <section>
            <form onSubmit={handleAuth}>
                <input {...email} type="email" placeholder="Enter your E-mail address..." />
                <input {...password} type="password" placeholder="Enter your password..." />
                <button type="submit">{(isLogin) ? 'Login' : 'Signup'}</button>
                <button onClick={toggleRequest} type="button">Switch to {(isLogin) ? 'Sign up' : 'Login'}</button>
            </form>
        </section>
    );
}


function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    };
}

export default AuthPage;