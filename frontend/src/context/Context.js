import React, { useReducer } from 'react';
import AuthContext from './AuthContext'
import { authReducers, USER_LOGIN, USER_LOGOUT } from './reducers'

const Context = (props) => {
    const [userState, dispatch] = useReducer(authReducers, null)

    const login = (user) => {
        dispatch({ type: USER_LOGIN, user });
    }

    const logout = () => {
        dispatch({ type: USER_LOGOUT });
    }
    return (
        <AuthContext.Provider
            value={{
                user: userState,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default Context;