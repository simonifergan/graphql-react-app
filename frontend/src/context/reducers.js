
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

const login = (state, action) => {
    return {...action.user}
}
const logout = () => {
    return null
}

export const authReducers = (state = null, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return login(state, action);
        case USER_LOGOUT:
            return logout();
        default:
            return state;
    }
}